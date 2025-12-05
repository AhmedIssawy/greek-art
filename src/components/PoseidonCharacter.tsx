import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

export default function PoseidonCharacter() {
  const groupRef = useRef<Group>(null);
  const tridentRef = useRef<Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create water particles
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 3;
      positions[i + 1] = Math.random() * 4 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }
    
    return positions;
  }, []);

  // Animate character and particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }
    
    // Trident glow pulse
    if (tridentRef.current) {
      tridentRef.current.rotation.z = Math.sin(time * 2) * 0.05;
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] = ((positions[i] + 0.01) % 4) - 1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
        <meshStandardMaterial 
          color="#d4a574" 
          roughness={0.6}
          metalness={0.1}
          emissive="#4a90e2"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#d4a574" 
          roughness={0.5}
          metalness={0.1}
          emissive="#4a90e2"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Hair - flowing locks */}
      <group position={[0, 2.8, -0.2]}>
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.35,
              -0.3 + Math.random() * 0.2,
              Math.sin((i / 8) * Math.PI * 2) * 0.35
            ]}
            rotation={[0, (i / 8) * Math.PI * 2, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.6, 8, 16]} />
            <meshStandardMaterial 
              color="#8b7355"
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Beard */}
      <mesh position={[0, 2.3, 0.3]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.25, 0.5, 16]} />
        <meshStandardMaterial 
          color="#8b7355"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Eyes - glowing blue */}
      <mesh position={[-0.15, 2.65, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#1e90ff"
          emissive="#1e90ff"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[0.15, 2.65, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#1e90ff"
          emissive="#1e90ff"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Shoulders/Armor */}
      <mesh position={[-0.5, 2.2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#4a5568"
          roughness={0.2}
          metalness={0.9}
          emissive="#4a90e2"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0.5, 2.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#4a5568"
          roughness={0.2}
          metalness={0.9}
          emissive="#4a90e2"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.55, 1.5, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial 
          color="#d4a574"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.55, 1.5, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial 
          color="#d4a574"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial 
          color="#c9a961"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Cloth/Toga */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <coneGeometry args={[0.45, 1.2, 16]} />
        <meshStandardMaterial 
          color="#20b2aa"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.9, 8, 16]} />
        <meshStandardMaterial 
          color="#d4a574"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.2, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.9, 8, 16]} />
        <meshStandardMaterial 
          color="#d4a574"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Trident */}
      <group ref={tridentRef} position={[-0.7, 1.8, 0]} rotation={[0, 0, -0.3]}>
        {/* Handle */}
        <mesh position={[0, -1, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.5, 16]} />
          <meshStandardMaterial 
            color="#8b7355"
            roughness={0.5}
          />
        </mesh>
        
        {/* Prongs */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial 
            color="#ffd700"
            roughness={0.1}
            metalness={1}
            emissive="#4a90e2"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[-0.15, 0.4, 0]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial 
            color="#ffd700"
            roughness={0.1}
            metalness={1}
            emissive="#4a90e2"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.15, 0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial 
            color="#ffd700"
            roughness={0.1}
            metalness={1}
            emissive="#4a90e2"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Trident glow */}
        <pointLight 
          position={[0, 0.6, 0]} 
          color="#4a90e2" 
          intensity={2} 
          distance={3}
        />
      </group>

      {/* Water particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#4a90e2"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Ambient glow around character */}
      <pointLight 
        position={[0, 1.5, 0]} 
        color="#20b2aa" 
        intensity={0.5} 
        distance={4}
      />
    </group>
  );
}
