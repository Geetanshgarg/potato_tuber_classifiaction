from flask import Flask, request, jsonify
import tensorflow as tf
import cv2
import numpy as np
from flask_cors import CORS
import os
import logging
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Get environment variables with defaults
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
PORT = int(os.environ.get('PORT', 8000))
HOST = os.environ.get('HOST', '0.0.0.0')
MODEL_PATH = os.environ.get('MODEL_PATH', 'PatatoTuberDisease_model.keras')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Production configurations
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size 16MB
app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.jpeg', '.png']

# Define image size that matches your training
IMG_HEIGHT = 180  
IMG_WIDTH = 180

# Load model with error handling
try:
    logger.info(f"Loading model from {MODEL_PATH}")
    start_time = time.time()
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info(f"Model loaded successfully in {time.time() - start_time:.2f} seconds")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    if model is None:
        return jsonify({"status": "error", "message": "Model not loaded"}), 503
    return jsonify({"status": "healthy", "message": "Service is running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            raise ValueError("Model is not loaded")
            
        # Check if request has the file part
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No image part in the request'
            }), 400
        
        # Get image file from request
        file = request.files['image']
        
        # Check if filename is empty
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No selected file'
            }), 400
            
        # Check file extension
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in app.config['UPLOAD_EXTENSIONS']:
            return jsonify({
                'success': False,
                'error': f'Unsupported file extension. Allowed: {", ".join(app.config["UPLOAD_EXTENSIONS"])}'
            }), 400
        
        # Read and preprocess the image
        file_bytes = file.read()
        nparr = np.frombuffer(file_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({
                'success': False,
                'error': 'Invalid image file'
            }), 400
            
        image_resized = cv2.resize(image, (IMG_WIDTH, IMG_HEIGHT))
        image = np.expand_dims(image_resized, axis=0)
        
        # Make prediction
        prediction = model.predict(image)
        predicted_class = np.argmax(prediction)
        classes = ['Bacteria', 'Early Blight', 'Fungi', 'Healthy', 'Late Blight', 'Pest', 'Virus']
        predicted_class_name = classes[predicted_class]
        
        # Return the prediction
        return jsonify({
            'success': True,
            'predicted_class': predicted_class_name,
            'confidence': float(prediction[0][predicted_class])*100
        })
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    if DEBUG:
        logger.info(f"Starting development server on {HOST}:{PORT}")
        app.run(host=HOST, port=PORT, debug=DEBUG)
    else:
        # For production, use a WSGI server like gunicorn
        logger.info("For production, use a WSGI server instead of Flask's built-in server")