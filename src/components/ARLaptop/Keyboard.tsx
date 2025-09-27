
// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // // // // // // import { useState, useEffect } from "react";

// // // // // // // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\",""],
// // // // // // // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // // // // // // //   ["Space"]
// // // // // // // // // // // // ];

// // // // // // // // // // // // interface KeyProps {
// // // // // // // // // // // //   letter: string;
// // // // // // // // // // // //   position: [number, number, number];
// // // // // // // // // // // //   onKeyPress: (key: string) => void;
// // // // // // // // // // // //   isHighlighted?: boolean;
// // // // // // // // // // // // }

// // // // // // // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <group position={position}>
// // // // // // // // // // // //       <Box
// // // // // // // // // // // //         args={[letter === "Space" ? 3 : 0.6, 0.3, 0.1]}
// // // // // // // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // // // // // // //         onPointerDown={() => {
// // // // // // // // // // // //           setPressed(true);
// // // // // // // // // // // //           onKeyPress(letter);
// // // // // // // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // // // // // // //         }}
// // // // // // // // // // // //         onPointerUp={() => setPressed(false)}
// // // // // // // // // // // //       >
// // // // // // // // // // // //         <meshStandardMaterial
// // // // // // // // // // // //           color={
// // // // // // // // // // // //             pressed
// // // // // // // // // // // //               ? "#4ade80"
// // // // // // // // // // // //               : isHighlighted
// // // // // // // // // // // //               ? "#f59e0b"
// // // // // // // // // // // //               : hovered
// // // // // // // // // // // //               ? "#60a5fa"
// // // // // // // // // // // //               : "#374151"
// // // // // // // // // // // //           }
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </Box>
// // // // // // // // // // // //       <Text
// // // // // // // // // // // //         position={[0, 0, 0.06]}
// // // // // // // // // // // //         fontSize={0.12}
// // // // // // // // // // // //         color="white"
// // // // // // // // // // // //         anchorX="center"
// // // // // // // // // // // //         anchorY="middle"
// // // // // // // // // // // //       >
// // // // // // // // // // // //         {letter}
// // // // // // // // // // // //       </Text>
// // // // // // // // // // // //     </group>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // interface VirtualKeyboardProps {
// // // // // // // // // // // //   position?: [number, number, number];
// // // // // // // // // // // //   onTextInput?: (text: string) => void;
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function VirtualKeyboard({ position = [0, 0, 0], onTextInput }: VirtualKeyboardProps) {
// // // // // // // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

// // // // // // // // // // // //   // Placeholder for future hand tracking highlighting
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     setHighlightedKey(null); // No finger input yet
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // // // // // // //     if (key === "Backspace") {
// // // // // // // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     if (key === "Space") {
// // // // // // // // // // // //       const newText = typedText + " ";
// // // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     if (key === "Enter") {
// // // // // // // // // // // //       const newText = typedText + "\n";
// // // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     if (["Shift","Caps","Tab"].includes(key)) {
// // // // // // // // // // // //       // TODO: Implement Shift/Caps/Tab logic
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }
// // // // // // // // // // // //     const newText = typedText + key;
// // // // // // // // // // // //     setTypedText(newText);
// // // // // // // // // // // //     onTextInput?.(newText);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <group position={position}>
// // // // // // // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // // // // // // //         row.map((key, keyIndex) => {
// // // // // // // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.7;
// // // // // // // // // // // //           const yOffset = -rowIndex * 0.5;
// // // // // // // // // // // //           return (
// // // // // // // // // // // //             <Key
// // // // // // // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // // // // // // //               letter={key}
// // // // // // // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // // // // // // //               onKeyPress={handleKeyPress}
// // // // // // // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           );
// // // // // // // // // // // //         })
// // // // // // // // // // // //       )}

// // // // // // // // // // // //       {/* Typed text display */}
// // // // // // // // // // // //       {typedText && (
// // // // // // // // // // // //         <Text
// // // // // // // // // // // //           position={[0, 1.2, 0]}
// // // // // // // // // // // //           fontSize={0.15}
// // // // // // // // // // // //           color="#4ade80"
// // // // // // // // // // // //           anchorX="center"
// // // // // // // // // // // //           anchorY="middle"
// // // // // // // // // // // //           maxWidth={6}
// // // // // // // // // // // //         >
// // // // // // // // // // // //           {typedText}
// // // // // // // // // // // //         </Text>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </group>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // "use client";

// // // // // // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\",""],
// // // // // // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // // // // // //   ["Space"]
// // // // // // // // // // // ];

// // // // // // // // // // // interface KeyProps {
// // // // // // // // // // //   letter: string;
// // // // // // // // // // //   position: [number, number, number];
// // // // // // // // // // //   onKeyPress: (key: string) => void;
// // // // // // // // // // //   isHighlighted?: boolean;
// // // // // // // // // // // }

// // // // // // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <group position={position}>
// // // // // // // // // // //       <Box
// // // // // // // // // // //         args={[letter === "Space" ? 3 : 0.6, 0.3, 0.1]}
// // // // // // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // // // // // //         onPointerDown={() => {
// // // // // // // // // // //           setPressed(true);
// // // // // // // // // // //           onKeyPress(letter);
// // // // // // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // // // // // //         }}
// // // // // // // // // // //         onPointerUp={() => setPressed(false)}
// // // // // // // // // // //       >
// // // // // // // // // // //         <meshStandardMaterial
// // // // // // // // // // //           color={
// // // // // // // // // // //             pressed
// // // // // // // // // // //               ? "#4ade80"
// // // // // // // // // // //               : isHighlighted
// // // // // // // // // // //               ? "#f59e0b"
// // // // // // // // // // //               : hovered
// // // // // // // // // // //               ? "#60a5fa"
// // // // // // // // // // //               : "#374151"
// // // // // // // // // // //           }
// // // // // // // // // // //         />
// // // // // // // // // // //       </Box>
// // // // // // // // // // //       <Text
// // // // // // // // // // //         position={[0, 0, 0.06]}
// // // // // // // // // // //         fontSize={0.12}
// // // // // // // // // // //         color="white"
// // // // // // // // // // //         anchorX="center"
// // // // // // // // // // //         anchorY="middle"
// // // // // // // // // // //       >
// // // // // // // // // // //         {letter}
// // // // // // // // // // //       </Text>
// // // // // // // // // // //     </group>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // interface VirtualKeyboardProps {
// // // // // // // // // // //   position?: [number, number, number];
// // // // // // // // // // //   onTextInput?: (text: string) => void;
// // // // // // // // // // //   fingers?: { x: number; y: number; z: number }[]; // 👆 from HandTracker
// // // // // // // // // // // }

// // // // // // // // // // // export default function VirtualKeyboard({
// // // // // // // // // // //   position = [0, 0, 0],
// // // // // // // // // // //   onTextInput,
// // // // // // // // // // //   fingers = [],
// // // // // // // // // // // }: VirtualKeyboardProps) {
// // // // // // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // // // // // // //   const lastZ = useRef<number | null>(null);

// // // // // // // // // // //   // Detect fingertip overlaps
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!fingers.length) {
// // // // // // // // // // //       setHighlightedKey(null);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const finger = fingers[0]; // index fingertip (landmark 8)

// // // // // // // // // // //     let closestKey: string | null = null;

// // // // // // // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // // // // // // //       row.forEach((key, keyIndex) => {
// // // // // // // // // // //         if (!key) return;
// // // // // // // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.7;
// // // // // // // // // // //         const yOffset = -rowIndex * 0.5;

// // // // // // // // // // //         // Define bounding box of the key
// // // // // // // // // // //         const keyWidth = key === "Space" ? 3 : 0.6;
// // // // // // // // // // //         const keyHeight = 0.3;

// // // // // // // // // // //         if (
// // // // // // // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // // // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // // // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // // // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // // // // // // //         ) {
// // // // // // // // // // //           closestKey = key;

// // // // // // // // // // //           // Z-movement check → detect tap
// // // // // // // // // // //           if (lastZ.current !== null && finger.z < lastZ.current - 0.02) {
// // // // // // // // // // //             handleKeyPress(key);
// // // // // // // // // // //           }
// // // // // // // // // // //           lastZ.current = finger.z;
// // // // // // // // // // //         }
// // // // // // // // // // //       });
// // // // // // // // // // //     });

// // // // // // // // // // //     setHighlightedKey(closestKey);
// // // // // // // // // // //   }, [fingers]);

// // // // // // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // // // // // //     if (key === "Backspace") {
// // // // // // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (key === "Space") {
// // // // // // // // // // //       const newText = typedText + " ";
// // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (key === "Enter") {
// // // // // // // // // // //       const newText = typedText + "\n";
// // // // // // // // // // //       setTypedText(newText);
// // // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // // // // // // //       // TODO: Implement Shift/Caps/Tab logic
// // // // // // // // // // //       return;
// // // // // // // // // // //     }
// // // // // // // // // // //     const newText = typedText + key;
// // // // // // // // // // //     setTypedText(newText);
// // // // // // // // // // //     onTextInput?.(newText);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <group position={position}>
// // // // // // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // // // // // //         row.map((key, keyIndex) => {
// // // // // // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.7;
// // // // // // // // // // //           const yOffset = -rowIndex * 0.5;
// // // // // // // // // // //           return (
// // // // // // // // // // //             <Key
// // // // // // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // // // // // //               letter={key}
// // // // // // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // // // // // //               onKeyPress={handleKeyPress}
// // // // // // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // // // // // //             />
// // // // // // // // // // //           );
// // // // // // // // // // //         })
// // // // // // // // // // //       )}

// // // // // // // // // // //       {/* Typed text display */}
// // // // // // // // // // //       {typedText && (
// // // // // // // // // // //         <Text
// // // // // // // // // // //           position={[0, 1.2, 0]}
// // // // // // // // // // //           fontSize={0.15}
// // // // // // // // // // //           color="#4ade80"
// // // // // // // // // // //           anchorX="center"
// // // // // // // // // // //           anchorY="middle"
// // // // // // // // // // //           maxWidth={6}
// // // // // // // // // // //         >
// // // // // // // // // // //           {typedText}
// // // // // // // // // // //         </Text>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </group>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // "use client";

// // // // // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // // // // //   ["Space"]
// // // // // // // // // // ];

// // // // // // // // // // interface KeyProps {
// // // // // // // // // //   letter: string;
// // // // // // // // // //   position: [number, number, number];
// // // // // // // // // //   onKeyPress: (key: string) => void;
// // // // // // // // // //   isHighlighted?: boolean;
// // // // // // // // // // }

// // // // // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // // // // // // //   return (
// // // // // // // // // //     <group position={position}>
// // // // // // // // // //       <Box
// // // // // // // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // // // // //         onPointerDown={() => {
// // // // // // // // // //           setPressed(true);
// // // // // // // // // //           onKeyPress(letter);
// // // // // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // // // // //         }}
// // // // // // // // // //       >
// // // // // // // // // //         <meshStandardMaterial
// // // // // // // // // //           color={
// // // // // // // // // //             pressed
// // // // // // // // // //               ? "#10B981"
// // // // // // // // // //               : isHighlighted
// // // // // // // // // //               ? "#F59E0B"
// // // // // // // // // //               : hovered
// // // // // // // // // //               ? "#3B82F6"
// // // // // // // // // //               : "#374151"
// // // // // // // // // //           }
// // // // // // // // // //         />
// // // // // // // // // //       </Box>
// // // // // // // // // //       <Text
// // // // // // // // // //         position={[0, 0, 0.06]}
// // // // // // // // // //         fontSize={0.15}
// // // // // // // // // //         color="white"
// // // // // // // // // //         anchorX="center"
// // // // // // // // // //         anchorY="middle"
// // // // // // // // // //       >
// // // // // // // // // //         {letter}
// // // // // // // // // //       </Text>
// // // // // // // // // //     </group>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // interface VirtualKeyboardProps {
// // // // // // // // // //   position?: [number, number, number];
// // // // // // // // // //   onTextInput?: (text: string) => void;
// // // // // // // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // // // // // // }

// // // // // // // // // // export default function VirtualKeyboard({
// // // // // // // // // //   position = [0, 0, 0],
// // // // // // // // // //   onTextInput,
// // // // // // // // // //   fingers = [],
// // // // // // // // // // }: VirtualKeyboardProps) {
// // // // // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // // // // // //   const lastTapTime = useRef(0);
// // // // // // // // // //   const lastZ = useRef<{[key: string]: number}>({});

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!fingers.length) {
// // // // // // // // // //       setHighlightedKey(null);
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const finger = fingers[0];
// // // // // // // // // //     let closestKey: string | null = null;
// // // // // // // // // //     let minDistance = Infinity;

// // // // // // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // // // // // //       row.forEach((key, keyIndex) => {
// // // // // // // // // //         if (!key) return;
        
// // // // // // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // // // //         const yOffset = -rowIndex * 0.6;

// // // // // // // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // // // // // // //         const keyHeight = 0.4;

// // // // // // // // // //         // Check if finger is over key
// // // // // // // // // //         if (
// // // // // // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // // // // // //         ) {
// // // // // // // // // //           const distance = Math.abs(finger.z);
// // // // // // // // // //           if (distance < minDistance) {
// // // // // // // // // //             closestKey = key;
// // // // // // // // // //             minDistance = distance;
// // // // // // // // // //           }

// // // // // // // // // //           // Detect tap gesture (Z movement)
// // // // // // // // // //           const now = Date.now();
// // // // // // // // // //           if (lastZ.current[key] !== undefined) {
// // // // // // // // // //             const zDiff = lastZ.current[key] - finger.z;
// // // // // // // // // //             if (zDiff > 0.3 && now - lastTapTime.current > 500) { // Tap threshold
// // // // // // // // // //               handleKeyPress(key);
// // // // // // // // // //               lastTapTime.current = now;
// // // // // // // // // //             }
// // // // // // // // // //           }
// // // // // // // // // //           lastZ.current[key] = finger.z;
// // // // // // // // // //         }
// // // // // // // // // //       });
// // // // // // // // // //     });

// // // // // // // // // //     setHighlightedKey(closestKey);
// // // // // // // // // //   }, [fingers]);

// // // // // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // // // // //     if (key === "Backspace") {
// // // // // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // // // // //       setTypedText(newText);
// // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     if (key === "Space") {
// // // // // // // // // //       const newText = typedText + " ";
// // // // // // // // // //       setTypedText(newText);
// // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     if (key === "Enter") {
// // // // // // // // // //       const newText = typedText + "\n";
// // // // // // // // // //       setTypedText(newText);
// // // // // // // // // //       onTextInput?.(newText);
// // // // // // // // // //       return;
// // // // // // // // // //     }
// // // // // // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // // // // // //       return; // TODO: Implement modifier keys
// // // // // // // // // //     }
    
// // // // // // // // // //     const newText = typedText + key;
// // // // // // // // // //     setTypedText(newText);
// // // // // // // // // //     onTextInput?.(newText);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <group position={position}>
// // // // // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // // // // //         row.map((key, keyIndex) => {
// // // // // // // // // //           if (!key) return null;
// // // // // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // // // //           const yOffset = -rowIndex * 0.6;
// // // // // // // // // //           return (
// // // // // // // // // //             <Key
// // // // // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // // // // //               letter={key}
// // // // // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // // // // //               onKeyPress={handleKeyPress}
// // // // // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // // // // //             />
// // // // // // // // // //           );
// // // // // // // // // //         })
// // // // // // // // // //       )}

// // // // // // // // // //       {/* Text display */}
// // // // // // // // // //       {typedText && (
// // // // // // // // // //         <Text
// // // // // // // // // //           position={[0, 1.5, 0]}
// // // // // // // // // //           fontSize={0.2}
// // // // // // // // // //           color="#10B981"
// // // // // // // // // //           anchorX="center"
// // // // // // // // // //           anchorY="middle"
// // // // // // // // // //           maxWidth={8}
// // // // // // // // // //           textAlign="center"
// // // // // // // // // //         >
// // // // // // // // // //           {typedText}
// // // // // // // // // //         </Text>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* Finger indicators */}
// // // // // // // // // //       {fingers.map((finger, index) => (
// // // // // // // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // // // // // // //           <sphereGeometry args={[0.05]} />
// // // // // // // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // // // // // // //         </mesh>
// // // // // // // // // //       ))}
// // // // // // // // // //     </group>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // "use client";

// // // // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // // // //   ["Space"]
// // // // // // // // // ];

// // // // // // // // // interface KeyProps {
// // // // // // // // //   letter: string;
// // // // // // // // //   position: [number, number, number];
// // // // // // // // //   onKeyPress: (key: string) => void;
// // // // // // // // //   isHighlighted?: boolean;
// // // // // // // // // }

// // // // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // // // // // //   return (
// // // // // // // // //     <group position={position}>
// // // // // // // // //       <Box
// // // // // // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // // // //         onPointerDown={() => {
// // // // // // // // //           setPressed(true);
// // // // // // // // //           onKeyPress(letter);
// // // // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // // // //         }}
// // // // // // // // //       >
// // // // // // // // //         <meshStandardMaterial
// // // // // // // // //           color={
// // // // // // // // //             pressed
// // // // // // // // //               ? "#10B981"
// // // // // // // // //               : isHighlighted
// // // // // // // // //               ? "#F59E0B"
// // // // // // // // //               : hovered
// // // // // // // // //               ? "#3B82F6"
// // // // // // // // //               : "#374151"
// // // // // // // // //           }
// // // // // // // // //         />
// // // // // // // // //       </Box>
// // // // // // // // //       <Text
// // // // // // // // //         position={[0, 0, 0.06]}
// // // // // // // // //         fontSize={0.15}
// // // // // // // // //         color="white"
// // // // // // // // //         anchorX="center"
// // // // // // // // //         anchorY="middle"
// // // // // // // // //       >
// // // // // // // // //         {letter}
// // // // // // // // //       </Text>
// // // // // // // // //     </group>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // interface VirtualKeyboardProps {
// // // // // // // // //   position?: [number, number, number];
// // // // // // // // //   onTextInput?: (text: string) => void;
// // // // // // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // // // // // }

// // // // // // // // // export default function VirtualKeyboard({
// // // // // // // // //   position = [0, 0, 0],
// // // // // // // // //   onTextInput,
// // // // // // // // //   fingers = [],
// // // // // // // // // }: VirtualKeyboardProps) {
// // // // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // // // // //   const lastTapTime = useRef(0);
// // // // // // // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // // // // // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!fingers.length) {
// // // // // // // // //       setHighlightedKey(null);
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const finger = fingers[0];
// // // // // // // // //     let closestKey: string | null = null;
// // // // // // // // //     let minDistance = Infinity;

// // // // // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // // // // //       row.forEach((key, keyIndex) => {
// // // // // // // // //         if (!key) return;
        
// // // // // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // // //         const yOffset = -rowIndex * 0.6;

// // // // // // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // // // // // //         const keyHeight = 0.4;

// // // // // // // // //         // Check if finger is over key
// // // // // // // // //         if (
// // // // // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // // // // //         ) {
// // // // // // // // //           const distance = Math.abs(finger.z);
// // // // // // // // //           if (distance < minDistance) {
// // // // // // // // //             closestKey = key;
// // // // // // // // //             minDistance = distance;
// // // // // // // // //           }

// // // // // // // // //           // Enhanced tap detection with multiple methods
// // // // // // // // //           const now = Date.now();
// // // // // // // // //           const cooldownKey = `${key}_cooldown`;
          
// // // // // // // // //           // Method 1: Z-depth based tap detection (for pinch gestures)
// // // // // // // // //           if (finger.z < -0.5 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 800)) {
// // // // // // // // //             console.log(`Tap detected on key: ${key} (depth method)`);
// // // // // // // // //             handleKeyPress(key);
// // // // // // // // //             tapCooldown.current[cooldownKey] = now;
// // // // // // // // //           }
          
// // // // // // // // //           // Method 2: Z-movement based tap detection (for forward motion)
// // // // // // // // //           if (lastZ.current[key] !== undefined) {
// // // // // // // // //             const zDiff = lastZ.current[key] - finger.z;
// // // // // // // // //             if (zDiff > 0.3 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 800)) {
// // // // // // // // //               console.log(`Tap detected on key: ${key} (movement method)`);
// // // // // // // // //               handleKeyPress(key);
// // // // // // // // //               tapCooldown.current[cooldownKey] = now;
// // // // // // // // //             }
// // // // // // // // //           }
          
// // // // // // // // //           lastZ.current[key] = finger.z;
// // // // // // // // //         }
// // // // // // // // //       });
// // // // // // // // //     });

// // // // // // // // //     setHighlightedKey(closestKey);
// // // // // // // // //   }, [fingers]);

// // // // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // // // //     if (key === "Backspace") {
// // // // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // // // //       setTypedText(newText);
// // // // // // // // //       onTextInput?.(newText);
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (key === "Space") {
// // // // // // // // //       const newText = typedText + " ";
// // // // // // // // //       setTypedText(newText);
// // // // // // // // //       onTextInput?.(newText);
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (key === "Enter") {
// // // // // // // // //       const newText = typedText + "\n";
// // // // // // // // //       setTypedText(newText);
// // // // // // // // //       onTextInput?.(newText);
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // // // // //       return; // TODO: Implement modifier keys
// // // // // // // // //     }
    
// // // // // // // // //     const newText = typedText + key;
// // // // // // // // //     setTypedText(newText);
// // // // // // // // //     onTextInput?.(newText);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <group position={position}>
// // // // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // // // //         row.map((key, keyIndex) => {
// // // // // // // // //           if (!key) return null;
// // // // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // // //           const yOffset = -rowIndex * 0.6;
// // // // // // // // //           return (
// // // // // // // // //             <Key
// // // // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // // // //               letter={key}
// // // // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // // // //               onKeyPress={handleKeyPress}
// // // // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // // // //             />
// // // // // // // // //           );
// // // // // // // // //         })
// // // // // // // // //       )}

// // // // // // // // //       {/* Text display */}
// // // // // // // // //       {typedText && (
// // // // // // // // //         <Text
// // // // // // // // //           position={[0, 1.5, 0]}
// // // // // // // // //           fontSize={0.2}
// // // // // // // // //           color="#10B981"
// // // // // // // // //           anchorX="center"
// // // // // // // // //           anchorY="middle"
// // // // // // // // //           maxWidth={8}
// // // // // // // // //           textAlign="center"
// // // // // // // // //         >
// // // // // // // // //           {typedText}
// // // // // // // // //         </Text>
// // // // // // // // //       )}

// // // // // // // // //       {/* Finger indicators */}
// // // // // // // // //       {fingers.map((finger, index) => (
// // // // // // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // // // // // //           <sphereGeometry args={[0.05]} />
// // // // // // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // // // // // //         </mesh>
// // // // // // // // //       ))}
// // // // // // // // //     </group>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // "use client";

// // // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // // //   ["Space"]
// // // // // // // // ];

// // // // // // // // interface KeyProps {
// // // // // // // //   letter: string;
// // // // // // // //   position: [number, number, number];
// // // // // // // //   onKeyPress: (key: string) => void;
// // // // // // // //   isHighlighted?: boolean;
// // // // // // // // }

// // // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // // // // //   return (
// // // // // // // //     <group position={position}>
// // // // // // // //       <Box
// // // // // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // // //         onPointerDown={() => {
// // // // // // // //           setPressed(true);
// // // // // // // //           onKeyPress(letter);
// // // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // // //         }}
// // // // // // // //       >
// // // // // // // //         <meshStandardMaterial
// // // // // // // //           color={
// // // // // // // //             pressed
// // // // // // // //               ? "#10B981"
// // // // // // // //               : isHighlighted
// // // // // // // //               ? "#F59E0B"
// // // // // // // //               : hovered
// // // // // // // //               ? "#3B82F6"
// // // // // // // //               : "#374151"
// // // // // // // //           }
// // // // // // // //         />
// // // // // // // //       </Box>
// // // // // // // //       <Text
// // // // // // // //         position={[0, 0, 0.06]}
// // // // // // // //         fontSize={0.15}
// // // // // // // //         color="white"
// // // // // // // //         anchorX="center"
// // // // // // // //         anchorY="middle"
// // // // // // // //       >
// // // // // // // //         {letter}
// // // // // // // //       </Text>
// // // // // // // //     </group>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // interface VirtualKeyboardProps {
// // // // // // // //   position?: [number, number, number];
// // // // // // // //   onTextInput?: (text: string) => void;
// // // // // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // // // // }

// // // // // // // // export default function VirtualKeyboard({
// // // // // // // //   position = [0, 0, 0],
// // // // // // // //   onTextInput,
// // // // // // // //   fingers = [],
// // // // // // // // }: VirtualKeyboardProps) {
// // // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // // // //   const lastTapTime = useRef(0);
// // // // // // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // // // // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!fingers.length) {
// // // // // // // //       setHighlightedKey(null);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const finger = fingers[0];
// // // // // // // //     let closestKey: string | null = null;
// // // // // // // //     let minDistance = Infinity;

// // // // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // // // //       row.forEach((key, keyIndex) => {
// // // // // // // //         if (!key) return;
        
// // // // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // //         const yOffset = -rowIndex * 0.6;

// // // // // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // // // // //         const keyHeight = 0.4;

// // // // // // // //         // Check if finger is over key
// // // // // // // //         if (
// // // // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // // // //         ) {
// // // // // // // //           const distance = Math.abs(finger.z);
// // // // // // // //           if (distance < minDistance) {
// // // // // // // //             closestKey = key;
// // // // // // // //             minDistance = distance;
// // // // // // // //           }

// // // // // // // //           // Simplified tap detection - any negative Z value triggers tap
// // // // // // // //           const now = Date.now();
// // // // // // // //           const cooldownKey = `${key}_cooldown`;
          
// // // // // // // //           if (finger.z < -0.2 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 600)) {
// // // // // // // //             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z})`);
// // // // // // // //             handleKeyPress(key);
// // // // // // // //             tapCooldown.current[cooldownKey] = now;
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       });
// // // // // // // //     });

// // // // // // // //     setHighlightedKey(closestKey);
// // // // // // // //   }, [fingers]);

// // // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // // //     if (key === "Backspace") {
// // // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // // //       setTypedText(newText);
// // // // // // // //       onTextInput?.(newText);
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (key === "Space") {
// // // // // // // //       const newText = typedText + " ";
// // // // // // // //       setTypedText(newText);
// // // // // // // //       onTextInput?.(newText);
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (key === "Enter") {
// // // // // // // //       const newText = typedText + "\n";
// // // // // // // //       setTypedText(newText);
// // // // // // // //       onTextInput?.(newText);
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // // // //       return; // TODO: Implement modifier keys
// // // // // // // //     }
    
// // // // // // // //     const newText = typedText + key;
// // // // // // // //     setTypedText(newText);
// // // // // // // //     onTextInput?.(newText);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <group position={position}>
// // // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // // //         row.map((key, keyIndex) => {
// // // // // // // //           if (!key) return null;
// // // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // // //           const yOffset = -rowIndex * 0.6;
// // // // // // // //           return (
// // // // // // // //             <Key
// // // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // // //               letter={key}
// // // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // // //               onKeyPress={handleKeyPress}
// // // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // // //             />
// // // // // // // //           );
// // // // // // // //         })
// // // // // // // //       )}

// // // // // // // //       {/* Text display */}
// // // // // // // //       {typedText && (
// // // // // // // //         <Text
// // // // // // // //           position={[0, 1.5, 0]}
// // // // // // // //           fontSize={0.2}
// // // // // // // //           color="#10B981"
// // // // // // // //           anchorX="center"
// // // // // // // //           anchorY="middle"
// // // // // // // //           maxWidth={8}
// // // // // // // //           textAlign="center"
// // // // // // // //         >
// // // // // // // //           {typedText}
// // // // // // // //         </Text>
// // // // // // // //       )}

// // // // // // // //       {/* Finger indicators */}
// // // // // // // //       {fingers.map((finger, index) => (
// // // // // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // // // // //           <sphereGeometry args={[0.05]} />
// // // // // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // // // // //         </mesh>
// // // // // // // //       ))}
// // // // // // // //     </group>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // "use client";

// // // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // // const KEYBOARD_LAYOUT = [
// // // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // // //   ["Space"]
// // // // // // // ];

// // // // // // // interface KeyProps {
// // // // // // //   letter: string;
// // // // // // //   position: [number, number, number];
// // // // // // //   onKeyPress: (key: string) => void;
// // // // // // //   isHighlighted?: boolean;
// // // // // // // }

// // // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // // //   const [hovered, setHovered] = useState(false);
// // // // // // //   const [pressed, setPressed] = useState(false);

// // // // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // // // //   return (
// // // // // // //     <group position={position}>
// // // // // // //       <Box
// // // // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // // //         onPointerDown={() => {
// // // // // // //           setPressed(true);
// // // // // // //           onKeyPress(letter);
// // // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <meshStandardMaterial
// // // // // // //           color={
// // // // // // //             pressed
// // // // // // //               ? "#10B981"
// // // // // // //               : isHighlighted
// // // // // // //               ? "#F59E0B"
// // // // // // //               : hovered
// // // // // // //               ? "#3B82F6"
// // // // // // //               : "#374151"
// // // // // // //           }
// // // // // // //         />
// // // // // // //       </Box>
// // // // // // //       <Text
// // // // // // //         position={[0, 0, 0.06]}
// // // // // // //         fontSize={0.15}
// // // // // // //         color="white"
// // // // // // //         anchorX="center"
// // // // // // //         anchorY="middle"
// // // // // // //       >
// // // // // // //         {letter}
// // // // // // //       </Text>
// // // // // // //     </group>
// // // // // // //   );
// // // // // // // }

// // // // // // // interface VirtualKeyboardProps {
// // // // // // //   position?: [number, number, number];
// // // // // // //   onTextInput?: (text: string) => void;
// // // // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // // // }

// // // // // // // export default function VirtualKeyboard({
// // // // // // //   position = [0, 0, 0],
// // // // // // //   onTextInput,
// // // // // // //   fingers = [],
// // // // // // // }: VirtualKeyboardProps) {
// // // // // // //   const [typedText, setTypedText] = useState("");
// // // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // // //   const lastTapTime = useRef(0);
// // // // // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // // // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // // // // //   useEffect(() => {
// // // // // // //     if (!fingers.length) {
// // // // // // //       setHighlightedKey(null);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const finger = fingers[0];
// // // // // // //     let closestKey: string | null = null;
// // // // // // //     let minDistance = Infinity;

// // // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // // //       row.forEach((key, keyIndex) => {
// // // // // // //         if (!key) return;
        
// // // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // //         const yOffset = -rowIndex * 0.6;

// // // // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // // // //         const keyHeight = 0.4;

// // // // // // //         // Check if finger is over key
// // // // // // //         if (
// // // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // // //         ) {
// // // // // // //           const distance = Math.abs(finger.z);
// // // // // // //           if (distance < minDistance) {
// // // // // // //             closestKey = key;
// // // // // // //             minDistance = distance;
// // // // // // //           }

// // // // // // //           // Simplified tap detection - any negative Z value triggers tap
// // // // // // //           const now = Date.now();
// // // // // // //           const cooldownKey = `${key}_cooldown`;
          
// // // // // // //           if (finger.z < -0.1 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 400)) {
// // // // // // //             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z.toFixed(3)})`);
// // // // // // //             handleKeyPress(key);
// // // // // // //             tapCooldown.current[cooldownKey] = now;
// // // // // // //           }
// // // // // // //         }
// // // // // // //       });
// // // // // // //     });

// // // // // // //     setHighlightedKey(closestKey);
// // // // // // //   }, [fingers]);

// // // // // // //   const handleKeyPress = (key: string) => {
// // // // // // //     if (key === "Backspace") {
// // // // // // //       const newText = typedText.slice(0, -1);
// // // // // // //       setTypedText(newText);
// // // // // // //       onTextInput?.(newText);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (key === "Space") {
// // // // // // //       const newText = typedText + " ";
// // // // // // //       setTypedText(newText);
// // // // // // //       onTextInput?.(newText);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (key === "Enter") {
// // // // // // //       const newText = typedText + "\n";
// // // // // // //       setTypedText(newText);
// // // // // // //       onTextInput?.(newText);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // // //       return; // TODO: Implement modifier keys
// // // // // // //     }
    
// // // // // // //     const newText = typedText + key;
// // // // // // //     setTypedText(newText);
// // // // // // //     onTextInput?.(newText);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <group position={position}>
// // // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // // //         row.map((key, keyIndex) => {
// // // // // // //           if (!key) return null;
// // // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // // //           const yOffset = -rowIndex * 0.6;
// // // // // // //           return (
// // // // // // //             <Key
// // // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // // //               letter={key}
// // // // // // //               position={[xOffset, yOffset, 0]}
// // // // // // //               onKeyPress={handleKeyPress}
// // // // // // //               isHighlighted={highlightedKey === key}
// // // // // // //             />
// // // // // // //           );
// // // // // // //         })
// // // // // // //       )}

// // // // // // //       {/* Text display */}
// // // // // // //       {typedText && (
// // // // // // //         <Text
// // // // // // //           position={[0, 1.5, 0]}
// // // // // // //           fontSize={0.2}
// // // // // // //           color="#10B981"
// // // // // // //           anchorX="center"
// // // // // // //           anchorY="middle"
// // // // // // //           maxWidth={8}
// // // // // // //           textAlign="center"
// // // // // // //         >
// // // // // // //           {typedText}
// // // // // // //         </Text>
// // // // // // //       )}

// // // // // // //       {/* Finger indicators */}
// // // // // // //       {fingers.map((finger, index) => (
// // // // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // // // //           <sphereGeometry args={[0.05]} />
// // // // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // // // //         </mesh>
// // // // // // //       ))}
// // // // // // //     </group>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { Box, Text } from "@react-three/drei";
// // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // // const KEYBOARD_LAYOUT = [
// // // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // // //   ["Space"]
// // // // // // ];

// // // // // // interface KeyProps {
// // // // // //   letter: string;
// // // // // //   position: [number, number, number];
// // // // // //   onKeyPress: (key: string) => void;
// // // // // //   isHighlighted?: boolean;
// // // // // // }

// // // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // // //   const [hovered, setHovered] = useState(false);
// // // // // //   const [pressed, setPressed] = useState(false);

// // // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // // //   return (
// // // // // //     <group position={position}>
// // // // // //       <Box
// // // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // // //         onPointerEnter={() => setHovered(true)}
// // // // // //         onPointerLeave={() => setHovered(false)}
// // // // // //         onPointerDown={() => {
// // // // // //           setPressed(true);
// // // // // //           onKeyPress(letter);
// // // // // //           setTimeout(() => setPressed(false), 150);
// // // // // //         }}
// // // // // //       >
// // // // // //         <meshStandardMaterial
// // // // // //           color={
// // // // // //             pressed
// // // // // //               ? "#10B981"
// // // // // //               : isHighlighted
// // // // // //               ? "#F59E0B"
// // // // // //               : hovered
// // // // // //               ? "#3B82F6"
// // // // // //               : "#374151"
// // // // // //           }
// // // // // //         />
// // // // // //       </Box>
// // // // // //       <Text
// // // // // //         position={[0, 0, 0.06]}
// // // // // //         fontSize={0.15}
// // // // // //         color="white"
// // // // // //         anchorX="center"
// // // // // //         anchorY="middle"
// // // // // //       >
// // // // // //         {letter}
// // // // // //       </Text>
// // // // // //     </group>
// // // // // //   );
// // // // // // }

// // // // // // interface VirtualKeyboardProps {
// // // // // //   position?: [number, number, number];
// // // // // //   onTextInput?: (text: string) => void;
// // // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // // }

// // // // // // export default function VirtualKeyboard({
// // // // // //   position = [0, 0, 0],
// // // // // //   onTextInput,
// // // // // //   fingers = [],
// // // // // // }: VirtualKeyboardProps) {
// // // // // //   const [typedText, setTypedText] = useState("");
// // // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // // //   const lastTapTime = useRef(0);
// // // // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // // // //   useEffect(() => {
// // // // // //     if (!fingers.length) {
// // // // // //       setHighlightedKey(null);
// // // // // //       return;
// // // // // //     }

// // // // // //     const finger = fingers[0];
// // // // // //     let closestKey: string | null = null;
// // // // // //     let minDistance = Infinity;

// // // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // // //       row.forEach((key, keyIndex) => {
// // // // // //         if (!key) return;
        
// // // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // //         const yOffset = -rowIndex * 0.6;

// // // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // // //         const keyHeight = 0.4;

// // // // // //         // Check if finger is over key
// // // // // //         if (
// // // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // // //           finger.y < yOffset + keyHeight / 2
// // // // // //         ) {
// // // // // //           const distance = Math.abs(finger.z);
// // // // // //           if (distance < minDistance) {
// // // // // //             closestKey = key;
// // // // // //             minDistance = distance;
// // // // // //           }

// // // // // //           // Simplified tap detection - any negative Z value triggers tap
// // // // // //           const now = Date.now();
// // // // // //           const cooldownKey = `${key}_cooldown`;
          
// // // // // //           if (finger.z < -0.1 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 400)) {
// // // // // //             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z.toFixed(3)})`);
// // // // // //             handleKeyPress(key);
// // // // // //             tapCooldown.current[cooldownKey] = now;
// // // // // //           }
// // // // // //         }
// // // // // //       });
// // // // // //     });

// // // // // //     setHighlightedKey(closestKey);
// // // // // //   }, [fingers]);

// // // // // //   const handleKeyPress = (key: string) => {
// // // // // //     if (key === "Backspace") {
// // // // // //       const newText = typedText.slice(0, -1);
// // // // // //       setTypedText(newText);
// // // // // //       onTextInput?.(newText);
// // // // // //       return;
// // // // // //     }
// // // // // //     if (key === "Space") {
// // // // // //       const newText = typedText + " ";
// // // // // //       setTypedText(newText);
// // // // // //       onTextInput?.(newText);
// // // // // //       return;
// // // // // //     }
// // // // // //     if (key === "Enter") {
// // // // // //       const newText = typedText + "\n";
// // // // // //       setTypedText(newText);
// // // // // //       onTextInput?.(newText);
// // // // // //       return;
// // // // // //     }
// // // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // // //       return; // TODO: Implement modifier keys
// // // // // //     }
    
// // // // // //     const newText = typedText + key;
// // // // // //     setTypedText(newText);
// // // // // //     onTextInput?.(newText);
// // // // // //   };

// // // // // //   return (
// // // // // //     <group position={position}>
// // // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // // //         row.map((key, keyIndex) => {
// // // // // //           if (!key) return null;
// // // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // // //           const yOffset = -rowIndex * 0.6;
// // // // // //           return (
// // // // // //             <Key
// // // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // // //               letter={key}
// // // // // //               position={[xOffset, yOffset, 0]}
// // // // // //               onKeyPress={handleKeyPress}
// // // // // //               isHighlighted={highlightedKey === key}
// // // // // //             />
// // // // // //           );
// // // // // //         })
// // // // // //       )}

// // // // // //       {/* Text display */}
// // // // // //       {typedText && (
// // // // // //         <Text
// // // // // //           position={[0, 1.5, 0]}
// // // // // //           fontSize={0.2}
// // // // // //           color="#10B981"
// // // // // //           anchorX="center"
// // // // // //           anchorY="middle"
// // // // // //           maxWidth={8}
// // // // // //           textAlign="center"
// // // // // //         >
// // // // // //           {typedText}
// // // // // //         </Text>
// // // // // //       )}

// // // // // //       {/* Finger indicators */}
// // // // // //       {fingers.map((finger, index) => (
// // // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // // //           <sphereGeometry args={[0.05]} />
// // // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // // //         </mesh>
// // // // // //       ))}
// // // // // //     </group>
// // // // // //   );
// // // // // // }
// // // // // "use client";

// // // // // import { Box, Text } from "@react-three/drei";
// // // // // import { useState, useEffect, useRef } from "react";

// // // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // // const KEYBOARD_LAYOUT = [
// // // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // // //   ["Space"]
// // // // // ];

// // // // // interface KeyProps {
// // // // //   letter: string;
// // // // //   position: [number, number, number];
// // // // //   onKeyPress: (key: string) => void;
// // // // //   isHighlighted?: boolean;
// // // // // }

// // // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // // //   const [hovered, setHovered] = useState(false);
// // // // //   const [pressed, setPressed] = useState(false);

// // // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // // //   return (
// // // // //     <group position={position}>
// // // // //       <Box
// // // // //         args={[keyWidth, 0.4, 0.1]}
// // // // //         onPointerEnter={() => setHovered(true)}
// // // // //         onPointerLeave={() => setHovered(false)}
// // // // //         onPointerDown={() => {
// // // // //           setPressed(true);
// // // // //           onKeyPress(letter);
// // // // //           setTimeout(() => setPressed(false), 150);
// // // // //         }}
// // // // //       >
// // // // //         <meshStandardMaterial
// // // // //           color={
// // // // //             pressed
// // // // //               ? "#10B981"
// // // // //               : isHighlighted
// // // // //               ? "#F59E0B"
// // // // //               : hovered
// // // // //               ? "#3B82F6"
// // // // //               : "#374151"
// // // // //           }
// // // // //         />
// // // // //       </Box>
// // // // //       <Text
// // // // //         position={[0, 0, 0.06]}
// // // // //         fontSize={0.15}
// // // // //         color="white"
// // // // //         anchorX="center"
// // // // //         anchorY="middle"
// // // // //       >
// // // // //         {letter}
// // // // //       </Text>
// // // // //     </group>
// // // // //   );
// // // // // }

// // // // // interface VirtualKeyboardProps {
// // // // //   position?: [number, number, number];
// // // // //   onTextInput?: (text: string) => void;
// // // // //   fingers?: { x: number; y: number; z: number }[];
// // // // // }

// // // // // export default function VirtualKeyboard({
// // // // //   position = [0, 0, 0],
// // // // //   onTextInput,
// // // // //   fingers = [],
// // // // // }: VirtualKeyboardProps) {
// // // // //   const [typedText, setTypedText] = useState("");
// // // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // // //   const lastTapTime = useRef(0);
// // // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // // //   useEffect(() => {
// // // // //     if (!fingers.length) {
// // // // //       setHighlightedKey(null);
// // // // //       return;
// // // // //     }

// // // // //     const finger = fingers[0];
// // // // //     let closestKey: string | null = null;
// // // // //     let minDistance = Infinity;

// // // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // // //       row.forEach((key, keyIndex) => {
// // // // //         if (!key) return;
        
// // // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // //         const yOffset = -rowIndex * 0.6;

// // // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // // //         const keyHeight = 0.4;

// // // // //         // Check if finger is over key
// // // // //         if (
// // // // //           finger.x > xOffset - keyWidth / 2 &&
// // // // //           finger.x < xOffset + keyWidth / 2 &&
// // // // //           finger.y > yOffset - keyHeight / 2 &&
// // // // //           finger.y < yOffset + keyHeight / 2
// // // // //         ) {
// // // // //           const distance = Math.abs(finger.z);
// // // // //           if (distance < minDistance) {
// // // // //             closestKey = key;
// // // // //             minDistance = distance;
// // // // //           }

// // // // //           // Simplified tap detection - any negative Z value triggers tap
// // // // //           const now = Date.now();
// // // // //           const cooldownKey = `${key}_cooldown`;
          
// // // // //           if (finger.z < -0.1 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 400)) {
// // // // //             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z.toFixed(3)})`);
// // // // //             handleKeyPress(key);
// // // // //             tapCooldown.current[cooldownKey] = now;
// // // // //           }
// // // // //         }
// // // // //       });
// // // // //     });

// // // // //     setHighlightedKey(closestKey);
// // // // //   }, [fingers]);

// // // // //   const handleKeyPress = (key: string) => {
// // // // //     if (key === "Backspace") {
// // // // //       const newText = typedText.slice(0, -1);
// // // // //       setTypedText(newText);
// // // // //       onTextInput?.(newText);
// // // // //       return;
// // // // //     }
// // // // //     if (key === "Space") {
// // // // //       const newText = typedText + " ";
// // // // //       setTypedText(newText);
// // // // //       onTextInput?.(newText);
// // // // //       return;
// // // // //     }
// // // // //     if (key === "Enter") {
// // // // //       const newText = typedText + "\n";
// // // // //       setTypedText(newText);
// // // // //       onTextInput?.(newText);
// // // // //       return;
// // // // //     }
// // // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // // //       return; // TODO: Implement modifier keys
// // // // //     }
    
// // // // //     const newText = typedText + key;
// // // // //     setTypedText(newText);
// // // // //     onTextInput?.(newText);
// // // // //   };

// // // // //   return (
// // // // //     <group position={position}>
// // // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // // //         row.map((key, keyIndex) => {
// // // // //           if (!key) return null;
// // // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // // //           const yOffset = -rowIndex * 0.6;
// // // // //           return (
// // // // //             <Key
// // // // //               key={`${rowIndex}-${keyIndex}`}
// // // // //               letter={key}
// // // // //               position={[xOffset, yOffset, 0]}
// // // // //               onKeyPress={handleKeyPress}
// // // // //               isHighlighted={highlightedKey === key}
// // // // //             />
// // // // //           );
// // // // //         })
// // // // //       )}

// // // // //       {/* Text display */}
// // // // //       {typedText && (
// // // // //         <Text
// // // // //           position={[0, 1.5, 0]}
// // // // //           fontSize={0.2}
// // // // //           color="#10B981"
// // // // //           anchorX="center"
// // // // //           anchorY="middle"
// // // // //           maxWidth={8}
// // // // //           textAlign="center"
// // // // //         >
// // // // //           {typedText}
// // // // //         </Text>
// // // // //       )}

// // // // //       {/* Finger indicators */}
// // // // //       {fingers.map((finger, index) => (
// // // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // // //           <sphereGeometry args={[0.05]} />
// // // // //           <meshBasicMaterial color="#FF00FF" />
// // // // //         </mesh>
// // // // //       ))}
// // // // //     </group>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { Box, Text } from "@react-three/drei";
// // // // import { useState, useEffect, useRef } from "react";

// // // // // Full keyboard layout with Shift, Tab, Caps, and special characters
// // // // const KEYBOARD_LAYOUT = [
// // // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // // //   ["Space"]
// // // // ];

// // // // interface KeyProps {
// // // //   letter: string;
// // // //   position: [number, number, number];
// // // //   onKeyPress: (key: string) => void;
// // // //   isHighlighted?: boolean;
// // // // }

// // // // function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
// // // //   const [hovered, setHovered] = useState(false);
// // // //   const [pressed, setPressed] = useState(false);

// // // //   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

// // // //   return (
// // // //     <group position={position}>
// // // //       <Box
// // // //         args={[keyWidth, 0.4, 0.1]}
// // // //         onPointerEnter={() => setHovered(true)}
// // // //         onPointerLeave={() => setHovered(false)}
// // // //         onPointerDown={() => {
// // // //           setPressed(true);
// // // //           onKeyPress(letter);
// // // //           setTimeout(() => setPressed(false), 150);
// // // //         }}
// // // //       >
// // // //         <meshStandardMaterial
// // // //           color={
// // // //             pressed
// // // //               ? "#10B981"
// // // //               : isHighlighted
// // // //               ? "#F59E0B"
// // // //               : hovered
// // // //               ? "#3B82F6"
// // // //               : "#374151"
// // // //           }
// // // //         />
// // // //       </Box>
// // // //       <Text
// // // //         position={[0, 0, 0.06]}
// // // //         fontSize={0.15}
// // // //         color="white"
// // // //         anchorX="center"
// // // //         anchorY="middle"
// // // //       >
// // // //         {letter}
// // // //       </Text>
// // // //     </group>
// // // //   );
// // // // }

// // // // interface VirtualKeyboardProps {
// // // //   position?: [number, number, number];
// // // //   onTextInput?: (text: string) => void;
// // // //   fingers?: { x: number; y: number; z: number }[];
// // // // }

// // // // export default function VirtualKeyboard({
// // // //   position = [0, 0, 0],
// // // //   onTextInput,
// // // //   fingers = [],
// // // // }: VirtualKeyboardProps) {
// // // //   const [typedText, setTypedText] = useState("");
// // // //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// // // //   const lastTapTime = useRef(0);
// // // //   const lastZ = useRef<{[key: string]: number}>({});
// // // //   const tapCooldown = useRef<{[key: string]: number}>({});

// // // //   useEffect(() => {
// // // //     if (!fingers.length) {
// // // //       setHighlightedKey(null);
// // // //       return;
// // // //     }

// // // //     const finger = fingers[0];
// // // //     let closestKey: string | null = null;
// // // //     let minDistance = Infinity;

// // // //     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // // //       row.forEach((key, keyIndex) => {
// // // //         if (!key) return;
        
// // // //         const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // //         const yOffset = -rowIndex * 0.6;

// // // //         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
// // // //         const keyHeight = 0.4;

// // // //         // Check if finger is over key
// // // //         if (
// // // //           finger.x > xOffset - keyWidth / 2 &&
// // // //           finger.x < xOffset + keyWidth / 2 &&
// // // //           finger.y > yOffset - keyHeight / 2 &&
// // // //           finger.y < yOffset + keyHeight / 2
// // // //         ) {
// // // //           const distance = Math.abs(finger.z);
// // // //           if (distance < minDistance) {
// // // //             closestKey = key;
// // // //             minDistance = distance;
// // // //           }

// // // //           // Simplified tap detection - any negative Z value triggers tap
// // // //           const now = Date.now();
// // // //           const cooldownKey = `${key}_cooldown`;
          
// // // //           if (finger.z < -0.1 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 400)) {
// // // //             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z.toFixed(3)})`);
// // // //             handleKeyPress(key);
// // // //             tapCooldown.current[cooldownKey] = now;
// // // //           }
// // // //         }
// // // //       });
// // // //     });

// // // //     setHighlightedKey(closestKey);
// // // //   }, [fingers]);

// // // //   const handleKeyPress = (key: string) => {
// // // //     if (key === "Backspace") {
// // // //       const newText = typedText.slice(0, -1);
// // // //       setTypedText(newText);
// // // //       onTextInput?.(newText);
// // // //       return;
// // // //     }
// // // //     if (key === "Space") {
// // // //       const newText = typedText + " ";
// // // //       setTypedText(newText);
// // // //       onTextInput?.(newText);
// // // //       return;
// // // //     }
// // // //     if (key === "Enter") {
// // // //       const newText = typedText + "\n";
// // // //       setTypedText(newText);
// // // //       onTextInput?.(newText);
// // // //       return;
// // // //     }
// // // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // // //       return; // TODO: Implement modifier keys
// // // //     }
    
// // // //     const newText = typedText + key;
// // // //     setTypedText(newText);
// // // //     onTextInput?.(newText);
// // // //   };

// // // //   return (
// // // //     <group position={position}>
// // // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // // //         row.map((key, keyIndex) => {
// // // //           if (!key) return null;
// // // //           const xOffset = (keyIndex - row.length / 2) * 0.9;
// // // //           const yOffset = -rowIndex * 0.6;
// // // //           return (
// // // //             <Key
// // // //               key={`${rowIndex}-${keyIndex}`}
// // // //               letter={key}
// // // //               position={[xOffset, yOffset, 0]}
// // // //               onKeyPress={handleKeyPress}
// // // //               isHighlighted={highlightedKey === key}
// // // //             />
// // // //           );
// // // //         })
// // // //       )}

// // // //       {/* Text display */}
// // // //       {typedText && (
// // // //         <Text
// // // //           position={[0, 1.5, 0]}
// // // //           fontSize={0.2}
// // // //           color="#10B981"
// // // //           anchorX="center"
// // // //           anchorY="middle"
// // // //           maxWidth={8}
// // // //           textAlign="center"
// // // //         >
// // // //           {typedText}
// // // //         </Text>
// // // //       )}

// // // //       {/* Finger indicators */}
// // // //       {fingers.map((finger, index) => (
// // // //         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
// // // //           <sphereGeometry args={[0.05]} />
// // // //           <meshBasicMaterial color="#FF00FF" />
// // // //         </mesh>
// // // //       ))}
// // // //     </group>
// // // //   );
// // // // }
// // // "use client";

// // // import { Box, Text } from "@react-three/drei";
// // // import { useState, useEffect, useRef } from "react";

// // // // Enhanced keyboard layout with better spacing for extreme keys
// // // const KEYBOARD_LAYOUT = [
// // //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// // //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// // //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// // //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// // //   ["Space"]
// // // ];

// // // interface KeyProps {
// // //   letter: string;
// // //   position: [number, number, number];
// // //   onKeyPress: (key: string) => void;
// // //   isHighlighted?: boolean;
// // //   highlightColor?: string;
// // // }

// // // function Key({ letter, position, onKeyPress, isHighlighted = false, highlightColor = "#F59E0B" }: KeyProps) {
// // //   const [hovered, setHovered] = useState(false);
// // //   const [pressed, setPressed] = useState(false);

// // //   const keyWidth = letter === "Space" ? 4.5 : letter === "Backspace" || letter === "Enter" ? 1.4 : 0.9;

// // //   return (
// // //     <group position={position}>
// // //       <Box
// // //         args={[keyWidth, 0.45, 0.12]}
// // //         onPointerEnter={() => setHovered(true)}
// // //         onPointerLeave={() => setHovered(false)}
// // //         onPointerDown={() => {
// // //           setPressed(true);
// // //           onKeyPress(letter);
// // //           setTimeout(() => setPressed(false), 150);
// // //         }}
// // //       >
// // //         <meshStandardMaterial
// // //           color={
// // //             pressed
// // //               ? "#10B981"
// // //               : isHighlighted
// // //               ? highlightColor
// // //               : hovered
// // //               ? "#3B82F6"
// // //               : "#374151"
// // //           }
// // //         />
// // //       </Box>
// // //       <Text
// // //         position={[0, 0, 0.07]}
// // //         fontSize={letter.length > 3 ? 0.12 : 0.16}
// // //         color="white"
// // //         anchorX="center"
// // //         anchorY="middle"
// // //       >
// // //         {letter}
// // //       </Text>
// // //     </group>
// // //   );
// // // }

// // // interface VirtualKeyboardProps {
// // //   position?: [number, number, number];
// // //   onTextInput?: (text: string) => void;
// // //   fingers?: { x: number; y: number; z: number; type: string }[];
// // // }

// // // export default function VirtualKeyboard({
// // //   position = [0, 0, 0],
// // //   onTextInput,
// // //   fingers = [],
// // // }: VirtualKeyboardProps) {
// // //   const [typedText, setTypedText] = useState("");
// // //   const [highlightedKeys, setHighlightedKeys] = useState<{[key: string]: string}>({});
// // //   const tapCooldown = useRef<{[key: string]: number}>({});
// // //   const lastPositions = useRef<{[fingerType: string]: {x: number, y: number, z: number}}>({});

// // //   useEffect(() => {
// // //     if (!fingers.length) {
// // //       setHighlightedKeys({});
// // //       return;
// // //     }

// // //     const newHighlightedKeys: {[key: string]: string} = {};
    
// // //     // Enhanced finger colors for better visibility
// // //     const fingerColors: {[key: string]: string} = {
// // //       thumb: "#FF6B6B",    // Red
// // //       index: "#4ECDC4",    // Teal  
// // //       middle: "#45B7D1",   // Blue
// // //       ring: "#96CEB4",     // Green
// // //       pinky: "#FECA57"     // Yellow
// // //     };

// // //     fingers.forEach((finger) => {
// // //       let closestKey: string | null = null;
// // //       let minDistance = Infinity;

// // //       KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
// // //         row.forEach((key, keyIndex) => {
// // //           if (!key) return;
          
// // //           // Enhanced spacing calculation for better extreme key coverage
// // //           const xOffset = (keyIndex - row.length / 2) * 1.0; // Increased spacing
// // //           const yOffset = -rowIndex * 0.65; // Increased vertical spacing

// // //           const keyWidth = key === "Space" ? 4.5 : key === "Backspace" || key === "Enter" ? 1.4 : 0.9;
// // //           const keyHeight = 0.45;

// // //           // Enhanced collision detection with expanded boundaries for extreme keys
// // //           const expansionFactor = (key === "Backspace" || key === "`" || keyIndex === 0 || keyIndex === row.length - 1) ? 1.3 : 1.0;
          
// // //           if (
// // //             finger.x > xOffset - (keyWidth * expansionFactor) / 2 &&
// // //             finger.x < xOffset + (keyWidth * expansionFactor) / 2 &&
// // //             finger.y > yOffset - (keyHeight * expansionFactor) / 2 &&
// // //             finger.y < yOffset + (keyHeight * expansionFactor) / 2
// // //           ) {
// // //             const distance = Math.sqrt(
// // //               Math.pow(finger.x - xOffset, 2) + 
// // //               Math.pow(finger.y - yOffset, 2) + 
// // //               Math.pow(finger.z, 2)
// // //             );
            
// // //             if (distance < minDistance) {
// // //               closestKey = key;
// // //               minDistance = distance;
// // //             }

// // //             // Enhanced tap detection with per-finger tracking
// // //             const now = Date.now();
// // //             const cooldownKey = `${key}_${finger.type}`;
// // //             const positionKey = finger.type;
            
// // //             // Multi-method tap detection
// // //             const tapThreshold = -0.08; // Adjusted for better sensitivity
// // //             const movementThreshold = 0.25; // Movement-based detection
            
// // //             // Method 1: Direct Z-depth detection
// // //             if (finger.z < tapThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 350)) {
// // //               console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (depth: ${finger.z.toFixed(3)})`);
// // //               handleKeyPress(key);
// // //               tapCooldown.current[cooldownKey] = now;
// // //             }
            
// // //             // Method 2: Movement-based detection for better reliability
// // //             if (lastPositions.current[positionKey]) {
// // //               const zMovement = lastPositions.current[positionKey].z - finger.z;
// // //               if (zMovement > movementThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 350)) {
// // //                 console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (movement: ${zMovement.toFixed(3)})`);
// // //                 handleKeyPress(key);
// // //                 tapCooldown.current[cooldownKey] = now;
// // //               }
// // //             }
            
// // //             lastPositions.current[positionKey] = { x: finger.x, y: finger.y, z: finger.z };
// // //           }
// // //         });
// // //       });

// // //       if (closestKey) {
// // //         newHighlightedKeys[closestKey] = fingerColors[finger.type] || "#F59E0B";
// // //       }
// // //     });

// // //     setHighlightedKeys(newHighlightedKeys);
// // //   }, [fingers]);

// // //   const handleKeyPress = (key: string) => {
// // //     if (key === "Backspace") {
// // //       const newText = typedText.slice(0, -1);
// // //       setTypedText(newText);
// // //       onTextInput?.(newText);
// // //       return;
// // //     }
// // //     if (key === "Space") {
// // //       const newText = typedText + " ";
// // //       setTypedText(newText);
// // //       onTextInput?.(newText);
// // //       return;
// // //     }
// // //     if (key === "Enter") {
// // //       const newText = typedText + "\n";
// // //       setTypedText(newText);
// // //       onTextInput?.(newText);
// // //       return;
// // //     }
// // //     if (["Shift", "Caps", "Tab"].includes(key)) {
// // //       return; // TODO: Implement modifier keys
// // //     }
    
// // //     const newText = typedText + key;
// // //     setTypedText(newText);
// // //     onTextInput?.(newText);
// // //   };

// // //   return (
// // //     <group position={position}>
// // //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// // //         row.map((key, keyIndex) => {
// // //           if (!key) return null;
// // //           const xOffset = (keyIndex - row.length / 2) * 1.0; // Enhanced spacing
// // //           const yOffset = -rowIndex * 0.65; // Enhanced spacing
// // //           return (
// // //             <Key
// // //               key={`${rowIndex}-${keyIndex}`}
// // //               letter={key}
// // //               position={[xOffset, yOffset, 0]}
// // //               onKeyPress={handleKeyPress}
// // //               isHighlighted={key in highlightedKeys}
// // //               highlightColor={highlightedKeys[key]}
// // //             />
// // //           );
// // //         })
// // //       )}

// // //       {/* Enhanced text display */}
// // //       {typedText && (
// // //         <Text
// // //           position={[0, 1.8, 0]}
// // //           fontSize={0.22}
// // //           color="#10B981"
// // //           anchorX="center"
// // //           anchorY="middle"
// // //           maxWidth={9}
// // //           textAlign="center"
// // //         >
// // //           {typedText}
// // //         </Text>
// // //       )}

// // //       {/* Multi-finger indicators with labels */}
// // //       {fingers.map((finger, index) => {
// // //         const fingerColors: {[key: string]: string} = {
// // //           thumb: "#FF6B6B",
// // //           index: "#4ECDC4", 
// // //           middle: "#45B7D1",
// // //           ring: "#96CEB4",
// // //           pinky: "#FECA57"
// // //         };

// // //         return (
// // //           <group key={index} position={[finger.x, finger.y, finger.z + 0.6]}>
// // //             <mesh>
// // //               <sphereGeometry args={[0.08]} />
// // //               <meshBasicMaterial color={fingerColors[finger.type] || "#FFFFFF"} />
// // //             </mesh>
// // //             <Text
// // //               position={[0, 0.15, 0]}
// // //               fontSize={0.1}
// // //               color="white"
// // //               anchorX="center"
// // //               anchorY="middle"
// // //             >
// // //               {finger.type}
// // //             </Text>
// // //           </group>
// // //         );
// // //       })}

// // //       {/* Finger legend */}
// // //       <group position={[-4, 2.5, 0]}>
// // //         <Text
// // //           position={[0, 0.3, 0]}
// // //           fontSize={0.14}
// // //           color="#CCCCCC"
// // //           anchorX="left"
// // //           anchorY="middle"
// // //         >
// // //           Active Fingers:
// // //         </Text>
// // //         {Object.entries({
// // //           thumb: "#FF6B6B",
// // //           index: "#4ECDC4", 
// // //           middle: "#45B7D1",
// // //           ring: "#96CEB4",
// // //           pinky: "#FECA57"
// // //         }).map(([fingerType, color], i) => (
// // //           <group key={fingerType} position={[0, -i * 0.15, 0]}>
// // //             <mesh position={[0, 0, 0]}>
// // //               <sphereGeometry args={[0.05]} />
// // //               <meshBasicMaterial color={color} />
// // //             </mesh>
// // //             <Text
// // //               position={[0.15, 0, 0]}
// // //               fontSize={0.1}
// // //               color="#CCCCCC"
// // //               anchorX="left"
// // //               anchorY="middle"
// // //             >
// // //               {fingerType}
// // //             </Text>
// // //           </group>
// // //         ))}
// // //       </group>
// // //     </group>
// // //   );
// // // }
// // "use client";

// // import { Box, Text } from "@react-three/drei";
// // import { useState, useEffect, useRef } from "react";

// // // Enhanced keyboard layout
// // const KEYBOARD_LAYOUT = [
// //   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
// //   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
// //   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
// //   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
// //   ["Space"]
// // ];

// // interface KeyProps {
// //   letter: string;
// //   position: [number, number, number];
// //   onKeyPress: (key: string) => void;
// //   isHighlighted?: boolean;
// //   highlightColor?: string;
// // }

// // function Key({ letter, position, onKeyPress, isHighlighted = false, highlightColor = "#F59E0B" }: KeyProps) {
// //   const [hovered, setHovered] = useState(false);
// //   const [pressed, setPressed] = useState(false);

// //   const keyWidth = letter === "Space" ? 4.5 : letter === "Backspace" || letter === "Enter" ? 1.4 : 0.9;

// //   return (
// //     <group position={position}>
// //       <Box
// //         args={[keyWidth, 0.45, 0.12]}
// //         onPointerEnter={() => setHovered(true)}
// //         onPointerLeave={() => setHovered(false)}
// //         onPointerDown={() => {
// //           setPressed(true);
// //           onKeyPress(letter);
// //           setTimeout(() => setPressed(false), 150);
// //         }}
// //       >
// //         <meshStandardMaterial
// //           color={
// //             pressed
// //               ? "#10B981"
// //               : isHighlighted
// //               ? highlightColor
// //               : hovered
// //               ? "#3B82F6"
// //               : "#374151"
// //           }
// //         />
// //       </Box>
// //       <Text
// //         position={[0, 0, 0.07]}
// //         fontSize={letter.length > 3 ? 0.12 : 0.16}
// //         color="white"
// //         anchorX="center"
// //         anchorY="middle"
// //       >
// //         {letter}
// //       </Text>
// //     </group>
// //   );
// // }

// // interface VirtualKeyboardProps {
// //   position?: [number, number, number];
// //   onKeyPress?: (text: string) => void;
// // }

// // export default function VirtualKeyboard({
// //   position = [0, 2, 0], // Positioned to work with laptop
// //   onKeyPress,
// // }: VirtualKeyboardProps) {

// //   const handleKeyPress = (key: string) => {
// //     if (onKeyPress) {
// //       onKeyPress(key);
// //     }
// //   };

// //   return (
// //     <group position={position}>
// //       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
// //         row.map((key, keyIndex) => {
// //           if (!key) return null;
// //           const xOffset = (keyIndex - row.length / 2) * 1.0;
// //           const yOffset = -rowIndex * 0.65;
// //           return (
// //             <Key
// //               key={`${rowIndex}-${keyIndex}`}
// //               letter={key}
// //               position={[xOffset, yOffset, 0]}
// //               onKeyPress={handleKeyPress}
// //             />
// //           );
// //         })
// //       )}
// //     </group>
// //   );
// // }
// "use client";

// import { Box, Text } from "@react-three/drei";
// import { useState, useEffect, useRef } from "react";

// // Full keyboard layout with Shift, Tab, Caps, and special characters
// const KEYBOARD_LAYOUT = [
//   ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
//   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
//   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
//   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
//   ["Space"]
// ];

// interface KeyProps {
//   letter: string;
//   position: [number, number, number];
//   onKeyPress: (key: string) => void;
//   isHighlighted?: boolean;
// }

// function Key({ letter, position, onKeyPress, isHighlighted = false }: KeyProps) {
//   const [hovered, setHovered] = useState(false);
//   const [pressed, setPressed] = useState(false);

//   const keyWidth = letter === "Space" ? 4 : letter === "Backspace" || letter === "Enter" ? 1.2 : 0.8;

//   return (
//     <group position={position}>
//       <Box
//         args={[keyWidth, 0.4, 0.1]}
//         onPointerEnter={() => setHovered(true)}
//         onPointerLeave={() => setHovered(false)}
//         onPointerDown={() => {
//           setPressed(true);
//           onKeyPress(letter);
//           setTimeout(() => setPressed(false), 150);
//         }}
//       >
//         <meshStandardMaterial
//           color={
//             pressed
//               ? "#10B981"
//               : isHighlighted
//               ? "#F59E0B"
//               : hovered
//               ? "#3B82F6"
//               : "#374151"
//           }
//         />
//       </Box>
//       <Text
//         position={[0, 0, 0.06]}
//         fontSize={0.15}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {letter}
//       </Text>
//     </group>
//   );
// }

// interface VirtualKeyboardProps {
//   position?: [number, number, number];
//   onTextInput?: (text: string) => void;
//   fingers?: { x: number; y: number; z: number }[];
// }

// export default function VirtualKeyboard({
//   position = [0, 0, 0],
//   onTextInput,
//   fingers = [],
// }: VirtualKeyboardProps) {
//   const [typedText, setTypedText] = useState("");
//   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
//   const lastTapTime = useRef(0);
//   const lastZ = useRef<{[key: string]: number}>({});
//   const tapCooldown = useRef<{[key: string]: number}>({});

//   useEffect(() => {
//     if (!fingers.length) {
//       setHighlightedKey(null);
//       return;
//     }

//     const finger = fingers[0];
//     let closestKey: string | null = null;
//     let minDistance = Infinity;

//     KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
//       row.forEach((key, keyIndex) => {
//         if (!key) return;
        
//         const xOffset = (keyIndex - row.length / 2) * 0.9;
//         const yOffset = -rowIndex * 0.6;

//         const keyWidth = key === "Space" ? 4 : key === "Backspace" || key === "Enter" ? 1.2 : 0.8;
//         const keyHeight = 0.4;

//         // Check if finger is over key
//         if (
//           finger.x > xOffset - keyWidth / 2 &&
//           finger.x < xOffset + keyWidth / 2 &&
//           finger.y > yOffset - keyHeight / 2 &&
//           finger.y < yOffset + keyHeight / 2
//         ) {
//           const distance = Math.abs(finger.z);
//           if (distance < minDistance) {
//             closestKey = key;
//             minDistance = distance;
//           }

//           // Simplified tap detection - any negative Z value triggers tap
//           const now = Date.now();
//           const cooldownKey = `${key}_cooldown`;
          
//           if (finger.z < -0.1 && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 400)) {
//             console.log(`🎯 KEY PRESSED: ${key} (z=${finger.z.toFixed(3)})`);
//             handleKeyPress(key);
//             tapCooldown.current[cooldownKey] = now;
//           }
//         }
//       });
//     });

//     setHighlightedKey(closestKey);
//   }, [fingers]);

//   const handleKeyPress = (key: string) => {
//     if (key === "Backspace") {
//       const newText = typedText.slice(0, -1);
//       setTypedText(newText);
//       onTextInput?.(newText);
//       return;
//     }
//     if (key === "Space") {
//       const newText = typedText + " ";
//       setTypedText(newText);
//       onTextInput?.(newText);
//       return;
//     }
//     if (key === "Enter") {
//       const newText = typedText + "\n";
//       setTypedText(newText);
//       onTextInput?.(newText);
//       return;
//     }
//     if (["Shift", "Caps", "Tab"].includes(key)) {
//       return; // TODO: Implement modifier keys
//     }
    
//     const newText = typedText + key;
//     setTypedText(newText);
//     onTextInput?.(newText);
//   };

//   return (
//     <group position={position}>
//       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
//         row.map((key, keyIndex) => {
//           if (!key) return null;
//           const xOffset = (keyIndex - row.length / 2) * 0.9;
//           const yOffset = -rowIndex * 0.6;
//           return (
//             <Key
//               key={`${rowIndex}-${keyIndex}`}
//               letter={key}
//               position={[xOffset, yOffset, 0]}
//               onKeyPress={handleKeyPress}
//               isHighlighted={highlightedKey === key}
//             />
//           );
//         })
//       )}

//       {/* Text display */}
//       {typedText && (
//         <Text
//           position={[0, 1.5, 0]}
//           fontSize={0.2}
//           color="#10B981"
//           anchorX="center"
//           anchorY="middle"
//           maxWidth={8}
//           textAlign="center"
//         >
//           {typedText}
//         </Text>
//       )}

//       {/* Finger indicators */}
//       {fingers.map((finger, index) => (
//         <mesh key={index} position={[finger.x, finger.y, finger.z + 0.5]}>
//           <sphereGeometry args={[0.05]} />
//           <meshBasicMaterial color="#FF00FF" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// "use client";

// import { Box, Text } from "@react-three/drei";
// import { useState, useEffect, useRef } from "react";

// // Enhanced keyboard layout with better spacing for extreme keys
// const KEYBOARD_LAYOUT = [
//   ["","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
//   ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
//   ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
//   ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
//   ["Space"]
// ];

// interface KeyProps {
//   letter: string;
//   position: [number, number, number];
//   onKeyPress: (key: string) => void;
//   isHighlighted?: boolean;
//   highlightColor?: string;
// }

// /**
//  * Renders a single 3D key in the virtual keyboard.
//  */
// function Key({ letter, position, onKeyPress, isHighlighted = false, highlightColor = "#F59E0B" }: KeyProps) {
//   const [hovered, setHovered] = useState(false);
//   const [pressed, setPressed] = useState(false);

//   // Determine key width based on the key label
//   const keyWidth = letter === "Space" ? 4.5 : letter === "Backspace" || letter === "Enter" ? 1.4 : 0.9;

//   return (
//     <group position={position}>
//       <Box
//         args={[keyWidth, 0.45, 0.12]}
//         onPointerEnter={() => setHovered(true)}
//         onPointerLeave={() => setHovered(false)}
//         onPointerDown={() => {
//           setPressed(true);
//           onKeyPress(letter);
//           // Simple visual press feedback
//           setTimeout(() => setPressed(false), 150);
//         }}
//       >
//         <meshStandardMaterial
//           color={
//             pressed
//               ? "#10B981" // Green when manually pressed
//               : isHighlighted
//               ? highlightColor // Color based on finger
//               : hovered
//               ? "#3B82F6" // Blue when hovered
//               : "#374151" // Default grey
//           }
//         />
//       </Box>
//       <Text
//         position={[0, 0, 0.07]}
//         fontSize={letter.length > 3 ? 0.12 : 0.16}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {letter}
//       </Text>
//     </group>
//   );
// }

// interface VirtualKeyboardProps {
//   position?: [number, number, number];
//   /** Callback for when the typed text changes. */
//   onTextInput?: (text: string) => void;
//   /** Array of finger positions (e.g., from a hand tracking system). */
//   fingers?: { x: number; y: number; z: number; type: string }[];
// }

// /**
//  * Main 3D Virtual Keyboard component.
//  * Handles layout, text input, and finger-based interaction (highlighting and tapping).
//  */
// export default function VirtualKeyboard({
//   position = [0, 0, 0],
//   onTextInput,
//   fingers = [],
// }: VirtualKeyboardProps) {
//   const [typedText, setTypedText] = useState("");
//   // Maps a key (e.g., "Q") to a highlight color (e.g., "#FF6B6B")
//   const [highlightedKeys, setHighlightedKeys] = useState<{[key: string]: string}>({});
//   // Tracks the last time a key was tapped by a specific finger to prevent double-taps
//   const tapCooldown = useRef<{[keyType: string]: number}>({});
//   // Tracks the last known position of each finger type for movement-based tap detection
//   const lastPositions = useRef<{[fingerType: string]: {x: number, y: number, z: number}}>({});

//   // Logic for handling finger input, collision, highlighting, and tap detection
//   useEffect(() => {
//     if (!fingers.length) {
//       setHighlightedKeys({});
//       return;
//     }

//     const newHighlightedKeys: {[key: string]: string} = {};
    
//     // Finger-specific colors
//     const fingerColors: {[key: string]: string} = {
//       thumb: "#FF6B6B",    // Red
//       index: "#4ECDC4",    // Teal  
//       middle: "#45B7D1",   // Blue
//       ring: "#96CEB4",     // Green
//       pinky: "#FECA57"     // Yellow
//     };

//     fingers.forEach((finger) => {
//       let closestKey: string | null = null;
//       let minDistance = Infinity;

//       KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
//         row.forEach((key, keyIndex) => {
//           if (!key) return;
          
//           // Calculate the key's center position in the local keyboard coordinate system
//           const xOffset = (keyIndex - row.length / 2) * 1.0; 
//           const yOffset = -rowIndex * 0.65; 

//           const keyWidth = key === "Space" ? 4.5 : key === "Backspace" || key === "Enter" ? 1.4 : 0.9;
//           const keyHeight = 0.45;

//           // Collision detection with expanded boundaries for easier hit detection on extreme keys
//           const expansionFactor = (key === "Backspace" || key === "Enter" || keyIndex === 0 || keyIndex === row.length - 1) ? 1.3 : 1.0;
          
//           if (
//             finger.x > xOffset - (keyWidth * expansionFactor) / 2 &&
//             finger.x < xOffset + (keyWidth * expansionFactor) / 2 &&
//             finger.y > yOffset - (keyHeight * expansionFactor) / 2 &&
//             finger.y < yOffset + (keyHeight * expansionFactor) / 2
//           ) {
//             // Finger is within the key's bounding box

//             // Calculate distance to find the *closest* key if multiple overlap
//             const distance = Math.sqrt(
//               Math.pow(finger.x - xOffset, 2) + 
//               Math.pow(finger.y - yOffset, 2) + 
//               Math.pow(finger.z, 2)
//             );
            
//             if (distance < minDistance) {
//               closestKey = key;
//               minDistance = distance;
//             }

//             // --- Tap Detection Logic ---
//             const now = Date.now();
//             const cooldownKey = `${key}_${finger.type}`;
//             const positionKey = finger.type;
//             const cooldownDuration = 350; // Milliseconds to wait before registering a new tap

//             // Tap detection thresholds
//             const tapDepthThreshold = -0.08; // Absolute Z-depth for pressing the key
//             const movementThreshold = 0.25; // Change in Z-depth (from up to down)

//             // Method 1: Direct Z-depth detection
//             if (finger.z < tapDepthThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > cooldownDuration)) {
//               console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (depth: ${finger.z.toFixed(3)})`);
//               handleKeyPress(key);
//               tapCooldown.current[cooldownKey] = now;
//             }
            
//             // Method 2: Movement-based detection (detects a quick plunge)
//             if (lastPositions.current[positionKey]) {
//               const zMovement = lastPositions.current[positionKey].z - finger.z; // Positive movement means moving down towards the keyboard (last Z > current Z)
//               if (zMovement > movementThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > cooldownDuration)) {
//                 console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (movement: ${zMovement.toFixed(3)})`);
//                 handleKeyPress(key);
//                 tapCooldown.current[cooldownKey] = now;
//               }
//             }
            
//             // Update last position for movement tracking
//             lastPositions.current[positionKey] = { x: finger.x, y: finger.y, z: finger.z };
//           }
//         });
//       });

//       // Highlight the closest key the finger is hovering over
//       if (closestKey) {
//         newHighlightedKeys[closestKey] = fingerColors[finger.type] || "#F59E0B";
//       }
//     });

//     setHighlightedKeys(newHighlightedKeys);
//   }, [fingers]);

//   // Handles the state update for typed text
//   const handleKeyPress = (key: string) => {
//     let newText = typedText;

//     if (key === "Backspace") {
//       newText = typedText.slice(0, -1);
//     } else if (key === "Space") {
//       newText = typedText + " ";
//     } else if (key === "Enter") {
//       newText = typedText + "\n";
//     } else if (["Shift", "Caps", "Tab"].includes(key)) {
//       // Ignore modifier keys for simple text input
//       return; 
//     } else {
//       // Regular character key
//       newText = typedText + key;
//     }
    
//     setTypedText(newText);
//     onTextInput?.(newText);
//   };

//   return (
//     <group position={position}>
//       {/* Render all keys */}
//       {KEYBOARD_LAYOUT.map((row, rowIndex) =>
//         row.map((key, keyIndex) => {
//           if (!key) return null;

//           // Key positioning logic
//           const xOffset = (keyIndex - row.length / 2) * 1.0;
//           const yOffset = -rowIndex * 0.65;
          
//           return (
//             <Key
//               key={`${rowIndex}-${keyIndex}`}
//               letter={key}
//               position={[xOffset, yOffset, 0]}
//               onKeyPress={handleKeyPress}
//               isHighlighted={key in highlightedKeys}
//               highlightColor={highlightedKeys[key]}
//             />
//           );
//         })
//       )}

//       {/* Enhanced text display above the keyboard */}
//       {typedText && (
//         <Text
//           position={[0, 1.8, 0]}
//           fontSize={0.22}
//           color="#10B981"
//           anchorX="center"
//           anchorY="middle"
//           maxWidth={9}
//           textAlign="center"
//         >
//           {typedText}
//         </Text>
//       )}

//       {/* Multi-finger visual indicators */}
//       {fingers.map((finger, index) => {
//         const fingerColors: {[key: string]: string} = {
//           thumb: "#FF6B6B",
//           index: "#4ECDC4", 
//           middle: "#45B7D1",
//           ring: "#96CEB4",
//           pinky: "#FECA57"
//         };

//         return (
//           <group key={index} position={[finger.x, finger.y, finger.z + 0.6]}>
//             <mesh>
//               <sphereGeometry args={[0.08]} />
//               <meshBasicMaterial color={fingerColors[finger.type] || "#FFFFFF"} />
//             </mesh>
//             <Text
//               position={[0, 0.15, 0]}
//               fontSize={0.1}
//               color="white"
//               anchorX="center"
//               anchorY="middle"
//             >
//               {finger.type}
//             </Text>
//           </group>
//         );
//       })}

//       {/* Finger legend for clarity */}
//       <group position={[-4, 2.5, 0]}>
//         <Text
//           position={[0, 0.3, 0]}
//           fontSize={0.14}
//           color="#CCCCCC"
//           anchorX="left"
//           anchorY="middle"
//         >
//           Active Fingers:
//         </Text>
//         {Object.entries({
//           thumb: "#FF6B6B",
//           index: "#4ECDC4", 
//           middle: "#45B7D1",
//           ring: "#96CEB4",
//           pinky: "#FECA57"
//         }).map(([fingerType, color], i) => (
//           <group key={fingerType} position={[0, -i * 0.15, 0]}>
//             <mesh position={[0, 0, 0]}>
//               <sphereGeometry args={[0.05]} />
//               <meshBasicMaterial color={color} />
//             </mesh>
//             <Text
//               position={[0.15, 0, 0]}
//               fontSize={0.1}
//               color="#CCCCCC"
//               anchorX="left"
//               anchorY="middle"
//             >
//               {fingerType}
//             </Text>
//           </group>
//         ))}
//       </group>
//     </group>
//   );
// }
"use client";

import { Box, Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";

// Enhanced keyboard layout with better spacing for extreme keys
const KEYBOARD_LAYOUT = [
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],  ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
  ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
  ["Shift","Z","X","C","V","B","N","M",",",".","/","Shift"],
  ["Space"]
];

interface KeyProps {
  letter: string;
  position: [number, number, number];
  onKeyPress: (key: string) => void;
  isHighlighted?: boolean;
  highlightColor?: string;
}

function Key({ letter, position, onKeyPress, isHighlighted = false, highlightColor = "#F59E0B" }: KeyProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const keyWidth = letter === "Space" ? 4.5 : letter === "Backspace" || letter === "Enter" ? 1.4 : 0.9;

  return (
    <group position={position}>
      <Box
        args={[keyWidth, 0.45, 0.12]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={() => {
          setPressed(true);
          onKeyPress(letter);
          setTimeout(() => setPressed(false), 150);
        }}
      >
        <meshStandardMaterial
          color={
            pressed
              ? "#10B981"
              : isHighlighted
              ? highlightColor
              : hovered
              ? "#3B82F6"
              : "#374151"
          }
        />
      </Box>
      <Text
        position={[0, 0, 0.07]}
        fontSize={letter.length > 3 ? 0.12 : 0.16}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {letter}
      </Text>
    </group>
  );
}

interface VirtualKeyboardProps {
  position?: [number, number, number];
  onTextInput?: (text: string) => void;
  fingers?: { x: number; y: number; z: number; type: string }[];
}

export default function VirtualKeyboard({
  position = [0, 0, 0],
  onTextInput,
  fingers = [],
}: VirtualKeyboardProps) {
  const [typedText, setTypedText] = useState("");
  const [highlightedKeys, setHighlightedKeys] = useState<{[key: string]: string}>({});
  const tapCooldown = useRef<{[key: string]: number}>({});
  const lastPositions = useRef<{[fingerType: string]: {x: number, y: number, z: number}}>({});

  useEffect(() => {
    if (!fingers.length) {
      setHighlightedKeys({});
      return;
    }

    const newHighlightedKeys: {[key: string]: string} = {};
    
    // Enhanced finger colors for better visibility
    const fingerColors: {[key: string]: string} = {
      thumb: "#FF6B6B",    // Red
      index: "#4ECDC4",    // Teal  
      middle: "#45B7D1",   // Blue
      ring: "#96CEB4",     // Green
      pinky: "#FECA57"     // Yellow
    };

    fingers.forEach((finger) => {
      let closestKey: string | null = null;
      let minDistance = Infinity;

      KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
        row.forEach((key, keyIndex) => {
          if (!key) return;
          
          // Enhanced spacing calculation for better extreme key coverage
          const xOffset = (keyIndex - row.length / 2) * 1.0; // Increased spacing
          const yOffset = -rowIndex * 0.65; // Increased vertical spacing

          const keyWidth = key === "Space" ? 4.5 : key === "Backspace" || key === "Enter" ? 1.4 : 0.9;
          const keyHeight = 0.45;

          // Enhanced collision detection with expanded boundaries for extreme keys
          const expansionFactor = (key === "Backspace" || key === "" || keyIndex === 0 || keyIndex === row.length - 1) ? 1.3 : 1.0;          
          if (
            finger.x > xOffset - (keyWidth * expansionFactor) / 2 &&
            finger.x < xOffset + (keyWidth * expansionFactor) / 2 &&
            finger.y > yOffset - (keyHeight * expansionFactor) / 2 &&
            finger.y < yOffset + (keyHeight * expansionFactor) / 2
          ) {
            const distance = Math.sqrt(
              Math.pow(finger.x - xOffset, 2) + 
              Math.pow(finger.y - yOffset, 2) + 
              Math.pow(finger.z, 2)
            );
            
            if (distance < minDistance) {
              closestKey = key;
              minDistance = distance;
            }

            // Enhanced tap detection with per-finger tracking
            const now = Date.now();
            const cooldownKey = `${key}_${finger.type}`;
            const positionKey = finger.type;
            
            // Multi-method tap detection
            const tapThreshold = -0.08; // Adjusted for better sensitivity
            const movementThreshold = 0.25; // Movement-based detection
            
            // Method 1: Direct Z-depth detection
            if (finger.z < tapThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 350)) {
              console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (depth: ${finger.z.toFixed(3)})`);
              handleKeyPress(key);
              tapCooldown.current[cooldownKey] = now;
            }
            
            // Method 2: Movement-based detection for better reliability
            if (lastPositions.current[positionKey]) {
              const zMovement = lastPositions.current[positionKey].z - finger.z;
              if (zMovement > movementThreshold && (!tapCooldown.current[cooldownKey] || now - tapCooldown.current[cooldownKey] > 350)) {
                console.log(`🎯 TAP DETECTED: ${key} with ${finger.type} finger (movement: ${zMovement.toFixed(3)})`);
                handleKeyPress(key);
                tapCooldown.current[cooldownKey] = now;
              }
            }
            
            lastPositions.current[positionKey] = { x: finger.x, y: finger.y, z: finger.z };
          }
        });
      });

      if (closestKey) {
        newHighlightedKeys[closestKey] = fingerColors[finger.type] || "#F59E0B";
      }
    });

    setHighlightedKeys(newHighlightedKeys);
  }, [fingers]);

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      const newText = typedText.slice(0, -1);
      setTypedText(newText);
      onTextInput?.(newText);
      return;
    }
    if (key === "Space") {
      const newText = typedText + " ";
      setTypedText(newText);
      onTextInput?.(newText);
      return;
    }
    if (key === "Enter") {
      const newText = typedText + "\n";
      setTypedText(newText);
      onTextInput?.(newText);
      return;
    }
    if (["Shift", "Caps", "Tab"].includes(key)) {
      return; // TODO: Implement modifier keys
    }
    
    const newText = typedText + key;
    setTypedText(newText);
    onTextInput?.(newText);
  };

  return (
    <group position={position}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) =>
        row.map((key, keyIndex) => {
          if (!key) return null;
          const xOffset = (keyIndex - row.length / 2) * 1.0; // Enhanced spacing
          const yOffset = -rowIndex * 0.65; // Enhanced spacing
          return (
            <Key
              key={`${rowIndex}-${keyIndex}`}
              letter={key}
              position={[xOffset, yOffset, 0]}
              onKeyPress={handleKeyPress}
              isHighlighted={key in highlightedKeys}
              highlightColor={highlightedKeys[key]}
            />
          );
        })
      )}

      {/* Enhanced text display */}
      {typedText && (
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.22}
          color="#10B981"
          anchorX="center"
          anchorY="middle"
          maxWidth={9}
          textAlign="center"
        >
          {typedText}
        </Text>
      )}

      {/* Multi-finger indicators with labels */}
      {fingers.map((finger, index) => {
        const fingerColors: {[key: string]: string} = {
          thumb: "#FF6B6B",
          index: "#4ECDC4", 
          middle: "#45B7D1",
          ring: "#96CEB4",
          pinky: "#FECA57"
        };

        return (
          <group key={index} position={[finger.x, finger.y, finger.z + 0.6]}>
            <mesh>
              <sphereGeometry args={[0.08]} />
              <meshBasicMaterial color={fingerColors[finger.type] || "#FFFFFF"} />
            </mesh>
            <Text
              position={[0, 0.15, 0]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {finger.type}
            </Text>
          </group>
        );
      })}

      {/* Finger legend */}
      <group position={[-4, 2.5, 0]}>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.14}
          color="#CCCCCC"
          anchorX="left"
          anchorY="middle"
        >
          Active Fingers:
        </Text>
        {Object.entries({
          thumb: "#FF6B6B",
          index: "#4ECDC4", 
          middle: "#45B7D1",
          ring: "#96CEB4",
          pinky: "#FECA57"
        }).map(([fingerType, color], i) => (
          <group key={fingerType} position={[0, -i * 0.15, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <Text
              position={[0.15, 0, 0]}
              fontSize={0.1}
              color="#CCCCCC"
              anchorX="left"
              anchorY="middle"
            >
              {fingerType}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}