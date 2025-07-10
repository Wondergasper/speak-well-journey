
import torch
import torchaudio
from transformers import Wav2Vec2Processor
import torch.nn.functional as F

def predict_single_audio(audio_path, model, processor):
    """
    Predict stuttering in a single audio file using the trained Wav2Vec2 model.
    
    Args:
        audio_path (str): Path to the audio file
        model: Trained Wav2Vec2BinaryClassifier model
        processor: Wav2Vec2Processor instance
    
    Returns:
        tuple: (prediction, probability) where prediction is 0 or 1, probability is float
    """
    try:
        # Load audio
        waveform, sample_rate = torchaudio.load(audio_path)
        
        # Resample to 16kHz if needed
        if sample_rate != 16000:
            resampler = torchaudio.transforms.Resample(sample_rate, 16000)
            waveform = resampler(waveform)
        
        # Convert to mono if stereo
        if waveform.shape[0] > 1:
            waveform = torch.mean(waveform, dim=0, keepdim=True)
        
        # Flatten to 1D tensor
        waveform = waveform.squeeze()
        
        # Process with Wav2Vec2Processor
        inputs = processor(
            waveform,
            sampling_rate=16000,
            return_tensors="pt",
            padding=True
        )
        
        # Move to appropriate device (CPU for now)
        input_values = inputs.input_values.to('cpu')
        
        # Model inference
        model.eval()
        with torch.no_grad():
            outputs = model(input_values)
            logits = outputs['logits']  # Assuming your model returns a dict with 'logits'
            
            # Apply sigmoid to get probability
            probability = torch.sigmoid(logits).item()
            
            # Binary prediction based on 0.5 threshold
            prediction = 1 if probability > 0.5 else 0
        
        return prediction, probability
        
    except Exception as e:
        print(f"Error in predict_single_audio: {str(e)}")
        raise Exception(f"Audio processing error: {str(e)}")
