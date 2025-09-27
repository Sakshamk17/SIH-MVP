// // // // // // import Laptop from "../components/ARLaptop/Laptop";

// // // // // // export default function Page() {
// // // // // //   return (
// // // // // //     <div className="w-screen h-screen">
// // // // // //       <Laptop />
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import HandTracker from "../components/HandTracker";

// // // // // export default function Home() {
// // // // //   return (
// // // // //     <main className="flex flex-col items-center justify-center h-screen">
// // // // //       <h1 className="text-xl font-bold">Hand Tracking Test</h1>
// // // // //       <HandTracker />
// // // // //     </main>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { Canvas } from "@react-three/fiber";
// // // // import { OrbitControls } from "@react-three/drei";
// // // // import { useState } from "react";
// // // // import HandTracker from "../components/HandTracker";
// // // // import VirtualKeyboard from "../components/ARLaptop/Keyboard";

// // // // export default function Home() {
// // // //   const [fingers, setFingers] = useState<
// // // //     { x: number; y: number; z: number }[]
// // // //   >([]);
// // // //   const [typedText, setTypedText] = useState("");

// // // //   return (
// // // //     <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
// // // //       <h1 className="text-xl font-bold mb-4">AR Hand Tracking Keyboard</h1>

// // // //       {/* Hand tracker overlay */}
// // // //       <div className="relative w-[640px] h-[480px] border-2 border-green-400 rounded-lg overflow-hidden">
// // // //         <HandTracker onFingerMove={(f) => setFingers(f)} />
// // // //       </div>

// // // //       {/* 3D Scene */}
// // // //       <div className="w-full h-[500px] mt-6">
// // // //         <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
// // // //           <ambientLight intensity={0.6} />
// // // //           <directionalLight position={[5, 5, 5]} />
// // // //           <OrbitControls />

// // // //           {/* Virtual Keyboard with finger input */}
// // // //           <VirtualKeyboard
// // // //             position={[0, -1, 0]}
// // // //             fingers={fingers}
// // // //             onTextInput={(text) => setTypedText(text)}
// // // //           />
// // // //         </Canvas>
// // // //       </div>

// // // //       {/* Typed text preview */}
// // // //       <div className="mt-4 p-3 w-[640px] bg-gray-800 rounded-lg text-green-400 text-lg">
// // // //         <span className="font-mono whitespace-pre-wrap">{typedText}</span>
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }

// // // "use client";

// // // import { Canvas } from "@react-three/fiber";
// // // import { OrbitControls } from "@react-three/drei";
// // // import { useState } from "react";
// // // import HandTracker from "../components/HandTracker";
// // // import VirtualKeyboard from "../components/ARLaptop/Keyboard";

// // // export default function Home() {
// // //   const [fingers, setFingers] = useState<
// // //     { x: number; y: number; z: number }[]
// // //   >([]);
// // //   const [typedText, setTypedText] = useState("");

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white">
// // //       <div className="container mx-auto px-4 py-8">
// // //         <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
// // //           AR Hand Tracking Virtual Keyboard
// // //         </h1>
        
// // //         <div className="grid lg:grid-cols-2 gap-8 items-start">
// // //           {/* Hand Tracking Camera */}
// // //           <div className="flex flex-col items-center">
// // //             <h2 className="text-xl font-semibold mb-4 text-green-400">Camera Feed</h2>
// // //             <div className="border-4 border-green-400 rounded-lg overflow-hidden">
// // //               <HandTracker onFingerMove={setFingers} />
// // //             </div>
// // //             <p className="mt-2 text-sm text-gray-400 text-center">
// // //               Point your index finger at the virtual keyboard to type
// // //             </p>
// // //           </div>

// // //           {/* 3D Virtual Keyboard */}
// // //           <div className="flex flex-col items-center">
// // //             <h2 className="text-xl font-semibold mb-4 text-blue-400">Virtual Keyboard</h2>
// // //             <div className="w-full h-96 border-2 border-blue-400 rounded-lg overflow-hidden">
// // //               <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
// // //                 <ambientLight intensity={0.4} />
// // //                 <directionalLight position={[5, 5, 5]} intensity={0.8} />
// // //                 <OrbitControls 
// // //                   makeDefault 
// // //                   enablePan={false}
// // //                   maxPolarAngle={Math.PI / 2}
// // //                   minDistance={3}
// // //                   maxDistance={10}
// // //                 />
                
// // //                 <VirtualKeyboard
// // //                   position={[0, -1, 0]}
// // //                   fingers={fingers}
// // //                   onTextInput={setTypedText}
// // //                 />
// // //               </Canvas>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Typed Text Display */}
// // //         <div className="mt-8">
// // //           <h3 className="text-lg font-semibold mb-4 text-yellow-400">Typed Text:</h3>
// // //           <div className="bg-gray-800 p-4 rounded-lg min-h-20 border border-gray-600">
// // //             <pre className="text-green-400 font-mono whitespace-pre-wrap break-words">
// // //               {typedText || "Start typing by pointing at the keyboard..."}
// // //             </pre>
// // //           </div>
// // //         </div>

// // //         {/* Instructions */}
// // //         <div className="mt-8 bg-blue-900 bg-opacity-30 p-6 rounded-lg border border-blue-600">
// // //           <h3 className="text-lg font-semibold mb-4 text-blue-300">Instructions:</h3>
// // //           <ul className="list-disc list-inside space-y-2 text-gray-300">
// // //             <li>Allow camera access when prompted</li>
// // //             <li>Hold your hand in front of the camera with your index finger extended</li>
// // //             <li>Point your finger at keys in the 3D keyboard - they will highlight in yellow</li>
// // //             <li>Make a quick forward motion (tap gesture) to press a key</li>
// // //             <li>Use the mouse to rotate the 3D view if needed</li>
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls } from "@react-three/drei";
// // import { useState } from "react";
// // import HandTracker from "../components/HandTracker";
// // import VirtualKeyboard from "../components/ARLaptop/Keyboard";

// // export default function Home() {
// //   const [fingers, setFingers] = useState<
// //     { x: number; y: number; z: number; type: string }[]
// //   >([]);
// //   const [typedText, setTypedText] = useState("");

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white">
// //       <div className="container mx-auto px-4 py-8">
// //         <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
// //           Enhanced AR Hand Tracking Virtual Keyboard
// //         </h1>
        
// //         <div className="grid lg:grid-cols-2 gap-8 items-start">
// //           {/* Enhanced Hand Tracking Camera */}
// //           <div className="flex flex-col items-center">
// //             <h2 className="text-xl font-semibold mb-4 text-green-400">Multi-Finger Camera Feed</h2>
// //             <div className="border-4 border-green-400 rounded-lg overflow-hidden">
// //               <HandTracker onFingerMove={setFingers} />
// //             </div>
// //             <div className="mt-3 p-3 bg-gray-800 rounded-lg text-sm max-w-md">
// //               <h3 className="text-yellow-400 font-semibold mb-2">Active Fingers:</h3>
// //               <div className="grid grid-cols-5 gap-2 text-xs">
// //                 {['thumb', 'index', 'middle', 'ring', 'pinky'].map(fingerType => {
// //                   const isActive = fingers.some(f => f.type === fingerType);
// //                   return (
// //                     <div 
// //                       key={fingerType}
// //                       className={`p-1 rounded text-center ${
// //                         isActive ? 'bg-green-600' : 'bg-gray-600'
// //                       }`}
// //                     >
// //                       {fingerType}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //               <p className="mt-2 text-gray-400 text-xs">
// //                 Fingers detected: {fingers.length} | Enhanced range for extreme keys
// //               </p>
// //             </div>
// //           </div>

// //           {/* Enhanced 3D Virtual Keyboard */}
// //           <div className="flex flex-col items-center">
// //             <h2 className="text-xl font-semibold mb-4 text-blue-400">Multi-Finger Virtual Keyboard</h2>
// //             <div className="w-full h-96 border-2 border-blue-400 rounded-lg overflow-hidden">
// //               <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
// //                 <ambientLight intensity={0.4} />
// //                 <directionalLight position={[5, 5, 5]} intensity={0.8} />
// //                 <spotLight position={[0, 10, 0]} intensity={0.3} />
// //                 <OrbitControls 
// //                   makeDefault 
// //                   enablePan={false}
// //                   maxPolarAngle={Math.PI / 2}
// //                   minDistance={4}
// //                   maxDistance={12}
// //                 />
                
// //                 <VirtualKeyboard
// //                   position={[0, -1, 0]}
// //                   fingers={fingers}
// //                   onTextInput={setTypedText}
// //                 />
// //               </Canvas>
// //             </div>
// //             <div className="mt-3 p-2 bg-blue-900 bg-opacity-50 rounded text-sm text-center">
// //               <p className="text-blue-300">
// //                 Color-coded finger tracking | Enhanced Backspace & extreme key support
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Enhanced Typed Text Display */}
// //         <div className="mt-8">
// //           <h3 className="text-lg font-semibold mb-4 text-yellow-400">Typed Text Output:</h3>
// //           <div className="bg-gray-800 p-4 rounded-lg min-h-24 border border-gray-600 relative">
// //             <pre className="text-green-400 font-mono whitespace-pre-wrap break-words">
// //               {typedText || "Start typing with any finger on the virtual keyboard..."}
// //             </pre>
// //             <div className="absolute bottom-2 right-2 text-xs text-gray-400">
// //               Characters: {typedText.length}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Enhanced Instructions */}
// //         <div className="mt-8 bg-blue-900 bg-opacity-30 p-6 rounded-lg border border-blue-600">
// //           <h3 className="text-lg font-semibold mb-4 text-blue-300">Enhanced Multi-Finger Instructions:</h3>
// //           <div className="grid md:grid-cols-2 gap-6">
// //             <div>
// //               <h4 className="font-semibold text-green-400 mb-2">Setup:</h4>
// //               <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
// //                 <li>Allow camera access when prompted</li>
// //                 <li>Position your hand(s) clearly in front of the camera</li>
// //                 <li>Ensure good lighting for optimal tracking</li>
// //                 <li>Both hands are supported simultaneously</li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-semibold text-yellow-400 mb-2">Enhanced Features:</h4>
// //               <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
// //                 <li>All 5 fingertips tracked per hand (10 total)</li>
// //                 <li>Color-coded finger identification</li>
// //                 <li>Extended range for extreme keys (Backspace, etc.)</li>
// //                 <li>Improved tap detection sensitivity</li>
// //               </ul>
// //             </div>
// //           </div>
// //           <div className="mt-4 p-3 bg-purple-900 bg-opacity-40 rounded">
// //             <h4 className="font-semibold text-purple-300 mb-2">Typing Tips:</h4>
// //             <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
// //               <li>Use any finger to point at keys - they'll highlight in the finger's color</li>
// //               <li>Make a quick forward motion (tap) to press keys</li>
// //               <li>Extreme keys like Backspace have expanded hit areas</li>
// //               <li>Multiple fingers can be used simultaneously</li>
// //               <li>Mouse fallback available if hand tracking fails</li>
// //             </ul>
// //           </div>
// //         </div>

// //         {/* Performance Stats */}
// //         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
// //           <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
// //             <div className="text-2xl font-bold text-blue-400">{fingers.length}</div>
// //             <div className="text-sm text-gray-400">Active Fingertips</div>
// //           </div>
// //           <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
// //             <div className="text-2xl font-bold text-green-400">{typedText.length}</div>
// //             <div className="text-sm text-gray-400">Characters Typed</div>
// //           </div>
// //           <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
// //             <div className="text-2xl font-bold text-yellow-400">
// //               {Math.max(...Object.keys(['thumb', 'index', 'middle', 'ring', 'pinky']).map(fingerType => 
// //                 fingers.filter(f => f.type === fingerType).length
// //               ), 0)}
// //             </div>
// //             <div className="text-sm text-gray-400">Max Fingers/Type</div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useState } from "react";
// // Assuming these components are correctly implemented in their respective paths
// import HandTracker from "../components/HandTracker"; // Component for video feed and hand tracking
// import VirtualKeyboard from "../components/ARLaptop/Keyboard"; // 3D R3F Virtual Keyboard component

// // Define the shape of the finger data for better type safety
// interface FingerData {
//   x: number;
//   y: number;
//   z: number;
//   type: 'thumb' | 'index' | 'middle' | 'ring' | 'pinky'; // Finger type
//   hand: 'left' | 'right'; // Which hand it belongs to (if multi-hand supported)
//   // Add more properties if your HandTracker provides them (e.g., isTapping)
// }

// export default function Home() {
//   // State to hold the tracked finger data (array of FingerData objects)
//   const [fingers, setFingers] = useState<FingerData[]>([]);
//   // State to hold the text typed by interacting with the virtual keyboard
//   const [typedText, setTypedText] = useState("");

//   // Array of all possible finger types for mapping/display
//   const fingerTypes = ['thumb', 'index', 'middle', 'ring', 'pinky'];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-400 tracking-wider">
//           Enhanced AR Hand Tracking Virtual Keyboard 🚀
//         </h1>
        
//         <div className="grid lg:grid-cols-2 gap-10 items-start">
          
//           {/* Section 1: Enhanced Hand Tracking Camera Feed & Stats */}
//           <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
//             <h2 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400 pb-2 w-full text-center">
//               Multi-Finger Camera Feed
//             </h2>
//             <div className="border-4 border-green-400 rounded-lg overflow-hidden">
//               {/* HandTracker component is assumed to handle the video feed and detection */}
//               <HandTracker onFingerMove={setFingers} />
//             </div>
            
//             {/* Active Finger Status Panel */}
//             <div className="mt-6 p-4 bg-gray-900 rounded-xl w-full max-w-md border border-gray-700">
//               <h3 className="text-lg font-semibold mb-3 text-yellow-400">Active Fingers Status:</h3>
//               <div className="grid grid-cols-5 gap-3 text-sm">
//                 {fingerTypes.map(fingerType => {
//                   // Check if this finger type is currently being tracked
//                   const isActive = fingers.some(f => f.type === fingerType);
//                   const fingerCount = fingers.filter(f => f.type === fingerType).length; // Should be 0, 1, or 2 (for two hands)

//                   return (
//                     <div 
//                       key={fingerType}
//                       className={`p-2 rounded text-center font-medium capitalize transition-colors duration-300 shadow-md ${
//                         isActive 
//                           ? 'bg-green-700 text-white ring-2 ring-green-400' 
//                           : 'bg-gray-700 text-gray-400'
//                       }`}
//                       title={`${fingerCount} ${fingerType}(s) detected`}
//                     >
//                       {fingerType}
//                       {fingerCount > 0 && <span className="ml-1 text-xs opacity-75">({fingerCount})</span>}
//                     </div>
//                   );
//                 })}
//               </div>
//               <p className="mt-4 text-gray-400 text-xs italic text-center">
//                 Total Fingers Tracked: <span className="font-bold text-green-300">{fingers.length}</span> | Includes enhanced dual-hand support
//               </p>
//             </div>
//           </div>

//           {/* Section 2: Enhanced 3D Virtual Keyboard */}
//           <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
//             <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-blue-400 pb-2 w-full text-center">
//               3D Multi-Finger Virtual Keyboard
//             </h2>
//             <div className="w-full aspect-video border-4 border-blue-500 rounded-xl overflow-hidden shadow-inner">
//               <Canvas 
//                 camera={{ position: [0, 2, 7], fov: 50 }} 
//                 className="bg-gray-900"
//               >
//                 {/* Lighting */}
//                 <ambientLight intensity={0.4} />
//                 <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
//                 <spotLight position={[0, 10, 0]} intensity={0.3} penumbra={1} castShadow />
                
//                 {/* Camera Controls */}
//                 <OrbitControls 
//                   makeDefault 
//                   enablePan={false}
//                   maxPolarAngle={Math.PI / 2} // Limit to above the 'floor'
//                   minDistance={4}
//                   maxDistance={12}
//                   // Optionally add damping for smoother controls
//                   enableDamping={true}
//                   dampingFactor={0.05}
//                 />
                
//                 {/* The Virtual Keyboard component */}
//                 <VirtualKeyboard
//                   position={[0, -1, 0]} // Center the keyboard lower in the frame
//                   fingers={fingers} // Pass the tracked finger data
//                   onTextInput={setTypedText} // Callback for key presses
//                 />
                
//                 {/* Optional: Add a subtle floor plane */}
//                 {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
//                   <planeGeometry args={[10, 10]} />
//                   <meshStandardMaterial color="#222" metalness={0.2} roughness={0.8} />
//                 </mesh> */}
//               </Canvas>
//             </div>
            
//             <div className="mt-6 p-3 bg-blue-900 bg-opacity-50 rounded-lg w-full text-center text-sm border border-blue-700">
//               <p className="text-blue-200 font-medium">
//                 <span className="text-yellow-300 font-bold">3D Interaction:</span> Keys highlight on proximity and register taps. Supports multi-finger input.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* --- */}

//         {/* Section 3: Enhanced Typed Text Display */}
//         <div className="mt-12 p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-yellow-400">
//           <h3 className="text-2xl font-bold mb-4 text-yellow-400">Typed Text Output:</h3>
//           <div className="bg-gray-900 p-5 rounded-lg min-h-32 border border-gray-700 relative shadow-inner">
//             <pre className="text-green-300 font-mono whitespace-pre-wrap break-words text-lg leading-relaxed">
//               {typedText || "Start typing with any finger on the virtual keyboard..."}
//             </pre>
//             <div className="absolute bottom-3 right-4 text-sm text-gray-400 font-semibold">
//               Characters: <span className="text-white">{typedText.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- */}

//         {/* Section 4: Enhanced Instructions & Tips */}
//         <div className="mt-12 bg-blue-900 bg-opacity-30 p-6 rounded-xl border-2 border-blue-600 shadow-2xl">
//           <h3 className="text-2xl font-bold mb-6 text-blue-300 text-center">
//             Enhanced Multi-Finger Usage Guide 📘
//           </h3>
//           <div className="grid md:grid-cols-2 gap-8">
            
//             {/* Setup Instructions */}
//             <div>
//               <h4 className="font-semibold text-xl text-green-400 mb-3 border-b border-green-500 pb-1">Setup Essentials:</h4>
//               <ul className="list-disc list-inside space-y-2 text-gray-200 text-base">
//                 <li><span className="font-bold">Camera Access:</span> Grant permission when prompted for the Hand Tracker.</li>
//                 <li><span className="font-bold">Positioning:</span> Keep your hands clearly within the camera frame for optimal tracking.</li>
//                 <li><span className="font-bold">Lighting:</span> Ensure bright, non-glare lighting.</li>
//                 <li><span className="font-bold">Dual Hand Support:</span> The system is designed to track up to two hands simultaneously for faster typing.</li>
//               </ul>
//             </div>
            
//             {/* Typing Tips */}
//             <div>
//               <h4 className="font-semibold text-xl text-yellow-400 mb-3 border-b border-yellow-500 pb-1">Advanced Typing Tips:</h4>
//               <ul className="list-disc list-inside space-y-2 text-gray-200 text-base">
//                 <li><span className="font-bold">Pointing:</span> Use any of the 10 fingertips to point at a key; the key will pre-highlight.</li>
//                 <li><span className="font-bold">Tapping:</span> A quick, deliberate forward movement (simulated tap) registers the key press.</li>
//                 <li><span className="font-bold">Extreme Keys:</span> Keys like <code className="bg-gray-700 px-1 rounded">Backspace</code> have an expanded 3D hit area for easier access.</li>
//                 <li><span className="font-bold">Simultaneous Input:</span> Try using fingers from both hands at the same time for chording or faster input.</li>
//                 <li><span className="font-bold">Mouse Fallback:</span> You can still use your mouse to click the 3D keys if tracking is difficult.</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* --- */}

//         {/* Section 5: Performance Stats */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
//           <div className="bg-gray-800 p-5 rounded-xl border border-blue-500 shadow-xl">
//             <div className="text-4xl font-extrabold text-blue-400">{fingers.length}</div>
//             <div className="text-sm text-gray-300 mt-1">Active Fingertips Tracked</div>
//           </div>
          
//           <div className="bg-gray-800 p-5 rounded-xl border border-green-500 shadow-xl">
//             <div className="text-4xl font-extrabold text-green-400">{typedText.length}</div>
//             <div className="text-sm text-gray-300 mt-1">Total Characters Typed</div>
//           </div>
          
//           <div className="bg-gray-800 p-5 rounded-xl border border-yellow-500 shadow-xl">
//             <div className="text-4xl font-extrabold text-yellow-400">
//               {/* Calculate the max count for any single finger type, which is max 2 (one per hand) */}
//               {Math.max(0, ...fingerTypes.map(fingerType => 
//                 fingers.filter(f => f.type === fingerType).length
//               ))}
//             </div>
//             <div className="text-sm text-gray-300 mt-1">Max Simultaneous Finger Type</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
// Assuming these components are correctly implemented in their respective paths
import HandTracker from "../components/HandTracker"; // Component for video feed and hand tracking
import VirtualKeyboard from "../components/ARLaptop/Keyboard"; // 3D R3F Virtual Keyboard component

// Define the shape of the finger data to match what VirtualKeyboard expects
interface FingerData {
  x: number;
  y: number;
  z: number;
  type: string; // Keep it generic to match VirtualKeyboard interface
}

export default function Home() {
  // State to hold the tracked finger data (array of FingerData objects)
  const [fingers, setFingers] = useState<FingerData[]>([]);
  // State to hold the text typed by interacting with the virtual keyboard
  const [typedText, setTypedText] = useState("");

  // Array of all possible finger types for mapping/display
  const fingerTypes = ['thumb', 'index', 'middle', 'ring', 'pinky'];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-400 tracking-wider">
          Enhanced AR Hand Tracking Virtual Keyboard
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Section 1: Enhanced Hand Tracking Camera Feed & Stats */}
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400 pb-2 w-full text-center">
              Multi-Finger Camera Feed
            </h2>
            <div className="border-4 border-green-400 rounded-lg overflow-hidden">
              {/* HandTracker component is assumed to handle the video feed and detection */}
              <HandTracker onFingerMove={setFingers} />
            </div>
            
            {/* Active Finger Status Panel */}
            <div className="mt-6 p-4 bg-gray-900 rounded-xl w-full max-w-md border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Active Fingers Status:</h3>
              <div className="grid grid-cols-5 gap-3 text-sm">
                {fingerTypes.map(fingerType => {
                  // Check if this finger type is currently being tracked
                  const isActive = fingers.some(f => f.type === fingerType);
                  const fingerCount = fingers.filter(f => f.type === fingerType).length;

                  return (
                    <div 
                      key={fingerType}
                      className={`p-2 rounded text-center font-medium capitalize transition-colors duration-300 shadow-md ${
                        isActive 
                          ? 'bg-green-700 text-white ring-2 ring-green-400' 
                          : 'bg-gray-700 text-gray-400'
                      }`}
                      title={`${fingerCount} ${fingerType}(s) detected`}
                    >
                      {fingerType}
                      {fingerCount > 0 && <span className="ml-1 text-xs opacity-75">({fingerCount})</span>}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-gray-400 text-xs italic text-center">
                Total Fingers Tracked: <span className="font-bold text-green-300">{fingers.length}</span> | Includes enhanced dual-hand support
              </p>
            </div>
          </div>

          {/* Section 2: Enhanced 3D Virtual Keyboard */}
          <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-400 border-b border-blue-400 pb-2 w-full text-center">
              3D Multi-Finger Virtual Keyboard
            </h2>
            <div className="w-full aspect-video border-4 border-blue-500 rounded-xl overflow-hidden shadow-inner">
              <Canvas 
                camera={{ position: [0, 2, 7], fov: 50 }} 
                className="bg-gray-900"
              >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <spotLight position={[0, 10, 0]} intensity={0.3} penumbra={1} castShadow />
                
                {/* Camera Controls */}
                <OrbitControls 
                  makeDefault 
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2} // Limit to above the 'floor'
                  minDistance={4}
                  maxDistance={12}
                  // Optionally add damping for smoother controls
                  enableDamping={true}
                  dampingFactor={0.05}
                />
                
                {/* The Virtual Keyboard component */}
                <VirtualKeyboard
                  position={[0, -1, 0]} // Center the keyboard lower in the frame
                  fingers={fingers} // Pass the tracked finger data
                  onTextInput={setTypedText} // Callback for key presses
                />
              </Canvas>
            </div>
            
            <div className="mt-6 p-3 bg-blue-900 bg-opacity-50 rounded-lg w-full text-center text-sm border border-blue-700">
              <p className="text-blue-200 font-medium">
                <span className="text-yellow-300 font-bold">3D Interaction:</span> Keys highlight on proximity and register taps. Supports multi-finger input.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Enhanced Typed Text Display */}
        <div className="mt-12 p-6 bg-gray-800 rounded-xl shadow-2xl border-l-4 border-yellow-400">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Typed Text Output:</h3>
          <div className="bg-gray-900 p-5 rounded-lg min-h-32 border border-gray-700 relative shadow-inner">
            <pre className="text-green-300 font-mono whitespace-pre-wrap break-words text-lg leading-relaxed">
              {typedText || "Start typing with any finger on the virtual keyboard..."}
            </pre>
            <div className="absolute bottom-3 right-4 text-sm text-gray-400 font-semibold">
              Characters: <span className="text-white">{typedText.length}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Enhanced Instructions & Tips */}
        <div className="mt-12 bg-blue-900 bg-opacity-30 p-6 rounded-xl border-2 border-blue-600 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-blue-300 text-center">
            Enhanced Multi-Finger Usage Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Setup Instructions */}
            <div>
              <h4 className="font-semibold text-xl text-green-400 mb-3 border-b border-green-500 pb-1">Setup Essentials:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-200 text-base">
                <li><span className="font-bold">Camera Access:</span> Grant permission when prompted for the Hand Tracker.</li>
                <li><span className="font-bold">Positioning:</span> Keep your hands clearly within the camera frame for optimal tracking.</li>
                <li><span className="font-bold">Lighting:</span> Ensure bright, non-glare lighting.</li>
                <li><span className="font-bold">Dual Hand Support:</span> The system is designed to track up to two hands simultaneously for faster typing.</li>
              </ul>
            </div>
            
            {/* Typing Tips */}
            <div>
              <h4 className="font-semibold text-xl text-yellow-400 mb-3 border-b border-yellow-500 pb-1">Advanced Typing Tips:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-200 text-base">
                <li><span className="font-bold">Pointing:</span> Use any of the 10 fingertips to point at a key; the key will pre-highlight.</li>
                <li><span className="font-bold">Tapping:</span> A quick, deliberate forward movement (simulated tap) registers the key press.</li>
                <li><span className="font-bold">Extreme Keys:</span> Keys like <code className="bg-gray-700 px-1 rounded">Backspace</code> have an expanded 3D hit area for easier access.</li>
                <li><span className="font-bold">Simultaneous Input:</span> Try using fingers from both hands at the same time for chording or faster input.</li>
                <li><span className="font-bold">Mouse Fallback:</span> You can still use your mouse to click the 3D keys if tracking is difficult.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Performance Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-gray-800 p-5 rounded-xl border border-blue-500 shadow-xl">
            <div className="text-4xl font-extrabold text-blue-400">{fingers.length}</div>
            <div className="text-sm text-gray-300 mt-1">Active Fingertips Tracked</div>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-xl border border-green-500 shadow-xl">
            <div className="text-4xl font-extrabold text-green-400">{typedText.length}</div>
            <div className="text-sm text-gray-300 mt-1">Total Characters Typed</div>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-xl border border-yellow-500 shadow-xl">
            <div className="text-4xl font-extrabold text-yellow-400">
              {/* Calculate the max count for any single finger type */}
              {fingerTypes.length > 0 ? Math.max(0, ...fingerTypes.map(fingerType => 
                fingers.filter(f => f.type === fingerType).length
              )) : 0}
            </div>
            <div className="text-sm text-gray-300 mt-1">Max Simultaneous Finger Type</div>
          </div>
        </div>
      </div>
    </div>
  );
}