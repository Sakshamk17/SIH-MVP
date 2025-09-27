"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Text } from "@react-three/drei";
import { XR, Controllers, Hands } from "@react-three/xr";
import Keyboard from "./Keyboard";

interface LaptopProps {
  typedText?: string;
  onKeyPress?: (key: string) => void;
  enableXR?: boolean;
  fingers?: { x: number; y: number; z: number; type: string }[];
}

export default function Laptop({ 
  typedText = '', 
  onKeyPress, 
  enableXR = false,
  fingers = []
}: LaptopProps) {
  const handleKeyPress = (key: string) => {
    console.log("Pressed key:", key);
    onKeyPress?.(key);
  };

  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 1.6, 3], fov: 50 }}
      gl={{ 
        antialias: true,
        alpha: true 
      }}
    >
      {enableXR && (
        <XR>
          <Controllers />
          <Hands />
        </XR>
      )}
      
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={0.8}
      />
      
      {/* Laptop Screen */}
      <mesh position={[0, 0.8, -0.4]} rotation={[-0.2, 0, 0]} receiveShadow>
        <boxGeometry args={[1.6, 1, 0.05]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Content - Display typed text */}
      <mesh position={[0, 0.8, -0.37]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      
      {/* Typed Text Display */}
      <Text
        position={[0, 0.8, -0.35]}
        rotation={[-0.2, 0, 0]}
        fontSize={0.08}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.4}
        textAlign="left"
      >
        {typedText || "AR Virtual Keyboard\nStart typing with hand gestures..."}
      </Text>
      
      {/* Laptop Base */}
      <mesh position={[0, 0.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.6, 0.1, 1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Keyboard Component */}
      <Keyboard 
        position={[0, 0.1, 0.2]}
        onTextInput={handleKeyPress}
        fingers={fingers}
        scale={0.8}
      />

      {/* Ground plane for AR */}
      {enableXR && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#444" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Optional soft shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        scale={3}
        blur={2}
        far={2}
        opacity={0.5}
      />
      
      {!enableXR && (
        <OrbitControls 
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={8}
          target={[0, 0.5, 0]}
        />
      )}
    </Canvas>
  );
}