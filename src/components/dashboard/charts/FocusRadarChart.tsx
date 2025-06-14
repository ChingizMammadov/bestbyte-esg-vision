
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as THREE from 'three';

const radarData = [
  { subject: "Carbon", score: 75, fullMark: 100, value: "4550 tons CO2", angle: 0, color: "#6B7280" },
  { subject: "Water", score: 85, fullMark: 100, value: "960k liters", angle: (2 * Math.PI) / 3, color: "#3B82F6" },
  { subject: "Energy", score: 90, fullMark: 100, value: "455 MWh", angle: (4 * Math.PI) / 3, color: "#10B981" },
];

function RadarGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const gridLines = useMemo(() => {
    const lines = [];
    const rings = [0.5, 1, 1.5, 2, 2.5];
    
    // Create concentric rings
    rings.forEach((radius, index) => {
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        ));
      }
      lines.push(
        <Line
          key={`ring-${index}`}
          points={points}
          color="#E5E7EB"
          lineWidth={1}
          opacity={0.6}
        />
      );
    });

    // Create radial lines
    radarData.forEach((item, index) => {
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(
          Math.cos(item.angle) * 2.5,
          0,
          Math.sin(item.angle) * 2.5
        )
      ];
      lines.push(
        <Line
          key={`radial-${index}`}
          points={points}
          color="#D1D5DB"
          lineWidth={2}
          opacity={0.8}
        />
      );
    });

    return lines;
  }, []);

  return (
    <group ref={gridRef}>
      {gridLines}
    </group>
  );
}

function DataPoints() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const dataPoints = useMemo(() => {
    return radarData.map((item, index) => {
      const radius = (item.score / 100) * 2.5;
      const x = Math.cos(item.angle) * radius;
      const z = Math.sin(item.angle) * radius;

      return (
        <group key={item.subject} position={[x, 0, z]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial 
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
          <pointLight
            color={item.color}
            intensity={0.5}
            distance={2}
            decay={2}
          />
          <Text
            position={[0, 0.3, 0]}
            fontSize={0.15}
            color={item.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {item.score}
          </Text>
        </group>
      );
    });
  }, []);

  // Create connecting lines between data points
  const connectionPoints = useMemo(() => {
    const points = radarData.map((item) => {
      const radius = (item.score / 100) * 2.5;
      return new THREE.Vector3(
        Math.cos(item.angle) * radius,
        0,
        Math.sin(item.angle) * radius
      );
    });
    points.push(points[0]); // Close the shape
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      {dataPoints}
      <Line
        points={connectionPoints}
        color="#3B82F6"
        lineWidth={3}
        opacity={0.8}
      />
      <mesh>
        <ringGeometry args={[0, 2.5, 3]} />
        <meshStandardMaterial 
          color="#3B82F6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Labels() {
  return (
    <>
      {radarData.map((item, index) => {
        const labelRadius = 3;
        const x = Math.cos(item.angle) * labelRadius;
        const z = Math.sin(item.angle) * labelRadius;
        
        return (
          <group key={`label-${index}`} position={[x, 0, z]}>
            <Text
              fontSize={0.2}
              color="#374151"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-bold.woff"
            >
              {item.subject}
            </Text>
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.12}
              color="#6B7280"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-regular.woff"
            >
              {item.value}
            </Text>
          </group>
        );
      })}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#3B82F6" />
      
      <RadarGrid />
      <DataPoints />
      <Labels />
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function FocusRadarChart() {
  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">ESG Focus Radar 3D</CardTitle>
        <CardDescription className="text-gray-600">Interactive 3D visualization of ESG performance</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
          <Canvas
            camera={{ position: [6, 4, 6], fov: 50 }}
            shadows
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          {radarData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.subject}</span>
              <span className="text-sm text-gray-500">{item.score}/100</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
