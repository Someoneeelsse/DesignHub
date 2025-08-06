import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

const Wall = ({
  position,
  rotation,
  color1 = "#ff9500",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color1?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      receiveShadow
      castShadow
    >
      <planeGeometry args={[10, 6]} />
      <meshStandardMaterial color={color1} />
    </mesh>
  );
};

const SceneContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, -5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>

      <Wall position={[0, 1, 5]} rotation={[0, -Math.PI, 0]} color1="#ff9500" />

      <Wall
        position={[5, 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color1="#ff6b35"
      />

      {children}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 0.1}
      />

      <Environment preset="sunset" />
    </>
  );
};

interface SceneProps {
  children?: React.ReactNode;
}

const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-orange-100 to-amber-100 rounded-3xl overflow-hidden shadow-2xl">
      <Canvas
        shadows
        camera={{
          position: [-12, 4, 2],
          fov: 30,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true }}
      >
        <SceneContent>{children}</SceneContent>
      </Canvas>
    </div>
  );
};

export default Scene;
