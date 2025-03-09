import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    // Create a new FormData to send to the Python server
    const serverFormData = new FormData();
    serverFormData.append('image', imageFile);

    // Send the image to the Python server with timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      console.log("Sending image to prediction server...");
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: serverFormData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      
      // Validate the response structure
      if (!data || typeof data.predicted_class === 'undefined' || typeof data.confidence === 'undefined') {
        throw new Error('Invalid response structure from prediction server');
      }

      // Process the response from Python server
      return NextResponse.json({
        success: true,
        class: data.predicted_class,
        confidence: data.confidence,
        timestamp: new Date().toISOString(),
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("Error communicating with prediction server:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
