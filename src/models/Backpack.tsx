import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import Scene from "./Scene";
import * as THREE from "three";

const BackpackModel = () => {
  const { scene } = useGLTF("/models/Backpack.glb");
  const backpackRef = useRef<THREE.Object3D>(null);

  return (
    <primitive
      ref={backpackRef}
      object={scene}
      position={[4.1, 0.01, 0]}
      scale={[5, 5, 5]}
      rotation={[-0.7, -1.3, -0.7]}
      castShadow
      receiveShadow
    />
  );
};

const Backpack: React.FC = () => {
  return (
    <Scene>
      <BackpackModel />
    </Scene>
  );
};

export default Backpack;
