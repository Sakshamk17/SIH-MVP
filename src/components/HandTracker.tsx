"use client";

import { useRef, useEffect, useState } from "react";

interface FingerData {
  x: number;
  y: number;
  z: number;
  type: string;
}

interface HandTrackerProps {
  onFingerMove?: (fingers: FingerData[]) => void;
}

export default function HandTracker({ onFingerMove }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let animationId: number;
    let hands: any = null;

    const initializeHandTracking = async () => {
      try {
        // Get camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        // Initialize MediaPipe Hands (simplified version)
        // In a real implementation, you'd use @mediapipe/hands
        setIsLoading(false);

        // Simulate hand tracking for demo purposes
        const simulateHandTracking = () => {
          if (onFingerMove) {
            // Generate some mock finger data
            const mockFingers: FingerData[] = [
              { x: 0.5, y: 0.5, z: 0, type: 'index' },
              { x: 0.6, y: 0.4, z: 0, type: 'middle' }
            ];
            onFingerMove(mockFingers);
          }
          animationId = requestAnimationFrame(simulateHandTracking);
        };

        simulateHandTracking();

      } catch (err) {
        console.error('Hand tracking initialization failed:', err);
        setError('Camera access denied or not available');
        setIsLoading(false);
      }
    };

    initializeHandTracking();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [onFingerMove]);

  if (error) {
    return (
      <div className="w-[640px] h-[480px] bg-red-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-lg font-bold mb-2">Camera Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-[640px] h-[480px] bg-gray-800 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Initializing camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-[640px] h-[480px] object-cover"
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-[640px] h-[480px] pointer-events-none"
        width={640}
        height={480}
      />
    </div>
  );
}