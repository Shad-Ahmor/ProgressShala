import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

function Blob() {
  const ref = useRef();
  useFrame((state, dt) => {
    ref.current.rotation.y += dt * 0.15;
  });

  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.2}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial color="#7c3aed" distort={0.45} speed={1.5} metalness={0.9} />
      </mesh>
    </Float>
  );
}

export default function ThreeDHero() {
  return (
    // Corrected structure: Placing the opening parenthesis immediately after return
    // or moving the comment outside the return block.
    // I moved the structural comment to a standard JS comment above the return.
    
    // Changed layout class to .neo-hero for the CSS grid and alignment
    <div className="neo-hero">
      <div className="hero-left">
        {/* Changed .h1 to .hero-title for the neon gradient text effect */}
        <h1 className="hero-title">Master Future-Ready Skills — Learn with Mentors</h1>
        {/* Changed .lead to .hero-sub for the muted text style */}
        <p className="hero-sub" style={{ marginTop: 12 }}>Practical projects, guided mentors and internship pipelines — learn what industry hires for.</p>

        {/* Changed .hero-ctas to .hero-actions for the CSS flex layout */}
        <div className="hero-actions" style={{ marginTop: 20 }}>
          {/* Changed .btn .btn-primary to .enroll-btn (Neon Button) */}
          <a href="/courses" className="enroll-btn">Explore Courses</a>
          {/* Changed .btn .btn-ghost to a generic style for 'Watch Demo' (You can define a .btn-secondary in your CSS) */}
          <button className="btn btn-ghost">Watch Demo</button>
        </div>
      </div>

      {/* This structure is critical for the 3D-effect in your CSS */}
      <div className="hero-right">
        {/* The canvas/blob replaces the original 3D card setup in the new CSS, but the .hero-right div is needed */}
        <div className="hero-glow" /> {/* Added glow div from CSS */}
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 4, 4]} intensity={1.2} />
            <Suspense fallback={null}>
              <Blob />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} />
          </Canvas>
          <div className="scanlines" />
      </div>
    </div>
  );
}