import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, RefreshCw, AlertCircle, Check } from "lucide-react";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import ResultsPage from "./results-page";

export default function ScanPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
      setResult(null);
      setShowResults(false);
    } else {
      setError("Please select a valid JPEG or PNG image");
    }
  };

  // Handle camera activation
  const activateCamera = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      
      setShowCamera(true);
      setError(null);
    } catch (err) {
      setError("Could not access the camera: " + err.message);
    }
  };

  // Handle taking photo
  const capturePhoto = () => {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        setImage(blob);
        setPreview(canvas.toDataURL("image/jpeg"));
        setResult(null);
        setShowResults(false);
        
        // Stop the camera after taking photo
        stopCamera();
      }, "image/jpeg");
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  // Reset the component state
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setLoading(false);
    setShowResults(false);
    stopCamera();
  };

  // Handle back to scan from results page
  const handleBackToScan = () => {
    setShowResults(false);
    setResult(null);
  };

  // Submit the image for classification
  const handleSubmit = async () => {
    if (!image) {
      setError("Please select or capture an image first");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        // Show results page after a short delay for better UX
        setTimeout(() => {
          setShowResults(true);
        }, 500);
      } else {
        setError(data.error || "Failed to process the image");
      }
    } catch (err) {
      setError("Error submitting image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // If showing results, render the results page
  if (showResults && result) {
    return <ResultsPage result={result} onBackToScan={handleBackToScan} />;
  }

  // Otherwise, render the scan page
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Scan Your Plant</h2>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-6">
          {showCamera ? (
            <div className="relative h-64 bg-black rounded-xl overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button 
                  onClick={capturePhoto}
                  className="bg-white text-green-800 hover:bg-green-50"
                >
                  Take Photo
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                onClick={stopCamera}
              >
                &times;
              </Button>
            </div>
          ) : (
            <div className="relative h-64 bg-green-50 rounded-xl border-2 border-dashed border-green-300 flex items-center justify-center overflow-hidden">
              {preview ? (
                <Image 
                  src={preview} 
                  alt="Preview" 
                  fill 
                  style={{ objectFit: "contain" }} 
                />
              ) : (
                <Camera className="w-16 h-16 text-green-400" />
              )}
              
              {!preview && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-green-800/20 rounded-xl">
                  <Button 
                    className="bg-white text-green-800 hover:bg-green-50"
                    onClick={activateCamera}
                  >
                    Take Photo
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!showCamera && (
              <>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/jpeg,image/png" 
                  className="hidden" 
                />
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5" />
                  Upload from Gallery
                </Button>
                
                {preview && (
                  <div className="flex gap-2 justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="flex-1 bg-green-700 hover:bg-green-800"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Analyze
                    </Button>
                  </div>
                )}
              </>
            )}

            {loading && (
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing image...</span>
                  <span>Please wait</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            )}

            {!loading && !result && !showCamera && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Take a clear photo of your potato plant leaf</p>
                <p>Make sure the leaf is well-lit and in focus</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

