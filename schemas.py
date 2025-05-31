from pydantic import BaseModel

class PredictionResult(BaseModel):
    classed: str
    confidence: float
    all_classes: dict[str, float]