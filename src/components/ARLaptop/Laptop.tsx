// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, ContactShadows } from "@react-three/drei";
// import Keyboard from "./Keyboard";

// export default function Laptop() {
//   const handleKeyPress = (key: string) => {
//     console.log("Pressed key:", key);
//   };

//   return (
//     <Canvas shadows camera={{ position: [0, 6, 12], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight
//         position={[10, 10, 5]}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//       />

//       {/* Laptop Screen */}
//       <mesh position={[0, 5, -2.8]} receiveShadow>
//         <boxGeometry args={[10, 6, 0.3]} />
//         <meshStandardMaterial color="#111" />
//       </mesh>

//       {/* Keyboard */}
//       {/* <Keyboard onKeyPress={handleKeyPress} /> */}

//       {/* Optional soft shadows */}
//       <ContactShadows
//         position={[0, 0, 0]}
//         scale={20}
//         blur={2}
//         far={10}
//       />

//       <OrbitControls />
//     </Canvas>
//   );
// }
// // "use client";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, ContactShadows, Text } from "@react-three/drei";
// // import Keyboard from "./Keyboard";

// // interface LaptopProps {
// //   typedText?: string;
// //   onKeyPress?: (key: string) => void;
// //   enableXR?: boolean;
// // }

// // export default function Laptop({ typedText = '', onKeyPress, enableXR = false }: LaptopProps) {
// //   const handleKeyPress = (key: string) => {
// //     console.log("Pressed key:", key);
// //     onKeyPress?.(key);
// //   };

// //   return (
// //     <Canvas 
// //       shadows 
// //       camera={{ position: [0, 6, 12], fov: 50 }}
// //       gl={{ 
// //         xr: enableXR ? { enabled: true } : undefined,
// //         antialias: true,
// //         alpha: true 
// //       }}
// //       onCreated={({ gl }) => {
// //         if (enableXR) {
// //           gl.xr.enabled = true;
// //           // Configure for rear camera on mobile
// //           gl.xr.setReferenceSpaceType?.('local');
// //         }
// //       }}
// //     >
// //       <ambientLight intensity={0.5} />
// //       <directionalLight
// //         position={[10, 10, 5]}
// //         castShadow
// //         shadow-mapSize-width={1024}
// //         shadow-mapSize-height={1024}
// //       />
      
// //       {/* Laptop Screen */}
// //       <mesh position={[0, 5, -2.8]} receiveShadow>
// //         <boxGeometry args={[10, 6, 0.3]} />
// //         <meshStandardMaterial color="#111" />
// //       </mesh>

// //       {/* Screen Content - Display typed text */}
// //       <mesh position={[0, 5, -2.65]}>
// //         <planeGeometry args={[9, 5]} />
// //         <meshBasicMaterial color="#000" />
// //       </mesh>
      
// //       {/* Typed Text Display */}
// //       <Text
// //         position={[0, 5, -2.6]}
// //         fontSize={0.4}
// //         color="#00ff00"
// //         anchorX="center"
// //         anchorY="middle"
// //         maxWidth={8}
// //         textAlign="center"
// //       >
// //         {typedText || "AR Virtual Keyboard\nStart typing..."}
// //       </Text>
      
// //       {/* Laptop Base */}
// //       <mesh position={[0, 1.5, -1]} receiveShadow castShadow>
// //         <boxGeometry args={[10, 0.5, 6]} />
// //         <meshStandardMaterial color="#2a2a2a" />
// //       </mesh>

// //       {/* Keyboard */}
// //       <Keyboard onKeyPress={handleKeyPress} />

// //       {/* Optional soft shadows */}
// //       <ContactShadows
// //         position={[0, 0, 0]}
// //         scale={20}
// //         blur={2}
// //         far={10}
// //       />
      
// //       <OrbitControls 
// //         enabled={!enableXR} // Disable orbit controls in AR mode
// //         maxPolarAngle={Math.PI / 2}
// //         minDistance={5}
// //         maxDistance={20}
// //       />
// //     </Canvas>
// //   );
// // }