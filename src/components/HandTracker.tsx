// // // // // // // // // "use client";

// // // // // // // // // import { useEffect, useRef } from "react";

// // // // // // // // // // Declare global types for MediaPipe
// // // // // // // // // declare global {
// // // // // // // // //   interface Window {
// // // // // // // // //     Hands: any;
// // // // // // // // //     Camera: any;
// // // // // // // // //     drawConnectors: any;
// // // // // // // // //     drawLandmarks: any;
// // // // // // // // //     HAND_CONNECTIONS: any;
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // export default function HandTracker() {
// // // // // // // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // // // // // // //   const canvasRef = useRef<HTMLCanvasElement>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     async function loadMediaPipeScripts() {
// // // // // // // // //       // Load MediaPipe scripts dynamically
// // // // // // // // //       const scripts = [
// // // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
// // // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
// // // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
// // // // // // // // //       ];

// // // // // // // // //       for (const src of scripts) {
// // // // // // // // //         if (!document.querySelector(`script[src="${src}"]`)) {
// // // // // // // // //           await new Promise((resolve, reject) => {
// // // // // // // // //             const script = document.createElement("script");
// // // // // // // // //             script.src = src;
// // // // // // // // //             script.onload = resolve;
// // // // // // // // //             script.onerror = reject;
// // // // // // // // //             document.head.appendChild(script);
// // // // // // // // //           });
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     async function init() {
// // // // // // // // //       try {
// // // // // // // // //         console.log("Loading MediaPipe scripts...");
// // // // // // // // //         await loadMediaPipeScripts();

// // // // // // // // //         // Wait a bit for scripts to be fully loaded
// // // // // // // // //         await new Promise(resolve => setTimeout(resolve, 500));

// // // // // // // // //         // Verify all required objects are available
// // // // // // // // //         console.log("Checking MediaPipe objects:");
// // // // // // // // //         console.log("window.Hands:", typeof window.Hands);
// // // // // // // // //         console.log("window.Camera:", typeof window.Camera);
// // // // // // // // //         console.log("window.drawConnectors:", typeof window.drawConnectors);
// // // // // // // // //         console.log("window.drawLandmarks:", typeof window.drawLandmarks);
// // // // // // // // //         console.log("window.HAND_CONNECTIONS:", typeof window.HAND_CONNECTIONS);

// // // // // // // // //         if (!window.Hands) {
// // // // // // // // //           throw new Error("MediaPipe Hands not loaded");
// // // // // // // // //         }

// // // // // // // // //         console.log("Initializing hands model...");
// // // // // // // // //         const hands = new window.Hands({
// // // // // // // // //           locateFile: (file: string) => {
// // // // // // // // //             const url = `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
// // // // // // // // //             console.log("Loading file:", url);
// // // // // // // // //             return url;
// // // // // // // // //           },
// // // // // // // // //         });

// // // // // // // // //         hands.setOptions({
// // // // // // // // //           maxNumHands: 2,
// // // // // // // // //           modelComplexity: 1,
// // // // // // // // //           minDetectionConfidence: 0.3, // Lower for better detection
// // // // // // // // //           minTrackingConfidence: 0.3,  // Lower for better detection
// // // // // // // // //           staticImageMode: false, // Try true if still having issues
// // // // // // // // //         });
        
// // // // // // // // //         console.log("Hands options set successfully");

// // // // // // // // //         hands.onResults((results: any) => {
// // // // // // // // //           console.log("Results received:", results); // Debug log
          
// // // // // // // // //           const canvas = canvasRef.current;
// // // // // // // // //           if (!canvas) {
// // // // // // // // //             console.log("Canvas not found");
// // // // // // // // //             return;
// // // // // // // // //           }
          
// // // // // // // // //           const ctx = canvas.getContext("2d")!;
// // // // // // // // //           ctx.save();
// // // // // // // // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // // // // // // //           // Debug: Check if hands are detected
// // // // // // // // //           if (results.multiHandLandmarks) {
// // // // // // // // //             console.log("Hands detected:", results.multiHandLandmarks.length);
            
// // // // // // // // //             if (results.multiHandLandmarks.length > 0) {
// // // // // // // // //               for (let i = 0; i < results.multiHandLandmarks.length; i++) {
// // // // // // // // //                 const landmarks = results.multiHandLandmarks[i];
// // // // // // // // //                 console.log(`Drawing landmarks for hand ${i + 1}`);
                
// // // // // // // // //                 // Use different colors for different hands
// // // // // // // // //                 const handColor = i === 0 ? "#00FF00" : "#FF00FF"; // Green for first, Magenta for second
// // // // // // // // //                 const dotColor = i === 0 ? "#FF0000" : "#00FFFF";  // Red for first, Cyan for second
                
// // // // // // // // //                 // Check if drawing functions exist
// // // // // // // // //                 if (window.drawConnectors && window.HAND_CONNECTIONS) {
// // // // // // // // //                   window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
// // // // // // // // //                     color: handColor,
// // // // // // // // //                     lineWidth: 2,
// // // // // // // // //                   });
// // // // // // // // //                 } else {
// // // // // // // // //                   console.log("drawConnectors or HAND_CONNECTIONS not available");
// // // // // // // // //                 }
                
// // // // // // // // //                 if (window.drawLandmarks) {
// // // // // // // // //                   window.drawLandmarks(ctx, landmarks, { 
// // // // // // // // //                     color: dotColor, 
// // // // // // // // //                     lineWidth: 1 
// // // // // // // // //                   });
// // // // // // // // //                 } else {
// // // // // // // // //                   console.log("drawLandmarks not available");
// // // // // // // // //                 }
// // // // // // // // //               }

// // // // // // // // //               // Log index fingertip positions for all hands
// // // // // // // // //               results.multiHandLandmarks.forEach((hand: any, index: number) => {
// // // // // // // // //                 if (hand && hand.length > 8) {
// // // // // // // // //                   const indexTip = hand[8];
// // // // // // // // //                   console.log(`Hand ${index + 1} Index Tip:`, indexTip);
// // // // // // // // //                 }
// // // // // // // // //               });
// // // // // // // // //             }
// // // // // // // // //           } else {
// // // // // // // // //             console.log("No hands detected in this frame");
// // // // // // // // //           }
// // // // // // // // //           ctx.restore();
// // // // // // // // //         });

// // // // // // // // //         const videoElement = videoRef.current;
// // // // // // // // //         if (!videoElement) return;

// // // // // // // // //         const camera = new window.Camera(videoElement, {
// // // // // // // // //           onFrame: async () => {
// // // // // // // // //             await hands.send({ image: videoElement });
// // // // // // // // //           },
// // // // // // // // //           width: 640,
// // // // // // // // //           height: 480,
// // // // // // // // //         });
        
// // // // // // // // //         camera.start();
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Failed to initialize hand tracking:", error);
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     init();
// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <video ref={videoRef} style={{ display: "none" }} />
// // // // // // // // //       <canvas ref={canvasRef} width={640} height={480} />
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import { useEffect, useRef } from "react";

// // // // // // // // declare global {
// // // // // // // //   interface Window {
// // // // // // // //     Hands: any;
// // // // // // // //     Camera: any;
// // // // // // // //     drawConnectors: any;
// // // // // // // //     drawLandmarks: any;
// // // // // // // //     HAND_CONNECTIONS: any;
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // interface HandTrackerProps {
// // // // // // // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // // // // // // }

// // // // // // // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // // // // // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // // // // // //   const canvasRef = useRef<HTMLCanvasElement>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     async function loadMediaPipeScripts() {
// // // // // // // //       const scripts = [
// // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
// // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
// // // // // // // //         "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
// // // // // // // //       ];

// // // // // // // //       for (const src of scripts) {
// // // // // // // //         if (!document.querySelector(`script[src="${src}"]`)) {
// // // // // // // //           await new Promise((resolve, reject) => {
// // // // // // // //             const script = document.createElement("script");
// // // // // // // //             script.src = src;
// // // // // // // //             script.onload = resolve;
// // // // // // // //             script.onerror = reject;
// // // // // // // //             document.head.appendChild(script);
// // // // // // // //           });
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     async function init() {
// // // // // // // //       await loadMediaPipeScripts();
// // // // // // // //       await new Promise((resolve) => setTimeout(resolve, 500));

// // // // // // // //       const hands = new window.Hands({
// // // // // // // //         locateFile: (file: string) =>
// // // // // // // //           `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
// // // // // // // //       });

// // // // // // // //       hands.setOptions({
// // // // // // // //         maxNumHands: 2,
// // // // // // // //         modelComplexity: 1,
// // // // // // // //         minDetectionConfidence: 0.3,
// // // // // // // //         minTrackingConfidence: 0.3,
// // // // // // // //       });

// // // // // // // //       hands.onResults((results: any) => {
// // // // // // // //         const canvas = canvasRef.current;
// // // // // // // //         if (!canvas) return;
// // // // // // // //         const ctx = canvas.getContext("2d")!;
// // // // // // // //         ctx.save();
// // // // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // //         ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // // // // // //         if (results.multiHandLandmarks) {
// // // // // // // //           const fingertips: { x: number; y: number; z: number }[] = [];

// // // // // // // //           results.multiHandLandmarks.forEach((hand: any) => {
// // // // // // // //             if (hand[8]) {
// // // // // // // //               // Normalized values (0–1) → convert to canvas coordinates
// // // // // // // //               const x = hand[8].x * canvas.width;
// // // // // // // //               const y = hand[8].y * canvas.height;
// // // // // // // //               const z = hand[8].z; // depth
// // // // // // // //               fingertips.push({ x, y, z });
// // // // // // // //             }

// // // // // // // //             if (window.drawConnectors && window.HAND_CONNECTIONS) {
// // // // // // // //               window.drawConnectors(ctx, hand, window.HAND_CONNECTIONS, {
// // // // // // // //                 color: "#00FF00",
// // // // // // // //                 lineWidth: 2,
// // // // // // // //               });
// // // // // // // //             }
// // // // // // // //             if (window.drawLandmarks) {
// // // // // // // //               window.drawLandmarks(ctx, hand, { color: "#FF0000", lineWidth: 1 });
// // // // // // // //             }
// // // // // // // //           });

// // // // // // // //           // 🔥 Send fingertips to parent (VirtualKeyboard)
// // // // // // // //           if (fingertips.length > 0 && onFingerMove) {
// // // // // // // //             onFingerMove(fingertips);
// // // // // // // //           }
// // // // // // // //         }

// // // // // // // //         ctx.restore();
// // // // // // // //       });

// // // // // // // //       const videoElement = videoRef.current;
// // // // // // // //       if (!videoElement) return;

// // // // // // // //       const camera = new window.Camera(videoElement, {
// // // // // // // //         onFrame: async () => {
// // // // // // // //           await hands.send({ image: videoElement });
// // // // // // // //         },
// // // // // // // //         width: 640,
// // // // // // // //         height: 480,
// // // // // // // //       });

// // // // // // // //       camera.start();
// // // // // // // //     }

// // // // // // // //     init();
// // // // // // // //   }, [onFingerMove]);

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <video ref={videoRef} style={{ display: "none" }} />
// // // // // // // //       <canvas ref={canvasRef} width={640} height={480} />
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import { useEffect, useRef, useState } from "react";

// // // // // // // interface HandTrackerProps {
// // // // // // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // // // // // }

// // // // // // // // Simple hand tracking fallback using browser-based detection
// // // // // // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // // // // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // // // // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // //   const [error, setError] = useState<string | null>(null);
// // // // // // //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse' | 'touch'>('mouse');
// // // // // // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // // // // // //   // Fallback to mouse/touch tracking if MediaPipe fails
// // // // // // //   const initializeMouseTracking = () => {
// // // // // // //     const canvas = canvasRef.current;
// // // // // // //     const video = videoRef.current;
    
// // // // // // //     if (!canvas || !video) return;

// // // // // // //     const handleMouseMove = (e: MouseEvent) => {
// // // // // // //       const rect = canvas.getBoundingClientRect();
// // // // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // // // //       const z = 0;

// // // // // // //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// // // // // // //       if (onFingerMove) {
// // // // // // //         onFingerMove([{ x, y, z }]);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     const handleClick = (e: MouseEvent) => {
// // // // // // //       const rect = canvas.getBoundingClientRect();
// // // // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // // // //       const z = -0.5; // Simulate tap depth

// // // // // // //       if (onFingerMove) {
// // // // // // //         onFingerMove([{ x, y, z }]);
// // // // // // //         // Reset after short delay to simulate tap release
// // // // // // //         setTimeout(() => {
// // // // // // //           onFingerMove([{ x, y, z: 0 }]);
// // // // // // //         }, 100);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     canvas.addEventListener('mousemove', handleMouseMove);
// // // // // // //     canvas.addEventListener('click', handleClick);

// // // // // // //     // Initialize camera for visual feedback
// // // // // // //     navigator.mediaDevices.getUserMedia({
// // // // // // //       video: { width: 640, height: 480, facingMode: 'user' }
// // // // // // //     })
// // // // // // //     .then(stream => {
// // // // // // //       video.srcObject = stream;
// // // // // // //       video.play();
      
// // // // // // //       const drawFrame = () => {
// // // // // // //         const ctx = canvas.getContext('2d');
// // // // // // //         if (!ctx || video.readyState < 2) {
// // // // // // //           requestAnimationFrame(drawFrame);
// // // // // // //           return;
// // // // // // //         }

// // // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // // // // // //         // Draw mouse cursor as finger indicator
// // // // // // //         ctx.beginPath();
// // // // // // //         ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 2 * Math.PI);
// // // // // // //         ctx.fillStyle = '#FFFF00';
// // // // // // //         ctx.fill();
// // // // // // //         ctx.strokeStyle = '#000000';
// // // // // // //         ctx.lineWidth = 2;
// // // // // // //         ctx.stroke();

// // // // // // //         // Draw crosshairs
// // // // // // //         ctx.beginPath();
// // // // // // //         ctx.moveTo(mousePosition.x - 10, mousePosition.y);
// // // // // // //         ctx.lineTo(mousePosition.x + 10, mousePosition.y);
// // // // // // //         ctx.moveTo(mousePosition.x, mousePosition.y - 10);
// // // // // // //         ctx.lineTo(mousePosition.x, mousePosition.y + 10);
// // // // // // //         ctx.strokeStyle = '#FF0000';
// // // // // // //         ctx.lineWidth = 1;
// // // // // // //         ctx.stroke();

// // // // // // //         requestAnimationFrame(drawFrame);
// // // // // // //       };

// // // // // // //       drawFrame();
// // // // // // //       setIsLoading(false);
// // // // // // //     })
// // // // // // //     .catch(err => {
// // // // // // //       setError('Camera access denied. Using mouse tracking only.');
// // // // // // //       setIsLoading(false);
      
// // // // // // //       // Even without camera, we can still track mouse
// // // // // // //       const ctx = canvas.getContext('2d');
// // // // // // //       if (ctx) {
// // // // // // //         ctx.fillStyle = '#333333';
// // // // // // //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // // // // //         ctx.fillStyle = '#FFFFFF';
// // // // // // //         ctx.font = '20px Arial';
// // // // // // //         ctx.textAlign = 'center';
// // // // // // //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// // // // // // //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 30);
// // // // // // //       }
// // // // // // //     });

// // // // // // //     return () => {
// // // // // // //       canvas.removeEventListener('mousemove', handleMouseMove);
// // // // // // //       canvas.removeEventListener('click', handleClick);
// // // // // // //     };
// // // // // // //   };

// // // // // // //   // Try MediaPipe first, fallback to mouse tracking
// // // // // // //   const initializeMediaPipe = async () => {
// // // // // // //     try {
// // // // // // //       setIsLoading(true);
// // // // // // //       setError(null);

// // // // // // //       // Try to load a different MediaPipe version with better compatibility
// // // // // // //       const loadScript = (src: string): Promise<void> => {
// // // // // // //         return new Promise((resolve, reject) => {
// // // // // // //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// // // // // // //             resolve();
// // // // // // //             return;
// // // // // // //           }

// // // // // // //           const script = document.createElement('script');
// // // // // // //           script.src = src;
// // // // // // //           script.async = true;
// // // // // // //           script.defer = true;
          
// // // // // // //           script.onload = () => {
// // // // // // //             console.log('Script loaded:', src);
// // // // // // //             resolve();
// // // // // // //           };
          
// // // // // // //           script.onerror = (e) => {
// // // // // // //             console.error('Script failed to load:', src, e);
// // // // // // //             reject(new Error(`Failed to load ${src}`));
// // // // // // //           };
          
// // // // // // //           document.head.appendChild(script);
// // // // // // //         });
// // // // // // //       };

// // // // // // //       // Try different CDN
// // // // // // //       await Promise.race([
// // // // // // //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// // // // // // //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// // // // // // //       ]);

// // // // // // //       // Wait for MediaPipe to initialize
// // // // // // //       await new Promise(resolve => setTimeout(resolve, 2000));

// // // // // // //       if (typeof window !== 'undefined' && (window as any).Hands) {
// // // // // // //         console.log('MediaPipe available, initializing...');
// // // // // // //         setTrackingMode('mediapipe');
        
// // // // // // //         const hands = new (window as any).Hands({
// // // // // // //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// // // // // // //         });

// // // // // // //         hands.setOptions({
// // // // // // //           maxNumHands: 1,
// // // // // // //           modelComplexity: 0, // Use lighter model
// // // // // // //           minDetectionConfidence: 0.7,
// // // // // // //           minTrackingConfidence: 0.5
// // // // // // //         });

// // // // // // //         hands.onResults((results: any) => {
// // // // // // //           const canvas = canvasRef.current;
// // // // // // //           if (!canvas) return;

// // // // // // //           const ctx = canvas.getContext('2d');
// // // // // // //           if (!ctx) return;

// // // // // // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // // // // //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// // // // // // //             const landmarks = results.multiHandLandmarks[0];
            
// // // // // // //             // Draw simple landmarks without external drawing utils
// // // // // // //             landmarks.forEach((landmark: any, index: number) => {
// // // // // // //               const x = landmark.x * canvas.width;
// // // // // // //               const y = landmark.y * canvas.height;
              
// // // // // // //               ctx.beginPath();
// // // // // // //               ctx.arc(x, y, index === 8 ? 8 : 3, 0, 2 * Math.PI); // Highlight index finger tip
// // // // // // //               ctx.fillStyle = index === 8 ? '#FFFF00' : '#FF0000';
// // // // // // //               ctx.fill();
// // // // // // //             });

// // // // // // //             // Get index finger tip
// // // // // // //             if (landmarks[8]) {
// // // // // // //               const tip = landmarks[8];
// // // // // // //               const x = (tip.x - 0.5) * 8;
// // // // // // //               const y = -(tip.y - 0.5) * 6;
// // // // // // //               const z = tip.z * 2;
              
// // // // // // //               if (onFingerMove) {
// // // // // // //                 onFingerMove([{ x, y, z }]);
// // // // // // //               }
// // // // // // //             }
// // // // // // //           }
// // // // // // //         });

// // // // // // //         // Initialize camera for MediaPipe
// // // // // // //         const video = videoRef.current;
// // // // // // //         if (video) {
// // // // // // //           const stream = await navigator.mediaDevices.getUserMedia({
// // // // // // //             video: { width: 640, height: 480, facingMode: 'user' }
// // // // // // //           });
          
// // // // // // //           video.srcObject = stream;
// // // // // // //           video.onloadedmetadata = () => {
// // // // // // //             video.play();
// // // // // // //             const processFrame = async () => {
// // // // // // //               if (video.readyState >= 2) {
// // // // // // //                 try {
// // // // // // //                   await hands.send({ image: video });
// // // // // // //                 } catch (err) {
// // // // // // //                   console.warn('Frame processing error, switching to fallback');
// // // // // // //                   initializeMouseTracking();
// // // // // // //                   return;
// // // // // // //                 }
// // // // // // //               }
// // // // // // //               requestAnimationFrame(processFrame);
// // // // // // //             };
// // // // // // //             processFrame();
// // // // // // //           };
// // // // // // //         }

// // // // // // //         setIsLoading(false);
// // // // // // //       } else {
// // // // // // //         throw new Error('MediaPipe not available');
// // // // // // //       }

// // // // // // //     } catch (err) {
// // // // // // //       console.log('MediaPipe failed, using mouse tracking fallback:', err);
// // // // // // //       setTrackingMode('mouse');
// // // // // // //       initializeMouseTracking();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     initializeMediaPipe();

// // // // // // //     return () => {
// // // // // // //       const video = videoRef.current;
// // // // // // //       if (video && video.srcObject) {
// // // // // // //         const stream = video.srcObject as MediaStream;
// // // // // // //         stream.getTracks().forEach(track => track.stop());
// // // // // // //       }
// // // // // // //     };
// // // // // // //   }, [onFingerMove]);

// // // // // // //   if (error && trackingMode !== 'mouse') {
// // // // // // //     return (
// // // // // // //       <div className="flex flex-col items-center justify-center h-full bg-yellow-100 text-yellow-800 p-4 rounded">
// // // // // // //         <h3 className="font-bold mb-2">Fallback Mode Active</h3>
// // // // // // //         <p className="text-sm text-center mb-4">{error}</p>
// // // // // // //         <p className="text-xs text-center">Using mouse tracking instead of hand tracking</p>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="relative">
// // // // // // //       <video 
// // // // // // //         ref={videoRef} 
// // // // // // //         style={{ display: 'none' }} 
// // // // // // //         playsInline
// // // // // // //         muted
// // // // // // //         autoPlay
// // // // // // //       />
// // // // // // //       <canvas 
// // // // // // //         ref={canvasRef} 
// // // // // // //         width={640} 
// // // // // // //         height={480}
// // // // // // //         className="rounded border cursor-crosshair"
// // // // // // //       />
      
// // // // // // //       {isLoading && (
// // // // // // //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// // // // // // //           <div className="text-white text-center">
// // // // // // //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// // // // // // //             <p>Loading tracking system...</p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
      
// // // // // // //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // // // //         Mode: {trackingMode === 'mediapipe' ? 'Hand Tracking' : 'Mouse Tracking'}
// // // // // // //       </div>
      
// // // // // // //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // // // //         ✓ Active
// // // // // // //       </div>

// // // // // // //       {trackingMode === 'mouse' && (
// // // // // // //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// // // // // // //           Move mouse over keyboard area and click to type keys
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // "use client";

// // // // // // import { useEffect, useRef, useState } from "react";

// // // // // // interface HandTrackerProps {
// // // // // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // // // // }

// // // // // // // Simple hand tracking fallback using browser-based detection
// // // // // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // // // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // // // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);
// // // // // //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse' | 'touch'>('mouse');
// // // // // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // // // // //   // Fallback to mouse/touch tracking if MediaPipe fails
// // // // // //   const initializeMouseTracking = () => {
// // // // // //     const canvas = canvasRef.current;
// // // // // //     const video = videoRef.current;
    
// // // // // //     if (!canvas || !video) return;

// // // // // //     const handleMouseMove = (e: MouseEvent) => {
// // // // // //       const rect = canvas.getBoundingClientRect();
// // // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // // //       const z = 0;

// // // // // //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// // // // // //       if (onFingerMove) {
// // // // // //         onFingerMove([{ x, y, z }]);
// // // // // //       }
// // // // // //     };

// // // // // //     const handleClick = (e: MouseEvent) => {
// // // // // //       const rect = canvas.getBoundingClientRect();
// // // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // // //       const z = -0.5; // Simulate tap depth

// // // // // //       if (onFingerMove) {
// // // // // //         onFingerMove([{ x, y, z }]);
// // // // // //         // Reset after short delay to simulate tap release
// // // // // //         setTimeout(() => {
// // // // // //           onFingerMove([{ x, y, z: 0 }]);
// // // // // //         }, 100);
// // // // // //       }
// // // // // //     };

// // // // // //     canvas.addEventListener('mousemove', handleMouseMove);
// // // // // //     canvas.addEventListener('click', handleClick);

// // // // // //     // Initialize camera for visual feedback
// // // // // //     navigator.mediaDevices.getUserMedia({
// // // // // //       video: { width: 640, height: 480, facingMode: 'user' }
// // // // // //     })
// // // // // //     .then(stream => {
// // // // // //       video.srcObject = stream;
// // // // // //       video.play();
      
// // // // // //       const drawFrame = () => {
// // // // // //         const ctx = canvas.getContext('2d');
// // // // // //         if (!ctx || video.readyState < 2) {
// // // // // //           requestAnimationFrame(drawFrame);
// // // // // //           return;
// // // // // //         }

// // // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // // // // //         // Draw mouse cursor as finger indicator
// // // // // //         ctx.beginPath();
// // // // // //         ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 2 * Math.PI);
// // // // // //         ctx.fillStyle = '#FFFF00';
// // // // // //         ctx.fill();
// // // // // //         ctx.strokeStyle = '#000000';
// // // // // //         ctx.lineWidth = 2;
// // // // // //         ctx.stroke();

// // // // // //         // Draw crosshairs
// // // // // //         ctx.beginPath();
// // // // // //         ctx.moveTo(mousePosition.x - 10, mousePosition.y);
// // // // // //         ctx.lineTo(mousePosition.x + 10, mousePosition.y);
// // // // // //         ctx.moveTo(mousePosition.x, mousePosition.y - 10);
// // // // // //         ctx.lineTo(mousePosition.x, mousePosition.y + 10);
// // // // // //         ctx.strokeStyle = '#FF0000';
// // // // // //         ctx.lineWidth = 1;
// // // // // //         ctx.stroke();

// // // // // //         requestAnimationFrame(drawFrame);
// // // // // //       };

// // // // // //       drawFrame();
// // // // // //       setIsLoading(false);
// // // // // //     })
// // // // // //     .catch(err => {
// // // // // //       setError('Camera access denied. Using mouse tracking only.');
// // // // // //       setIsLoading(false);
      
// // // // // //       // Even without camera, we can still track mouse
// // // // // //       const ctx = canvas.getContext('2d');
// // // // // //       if (ctx) {
// // // // // //         ctx.fillStyle = '#333333';
// // // // // //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // // // //         ctx.fillStyle = '#FFFFFF';
// // // // // //         ctx.font = '20px Arial';
// // // // // //         ctx.textAlign = 'center';
// // // // // //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// // // // // //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 30);
// // // // // //       }
// // // // // //     });

// // // // // //     return () => {
// // // // // //       canvas.removeEventListener('mousemove', handleMouseMove);
// // // // // //       canvas.removeEventListener('click', handleClick);
// // // // // //     };
// // // // // //   };

// // // // // //   // Try MediaPipe first, fallback to mouse tracking
// // // // // //   const initializeMediaPipe = async () => {
// // // // // //     try {
// // // // // //       setIsLoading(true);
// // // // // //       setError(null);

// // // // // //       // Try to load a different MediaPipe version with better compatibility
// // // // // //       const loadScript = (src: string): Promise<void> => {
// // // // // //         return new Promise((resolve, reject) => {
// // // // // //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// // // // // //             resolve();
// // // // // //             return;
// // // // // //           }

// // // // // //           const script = document.createElement('script');
// // // // // //           script.src = src;
// // // // // //           script.async = true;
// // // // // //           script.defer = true;
          
// // // // // //           script.onload = () => {
// // // // // //             console.log('Script loaded:', src);
// // // // // //             resolve();
// // // // // //           };
          
// // // // // //           script.onerror = (e) => {
// // // // // //             console.error('Script failed to load:', src, e);
// // // // // //             reject(new Error(`Failed to load ${src}`));
// // // // // //           };
          
// // // // // //           document.head.appendChild(script);
// // // // // //         });
// // // // // //       };

// // // // // //       // Try different CDN
// // // // // //       await Promise.race([
// // // // // //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// // // // // //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// // // // // //       ]);

// // // // // //       // Wait for MediaPipe to initialize
// // // // // //       await new Promise(resolve => setTimeout(resolve, 2000));

// // // // // //       if (typeof window !== 'undefined' && (window as any).Hands) {
// // // // // //         console.log('MediaPipe available, initializing...');
// // // // // //         setTrackingMode('mediapipe');
        
// // // // // //         const hands = new (window as any).Hands({
// // // // // //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// // // // // //         });

// // // // // //         hands.setOptions({
// // // // // //           maxNumHands: 1,
// // // // // //           modelComplexity: 0, // Use lighter model
// // // // // //           minDetectionConfidence: 0.7,
// // // // // //           minTrackingConfidence: 0.5
// // // // // //         });

// // // // // //         hands.onResults((results: any) => {
// // // // // //           const canvas = canvasRef.current;
// // // // // //           if (!canvas) return;

// // // // // //           const ctx = canvas.getContext('2d');
// // // // // //           if (!ctx) return;

// // // // // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // // // //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// // // // // //             const landmarks = results.multiHandLandmarks[0];
            
// // // // // //             // Draw simple landmarks without external drawing utils
// // // // // //             landmarks.forEach((landmark: any, index: number) => {
// // // // // //               const x = landmark.x * canvas.width;
// // // // // //               const y = landmark.y * canvas.height;
              
// // // // // //               ctx.beginPath();
// // // // // //               ctx.arc(x, y, index === 8 ? 8 : 3, 0, 2 * Math.PI); // Highlight index finger tip
// // // // // //               ctx.fillStyle = index === 8 ? '#FFFF00' : '#FF0000';
// // // // // //               ctx.fill();
// // // // // //             });

// // // // // //             // Get index finger tip
// // // // // //             if (landmarks[8]) {
// // // // // //               const tip = landmarks[8];
// // // // // //               const x = (tip.x - 0.5) * 8;
// // // // // //               const y = -(tip.y - 0.5) * 6;
// // // // // //               const z = tip.z * 2;
              
// // // // // //               if (onFingerMove) {
// // // // // //                 onFingerMove([{ x, y, z }]);
// // // // // //               }
// // // // // //             }
// // // // // //           }
// // // // // //         });

// // // // // //         // Initialize camera for MediaPipe
// // // // // //         const video = videoRef.current;
// // // // // //         if (video) {
// // // // // //           const stream = await navigator.mediaDevices.getUserMedia({
// // // // // //             video: { width: 640, height: 480, facingMode: 'user' }
// // // // // //           });
          
// // // // // //           video.srcObject = stream;
// // // // // //           video.onloadedmetadata = () => {
// // // // // //             video.play();
// // // // // //             const processFrame = async () => {
// // // // // //               if (video.readyState >= 2) {
// // // // // //                 try {
// // // // // //                   await hands.send({ image: video });
// // // // // //                 } catch (err) {
// // // // // //                   console.warn('Frame processing error, switching to fallback');
// // // // // //                   initializeMouseTracking();
// // // // // //                   return;
// // // // // //                 }
// // // // // //               }
// // // // // //               requestAnimationFrame(processFrame);
// // // // // //             };
// // // // // //             processFrame();
// // // // // //           };
// // // // // //         }

// // // // // //         setIsLoading(false);
// // // // // //       } else {
// // // // // //         throw new Error('MediaPipe not available');
// // // // // //       }

// // // // // //     } catch (err) {
// // // // // //       console.log('MediaPipe failed, using mouse tracking fallback:', err);
// // // // // //       setTrackingMode('mouse');
// // // // // //       initializeMouseTracking();
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     initializeMediaPipe();

// // // // // //     return () => {
// // // // // //       const video = videoRef.current;
// // // // // //       if (video && video.srcObject) {
// // // // // //         const stream = video.srcObject as MediaStream;
// // // // // //         stream.getTracks().forEach(track => track.stop());
// // // // // //       }
// // // // // //     };
// // // // // //   }, [onFingerMove]);

// // // // // //   if (error && trackingMode !== 'mouse') {
// // // // // //     return (
// // // // // //       <div className="flex flex-col items-center justify-center h-full bg-yellow-100 text-yellow-800 p-4 rounded">
// // // // // //         <h3 className="font-bold mb-2">Fallback Mode Active</h3>
// // // // // //         <p className="text-sm text-center mb-4">{error}</p>
// // // // // //         <p className="text-xs text-center">Using mouse tracking instead of hand tracking</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="relative">
// // // // // //       <video 
// // // // // //         ref={videoRef} 
// // // // // //         style={{ display: 'none' }} 
// // // // // //         playsInline
// // // // // //         muted
// // // // // //         autoPlay
// // // // // //       />
// // // // // //       <canvas 
// // // // // //         ref={canvasRef} 
// // // // // //         width={640} 
// // // // // //         height={480}
// // // // // //         className="rounded border cursor-crosshair"
// // // // // //       />
      
// // // // // //       {isLoading && (
// // // // // //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// // // // // //           <div className="text-white text-center">
// // // // // //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// // // // // //             <p>Loading tracking system...</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
      
// // // // // //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // // //         Mode: {trackingMode === 'mediapipe' ? 'Hand Tracking' : 'Mouse Tracking'}
// // // // // //       </div>
      
// // // // // //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // // //         ✓ Active
// // // // // //       </div>

// // // // // //       {trackingMode === 'mouse' && (
// // // // // //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// // // // // //           Move mouse over keyboard area and click to type keys
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";

// // // // // import { useEffect, useRef, useState } from "react";

// // // // // interface HandTrackerProps {
// // // // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // // // }

// // // // // // Simple hand tracking fallback using browser-based detection
// // // // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);
// // // // //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse' | 'touch'>('mouse');
// // // // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // // // //   // Fallback to mouse/touch tracking if MediaPipe fails
// // // // //   const initializeMouseTracking = () => {
// // // // //     const canvas = canvasRef.current;
// // // // //     const video = videoRef.current;
    
// // // // //     if (!canvas || !video) return;

// // // // //     const handleMouseMove = (e: MouseEvent) => {
// // // // //       const rect = canvas.getBoundingClientRect();
// // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // //       const z = 0;

// // // // //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// // // // //       if (onFingerMove) {
// // // // //         onFingerMove([{ x, y, z }]);
// // // // //       }
// // // // //     };

// // // // //     const handleClick = (e: MouseEvent) => {
// // // // //       const rect = canvas.getBoundingClientRect();
// // // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // // //       const z = -0.5; // Simulate tap depth

// // // // //       if (onFingerMove) {
// // // // //         onFingerMove([{ x, y, z }]);
// // // // //         // Reset after short delay to simulate tap release
// // // // //         setTimeout(() => {
// // // // //           onFingerMove([{ x, y, z: 0 }]);
// // // // //         }, 100);
// // // // //       }
// // // // //     };

// // // // //     canvas.addEventListener('mousemove', handleMouseMove);
// // // // //     canvas.addEventListener('click', handleClick);

// // // // //     // Initialize camera for visual feedback
// // // // //     navigator.mediaDevices.getUserMedia({
// // // // //       video: { width: 640, height: 480, facingMode: 'user' }
// // // // //     })
// // // // //     .then(stream => {
// // // // //       video.srcObject = stream;
// // // // //       video.play();
      
// // // // //       const drawFrame = () => {
// // // // //         const ctx = canvas.getContext('2d');
// // // // //         if (!ctx || video.readyState < 2) {
// // // // //           requestAnimationFrame(drawFrame);
// // // // //           return;
// // // // //         }

// // // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // // // //         // Draw mouse cursor as finger indicator
// // // // //         ctx.beginPath();
// // // // //         ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 2 * Math.PI);
// // // // //         ctx.fillStyle = '#FFFF00';
// // // // //         ctx.fill();
// // // // //         ctx.strokeStyle = '#000000';
// // // // //         ctx.lineWidth = 2;
// // // // //         ctx.stroke();

// // // // //         // Draw crosshairs
// // // // //         ctx.beginPath();
// // // // //         ctx.moveTo(mousePosition.x - 10, mousePosition.y);
// // // // //         ctx.lineTo(mousePosition.x + 10, mousePosition.y);
// // // // //         ctx.moveTo(mousePosition.x, mousePosition.y - 10);
// // // // //         ctx.lineTo(mousePosition.x, mousePosition.y + 10);
// // // // //         ctx.strokeStyle = '#FF0000';
// // // // //         ctx.lineWidth = 1;
// // // // //         ctx.stroke();

// // // // //         requestAnimationFrame(drawFrame);
// // // // //       };

// // // // //       drawFrame();
// // // // //       setIsLoading(false);
// // // // //     })
// // // // //     .catch(err => {
// // // // //       setError('Camera access denied. Using mouse tracking only.');
// // // // //       setIsLoading(false);
      
// // // // //       // Even without camera, we can still track mouse
// // // // //       const ctx = canvas.getContext('2d');
// // // // //       if (ctx) {
// // // // //         ctx.fillStyle = '#333333';
// // // // //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // // //         ctx.fillStyle = '#FFFFFF';
// // // // //         ctx.font = '20px Arial';
// // // // //         ctx.textAlign = 'center';
// // // // //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// // // // //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 30);
// // // // //       }
// // // // //     });

// // // // //     return () => {
// // // // //       canvas.removeEventListener('mousemove', handleMouseMove);
// // // // //       canvas.removeEventListener('click', handleClick);
// // // // //     };
// // // // //   };

// // // // //   // Try MediaPipe first, fallback to mouse tracking
// // // // //   const initializeMediaPipe = async () => {
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       setError(null);

// // // // //       // Try to load a different MediaPipe version with better compatibility
// // // // //       const loadScript = (src: string): Promise<void> => {
// // // // //         return new Promise((resolve, reject) => {
// // // // //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// // // // //             resolve();
// // // // //             return;
// // // // //           }

// // // // //           const script = document.createElement('script');
// // // // //           script.src = src;
// // // // //           script.async = true;
// // // // //           script.defer = true;
          
// // // // //           script.onload = () => {
// // // // //             console.log('Script loaded:', src);
// // // // //             resolve();
// // // // //           };
          
// // // // //           script.onerror = (e) => {
// // // // //             console.error('Script failed to load:', src, e);
// // // // //             reject(new Error(`Failed to load ${src}`));
// // // // //           };
          
// // // // //           document.head.appendChild(script);
// // // // //         });
// // // // //       };

// // // // //       // Try different CDN
// // // // //       await Promise.race([
// // // // //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// // // // //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// // // // //       ]);

// // // // //       // Wait for MediaPipe to initialize
// // // // //       await new Promise(resolve => setTimeout(resolve, 2000));

// // // // //       if (typeof window !== 'undefined' && (window as any).Hands) {
// // // // //         console.log('MediaPipe available, initializing...');
// // // // //         setTrackingMode('mediapipe');
        
// // // // //         const hands = new (window as any).Hands({
// // // // //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// // // // //         });

// // // // //         hands.setOptions({
// // // // //           maxNumHands: 1,
// // // // //           modelComplexity: 0, // Use lighter model
// // // // //           minDetectionConfidence: 0.7,
// // // // //           minTrackingConfidence: 0.5
// // // // //         });

// // // // //         hands.onResults((results: any) => {
// // // // //           const canvas = canvasRef.current;
// // // // //           if (!canvas) return;

// // // // //           const ctx = canvas.getContext('2d');
// // // // //           if (!ctx) return;

// // // // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // // //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// // // // //             const landmarks = results.multiHandLandmarks[0];
            
// // // // //             // Draw simple landmarks without external drawing utils
// // // // //             landmarks.forEach((landmark: any, index: number) => {
// // // // //               const x = landmark.x * canvas.width;
// // // // //               const y = landmark.y * canvas.height;
              
// // // // //               ctx.beginPath();
// // // // //               ctx.arc(x, y, index === 8 ? 8 : 3, 0, 2 * Math.PI); // Highlight index finger tip
// // // // //               ctx.fillStyle = index === 8 ? '#FFFF00' : '#FF0000';
// // // // //               ctx.fill();
// // // // //             });

// // // // //             // Get index finger tip
// // // // //             if (landmarks[8]) {
// // // // //               const tip = landmarks[8];
// // // // //               const x = (tip.x - 0.5) * 8;
// // // // //               const y = -(tip.y - 0.5) * 6;
// // // // //               const z = tip.z * 2;
              
// // // // //               if (onFingerMove) {
// // // // //                 onFingerMove([{ x, y, z }]);
// // // // //               }
// // // // //             }
// // // // //           }
// // // // //         });

// // // // //         // Initialize camera for MediaPipe
// // // // //         const video = videoRef.current;
// // // // //         if (video) {
// // // // //           const stream = await navigator.mediaDevices.getUserMedia({
// // // // //             video: { width: 640, height: 480, facingMode: 'user' }
// // // // //           });
          
// // // // //           video.srcObject = stream;
// // // // //           video.onloadedmetadata = () => {
// // // // //             video.play();
// // // // //             const processFrame = async () => {
// // // // //               if (video.readyState >= 2) {
// // // // //                 try {
// // // // //                   await hands.send({ image: video });
// // // // //                 } catch (err) {
// // // // //                   console.warn('Frame processing error, switching to fallback');
// // // // //                   initializeMouseTracking();
// // // // //                   return;
// // // // //                 }
// // // // //               }
// // // // //               requestAnimationFrame(processFrame);
// // // // //             };
// // // // //             processFrame();
// // // // //           };
// // // // //         }

// // // // //         setIsLoading(false);
// // // // //       } else {
// // // // //         throw new Error('MediaPipe not available');
// // // // //       }

// // // // //     } catch (err) {
// // // // //       console.log('MediaPipe failed, using mouse tracking fallback:', err);
// // // // //       setTrackingMode('mouse');
// // // // //       initializeMouseTracking();
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     initializeMediaPipe();

// // // // //     return () => {
// // // // //       const video = videoRef.current;
// // // // //       if (video && video.srcObject) {
// // // // //         const stream = video.srcObject as MediaStream;
// // // // //         stream.getTracks().forEach(track => track.stop());
// // // // //       }
// // // // //     };
// // // // //   }, [onFingerMove]);

// // // // //   if (error && trackingMode !== 'mouse') {
// // // // //     return (
// // // // //       <div className="flex flex-col items-center justify-center h-full bg-yellow-100 text-yellow-800 p-4 rounded">
// // // // //         <h3 className="font-bold mb-2">Fallback Mode Active</h3>
// // // // //         <p className="text-sm text-center mb-4">{error}</p>
// // // // //         <p className="text-xs text-center">Using mouse tracking instead of hand tracking</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="relative">
// // // // //       <video 
// // // // //         ref={videoRef} 
// // // // //         style={{ display: 'none' }} 
// // // // //         playsInline
// // // // //         muted
// // // // //         autoPlay
// // // // //       />
// // // // //       <canvas 
// // // // //         ref={canvasRef} 
// // // // //         width={640} 
// // // // //         height={480}
// // // // //         className="rounded border cursor-crosshair"
// // // // //       />
      
// // // // //       {isLoading && (
// // // // //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// // // // //           <div className="text-white text-center">
// // // // //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// // // // //             <p>Loading tracking system...</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
      
// // // // //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // //         Mode: {trackingMode === 'mediapipe' ? 'Hand Tracking' : 'Mouse Tracking'}
// // // // //       </div>
      
// // // // //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // // //         ✓ Active
// // // // //       </div>

// // // // //       {trackingMode === 'mouse' && (
// // // // //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// // // // //           Move mouse over keyboard area and click to type keys
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { useEffect, useRef, useState } from "react";

// // // // interface HandTrackerProps {
// // // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // // }

// // // // // Simple hand tracking fallback using browser-based detection
// // // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // // //   const videoRef = useRef<HTMLVideoElement>(null);
// // // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse' | 'touch'>('mouse');
// // // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // // //   // Fallback to mouse/touch tracking if MediaPipe fails
// // // //   const initializeMouseTracking = () => {
// // // //     const canvas = canvasRef.current;
// // // //     const video = videoRef.current;
    
// // // //     if (!canvas || !video) return;

// // // //     const handleMouseMove = (e: MouseEvent) => {
// // // //       const rect = canvas.getBoundingClientRect();
// // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // //       const z = 0;

// // // //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// // // //       if (onFingerMove) {
// // // //         onFingerMove([{ x, y, z }]);
// // // //       }
// // // //     };

// // // //     const handleClick = (e: MouseEvent) => {
// // // //       const rect = canvas.getBoundingClientRect();
// // // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // // //       const z = -0.5; // Simulate tap depth

// // // //       if (onFingerMove) {
// // // //         onFingerMove([{ x, y, z }]);
// // // //         // Reset after short delay to simulate tap release
// // // //         setTimeout(() => {
// // // //           onFingerMove([{ x, y, z: 0 }]);
// // // //         }, 100);
// // // //       }
// // // //     };

// // // //     canvas.addEventListener('mousemove', handleMouseMove);
// // // //     canvas.addEventListener('click', handleClick);

// // // //     // Initialize camera for visual feedback
// // // //     navigator.mediaDevices.getUserMedia({
// // // //       video: { width: 640, height: 480, facingMode: 'user' }
// // // //     })
// // // //     .then(stream => {
// // // //       video.srcObject = stream;
// // // //       video.play();
      
// // // //       const drawFrame = () => {
// // // //         const ctx = canvas.getContext('2d');
// // // //         if (!ctx || video.readyState < 2) {
// // // //           requestAnimationFrame(drawFrame);
// // // //           return;
// // // //         }

// // // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // // //         // Draw mouse cursor as finger indicator
// // // //         ctx.beginPath();
// // // //         ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 2 * Math.PI);
// // // //         ctx.fillStyle = '#FFFF00';
// // // //         ctx.fill();
// // // //         ctx.strokeStyle = '#000000';
// // // //         ctx.lineWidth = 2;
// // // //         ctx.stroke();

// // // //         // Draw crosshairs
// // // //         ctx.beginPath();
// // // //         ctx.moveTo(mousePosition.x - 10, mousePosition.y);
// // // //         ctx.lineTo(mousePosition.x + 10, mousePosition.y);
// // // //         ctx.moveTo(mousePosition.x, mousePosition.y - 10);
// // // //         ctx.lineTo(mousePosition.x, mousePosition.y + 10);
// // // //         ctx.strokeStyle = '#FF0000';
// // // //         ctx.lineWidth = 1;
// // // //         ctx.stroke();

// // // //         requestAnimationFrame(drawFrame);
// // // //       };

// // // //       drawFrame();
// // // //       setIsLoading(false);
// // // //     })
// // // //     .catch(err => {
// // // //       setError('Camera access denied. Using mouse tracking only.');
// // // //       setIsLoading(false);
      
// // // //       // Even without camera, we can still track mouse
// // // //       const ctx = canvas.getContext('2d');
// // // //       if (ctx) {
// // // //         ctx.fillStyle = '#333333';
// // // //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // //         ctx.fillStyle = '#FFFFFF';
// // // //         ctx.font = '20px Arial';
// // // //         ctx.textAlign = 'center';
// // // //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// // // //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 30);
// // // //       }
// // // //     });

// // // //     return () => {
// // // //       canvas.removeEventListener('mousemove', handleMouseMove);
// // // //       canvas.removeEventListener('click', handleClick);
// // // //     };
// // // //   };

// // // //   // Try MediaPipe first, fallback to mouse tracking
// // // //   const initializeMediaPipe = async () => {
// // // //     try {
// // // //       setIsLoading(true);
// // // //       setError(null);

// // // //       // Try to load a different MediaPipe version with better compatibility
// // // //       const loadScript = (src: string): Promise<void> => {
// // // //         return new Promise((resolve, reject) => {
// // // //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// // // //             resolve();
// // // //             return;
// // // //           }

// // // //           const script = document.createElement('script');
// // // //           script.src = src;
// // // //           script.async = true;
// // // //           script.defer = true;
          
// // // //           script.onload = () => {
// // // //             console.log('Script loaded:', src);
// // // //             resolve();
// // // //           };
          
// // // //           script.onerror = (e) => {
// // // //             console.error('Script failed to load:', src, e);
// // // //             reject(new Error(`Failed to load ${src}`));
// // // //           };
          
// // // //           document.head.appendChild(script);
// // // //         });
// // // //       };

// // // //       // Try different CDN
// // // //       await Promise.race([
// // // //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// // // //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// // // //       ]);

// // // //       // Wait for MediaPipe to initialize
// // // //       await new Promise(resolve => setTimeout(resolve, 2000));

// // // //       if (typeof window !== 'undefined' && (window as any).Hands) {
// // // //         console.log('MediaPipe available, initializing...');
// // // //         setTrackingMode('mediapipe');
        
// // // //         const hands = new (window as any).Hands({
// // // //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// // // //         });

// // // //         hands.setOptions({
// // // //           maxNumHands: 1,
// // // //           modelComplexity: 0, // Use lighter model
// // // //           minDetectionConfidence: 0.7,
// // // //           minTrackingConfidence: 0.5
// // // //         });

// // // //         hands.onResults((results: any) => {
// // // //           const canvas = canvasRef.current;
// // // //           if (!canvas) return;

// // // //           const ctx = canvas.getContext('2d');
// // // //           if (!ctx) return;

// // // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // // //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// // // //             const landmarks = results.multiHandLandmarks[0];
            
// // // //             // Draw simple landmarks without external drawing utils
// // // //             landmarks.forEach((landmark: any, index: number) => {
// // // //               const x = landmark.x * canvas.width;
// // // //               const y = landmark.y * canvas.height;
              
// // // //               ctx.beginPath();
// // // //               ctx.arc(x, y, index === 8 ? 8 : 3, 0, 2 * Math.PI); // Highlight index finger tip
// // // //               ctx.fillStyle = index === 8 ? '#FFFF00' : '#FF0000';
// // // //               ctx.fill();
// // // //             });

// // // //             // Get index finger tip
// // // //             if (landmarks[8]) {
// // // //               const tip = landmarks[8];
// // // //               const x = (tip.x - 0.5) * 8;
// // // //               const y = -(tip.y - 0.5) * 6;
// // // //               const z = tip.z * 2;
              
// // // //               if (onFingerMove) {
// // // //                 onFingerMove([{ x, y, z }]);
// // // //               }
// // // //             }
// // // //           }
// // // //         });

// // // //         // Initialize camera for MediaPipe
// // // //         const video = videoRef.current;
// // // //         if (video) {
// // // //           const stream = await navigator.mediaDevices.getUserMedia({
// // // //             video: { width: 640, height: 480, facingMode: 'user' }
// // // //           });
          
// // // //           video.srcObject = stream;
// // // //           video.onloadedmetadata = () => {
// // // //             video.play();
// // // //             const processFrame = async () => {
// // // //               if (video.readyState >= 2) {
// // // //                 try {
// // // //                   await hands.send({ image: video });
// // // //                 } catch (err) {
// // // //                   console.warn('Frame processing error, switching to fallback');
// // // //                   initializeMouseTracking();
// // // //                   return;
// // // //                 }
// // // //               }
// // // //               requestAnimationFrame(processFrame);
// // // //             };
// // // //             processFrame();
// // // //           };
// // // //         }

// // // //         setIsLoading(false);
// // // //       } else {
// // // //         throw new Error('MediaPipe not available');
// // // //       }

// // // //     } catch (err) {
// // // //       console.log('MediaPipe failed, using mouse tracking fallback:', err);
// // // //       setTrackingMode('mouse');
// // // //       initializeMouseTracking();
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     initializeMediaPipe();

// // // //     return () => {
// // // //       const video = videoRef.current;
// // // //       if (video && video.srcObject) {
// // // //         const stream = video.srcObject as MediaStream;
// // // //         stream.getTracks().forEach(track => track.stop());
// // // //       }
// // // //     };
// // // //   }, [onFingerMove]);

// // // //   if (error && trackingMode !== 'mouse') {
// // // //     return (
// // // //       <div className="flex flex-col items-center justify-center h-full bg-yellow-100 text-yellow-800 p-4 rounded">
// // // //         <h3 className="font-bold mb-2">Fallback Mode Active</h3>
// // // //         <p className="text-sm text-center mb-4">{error}</p>
// // // //         <p className="text-xs text-center">Using mouse tracking instead of hand tracking</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="relative">
// // // //       <video 
// // // //         ref={videoRef} 
// // // //         style={{ display: 'none' }} 
// // // //         playsInline
// // // //         muted
// // // //         autoPlay
// // // //       />
// // // //       <canvas 
// // // //         ref={canvasRef} 
// // // //         width={640} 
// // // //         height={480}
// // // //         className="rounded border cursor-crosshair"
// // // //       />
      
// // // //       {isLoading && (
// // // //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// // // //           <div className="text-white text-center">
// // // //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// // // //             <p>Loading tracking system...</p>
// // // //           </div>
// // // //         </div>
// // // //       )}
      
// // // //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // //         Mode: {trackingMode === 'mediapipe' ? 'Hand Tracking' : 'Mouse Tracking'}
// // // //       </div>
      
// // // //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // // //         ✓ Active
// // // //       </div>

// // // //       {trackingMode === 'mouse' && (
// // // //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// // // //           Move mouse over keyboard area and click to type keys
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import { useEffect, useRef, useState } from "react";

// // // interface HandTrackerProps {
// // //   onFingerMove?: (fingers: { x: number; y: number; z: number }[]) => void;
// // // }

// // // // Simple hand tracking fallback using browser-based detection
// // // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// // //   const videoRef = useRef<HTMLVideoElement>(null);
// // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse' | 'touch'>('mouse');
// // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // //   // Fallback to mouse/touch tracking if MediaPipe fails
// // //   const initializeMouseTracking = () => {
// // //     const canvas = canvasRef.current;
// // //     const video = videoRef.current;
    
// // //     if (!canvas || !video) return;

// // //     const handleMouseMove = (e: MouseEvent) => {
// // //       const rect = canvas.getBoundingClientRect();
// // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // //       const z = 0;

// // //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// // //       if (onFingerMove) {
// // //         onFingerMove([{ x, y, z }]);
// // //       }
// // //     };

// // //     const handleClick = (e: MouseEvent) => {
// // //       const rect = canvas.getBoundingClientRect();
// // //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// // //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// // //       const z = -0.5; // Simulate tap depth

// // //       if (onFingerMove) {
// // //         onFingerMove([{ x, y, z }]);
// // //         // Reset after short delay to simulate tap release
// // //         setTimeout(() => {
// // //           onFingerMove([{ x, y, z: 0 }]);
// // //         }, 100);
// // //       }
// // //     };

// // //     canvas.addEventListener('mousemove', handleMouseMove);
// // //     canvas.addEventListener('click', handleClick);

// // //     // Initialize camera for visual feedback
// // //     navigator.mediaDevices.getUserMedia({
// // //       video: { width: 640, height: 480, facingMode: 'user' }
// // //     })
// // //     .then(stream => {
// // //       video.srcObject = stream;
// // //       video.play();
      
// // //       const drawFrame = () => {
// // //         const ctx = canvas.getContext('2d');
// // //         if (!ctx || video.readyState < 2) {
// // //           requestAnimationFrame(drawFrame);
// // //           return;
// // //         }

// // //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// // //         // Draw mouse cursor as finger indicator
// // //         ctx.beginPath();
// // //         ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 2 * Math.PI);
// // //         ctx.fillStyle = '#FFFF00';
// // //         ctx.fill();
// // //         ctx.strokeStyle = '#000000';
// // //         ctx.lineWidth = 2;
// // //         ctx.stroke();

// // //         // Draw crosshairs
// // //         ctx.beginPath();
// // //         ctx.moveTo(mousePosition.x - 10, mousePosition.y);
// // //         ctx.lineTo(mousePosition.x + 10, mousePosition.y);
// // //         ctx.moveTo(mousePosition.x, mousePosition.y - 10);
// // //         ctx.lineTo(mousePosition.x, mousePosition.y + 10);
// // //         ctx.strokeStyle = '#FF0000';
// // //         ctx.lineWidth = 1;
// // //         ctx.stroke();

// // //         requestAnimationFrame(drawFrame);
// // //       };

// // //       drawFrame();
// // //       setIsLoading(false);
// // //     })
// // //     .catch(err => {
// // //       setError('Camera access denied. Using mouse tracking only.');
// // //       setIsLoading(false);
      
// // //       // Even without camera, we can still track mouse
// // //       const ctx = canvas.getContext('2d');
// // //       if (ctx) {
// // //         ctx.fillStyle = '#333333';
// // //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// // //         ctx.fillStyle = '#FFFFFF';
// // //         ctx.font = '20px Arial';
// // //         ctx.textAlign = 'center';
// // //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// // //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 30);
// // //       }
// // //     });

// // //     return () => {
// // //       canvas.removeEventListener('mousemove', handleMouseMove);
// // //       canvas.removeEventListener('click', handleClick);
// // //     };
// // //   };

// // //   // Try MediaPipe first, fallback to mouse tracking
// // //   const initializeMediaPipe = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);

// // //       // Try to load a different MediaPipe version with better compatibility
// // //       const loadScript = (src: string): Promise<void> => {
// // //         return new Promise((resolve, reject) => {
// // //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// // //             resolve();
// // //             return;
// // //           }

// // //           const script = document.createElement('script');
// // //           script.src = src;
// // //           script.async = true;
// // //           script.defer = true;
          
// // //           script.onload = () => {
// // //             console.log('Script loaded:', src);
// // //             resolve();
// // //           };
          
// // //           script.onerror = (e) => {
// // //             console.error('Script failed to load:', src, e);
// // //             reject(new Error(`Failed to load ${src}`));
// // //           };
          
// // //           document.head.appendChild(script);
// // //         });
// // //       };

// // //       // Try different CDN
// // //       await Promise.race([
// // //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// // //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// // //       ]);

// // //       // Wait for MediaPipe to initialize
// // //       await new Promise(resolve => setTimeout(resolve, 2000));

// // //       if (typeof window !== 'undefined' && (window as any).Hands) {
// // //         console.log('MediaPipe available, initializing...');
// // //         setTrackingMode('mediapipe');
        
// // //         const hands = new (window as any).Hands({
// // //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// // //         });

// // //         hands.setOptions({
// // //           maxNumHands: 1,
// // //           modelComplexity: 0, // Use lighter model
// // //           minDetectionConfidence: 0.7,
// // //           minTrackingConfidence: 0.5
// // //         });

// // //         hands.onResults((results: any) => {
// // //           const canvas = canvasRef.current;
// // //           if (!canvas) return;

// // //           const ctx = canvas.getContext('2d');
// // //           if (!ctx) return;

// // //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// // //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// // //             const landmarks = results.multiHandLandmarks[0];
            
// // //             // Draw simple landmarks without external drawing utils
// // //             landmarks.forEach((landmark: any, index: number) => {
// // //               const x = landmark.x * canvas.width;
// // //               const y = landmark.y * canvas.height;
              
// // //               ctx.beginPath();
// // //               ctx.arc(x, y, index === 8 ? 8 : 3, 0, 2 * Math.PI); // Highlight index finger tip
// // //               ctx.fillStyle = index === 8 ? '#FFFF00' : '#FF0000';
// // //               ctx.fill();
// // //             });

// // //             // Get index finger tip
// // //             if (landmarks[8]) {
// // //               const tip = landmarks[8];
// // //               const x = (tip.x - 0.5) * 8;
// // //               const y = -(tip.y - 0.5) * 6;
// // //               const z = tip.z * 2;
              
// // //               if (onFingerMove) {
// // //                 onFingerMove([{ x, y, z }]);
// // //               }
// // //             }
// // //           }
// // //         });

// // //         // Initialize camera for MediaPipe
// // //         const video = videoRef.current;
// // //         if (video) {
// // //           const stream = await navigator.mediaDevices.getUserMedia({
// // //             video: { width: 640, height: 480, facingMode: 'user' }
// // //           });
          
// // //           video.srcObject = stream;
// // //           video.onloadedmetadata = () => {
// // //             video.play();
// // //             const processFrame = async () => {
// // //               if (video.readyState >= 2) {
// // //                 try {
// // //                   await hands.send({ image: video });
// // //                 } catch (err) {
// // //                   console.warn('Frame processing error, switching to fallback');
// // //                   initializeMouseTracking();
// // //                   return;
// // //                 }
// // //               }
// // //               requestAnimationFrame(processFrame);
// // //             };
// // //             processFrame();
// // //           };
// // //         }

// // //         setIsLoading(false);
// // //       } else {
// // //         throw new Error('MediaPipe not available');
// // //       }

// // //     } catch (err) {
// // //       console.log('MediaPipe failed, using mouse tracking fallback:', err);
// // //       setTrackingMode('mouse');
// // //       initializeMouseTracking();
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     initializeMediaPipe();

// // //     return () => {
// // //       const video = videoRef.current;
// // //       if (video && video.srcObject) {
// // //         const stream = video.srcObject as MediaStream;
// // //         stream.getTracks().forEach(track => track.stop());
// // //       }
// // //     };
// // //   }, [onFingerMove]);

// // //   if (error && trackingMode !== 'mouse') {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center h-full bg-yellow-100 text-yellow-800 p-4 rounded">
// // //         <h3 className="font-bold mb-2">Fallback Mode Active</h3>
// // //         <p className="text-sm text-center mb-4">{error}</p>
// // //         <p className="text-xs text-center">Using mouse tracking instead of hand tracking</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative">
// // //       <video 
// // //         ref={videoRef} 
// // //         style={{ display: 'none' }} 
// // //         playsInline
// // //         muted
// // //         autoPlay
// // //       />
// // //       <canvas 
// // //         ref={canvasRef} 
// // //         width={640} 
// // //         height={480}
// // //         className="rounded border cursor-crosshair"
// // //       />
      
// // //       {isLoading && (
// // //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// // //           <div className="text-white text-center">
// // //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// // //             <p>Loading tracking system...</p>
// // //           </div>
// // //         </div>
// // //       )}
      
// // //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // //         Mode: {trackingMode === 'mediapipe' ? 'Hand Tracking' : 'Mouse Tracking'}
// // //       </div>
      
// // //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// // //         ✓ Active
// // //       </div>

// // //       {trackingMode === 'mouse' && (
// // //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// // //           Move mouse over keyboard area and click to type keys
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useRef, useState } from "react";

// // interface HandTrackerProps {
// //   onFingerMove?: (fingers: { x: number; y: number; z: number; type: string }[]) => void;
// // }

// // // MediaPipe hand landmark indices for fingertips
// // const FINGERTIP_LANDMARKS = {
// //   thumb: 4,
// //   index: 8, 
// //   middle: 12,
// //   ring: 16,
// //   pinky: 20
// // };

// // export default function HandTracker({ onFingerMove }: HandTrackerProps) {
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse'>('mouse');
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// //   // Enhanced mouse tracking with multiple cursor simulation
// //   const initializeMouseTracking = () => {
// //     const canvas = canvasRef.current;
// //     const video = videoRef.current;
    
// //     if (!canvas || !video) return;

// //     const handleMouseMove = (e: MouseEvent) => {
// //       const rect = canvas.getBoundingClientRect();
// //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// //       const z = 0;

// //       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

// //       if (onFingerMove) {
// //         onFingerMove([{ x, y, z, type: 'index' }]);
// //       }
// //     };

// //     const handleClick = (e: MouseEvent) => {
// //       const rect = canvas.getBoundingClientRect();
// //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
// //       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
// //       const z = -0.5;

// //       if (onFingerMove) {
// //         onFingerMove([{ x, y, z, type: 'index' }]);
// //         setTimeout(() => {
// //           onFingerMove([{ x, y, z: 0, type: 'index' }]);
// //         }, 100);
// //       }
// //     };

// //     canvas.addEventListener('mousemove', handleMouseMove);
// //     canvas.addEventListener('click', handleClick);

// //     // Initialize camera
// //     navigator.mediaDevices.getUserMedia({
// //       video: { width: 640, height: 480, facingMode: 'user' }
// //     })
// //     .then(stream => {
// //       video.srcObject = stream;
// //       video.play();
      
// //       const drawFrame = () => {
// //         const ctx = canvas.getContext('2d');
// //         if (!ctx || video.readyState < 2) {
// //           requestAnimationFrame(drawFrame);
// //           return;
// //         }

// //         ctx.clearRect(0, 0, canvas.width, canvas.height);
// //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// //         // Draw enhanced cursor
// //         ctx.beginPath();
// //         ctx.arc(mousePosition.x, mousePosition.y, 10, 0, 2 * Math.PI);
// //         ctx.fillStyle = '#FFFF00';
// //         ctx.fill();
// //         ctx.strokeStyle = '#000000';
// //         ctx.lineWidth = 2;
// //         ctx.stroke();

// //         // Draw crosshairs
// //         ctx.beginPath();
// //         ctx.moveTo(mousePosition.x - 15, mousePosition.y);
// //         ctx.lineTo(mousePosition.x + 15, mousePosition.y);
// //         ctx.moveTo(mousePosition.x, mousePosition.y - 15);
// //         ctx.lineTo(mousePosition.x, mousePosition.y + 15);
// //         ctx.strokeStyle = '#FF0000';
// //         ctx.lineWidth = 2;
// //         ctx.stroke();

// //         requestAnimationFrame(drawFrame);
// //       };

// //       drawFrame();
// //       setIsLoading(false);
// //     })
// //     .catch(err => {
// //       setError('Camera access denied. Using mouse tracking only.');
// //       setIsLoading(false);
      
// //       const ctx = canvas.getContext('2d');
// //       if (ctx) {
// //         ctx.fillStyle = '#1a1a1a';
// //         ctx.fillRect(0, 0, canvas.width, canvas.height);
// //         ctx.fillStyle = '#FFFFFF';
// //         ctx.font = '18px Arial';
// //         ctx.textAlign = 'center';
// //         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
// //         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 25);
// //         ctx.font = '14px Arial';
// //         ctx.fillStyle = '#FFFF00';
// //         ctx.fillText('Enhanced tracking - supports all keyboard areas', canvas.width / 2, canvas.height / 2 + 50);
// //       }
// //     });

// //     return () => {
// //       canvas.removeEventListener('mousemove', handleMouseMove);
// //       canvas.removeEventListener('click', handleClick);
// //     };
// //   };

// //   // Enhanced MediaPipe initialization with multi-finger tracking
// //   const initializeMediaPipe = async () => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);

// //       const loadScript = (src: string): Promise<void> => {
// //         return new Promise((resolve, reject) => {
// //           if (document.querySelector(`script[src*="mediapipe"]`)) {
// //             resolve();
// //             return;
// //           }

// //           const script = document.createElement('script');
// //           script.src = src;
// //           script.async = true;
// //           script.defer = true;
          
// //           script.onload = () => resolve();
// //           script.onerror = () => reject(new Error(`Failed to load ${src}`));
          
// //           document.head.appendChild(script);
// //         });
// //       };

// //       await Promise.race([
// //         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
// //         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
// //       ]);

// //       await new Promise(resolve => setTimeout(resolve, 2000));

// //       if (typeof window !== 'undefined' && (window as any).Hands) {
// //         console.log('MediaPipe available, initializing multi-finger tracking...');
// //         setTrackingMode('mediapipe');
        
// //         const hands = new (window as any).Hands({
// //           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
// //         });

// //         hands.setOptions({
// //           maxNumHands: 2, // Track both hands
// //           modelComplexity: 1, // Higher complexity for better accuracy
// //           minDetectionConfidence: 0.6,
// //           minTrackingConfidence: 0.5
// //         });

// //         hands.onResults((results: any) => {
// //           const canvas = canvasRef.current;
// //           if (!canvas) return;

// //           const ctx = canvas.getContext('2d');
// //           if (!ctx) return;

// //           ctx.clearRect(0, 0, canvas.width, canvas.height);
// //           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

// //           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
// //             const allFingertips: { x: number; y: number; z: number; type: string }[] = [];
            
// //             // Process each detected hand
// //             results.multiHandLandmarks.forEach((landmarks: any, handIndex: number) => {
// //               const handColor = handIndex === 0 ? '#00FF00' : '#FF00FF';
              
// //               // Draw all hand landmarks
// //               landmarks.forEach((landmark: any, index: number) => {
// //                 const x = landmark.x * canvas.width;
// //                 const y = landmark.y * canvas.height;
                
// //                 // Highlight fingertips
// //                 const isFingertip = Object.values(FINGERTIP_LANDMARKS).includes(index);
                
// //                 ctx.beginPath();
// //                 ctx.arc(x, y, isFingertip ? 8 : 3, 0, 2 * Math.PI);
// //                 ctx.fillStyle = isFingertip ? '#FFFF00' : handColor;
// //                 ctx.fill();
                
// //                 if (isFingertip) {
// //                   ctx.strokeStyle = '#000000';
// //                   ctx.lineWidth = 2;
// //                   ctx.stroke();
                  
// //                   // Add text label for fingertips
// //                   ctx.fillStyle = '#FFFFFF';
// //                   ctx.font = '10px Arial';
// //                   ctx.textAlign = 'center';
// //                   const fingerName = Object.entries(FINGERTIP_LANDMARKS).find(([_, idx]) => idx === index)?.[0] || '';
// //                   ctx.fillText(fingerName, x, y - 12);
// //                 }
// //               });

// //               // Extract all fingertip positions
// //               Object.entries(FINGERTIP_LANDMARKS).forEach(([fingerType, landmarkIndex]) => {
// //                 if (landmarks[landmarkIndex]) {
// //                   const tip = landmarks[landmarkIndex];
// //                   // Enhanced coordinate mapping for better coverage
// //                   const x = (tip.x - 0.5) * 10; // Increased range for extreme keys
// //                   const y = -(tip.y - 0.5) * 7;  // Increased range
// //                   const z = tip.z * 3; // Enhanced depth sensitivity
                  
// //                   allFingertips.push({ x, y, z, type: fingerType });
// //                 }
// //               });
// //             });

// //             // Send all fingertips to the keyboard
// //             if (allFingertips.length > 0 && onFingerMove) {
// //               onFingerMove(allFingertips);
// //             }
// //           }
// //         });

// //         // Initialize camera
// //         const video = videoRef.current;
// //         if (video) {
// //           const stream = await navigator.mediaDevices.getUserMedia({
// //             video: { width: 640, height: 480, facingMode: 'user' }
// //           });
          
// //           video.srcObject = stream;
// //           video.onloadedmetadata = () => {
// //             video.play();
// //             const processFrame = async () => {
// //               if (video.readyState >= 2) {
// //                 try {
// //                   await hands.send({ image: video });
// //                 } catch (err) {
// //                   console.warn('Frame processing error, switching to fallback');
// //                   initializeMouseTracking();
// //                   return;
// //                 }
// //               }
// //               requestAnimationFrame(processFrame);
// //             };
// //             processFrame();
// //           };
// //         }

// //         setIsLoading(false);
// //       } else {
// //         throw new Error('MediaPipe not available');
// //       }

// //     } catch (err) {
// //       console.log('MediaPipe failed, using enhanced mouse tracking fallback:', err);
// //       setTrackingMode('mouse');
// //       initializeMouseTracking();
// //     }
// //   };

// //   useEffect(() => {
// //     initializeMediaPipe();

// //     return () => {
// //       const video = videoRef.current;
// //       if (video && video.srcObject) {
// //         const stream = video.srcObject as MediaStream;
// //         stream.getTracks().forEach(track => track.stop());
// //       }
// //     };
// //   }, [onFingerMove]);

// //   return (
// //     <div className="relative">
// //       <video 
// //         ref={videoRef} 
// //         style={{ display: 'none' }} 
// //         playsInline
// //         muted
// //         autoPlay
// //       />
// //       <canvas 
// //         ref={canvasRef} 
// //         width={640} 
// //         height={480}
// //         className="rounded border cursor-crosshair"
// //       />
      
// //       {isLoading && (
// //         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
// //           <div className="text-white text-center">
// //             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
// //             <p>Loading multi-finger tracking...</p>
// //           </div>
// //         </div>
// //       )}
      
// //       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// //         Mode: {trackingMode === 'mediapipe' ? 'Multi-Finger Hand Tracking' : 'Enhanced Mouse Tracking'}
// //       </div>
      
// //       <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
// //         ✓ All Fingers Active
// //       </div>

// //       {trackingMode === 'mediapipe' && (
// //         <div className="absolute bottom-2 left-2 right-2 bg-purple-900 bg-opacity-70 text-white p-2 rounded text-xs">
// //           All 5 fingertips tracked • Enhanced range for extreme keys • Both hands supported
// //         </div>
// //       )}

// //       {trackingMode === 'mouse' && (
// //         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
// //           Enhanced mouse tracking • Extended range for all keys including Backspace
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useRef, useState } from "react";

// interface HandTrackerProps {
//   onFingerMove?: (fingers: { x: number; y: number; z: number; type: string }[]) => void;
// }

// // MediaPipe hand landmark indices for fingertips
// const FINGERTIP_LANDMARKS = {
//   thumb: 4,
//   index: 8, 
//   middle: 12,
//   ring: 16,
//   pinky: 20
// };

// export default function HandTracker({ onFingerMove }: HandTrackerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse'>('mouse');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isARMode, setIsARMode] = useState(false);

//   // Check if we're in AR mode
//   useEffect(() => {
//     const checkARMode = () => {
//       if (navigator.xr) {
//         navigator.xr.isSessionSupported('immersive-ar').then(supported => {
//           setIsARMode(supported);
//         });
//       }
//     };
//     checkARMode();
//   }, []);

//   // Enhanced mouse tracking with multiple cursor simulation
//   const initializeMouseTracking = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
    
//     if (!canvas || !video) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       // Enhanced coordinate mapping for AR compatibility
//       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // Increased range
//       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 7; // Increased range
//       const z = 0;

//       setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

//       if (onFingerMove) {
//         onFingerMove([{ x, y, z, type: 'index' }]);
//       }
//     };

//     const handleClick = (e: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
//       const y = -((e.clientY - rect.top) / rect.height - 0.5) * 7;
//       const z = -0.8; // Enhanced tap depth for AR

//       if (onFingerMove) {
//         onFingerMove([{ x, y, z, type: 'index' }]);
//         setTimeout(() => {
//           onFingerMove([{ x, y, z: 0, type: 'index' }]);
//         }, 150);
//       }
//     };

//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('click', handleClick);

//     // Initialize camera with preference for rear camera in AR mode
//     const videoConstraints = {
//       width: 640, 
//       height: 480, 
//       facingMode: isARMode ? 'environment' : 'user' // Use rear camera for AR
//     };

//     navigator.mediaDevices.getUserMedia({ video: videoConstraints })
//     .then(stream => {
//       video.srcObject = stream;
//       video.play();
      
//       const drawFrame = () => {
//         const ctx = canvas.getContext('2d');
//         if (!ctx || video.readyState < 2) {
//           requestAnimationFrame(drawFrame);
//           return;
//         }

//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         // Enhanced cursor with AR-style indicator
//         ctx.beginPath();
//         ctx.arc(mousePosition.x, mousePosition.y, 12, 0, 2 * Math.PI);
//         ctx.fillStyle = isARMode ? '#10B981' : '#FFFF00';
//         ctx.fill();
//         ctx.strokeStyle = '#000000';
//         ctx.lineWidth = 3;
//         ctx.stroke();

//         // Enhanced crosshairs for better AR visibility
//         ctx.beginPath();
//         ctx.moveTo(mousePosition.x - 20, mousePosition.y);
//         ctx.lineTo(mousePosition.x + 20, mousePosition.y);
//         ctx.moveTo(mousePosition.x, mousePosition.y - 20);
//         ctx.lineTo(mousePosition.x, mousePosition.y + 20);
//         ctx.strokeStyle = isARMode ? '#EF4444' : '#FF0000';
//         ctx.lineWidth = 3;
//         ctx.stroke();

//         // AR mode indicator
//         if (isARMode) {
//           ctx.fillStyle = '#10B981';
//           ctx.font = 'bold 16px Arial';
//           ctx.fillText('AR MODE', 10, 30);
//         }

//         requestAnimationFrame(drawFrame);
//       };

//       drawFrame();
//       setIsLoading(false);
//     })
//     .catch(err => {
//       setError('Camera access denied. Using mouse tracking only.');
//       setIsLoading(false);
      
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillStyle = '#1a1a1a';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = '#FFFFFF';
//         ctx.font = '18px Arial';
//         ctx.textAlign = 'center';
//         ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2 - 20);
//         ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2);
//         ctx.fillText(`${isARMode ? 'AR Mode' : 'Standard Mode'} - Enhanced tracking`, canvas.width / 2, canvas.height / 2 + 20);
//         ctx.font = '14px Arial';
//         ctx.fillStyle = isARMode ? '#10B981' : '#FFFF00';
//         ctx.fillText('Extended range - supports all keyboard areas', canvas.width / 2, canvas.height / 2 + 45);
//       }
//     });

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       canvas.removeEventListener('click', handleClick);
//     };
//   };

//   // Enhanced MediaPipe initialization with AR optimizations
//   const initializeMediaPipe = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const loadScript = (src: string): Promise<void> => {
//         return new Promise((resolve, reject) => {
//           if (document.querySelector(`script[src*="mediapipe"]`)) {
//             resolve();
//             return;
//           }

//           const script = document.createElement('script');
//           script.src = src;
//           script.async = true;
//           script.defer = true;
          
//           script.onload = () => resolve();
//           script.onerror = () => reject(new Error(`Failed to load ${src}`));
          
//           document.head.appendChild(script);
//         });
//       };

//       await Promise.race([
//         loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
//         new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
//       ]);

//       await new Promise(resolve => setTimeout(resolve, 2000));

//       if (typeof window !== 'undefined' && (window as any).Hands) {
//         console.log('MediaPipe available, initializing for AR compatibility...');
//         setTrackingMode('mediapipe');
        
//         const hands = new (window as any).Hands({
//           locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
//         });

//         hands.setOptions({
//           maxNumHands: 2, // Track both hands
//           modelComplexity: 1, // Higher complexity for AR accuracy
//           minDetectionConfidence: 0.7, // Increased for AR stability
//           minTrackingConfidence: 0.6
//         });

//         hands.onResults((results: any) => {
//           const canvas = canvasRef.current;
//           if (!canvas) return;

//           const ctx = canvas.getContext('2d');
//           if (!ctx) return;

//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

//           // AR mode indicator
//           if (isARMode) {
//             ctx.fillStyle = '#10B981';
//             ctx.font = 'bold 18px Arial';
//             ctx.fillText('AR HAND TRACKING', 10, 30);
//           }

//           if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
//             const allFingertips: { x: number; y: number; z: number; type: string }[] = [];
            
//             // Process each detected hand
//             results.multiHandLandmarks.forEach((landmarks: any, handIndex: number) => {
//               const handColor = handIndex === 0 ? '#00FF00' : '#FF00FF';
              
//               // Draw all hand landmarks
//               landmarks.forEach((landmark: any, index: number) => {
//                 const x = landmark.x * canvas.width;
//                 const y = landmark.y * canvas.height;
                
//                 // Highlight fingertips
//                 const isFingertip = Object.values(FINGERTIP_LANDMARKS).includes(index);
                
//                 ctx.beginPath();
//                 ctx.arc(x, y, isFingertip ? 10 : 4, 0, 2 * Math.PI);
//                 ctx.fillStyle = isFingertip ? '#FFFF00' : handColor;
//                 ctx.fill();
                
//                 if (isFingertip) {
//                   ctx.strokeStyle = isARMode ? '#EF4444' : '#000000';
//                   ctx.lineWidth = 3;
//                   ctx.stroke();
                  
//                   // Enhanced text labels for AR
//                   ctx.fillStyle = '#FFFFFF';
//                   ctx.font = isARMode ? 'bold 12px Arial' : '10px Arial';
//                   ctx.textAlign = 'center';
//                   const fingerName = Object.entries(FINGERTIP_LANDMARKS).find(([_, idx]) => idx === index)?.[0] || '';
//                   ctx.fillText(fingerName, x, y - 15);
//                 }
//               });

//               // Extract all fingertip positions with AR coordinate mapping
//               Object.entries(FINGERTIP_LANDMARKS).forEach(([fingerType, landmarkIndex]) => {
//                 if (landmarks[landmarkIndex]) {
//                   const tip = landmarks[landmarkIndex];
//                   // Enhanced coordinate mapping for AR compatibility
//                   const x = (tip.x - 0.5) * 12; // Increased range for AR keyboard
//                   const y = -(tip.y - 0.5) * 8;  // Increased range for AR
//                   const z = tip.z * 4; // Enhanced depth sensitivity for AR
                  
//                   allFingertips.push({ x, y, z, type: fingerType });
//                 }
//               });
//             });

//             // Send all fingertips to the keyboard
//             if (allFingertips.length > 0 && onFingerMove) {
//               onFingerMove(allFingertips);
//             }

//             // AR performance overlay
//             if (isARMode) {
//               ctx.fillStyle = '#10B981';
//               ctx.font = '14px Arial';
//               ctx.fillText(`Fingers: ${allFingertips.length}`, canvas.width - 120, canvas.height - 20);
//             }
//           }
//         });

//         // Initialize camera with AR preference
//         const video = videoRef.current;
//         if (video) {
//           const videoConstraints = {
//             width: 640, 
//             height: 480, 
//             facingMode: isARMode ? 'environment' : 'user' // Rear camera for AR
//           };

//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: videoConstraints
//           });
          
//           video.srcObject = stream;
//           video.onloadedmetadata = () => {
//             video.play();
//             const processFrame = async () => {
//               if (video.readyState >= 2) {
//                 try {
//                   await hands.send({ image: video });
//                 } catch (err) {
//                   console.warn('Frame processing error, switching to fallback');
//                   initializeMouseTracking();
//                   return;
//                 }
//               }
//               requestAnimationFrame(processFrame);
//             };
//             processFrame();
//           };
//         }

//         setIsLoading(false);
//       } else {
//         throw new Error('MediaPipe not available');
//       }

//     } catch (err) {
//       console.log('MediaPipe failed, using enhanced mouse tracking fallback:', err);
//       setTrackingMode('mouse');
//       initializeMouseTracking();
//     }
//   };

//   useEffect(() => {
//     initializeMediaPipe();

//     return () => {
//       const video = videoRef.current;
//       if (video && video.srcObject) {
//         const stream = video.srcObject as MediaStream;
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [onFingerMove, isARMode]);

//   return (
//     <div className="relative">
//       <video 
//         ref={videoRef} 
//         style={{ display: 'none' }} 
//         playsInline
//         muted
//         autoPlay
//       />
//       <canvas 
//         ref={canvasRef} 
//         width={640} 
//         height={480}
//         className="rounded border cursor-crosshair"
//       />
      
//       {isLoading && (
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
//           <div className="text-white text-center">
//             <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
//             <p>Loading {isARMode ? 'AR' : 'standard'} hand tracking...</p>
//           </div>
//         </div>
//       )}
      
//       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
//         Mode: {trackingMode === 'mediapipe' ? 'Multi-Finger Hand Tracking' : 'Enhanced Mouse Tracking'}
//         {isARMode && ' (AR)'}
//       </div>
      
//       <div className={`absolute top-2 right-2 text-white px-2 py-1 rounded text-sm ${isARMode ? 'bg-green-600' : 'bg-blue-600'} bg-opacity-70`}>
//         {isARMode ? '🎯 AR Ready' : '✓ Standard Mode'}
//       </div>

//       {trackingMode === 'mediapipe' && (
//         <div className="absolute bottom-2 left-2 right-2 bg-purple-900 bg-opacity-70 text-white p-2 rounded text-xs">
//           All 5 fingertips tracked • {isARMode ? 'AR optimized range' : 'Enhanced range'} • 
//           {isARMode ? ' Rear camera for AR' : ' Front camera for standard'} • Both hands supported
//         </div>
//       )}

//       {trackingMode === 'mouse' && (
//         <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
//           Enhanced mouse tracking • {isARMode ? 'AR mode fallback' : 'Standard mode'} • 
//           Extended range for all keys including extreme positions
//         </div>
//       )}

//       {error && (
//         <div className="absolute top-12 left-2 right-2 bg-red-900 bg-opacity-70 text-white p-2 rounded text-xs">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

interface HandTrackerProps {
  onFingerMove?: (fingers: { x: number; y: number; z: number; type: string }[]) => void;
}

// MediaPipe hand landmark indices for fingertips
const FINGERTIP_LANDMARKS = {
  thumb: 4,
  index: 8,
  middle: 12,
  ring: 16,
  pinky: 20
};

export default function HandTracker({ onFingerMove }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingMode, setTrackingMode] = useState<'mediapipe' | 'mouse'>('mouse');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Enhanced mouse tracking with multiple cursor simulation
  const initializeMouseTracking = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Enhanced coordinate mapping for better coverage
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
      const z = 0;

      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      if (onFingerMove) {
        // Simulates an index finger moving
        onFingerMove([{ x, y, z, type: 'index' }]);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
      const z = -0.5; // Simulate a 'click' by changing the Z-depth

      if (onFingerMove) {
        onFingerMove([{ x, y, z, type: 'index' }]);
        // Revert Z after a short delay
        setTimeout(() => {
          onFingerMove([{ x, y, z: 0, type: 'index' }]);
        }, 100);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Initialize camera stream for background (optional but good practice)
    navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' }
    })
    .then(stream => {
      video.srcObject = stream;
      video.play();

      const drawFrame = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx || video.readyState < 2) {
          requestAnimationFrame(drawFrame);
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw enhanced cursor (crosshairs and circle)
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFF00'; // Yellow dot
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw crosshairs
        ctx.beginPath();
        ctx.moveTo(mousePosition.x - 15, mousePosition.y);
        ctx.lineTo(mousePosition.x + 15, mousePosition.y);
        ctx.moveTo(mousePosition.x, mousePosition.y - 15);
        ctx.lineTo(mousePosition.x, mousePosition.y + 15);
        ctx.strokeStyle = '#FF0000'; // Red cross
        ctx.lineWidth = 2;
        ctx.stroke();

        requestAnimationFrame(drawFrame);
      };

      drawFrame();
      setIsLoading(false);
      setTrackingMode('mouse'); // Ensure mode is set to mouse
    })
    .catch(err => {
      // If camera access is denied, run without video background
      setError('Camera access denied. Using mouse tracking only.');
      setIsLoading(false);
      setTrackingMode('mouse');

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Move mouse to control virtual keyboard', canvas.width / 2, canvas.height / 2);
        ctx.fillText('Click to type keys', canvas.width / 2, canvas.height / 2 + 25);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('Enhanced tracking - supports all keyboard areas', canvas.width / 2, canvas.height / 2 + 50);
      }
    });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  };

  // Enhanced MediaPipe initialization with multi-finger tracking
  const initializeMediaPipe = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          // Check if script already exists to prevent duplicate loading
          if (document.querySelector(`script[src*="mediapipe"]`)) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.defer = true;

          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load ${src}`));

          document.head.appendChild(script);
        });
      };

      // Load MediaPipe Hands script with a timeout
      await Promise.race([
        loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.min.js'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout loading MediaPipe')), 15000))
      ]);

      // Give a moment for the script to fully process after load
      await new Promise(resolve => setTimeout(resolve, 500));

      if (typeof window !== 'undefined' && (window as any).Hands) {
        console.log('MediaPipe available, initializing multi-finger tracking...');

        const hands = new (window as any).Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
        });

        hands.setOptions({
          maxNumHands: 2, // Track both hands
          modelComplexity: 1, // Higher complexity for better accuracy
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.5
        });

        hands.onResults((results: any) => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Draw the mirrored camera image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const allFingertips: { x: number; y: number; z: number; type: string }[] = [];

            // Process each detected hand
            results.multiHandLandmarks.forEach((landmarks: any, handIndex: number) => {
              const handColor = handIndex === 0 ? '#00FF00' : '#FF00FF'; // Green for hand 1, Magenta for hand 2

              // Draw all hand landmarks
              landmarks.forEach((landmark: any, index: number) => {
                const x = landmark.x * canvas.width;
                const y = landmark.y * canvas.height;

                // Highlight fingertips
                const isFingertip = Object.values(FINGERTIP_LANDMARKS).includes(index);

                ctx.beginPath();
                ctx.arc(x, y, isFingertip ? 8 : 3, 0, 2 * Math.PI);
                ctx.fillStyle = isFingertip ? '#FFFF00' : handColor;
                ctx.fill();

                if (isFingertip) {
                  ctx.strokeStyle = '#000000';
                  ctx.lineWidth = 2;
                  ctx.stroke();

                  // Add text label for fingertips
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = '10px Arial';
                  ctx.textAlign = 'center';
                  const fingerName = Object.entries(FINGERTIP_LANDMARKS).find(([_, idx]) => idx === index)?.[0] || '';
                  ctx.fillText(fingerName, x, y - 12);
                }
              });

              // Extract all fingertip positions and map to virtual space
              Object.entries(FINGERTIP_LANDMARKS).forEach(([fingerType, landmarkIndex]) => {
                if (landmarks[landmarkIndex]) {
                  const tip = landmarks[landmarkIndex];
                  // Enhanced coordinate mapping for better coverage:
                  // X: from [0, 1] to approx [-5, 5]
                  // Y: from [0, 1] to approx [-3.5, 3.5] (inverted)
                  // Z: from approx [-0.5, 0.5] to approx [-1.5, 1.5]
                  const x = (tip.x - 0.5) * 10;
                  const y = -(tip.y - 0.5) * 7;
                  const z = tip.z * 3;

                  allFingertips.push({ x, y, z, type: fingerType });
                }
              });
            });

            // Send all fingertips to the keyboard component
            if (allFingertips.length > 0 && onFingerMove) {
              onFingerMove(allFingertips);
            }
          }
        });

        // Initialize camera
        const video = videoRef.current;
        if (video) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: 'user' }
          });

          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            const processFrame = async () => {
              if (video.readyState >= 2) {
                try {
                  await hands.send({ image: video });
                } catch (err) {
                  console.warn('Frame processing error, switching to fallback');
                  initializeMouseTracking();
                  return;
                }
              }
              // Request next frame
              requestAnimationFrame(processFrame);
            };
            processFrame();
          };
        }

        setIsLoading(false);
        setTrackingMode('mediapipe');

      } else {
        throw new Error('MediaPipe not available');
      }

    } catch (err) {
      console.error('MediaPipe initialization failed:', err);
      // Fallback to mouse tracking
      setTrackingMode('mouse');
      initializeMouseTracking();
    }
  };

  useEffect(() => {
    initializeMediaPipe();

    // Cleanup function to stop the camera stream on unmount
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onFingerMove]);

  return (
    <div className="relative">
      {/* Video element is used as the source for MediaPipe but is hidden */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        playsInline
        muted
        autoPlay
      />
      {/* Canvas displays the video feed and landmarks/cursor */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="rounded border cursor-crosshair"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading multi-finger tracking...</p>
          </div>
        </div>
      )}

      {/* Mode Indicator */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
        Mode: {trackingMode === 'mediapipe' ? 'Multi-Finger Hand Tracking' : 'Enhanced Mouse Tracking'}
      </div>

      {/* Status Indicator */}
      <div className="absolute top-2 right-2 bg-green-600 bg-opacity-70 text-white px-2 py-1 rounded text-sm">
        ✓ All Fingers Active
      </div>

      {/* Tracking Details */}
      {trackingMode === 'mediapipe' && (
        <div className="absolute bottom-2 left-2 right-2 bg-purple-900 bg-opacity-70 text-white p-2 rounded text-xs">
          All 5 fingertips tracked • Enhanced range for extreme keys • Both hands supported
        </div>
      )}

      {trackingMode === 'mouse' && (
        <div className="absolute bottom-2 left-2 right-2 bg-blue-900 bg-opacity-70 text-white p-2 rounded text-xs">
          Enhanced mouse tracking • Extended range for all keys including Backspace
        </div>
      )}
    </div>
  );
}