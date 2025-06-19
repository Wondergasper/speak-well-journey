import librosa
import numpy as np
import soundfile as sf

# Placeholder for audio preprocessing and feature extraction
def preprocess_audio(audio_path, target_sr=16000):
    # Load audio, convert to mono, resample
    y, sr = librosa.load(audio_path, sr=target_sr, mono=True)
    # Trim leading/trailing silence
    y, _ = librosa.effects.trim(y)
    # Normalize
    y = librosa.util.normalize(y)
    return y, sr

def extract_features(audio_path):
    y, sr = preprocess_audio(audio_path)
    # Extract MFCCs
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfcc_mean = np.mean(mfcc, axis=1)
    mfcc_std = np.std(mfcc, axis=1)
    # Concatenate mean and std for each MFCC
    features = np.concatenate([mfcc_mean, mfcc_std])
    return features 