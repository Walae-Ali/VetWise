import json
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import constants
class Predictor:
    def __init__(self, model_path= constants.model_path, labels_path=constants.class_labels):
        self.model = load_model(model_path)
        with open(labels_path) as f:
            self.class_labels = json.load(f)
    
    def preprocess_image(self, image_bytes):
        """Convert uploaded image to model input format"""
        img = Image.open(io.BytesIO(image_bytes))
        img = img.convert('RGB').resize((224, 224))  # Adjust size to your model
        img_array = np.array(img) / 255.0  # Normalize
        return np.expand_dims(img_array, axis=0)
    
    def predict(self, image_bytes):
        """Make prediction on image bytes"""
        processed_img = self.preprocess_image(image_bytes)
        probs = self.model.predict(processed_img)[0]
        pred_idx = np.argmax(probs)
        return {
            "classed": self.class_labels[pred_idx],
            "confidence": float(probs[pred_idx]),
            "all_classes": dict(zip(self.class_labels, [float(p) for p in probs]))
        }