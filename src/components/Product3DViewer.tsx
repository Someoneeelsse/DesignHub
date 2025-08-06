import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface ProductData {
  name: string;
  description: string;
  size?: string;
  price: number;
  bestseller?: boolean;
  imgPath: string;
  modelPath: string;
  emoji?: string;
}

interface Product3DViewerProps {
  modelPath: string;
  product: ProductData;
  onClose: () => void;
}

const getColorFromImagePath = (imgPath: string): string => {
  if (imgPath.includes("Yellow")) return "#D2B481";
  if (imgPath.includes("Blue")) return "#87B3C9";
  if (imgPath.includes("Orange")) return "#D08778";
  if (imgPath.includes("Gray")) return "#909090";
  return "#000000";
};

const Model: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Loader: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-white/40 rounded-full animate-spin"
          style={{ animationDelay: "-0.5s" }}
        ></div>
      </div>
    </div>
  </Html>
);

const ErrorFallback: React.FC = () => (
  <Html center>
    <div className="text-white text-lg font-semibold">
      Failed to load 3D model
    </div>
  </Html>
);

const FallbackCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f59e0b" />
    </mesh>
  );
};

const Product3DViewer: React.FC<Product3DViewerProps> = ({
  modelPath,
  product,
  onClose,
}) => {
  const backgroundColor = getColorFromImagePath(product.imgPath);

  const [ambientLight, setAmbientLight] = useState(2);
  const [directionalLight, setDirectionalLight] = useState(3);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-11/12 sm:w-5/6 h-5/6 bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[30%] bg-white p-4 sm:p-8 flex flex-col">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-amber-600">
                ${product.price}
              </span>
              {product.bestseller && (
                <span className="bg-yellow-400 text-amber-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  BESTSELLER
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
              Lighting Controls
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ambient Light
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={ambientLight}
                  onChange={(e) => setAmbientLight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {ambientLight.toFixed(1)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Directional Light
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={directionalLight}
                  onChange={(e) =>
                    setDirectionalLight(parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {directionalLight.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                How to View the Model
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Mouse:</strong> Click and drag to rotate • Scroll to
                zoom • Right-click and drag to move
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%] h-64 sm:h-80 lg:h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 0.8], fov: 70 }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color(backgroundColor));
            }}
          >
            <ambientLight intensity={ambientLight} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={directionalLight}
            />

            <Suspense fallback={<Loader />}>
              <ErrorBoundary fallback={<ErrorFallback />}>
                {modelPath && modelPath !== "" ? (
                  <Model modelPath={modelPath} />
                ) : (
                  <FallbackCube />
                )}
              </ErrorBoundary>
            </Suspense>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={1}
              maxDistance={10}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Model Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default Product3DViewer;
