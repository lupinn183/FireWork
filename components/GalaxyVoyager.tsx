
import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Points, PointMaterial, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { Memory, ThemeConfig } from '../types';

const NeuralSpirit = ({ color }: { color: string }) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <MeshDistortMaterial color={color} speed={4} distort={0.6} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.3, 2.5, 4]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const DigitalTree = ({ color }: { color: string }) => {
  return (
    <group position={[0, -3, 0]}>
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.05, 0.2, 5, 8]} />
        <MeshWobbleMaterial color="#1a110a" factor={0.05} speed={1} />
      </mesh>
      {[0, 120, 240].map((angle, i) => (
        <group key={i} rotation={[0, (angle * Math.PI) / 180, 0.5]}>
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.01, 0.05, 3.5, 6]} />
            <meshStandardMaterial color="#2d1e15" />
          </mesh>
        </group>
      ))}
      <Points positions={new Float32Array(Array.from({length: 600}, () => (Math.random()-0.5)*8))} stride={3} position={[0, 4, 0]}>
        <PointMaterial transparent color={color} size={0.07} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>
    </group>
  );
};

const MemoryShard = ({ memory, index, total, onSelect, color }: { memory: Memory, index: number, total: number, onSelect: any, color: string }) => {
  const phi = Math.acos(-1 + (2 * index) / (total || 1));
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 10;
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  const [hovered, setHovered] = useState(false);
  const linePos = useMemo(() => new Float32Array([0, 0, 0, -x, -y, -z]), [x, y, z]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[x, y, z]}>
      <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => onSelect(memory)}>
        <mesh>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color={hovered ? color : "white"} transparent opacity={hovered ? 0.3 : 0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh scale={[1.05, 1.05, 1]}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.7 : 0.2} />
        </mesh>
        <Text position={[0, 0, 0.05]} fontSize={0.16} color="white" anchorX="center" maxWidth={2.6} textAlign="center">
          {memory.title.toUpperCase()}{`\n${memory.date}`}
        </Text>
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute attach="attributes-position" count={2} array={linePos} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} transparent opacity={0.1} />
        </line>
      </group>
    </Float>
  );
};

const GalaxyVoyager = ({ memories, onSelect, theme }: { memories: Memory[], onSelect: any, theme: ThemeConfig }) => {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 22], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color={theme.color} />
        <group>
          <NeuralSpirit color={theme.color} />
          <DigitalTree color={theme.color} />
          {memories.map((m, i) => (
            <MemoryShard key={m.id} memory={m} index={i} total={memories.length} onSelect={onSelect} color={theme.color} />
          ))}
        </group>
        <OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default GalaxyVoyager;
