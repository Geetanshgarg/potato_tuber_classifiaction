import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, RefreshCw, AlertCircle, Check, RotateCw } from "lucide-react";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import ResultsPage from "./results-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState("upload");
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
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraTries, setCameraTries] = useState(0);
  const [cameraFacingMode, setCameraFacingMode] = useState("environment"); // "environment" is back camera, "user" is front camera

  // Handle file upload with base64 conversion
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
      
      // Convert file to base64 data URL instead of object URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setPreview(base64String);
        setError(null);
        setResult(null);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid JPEG or PNG image");
    }
  };

  // Function to toggle camera between front and back
  const toggleCamera = async () => {
    // Only toggle if camera is already active
    if (showCamera && streamRef.current) {
      const newMode = cameraFacingMode === "environment" ? "user" : "environment";
      setCameraFacingMode(newMode);
      
      // Stop current camera
      stopCamera();
      
      // Wait a bit before reactivating with new facing mode
      setTimeout(() => {
        activateCamera(newMode);
      }, 300);
    }
  };

  // Updated activateCamera function to accept facing mode parameter
  const activateCamera = async (forceFacingMode = null) => {
    try {
      // Prevent multiple simultaneous initialization attempts
      if (cameraLoading) return;
      
      setCameraLoading(true);
      setError(null);
      
      // First stop any existing streams to avoid conflicts
      stopCamera();
      
      // Use provided facing mode or current state
      const facingMode = forceFacingMode || cameraFacingMode;
      console.log(`Attempting camera initialization with facing mode: ${facingMode}...`);
      
      // Ensure video element exists before proceeding
      if (!videoRef.current) {
        console.error("Video element not found in DOM");
        throw new Error("Camera initialization failed - video element not found");
      }
      
      // Set constraints based on facing mode
      const constraints = {
        video: { 
          facingMode: facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };
      
      console.log("Using constraints:", constraints);
      
      // Check if mediaDevices API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }
      
      // Request camera access with current constraints
      streamRef.current = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (!streamRef.current || !streamRef.current.active) {
        throw new Error("Camera stream not active");
      }
      
      // Get video track info for debugging
      const videoTrack = streamRef.current.getVideoTracks()[0];
      console.log("Camera access granted:", videoTrack ? videoTrack.label : "Unknown camera");
      
      // Wait a moment before setting up video
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Re-check video element after delay
      if (!videoRef.current) {
        throw new Error("Video element disappeared during initialization");
      }
      
      // Set video source directly
      try {
        videoRef.current.srcObject = null; // Clear existing source
        videoRef.current.srcObject = streamRef.current;
      } catch (err) {
        console.error("Error setting srcObject:", err);
        throw new Error("Failed to connect camera to video element");
      }
      
      // Set up video events
      const setupVideoEvents = () => {
        // Explicitly set these attributes for maximum compatibility
        videoRef.current.setAttribute("autoplay", "true");
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("muted", "true");
        videoRef.current.muted = true; // Double ensure muted
        
        console.log("Starting video playback...");
        
        // Only set showCamera to true after video is actually playing
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Camera video playback started successfully");
              setShowCamera(true);
            })
            .catch(err => {
              console.error("Error playing video:", err);
              // Try one more time with a user interaction simulation
              setTimeout(() => {
                videoRef.current?.play()
                  .then(() => {
                    console.log("Second attempt: Camera video playback started");
                    setShowCamera(true);
                  })
                  .catch(err2 => {
                    console.error("Second play attempt failed:", err2);
                    setError("Could not start video playback. Try clicking 'Start Camera' again.");
                  });
              }, 500);
            });
        } else {
          // Fallback for browsers where play() doesn't return a promise
          console.log("Play doesn't return a promise, assuming video is playing");
          setShowCamera(true);
        }
      };
      
      // Set up metadata loaded event
      if (videoRef.current.readyState >= 1) {
        // Metadata is already loaded
        console.log("Video metadata already available");
        setupVideoEvents();
      } else {
        // Wait for metadata to load
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded, dimensions:", 
            videoRef.current.videoWidth, "x", videoRef.current.videoHeight);
          setupVideoEvents();
        };
        
        // Fallback in case onloadedmetadata never fires
        setTimeout(() => {
          if (!showCamera && videoRef.current) {
            console.log("Metadata load timeout, trying to play anyway");
            setupVideoEvents();
          }
        }, 2000);
      }
      
    } catch (err) {
      console.error("Camera access error:", err);
      
      // Increment tries for fallback options
      setCameraTries(prev => prev + 1);
      
      // Provide specific error messages based on error type
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Camera access denied. Please check your browser permissions.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setError("No camera found on your device.");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setError("Camera is in use by another application.");
      } else if (err.name === "OverconstrainedError") {
        setError("Camera doesn't support the requested resolution.");
      } else {
        setError(`Camera error: ${err.message}`);
      }
      
      stopCamera();
    } finally {
      setCameraLoading(false);
    }
  };

  // Make sure we clean up camera resources properly
  useEffect(() => {
    // Clean up function to stop the camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

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

  // Stop camera stream with improved cleanup
  const stopCamera = () => {
    console.log("Stopping camera stream");
    if (streamRef.current) {
      try {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          track.stop();
          console.log("Stopped track:", track.label);
        });
      } catch (err) {
        console.error("Error stopping camera tracks:", err);
      }
      streamRef.current = null;
    }
    
    // Clean up video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      console.log("Cleared video source");
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
        // Ensure preview is a data URL before saving
        if (preview && typeof preview === 'string') {
          // Log first few characters to verify it's a data URL
          console.log("Image format:", preview.substring(0, 30));
        }
        
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
    return <ResultsPage result={{...result, imageBase64: preview}} onBackToScan={handleBackToScan} />;
  }

  // Handle tab change with improved initialization
  const handleTabChange = (value) => {
    setActiveTab(value);
    
    // If switching to camera tab, activate camera after delay
    if (value === "camera" && !showCamera && !cameraLoading) {
      // Reset camera tries when switching tabs
      setCameraTries(0);
      // Delay camera activation to ensure DOM is ready
      setTimeout(() => {
        activateCamera();
      }, 500);
    } 
    // If switching away from camera tab, stop camera
    else if (value !== "camera") {
      stopCamera();
    }
  };

  // Otherwise, render the scan page
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Scan Your Plant</h2>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <div className="relative h-64 bg-green-50 rounded-xl border-2 border-dashed border-green-300 flex items-center justify-center overflow-hidden">
              {preview ? (
                <Image 
                  src={preview} 
                  alt="Preview" 
                  fill 
                  style={{ objectFit: "contain" }} 
                />
              ) : (
                <Upload className="w-16 h-16 text-green-400" />
              )}
              
              {!preview && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-green-800/20 rounded-xl">
                  <Button 
                    className="bg-white text-green-800 hover:bg-green-50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select Image
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/jpeg,image/png" 
                    className="hidden" 
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="camera" className="mt-0">
            <div className="relative h-64 bg-black rounded-xl overflow-hidden">
              {/* Always render the video element but keep it hidden until needed */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  display: showCamera ? 'block' : 'none', 
                  backgroundColor: 'black' 
                }}
              />
              
              {cameraLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm">Activating camera...</p>
                </div>
              )}
              
              {showCamera && (
                <>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button 
                      onClick={capturePhoto}
                      className="bg-white text-green-800 hover:bg-green-50"
                    >
                      Take Photo
                    </Button>
                  </div>
                  
                  {/* Add rotate camera button */}
                  <Button
                    onClick={toggleCamera}
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white border-none"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {!showCamera && !cameraLoading && (
                <div className="h-full flex items-center justify-center">
                  <Button
                    onClick={activateCamera}
                    className="bg-white text-green-800 hover:bg-green-50"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    {cameraTries > 0 ? "Retry Camera" : "Start Camera"}
                  </Button>
                </div>
              )}
            </div>
            
            {cameraTries > 0 && !showCamera && (
              <div className="mt-2 text-center text-sm text-amber-600">
                Having trouble with the camera? Try using the Upload tab instead.
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col gap-3 mt-4">
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

          {loading && (
            <div className="space-y-2 py-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing image...</span>
                <span>Please wait</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          )}

          {!loading && !result && !preview && (
            <div className="text-center text-sm text-muted-foreground mt-2">
              <p>Take a clear photo of your potato tuber</p>
              <p>Make sure it's well-lit and in focus</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

