"use client";

import { useState } from "react";
import Laptop from "../../components/ARLaptop/Laptop";
import HandTracker from "../../components/HandTracker";
import ARSession from "../../components/ARSession";

interface FingerData {
  x: number;
  y: number;
  z: number;
  type: string;
}

export default function ARPage() {
  const [fingers, setFingers] = useState<FingerData[]>([]);
  const [typedText, setTypedText] = useState("");
  const [isARActive, setIsARActive] = useState(false);

  const handleTextInput = (text: string) => {
    setTypedText(prev => prev + text);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">
          AR Virtual Laptop Experience
        </h1>

        <ARSession 
          onSessionStart={() => setIsARActive(true)}
          onSessionEnd={() => setIsARActive(false)}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Hand Tracking Section */}
            <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400 pb-2 w-full text-center">
                Hand Tracking Feed
              </h2>
              <div className="border-4 border-green-400 rounded-lg overflow-hidden">
                <HandTracker onFingerMove={setFingers} />
              </div>
              
              <div className="mt-4 p-3 bg-gray-900 rounded-lg w-full max-w-md">
                <p className="text-center text-sm text-gray-400">
                  Fingers tracked: <span className="text-green-300 font-bold">{fingers.length}</span>
                </p>
                <div className="mt-2 flex justify-center gap-2">
                  {['thumb', 'index', 'middle', 'ring', 'pinky'].map(type => (
                    <div
                      key={type}
                      className={`w-3 h-3 rounded-full ${
                        fingers.some(f => f.type === type) ? 'bg-green-400' : 'bg-gray-600'
                      }`}
                      title={type}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* AR Laptop Section */}
            <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-blue-400 pb-2 w-full text-center">
                {isARActive ? "AR Laptop View" : "3D Laptop Preview"}
              </h2>
              
              <div className="w-full aspect-video border-4 border-blue-500 rounded-xl overflow-hidden">
                <Laptop
                  typedText={typedText}
                  onKeyPress={handleTextInput}
                  enableXR={isARActive}
                  fingers={fingers}
                />
              </div>
              
              <div className="mt-4 p-3 bg-blue-900 bg-opacity-50 rounded-lg w-full text-center">
                <p className="text-blue-200 text-sm">
                  {isARActive 
                    ? "🥽 AR mode active - Look around to see the virtual laptop in your space"
                    : "Click 'Enter AR' to place the laptop in your real environment"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Typed Text Display */}
          <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Typed Output:</h3>
            <div className="bg-gray-900 p-5 rounded-lg min-h-24 border border-gray-700 relative">
              <pre className="text-green-300 font-mono whitespace-pre-wrap break-words text-lg">
                {typedText || "Start typing on the AR keyboard..."}
              </pre>
              <div className="absolute bottom-2 right-3 text-sm text-gray-400">
                {typedText.length} chars
              </div>
            </div>
          </div>

          {/* AR Instructions */}
          <div className="mt-8 bg-purple-900 bg-opacity-30 p-6 rounded-xl border-2 border-purple-600">
            <h3 className="text-2xl font-bold mb-4 text-purple-300 text-center">
              AR Experience Guide
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-green-400 mb-3">Getting Started:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  <li>Ensure you're using a WebXR compatible browser (Chrome on Android, Safari on iOS)</li>
                  <li>Grant camera permissions for both hand tracking and AR</li>
                  <li>Click "Enter AR" to start the AR session</li>
                  <li>Point your device camera at a flat surface</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg text-blue-400 mb-3">AR Interaction:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  <li>The virtual laptop will appear anchored in your space</li>
                  <li>Use hand gestures to interact with the 3D keyboard</li>
                  <li>Walk around to view the laptop from different angles</li>
                  <li>Text appears on both the laptop screen and the output panel</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-900 bg-opacity-40 rounded-lg">
              <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Requirements:</h4>
              <p className="text-gray-200 text-sm">
                This AR experience requires a device with ARCore (Android) or ARKit (iOS) support, 
                and a WebXR compatible browser. Desktop browsers will show a 3D preview instead.
              </p>
            </div>
          </div>
        </ARSession>
      </div>
    </div>
  );
}