import { Canvas } from "@react-three/fiber";
import { OrbitControls, Ring } from "@react-three/drei";

function Earth() {
    return (
        <>
            {/* Earth */}
            <mesh rotation={[0.4, 0.8, 0]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    color="#2563eb"
                    emissive="#1d4ed8"
                    emissiveIntensity={1}
                    metalness={0.7}
                    roughness={0.2}
                />
            </mesh>

            {/* Orbit Ring */}
            <Ring
                args={[2.6, 2.7, 64]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshBasicMaterial
                    color="#60a5fa"
                    transparent
                    opacity={0.4}
                />
            </Ring>

            {/* Second Ring */}
            <Ring
                args={[3.1, 3.2, 64]}
                rotation={[0.8, 0.4, 0]}
            >
                <meshBasicMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.3}
                />
            </Ring>
        </>
    );
}
export default function Globe() {
    return (
        <div className="w-[350px] h-[350px] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={1.5} />
<directionalLight position={[5, 5, 5]} intensity={2.5} />
<pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={2} />
                <Earth />
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1.5}
                    enableZoom={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}