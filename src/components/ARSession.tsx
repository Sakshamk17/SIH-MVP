"use client";

import { useState, useEffect } from "react";

interface ARSessionProps {
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
  children: React.ReactNode;
}

export default function ARSession({ onSessionStart, onSessionEnd, children }: ARSessionProps) {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported);
      }).catch((err) => {
        console.error('Error checking AR support:', err);
        setError('AR support check failed');
      });
    } else {
      setError('WebXR not supported in this browser');
    }
  }, []);

  const startARSession = async () => {
    try {
      if (!navigator.xr) {
        throw new Error('WebXR not available');
      }

      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local'],
        optionalFeatures: ['dom-overlay', 'hit-test', 'anchors']
      });

      setIsARActive(true);
      onSessionStart?.();

      session.addEventListener('end', () => {
        setIsARActive(false);
        onSessionEnd?.();
      });

    } catch (err) {
      console.error('Failed to start AR session:', err);
      setError('Failed to start AR session');
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-900 bg-opacity-20 rounded-lg border border-red-500">
        <h3 className="text-xl font-bold text-red-400 mb-4">AR Not Available</h3>
        <p className="text-red-300 text-center mb-4">{error}</p>
        <p className="text-sm text-gray-400 text-center">
          Please use a WebXR compatible browser on a device with AR support.
        </p>
      </div>
    );
  }

  if (!isARSupported) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-500">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">AR Not Supported</h3>
        <p className="text-yellow-300 text-center mb-4">
          Your device or browser doesn't support WebXR AR sessions.
        </p>
        <p className="text-sm text-gray-400 text-center">
          Try using Chrome on Android or Safari on iOS with AR support.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isARActive && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={startARSession}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <span>🥽</span>
            Enter AR
          </button>
        </div>
      )}
      
      {isARActive && (
        <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            AR Active
          </span>
        </div>
      )}
      
      {children}
    </div>
  );
}