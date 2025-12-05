import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface Card3DProps {
  position: [number, number, number];
  title: string;
  frontText: string;
  backText: string;
  color: string;
}

export default function Card3D({ position, title, frontText, backText, color }: Card3DProps) {
  const groupRef = useRef<Group>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const targetRotation = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation animation
      const currentRotation = groupRef.current.rotation.y;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRotation,
        targetRotation.current,
        delta * 5
      );

      // Hover effect - slight elevation
      const targetY = isHovered ? position[1] + 0.2 : position[1];
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        delta * 5
      );
    }
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    targetRotation.current = isFlipped ? 0 : Math.PI;
  };

  return (
    <group 
      ref={groupRef} 
      position={position}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Card Body - Rectangle */}
      <RoundedBox
        args={[4.5, 3, 0.1]}
        radius={0.1}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={isHovered ? 0.2 : 0.1}
          side={2}
        />
      </RoundedBox>

      {/* Front Side Content */}
      <group visible={!isFlipped || groupRef.current?.rotation.y < Math.PI / 2}>
        <Text
          position={[0, 0.8, 0.06]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
        >
          {title}
        </Text>
        
        <Text
          position={[0, 0.1, 0.06]}
          fontSize={0.2}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          {frontText}
        </Text>

        {/* Decorative elements */}
        <mesh position={[0, -0.5, 0.06]}>
          <boxGeometry args={[3, 0.01, 0.01]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>

      {/* Back Side Content */}
      {/* Back Side Content */}
      <group 
        visible={isFlipped && groupRef.current?.rotation.y >= Math.PI / 2}
        rotation={[0, Math.PI, 0]}
      >
        <Text
          position={[0, 1, 0.06]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
        >
          {title}
        </Text>
        
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.18}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
          lineHeight={1.5}
        >
          {backText}
        </Text>

        
      </group>
      {/* Shadow catcher plane */}
      {/* Shadow catcher plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 3.5]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      {/* Edge glow */}
      <pointLight 
        position={[0, 0, 0.5]} 
        color={color} 
        intensity={isHovered ? 1 : 0.5} 
        distance={2}
      />
    </group>
  );
}
