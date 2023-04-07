from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision
import cv2
import numpy as np
import base64
from io import BytesIO
import segmentation_models_pytorch as smp
from PIL import Image, ImageOps




from PIL import Image, ImageOps, ImageEnhance
















app = Flask(__name__)
CORS(app)




def preprocess_image(image):
    image = cv2.resize(image, (256, 256))
    image = image / 255.0
    image = np.transpose(image, (2, 0, 1))
    return image







@app.route('/grow_nails', methods=['POST'])
def grow_nails_route():
    
    
    # Return the result image
    buffered = BytesIO()
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
