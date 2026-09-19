'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertTriangle } from 'lucide-react';

interface CameraViewfinderProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function CameraViewfinder({ onCapture, onClose }: CameraViewfinderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Start Camera
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        setError(null);
        if (activeStream) {
          activeStream.getTracks().forEach((t) => t.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        activeStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (err) {
        console.warn('Camera access issue:', err);
        // Try fallback with simple constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          activeStream = fallbackStream;
          setStream(fallbackStream);
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play();
          }
        } catch {
          setError(
            'Unable to access camera. Please allow camera permissions in your browser or use File Upload.'
          );
        }
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `donation-snap-${Date.now()}.jpg`, { type: 'image/jpeg' });
        // Stop stream
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }
        onCapture(file);
      }
    }, 'image/jpeg', 0.9);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center border-2 border-emerald-500/50">
      {/* Top Overlay controls */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center px-1">
        <div className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Live Viewfinder
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleFacingMode}
            className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
            title="Flip camera"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (stream) stream.getTracks().forEach((t) => t.stop());
              onClose();
            }}
            className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
            title="Close camera"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Viewfinder */}
      {error ? (
        <div className="p-8 text-center text-slate-300 flex flex-col items-center gap-3 min-h-65 justify-center">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <p className="text-xs max-w-xs">{error}</p>
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl"
          >
            Use File Upload Instead
          </button>
        </div>
      ) : (
        <div className="relative w-full aspect-4/3 max-h-85 bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />

          {/* Viewfinder Target Grid */}
          <div className="absolute inset-8 border-2 border-dashed border-white/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between">
              <span className="text-[10px] bg-black/50 text-emerald-300 px-2 py-0.5 rounded font-mono">
                AI SCANNER
              </span>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-white/80 bg-black/50 px-2.5 py-1 rounded-full font-medium">
                Aim at donation items
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Bottom Shutter Action Bar */}
      {!error && (
        <div className="w-full bg-slate-900/95 px-6 py-4 flex items-center justify-center gap-4 z-20">
          <button
            onClick={handleSnap}
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] active:scale-95 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-full shadow-lg transition"
          >
            <Camera className="w-5 h-5 text-slate-950" />
            Snap Photo &amp; Sort
          </button>
        </div>
      )}
    </div>
  );
}
