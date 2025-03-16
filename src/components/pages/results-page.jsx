import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, VolumeIcon as VolumeUp, Video, Leaf, Check, AlertCircle, Save, Info } from "lucide-react"
import { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultsPage({ result, onBackToScan }) {
  const { t, language } = useLanguage();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [showLangSupport, setShowLangSupport] = useState(false);
  
  // Effect to load available speech synthesis voices
  useEffect(() => {
    if (window.speechSynthesis) {
      // Get available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
      };
      
      // Load voices (Chrome needs the event listener, Firefox has them immediately)
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);
  
  // Effect to handle data passed via props
  useEffect(() => {
    if (result) {
      console.log("Analysis result received:", result);
      setAnalysisResult(result);
    }
  }, [result]);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Function to save plant data to localStorage
  const savePlant = () => {
    if (!analysisResult) return;
    
    // Get existing plants from localStorage
    const savedPlants = JSON.parse(localStorage.getItem('myPlants') || '[]');
    
    // Try to get the image data
    let imageData = '/placeholder.svg';
    
    // Check for image data and ensure it's a proper data URL
    if (analysisResult.imageBase64) {
      // Verify this is a data URL (should start with 'data:')
      if (typeof analysisResult.imageBase64 === 'string') {
        if (analysisResult.imageBase64.startsWith('data:')) {
          imageData = analysisResult.imageBase64;
          console.log("Using direct imageBase64 data");
        } else if (analysisResult.imageBase64.startsWith('blob:')) {
          // If we have a blob URL, we can't save it directly
          console.error("Image is a blob URL, cannot store in localStorage");
          // Leave as placeholder
        }
      }
    }
    
    // Log what we're saving
    console.log("Image data type:", typeof imageData);
    console.log("Image data starts with:", imageData.substring(0, 30));
    
    // Create a simplified plant object without weather data
    const newPlant = {
      id: Date.now(),
      name: `Potato Plant ${savedPlants.length + 1}`,
      status: analysisResult.class,
      confidence: analysisResult.confidence,
      image: imageData,
      dateAdded: new Date().toISOString()
    };
    
    try {
      // Add new plant to the array
      savedPlants.unshift(newPlant);
      
      // Save back to localStorage
      localStorage.setItem('myPlants', JSON.stringify(savedPlants));
      
      // Update state to show saved confirmation
      setIsSaved(true);
      console.log("Plant saved successfully with image");
    } catch (err) {
      // If localStorage fails (possibly due to size limits), try without the image
      console.error("Error saving plant:", err);
      
      // Try again without the image
      try {
        newPlant.image = '/placeholder.svg';
        savedPlants.unshift(newPlant);
        localStorage.setItem('myPlants', JSON.stringify(savedPlants));
        setIsSaved(true);
        console.log("Plant saved without image due to size constraints");
      } catch (innerErr) {
        console.error("Failed to save plant even without image:", innerErr);
      }
    }
  };

  // Find best matching voice for the current language
  const findVoiceForLanguage = (langCode) => {
    if (!window.speechSynthesis || availableVoices.length === 0) return null;
    
    // Look for exact match
    let voice = availableVoices.find(v => v.lang === langCode);
    
    // If no exact match, try to find a voice that starts with the language code
    if (!voice) {
      const langPrefix = langCode.split('-')[0];
      voice = availableVoices.find(v => v.lang.startsWith(langPrefix));
    }
    
    // If still no match, use default voice
    return voice || null;
  };

  // Function to speak recommendations
  const speakRecommendations = () => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Get recommendations based on disease class
    const recommendations = getRecommendations(analysisResult.class);
    
    // Create text to speak
    let textToSpeak;
    
    // Handle English differently from other languages
    if (language === 'English') {
      textToSpeak = `${t('recommendedActions')}: ${recommendations.join(". ")}`;
    } else {
      // Just the recommendations without colons for non-English languages
      textToSpeak = `${recommendations.join(" ")}`;
      
      // Show language support notice
      setShowLangSupport(true);
      
      // Auto-hide the notice after 5 seconds
      setTimeout(() => {
        setShowLangSupport(false);
      }, 5000);
    }
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Set language based on current app language
    switch (language) {
      case 'Hindi':
        utterance.lang = 'hi-IN';
        break;
      case 'Telugu':
        utterance.lang = 'te-IN';
        break;
      case 'Marathi':
        utterance.lang = 'mr-IN';
        break;
      case 'Gujarati':
        utterance.lang = 'gu-IN';
        break;
      case 'Punjabi':
        utterance.lang = 'pa-IN';
        break;
      default:
        utterance.lang = 'en-US';
    }
    
    // Fallback mechanism - if speech doesn't start in a second, try English
    const speechTimer = setTimeout(() => {
      if (isSpeaking && language !== 'English') {
        console.log("Speech not working in selected language, falling back to English");
        window.speechSynthesis.cancel();
        const fallbackUtterance = new SpeechSynthesisUtterance(textToSpeak);
        fallbackUtterance.lang = 'en-US';
        fallbackUtterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(fallbackUtterance);
      }
    }, 1000);
    
    // Set speaking state
    setIsSpeaking(true);
    
    // Add event listener for when speech ends
    utterance.onend = () => {
      setIsSpeaking(false);
      clearTimeout(speechTimer);
    };
    
    // Log speech attempt
    console.log(`Speaking in ${utterance.lang}`, textToSpeak);
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Helper functions to determine UI elements based on disease class
  const getStatusColor = (className) => {
    if (!className) return "yellow";
    
    const lowerClass = className.toLowerCase();
    
    if (lowerClass.includes("healthy")) return "green";
    if (lowerClass.includes("early blight")) return "yellow";
    if (lowerClass.includes("late blight")) return "red";
    if (lowerClass.includes("bacteria")) return "orange";
    if (lowerClass.includes("fungi")) return "purple";
    if (lowerClass.includes("pest")) return "blue";
    if (lowerClass.includes("virus")) return "red";
    
    return "yellow"; // Default for other conditions
  };
  
  const getStatusIcon = (color) => {
    if (color === "green") return <Check className="w-12 h-12 text-green-500" />;
    if (color === "red") return <AlertCircle className="w-12 h-12 text-red-500" />;
    if (color === "orange") return <AlertTriangle className="w-12 h-12 text-orange-500" />;
    if (color === "purple") return <AlertTriangle className="w-12 h-12 text-purple-500" />;
    if (color === "blue") return <AlertTriangle className="w-12 h-12 text-blue-500" />;
    return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
  };
  
  const getBackgroundClass = (color) => {
    if (color === "green") return "bg-green-50 border-green-200";
    if (color === "red") return "bg-red-50 border-red-200";
    if (color === "orange") return "bg-orange-50 border-orange-200";
    if (color === "purple") return "bg-purple-50 border-purple-200";
    if (color === "blue") return "bg-blue-50 border-blue-200";
    return "bg-yellow-50 border-yellow-200";
  };
  
  const getTextClass = (color) => {
    if (color === "green") return "text-green-700";
    if (color === "red") return "text-red-700";
    if (color === "orange") return "text-orange-700";
    if (color === "purple") return "text-purple-700";
    if (color === "blue") return "text-blue-700";
    return "text-yellow-700";
  };
  
  const getSecondaryTextClass = (color) => {
    if (color === "green") return "text-green-600";
    if (color === "red") return "text-red-600";
    if (color === "orange") return "text-orange-600";
    if (color === "purple") return "text-purple-600";
    if (color === "blue") return "text-blue-600";
    return "text-yellow-600";
  };
  
  const getSeverityText = (className, confidence) => {
    if (!className) return "Unknown severity";
    
    const lowerClass = className.toLowerCase();
    if (lowerClass.includes("healthy")) return "No issues detected";
    
    if (confidence > 90) return "High severity";
    if (confidence > 75) return "Moderate severity";
    return "Low severity";
  };
  
  const getRecommendations = (className) => {
    if (!className) return [];
    
    const lowerClass = className.toLowerCase();
    
    // Return translated recommendations based on condition
    if (lowerClass.includes("healthy")) {
      return [
        t('recommendHealthy1'),
        t('recommendHealthy2'),
        t('recommendHealthy3'),
        t('recommendHealthy4')
      ];
    } else if (lowerClass.includes("early blight")) {
      return [
        t('recommendEarlyBlight1'),
        t('recommendEarlyBlight2'),
        t('recommendEarlyBlight3'),
        t('recommendEarlyBlight4')
      ];
    } else if (lowerClass.includes("late blight")) {
      return [
        t('recommendLateBlight1'),
        t('recommendLateBlight2'),
        t('recommendLateBlight3'),
        t('recommendLateBlight4')
      ];
    } else if (lowerClass.includes("fungi")) {
      return [
        t('recommendFungal1'),
        t('recommendFungal2'),
        t('recommendFungal3'),
        t('recommendFungal4')
      ];
    } else if (lowerClass.includes("pest") || lowerClass.includes("insect")) {
      return [
        t('recommendInsect1'),
        t('recommendInsect2'),
        t('recommendInsect3'),
        t('recommendInsect4')
      ];
    } else if (lowerClass.includes("virus") || lowerClass.includes("mosaic")) {
      return [
        t('recommendViral1'),
        t('recommendViral2'),
        t('recommendViral3'),
        t('recommendViral4')
      ];
    } else if (lowerClass.includes("bacteria") || lowerClass.includes("bacterial")) {
      return [
        t('recommendBacterial1'),
        t('recommendBacterial2'),
        t('recommendBacterial3'),
        t('recommendBacterial4')
      ];
    }
    
    return [
      t('recommendDefault1'),
      t('recommendDefault2'),
      t('recommendDefault3'),
      t('recommendDefault4')
    ];
  };
  
  // If no result is available yet
  if (!analysisResult) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">{t('loadingResults')}</h2>
          <p>{t('pleaseWaitResults')}</p>
          <Button 
            className="mt-4"
            variant="outline"
            onClick={onBackToScan}
          >
            {t('backToScan')}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Main display when results are available
  const statusColor = getStatusColor(analysisResult.class);
  const recommendations = getRecommendations(analysisResult.class);

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">{t('plantHealthResults')}</h2>

        {/* Display the image if available */}
        {analysisResult.imageBase64 && (
          <div className="mb-4 relative overflow-hidden rounded-lg" style={{ height: '200px' }}>
            <img 
              src={analysisResult.imageBase64} 
              alt="Scanned Plant" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={`${getBackgroundClass(statusColor)} rounded-lg p-4 mb-6 flex items-center gap-4`}>
          {getStatusIcon(statusColor)}
          <div>
            <p className={`text-lg font-semibold ${getTextClass(statusColor)}`}>{analysisResult.class}</p>
            <p className={`text-sm ${getSecondaryTextClass(statusColor)}`}>
              {getSeverityText(analysisResult.class, analysisResult.confidence)}
              {analysisResult.confidence && ` • ${analysisResult.confidence.toFixed(1)}% confidence`}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2 text-green-800">{t('recommendedActions')}:</h3>
          <ul className="space-y-2 text-sm">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-green-100 p-1 rounded-full mt-0.5">{index + 1}</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
          
          {/* Language support notice */}
          {showLangSupport && (
            <div className="mt-2 text-xs flex items-center gap-1 text-blue-600">
              <Info className="w-3 h-3" />
              <span>Your browser may have limited speech support for this language.</span>
            </div>
          )}
          
          {/* Listen to recommendations button */}
          <Button 
            onClick={isSpeaking ? stopSpeaking : speakRecommendations}
            className="w-full mt-3 justify-start bg-purple-600 hover:bg-purple-700 text-white"
            variant="secondary"
          >
            <VolumeUp className={`w-5 h-5 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
            {isSpeaking ? t('pleaseWait') : t('listenRecommendations')}
          </Button>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={savePlant} 
            className={`w-full justify-start ${isSaved ? 'bg-green-100 text-green-800' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={isSaved}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaved ? t('plantSaved') : t('saveToPlants')}
          </Button>
          <Button
            onClick={onBackToScan}
            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
            <Leaf className="w-5 h-5 mr-2" />
            {t('scanAnotherPlant')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

