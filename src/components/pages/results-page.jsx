import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, VolumeIcon as VolumeUp, Video, Leaf, Check, AlertCircle, Save } from "lucide-react"
import { useState, useEffect } from 'react';

export default function ResultsPage({ result, onBackToScan }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  // Effect to handle data passed via props
  useEffect(() => {
    if (result) {
      console.log("Analysis result received:", result);
      setAnalysisResult(result);
    }
  }, [result]);

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
    
    // Existing recommendations
    if (lowerClass.includes("healthy")) {
      return [
        "Continue regular watering schedule",
        "Apply balanced fertilizer as needed",
        "Monitor for any changes in plant health"
      ];
    } else if (lowerClass.includes("early blight")) {
      return [
        "Remove and destroy affected leaves",
        "Apply copper-based fungicide",
        "Improve air circulation around plants"
      ];
    } else if (lowerClass.includes("late blight")) {
      return [
        "Remove and destroy all infected plant material immediately",
        "Apply fungicide with active ingredients specific for late blight",
        "Increase plant spacing for better air circulation"
      ];
    } else if (lowerClass.includes("fungi")) {
      return [
        "Apply appropriate fungicide treatment",
        "Reduce humidity around plants",
        "Avoid overhead watering"
      ];
    } else if (lowerClass.includes("pest")) {
      return [
        "Apply appropriate organic or chemical insecticide",
        "Introduce beneficial insects if applicable",
        "Remove severely damaged plant parts"
      ];
    } else if (lowerClass.includes("virus")) {
      return [
        "Remove infected plants to prevent spread",
        "Control insect vectors with appropriate insecticides",
        "Sanitize tools and equipment"
      ];
    } else if (lowerClass.includes("bacteria")) {
      return [
        "Remove and destroy infected plants",
        "Apply copper-based bactericides",
        "Avoid working with plants when wet",
        "Practice crop rotation in future plantings"
      ];
    }
    
    return [
      "Consult with an agricultural expert",
      "Take multiple photos from different angles",
      "Monitor plant for any changes in symptoms"
    ];
  };
  
  // If no result is available yet
  if (!analysisResult) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Loading Results</h2>
          <p>Please wait while we load your results...</p>
          <Button 
            className="mt-4"
            variant="outline"
            onClick={onBackToScan}
          >
            Back to Scan
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
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Plant Health Results</h2>

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
          <h3 className="font-medium mb-2 text-green-800">Recommended Actions:</h3>
          <ul className="space-y-2 text-sm">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-green-100 p-1 rounded-full mt-0.5">{index + 1}</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={savePlant} 
            className={`w-full justify-start ${isSaved ? 'bg-green-100 text-green-800' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={isSaved}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaved ? 'Plant Saved' : 'Save Plant'}
          </Button>
          <Button
            onClick={onBackToScan}
            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
            <Leaf className="w-5 h-5 mr-2" />
            Scan Another Plant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

