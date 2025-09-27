"use client";

import { Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface KeyProps {
  label: string;
  position: [number, number, number];
  width?: number;
  onPress?: () => void;
}

export default function Key({ label, position, width = 1, onPress }: KeyProps) {
  const meshRef = useRef<Mesh>(null);
  const [pressed, setPressed] = useState(false);

  // Animate key press
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = pressed ? -0.1 : 0;
    }
  });

  const handlePress = () => {
    setPressed(true);
    onPress?.();
    setTimeout(() => setPressed(false), 100);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handlePress}
      castShadow
    >
      {/* Key body */}
      <boxGeometry args={[width, 0.2, 1]} />
      <meshStandardMaterial color={pressed ? "orange" : "lightgray"} />

      {/* Key label */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
}
