from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models.classifier import Predictor
from .schemas import PredictionResult

app = FastAPI(title="Image Classifier API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = Predictor()  # Load model at startup

@app.post("/predict", response_model=PredictionResult)
async def predict_image(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(400, "File must be an image")
    
    try:
        image_bytes = await file.read()
        return predictor.predict(image_bytes)
    except Exception as e:
        raise HTTPException(500, f"Prediction failed: {str(e)}")

@app.get("/classes")
async def get_classes():
    return {"classes": predictor.class_labels}