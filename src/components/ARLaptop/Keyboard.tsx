"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface KeyboardProps {
  position?: [number, number, number];
  onTextInput?: (text: string) => void;
  fingers?: { x: number; y: number; z: number; type: string }[];
  scale?: number;
}

interface KeyData {
  key: string;
  position: [number, number, number];
  width?: number;
  color?: string;
}

const KEYBOARD_LAYOUT: KeyData[][] = [
  [
    { key: "Q", position: [-4.5, 0, 0] },
    { key: "W", position: [-3.5, 0, 0] },
    { key: "E", position: [-2.5, 0, 0] },
    { key: "R", position: [-1.5, 0, 0] },
    { key: "T", position: [-0.5, 0, 0] },
    { key: "Y", position: [0.5, 0, 0] },
    { key: "U", position: [1.5, 0, 0] },
    { key: "I", position: [2.5, 0, 0] },
    { key: "O", position: [3.5, 0, 0] },
    { key: "P", position: [4.5, 0, 0] },
  ],
  [
    { key: "A", position: [-4, -1, 0] },
    { key: "S", position: [-3, -1, 0] },
    { key: "D", position: [-2, -1, 0] },
    { key: "F", position: [-1, -1, 0] },
    { key: "G", position: [0, -1, 0] },
    { key: "H", position: [1, -1, 0] },
    { key: "J", position: [2, -1, 0] },
    { key: "K", position: [3, -1, 0] },
    { key: "L", position: [4, -1, 0] },
  ],
  [
    { key: "Z", position: [-3.5, -2, 0] },
    { key: "X", position: [-2.5, -2, 0] },
    { key: "C", position: [-1.5, -2, 0] },
    { key: "V", position: [-0.5, -2, 0] },
    { key: "B", position: [0.5, -2, 0] },
    { key: "N", position: [1.5, -2, 0] },
    { key: "M", position: [2.5, -2, 0] },
    { key: "⌫", position: [4, -2, 0], width: 1.5, color: "#ff6b6b" },
  ],
  [
    { key: " ", position: [0, -3, 0], width: 6 },
  ],
];

function Key({ 
  keyData, 
  onPress, 
  isHighlighted = false,
  highlightColor = "#ffff00"
}: { 
  keyData: KeyData; 
  onPress: () => void;
  isHighlighted?: boolean;
  highlightColor?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pressed, setPressed] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = pressed ? -0.05 : 0;
    }
  });

  const handlePress = () => {
    setPressed(true);
    onPress();
    setTimeout(() => setPressed(false), 150);
  };

  const keyWidth = keyData.width || 1;
  const keyColor = isHighlighted ? highlightColor : (keyData.color || "#e0e0e0");

  return (
    <group position={keyData.position}>
      <mesh
        ref={meshRef}
        onClick={handlePress}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[keyWidth * 0.8, 0.1, 0.8]} />
        <meshStandardMaterial 
          color={keyColor}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      
      <Text
        position={[0, 0.06, 0]}
        fontSize={0.2}
        color="#333"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {keyData.key}
      </Text>
    </group>
  );
}

export default function VirtualKeyboard({ 
  position = [0, 0, 0], 
  onTextInput,
  fingers = [],
  scale = 1
}: KeyboardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [highlightedKeys, setHighlightedKeys] = useState<Set<string>>(new Set());

  // Detect finger proximity to keys
  useEffect(() => {
    const newHighlightedKeys = new Set<string>();

    fingers.forEach(finger => {
      // Convert finger coordinates to 3D space
      const fingerX = (finger.x - 0.5) * 10; // Scale and center
      const fingerY = -(finger.y - 0.5) * 6; // Invert Y and scale
      const fingerZ = finger.z * 2;

      KEYBOARD_LAYOUT.flat().forEach(keyData => {
        const keyX = keyData.position[0];
        const keyY = keyData.position[1];
        const keyZ = keyData.position[2];

        const distance = Math.sqrt(
          Math.pow(fingerX - keyX, 2) +
          Math.pow(fingerY - keyY, 2) +
          Math.pow(fingerZ - keyZ, 2)
        );

        // Highlight key if finger is close enough
        if (distance < 1.5) {
          newHighlightedKeys.add(keyData.key);
        }
      });
    });

    setHighlightedKeys(newHighlightedKeys);
  }, [fingers]);

  const handleKeyPress = (key: string) => {
    if (key === "⌫") {
      // Backspace functionality
      onTextInput?.("BACKSPACE");
    } else if (key === " ") {
      onTextInput?.(" ");
    } else {
      onTextInput?.(key.toLowerCase());
    }
  };

  const getFingerColor = (fingerType: string): string => {
    const colors: { [key: string]: string } = {
      thumb: "#ff6b6b",
      index: "#4ecdc4",
      middle: "#45b7d1",
      ring: "#96ceb4",
      pinky: "#ffeaa7"
    };
    return colors[fingerType] || "#ffffff";
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Keyboard base */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[11, 0.2, 5]} />
        <meshStandardMaterial color="#333" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Render all keys */}
      {KEYBOARD_LAYOUT.flat().map((keyData, index) => {
        const isHighlighted = highlightedKeys.has(keyData.key);
        
        // Find which finger is highlighting this key to get the color
        let highlightColor = "#ffff00";
        if (isHighlighted) {
          const highlightingFinger = fingers.find(finger => {
            const fingerX = (finger.x - 0.5) * 10;
            const fingerY = -(finger.y - 0.5) * 6;
            const fingerZ = finger.z * 2;
            
            const distance = Math.sqrt(
              Math.pow(fingerX - keyData.position[0], 2) +
              Math.pow(fingerY - keyData.position[1], 2) +
              Math.pow(fingerZ - keyData.position[2], 2)
            );
            
            return distance < 1.5;
          });
          
          if (highlightingFinger) {
            highlightColor = getFingerColor(highlightingFinger.type);
          }
        }

        return (
          <Key
            key={`${keyData.key}-${index}`}
            keyData={keyData}
            onPress={() => handleKeyPress(keyData.key)}
            isHighlighted={isHighlighted}
            highlightColor={highlightColor}
          />
        );
      })}

      {/* Visual feedback for finger positions */}
      {fingers.map((finger, index) => (
        <mesh
          key={`finger-${index}`}
          position={[
            (finger.x - 0.5) * 10,
            -(finger.y - 0.5) * 6 + 1,
            finger.z * 2 + 1
          ]}
        >
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial 
            color={getFingerColor(finger.type)}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}