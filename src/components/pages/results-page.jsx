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
      setAnalysisResult(result);
    }
  }, [result]);

  // Function to save plant data to localStorage
  const savePlant = () => {
    if (!analysisResult) return;
    
    // Get existing plants from localStorage
    const savedPlants = JSON.parse(localStorage.getItem('myPlants') || '[]');
    
    // Create a new plant object with a simple placeholder image URL
    const newPlant = {
      id: Date.now(),
      name: `Potato Plant ${savedPlants.length + 1}`,
      status: analysisResult.class,
      confidence: analysisResult.confidence,
      // Use a simple placeholder image that definitely exists in the public folder
      image: '/placeholder.svg',
      dateAdded: new Date().toISOString(),
      weather: {
        temperature: '28°C',
        humidity: 'Medium',
        sunlight: 'Sunny',
        watered: true
      }
    };
    
    // Add new plant to the array
    savedPlants.unshift(newPlant);
    
    // Save back to localStorage
    localStorage.setItem('myPlants', JSON.stringify(savedPlants));
    
    // Update state to show saved confirmation
    setIsSaved(true);
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
          <Button className="w-full justify-start" variant="outline">
            <VolumeUp className="w-5 h-5 mr-2" />
            Listen to Recommendations
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Video className="w-5 h-5 mr-2" />
            Watch Treatment Video
          </Button>
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

