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

    // Send the image to the Python server
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: serverFormData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    // Process the response from Python server
    return NextResponse.json({
      success: true,
      class: data.predicted_class,
      confidence: data.confidence,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
