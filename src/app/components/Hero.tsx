import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

// Optimized low-poly sphere with better performance
const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color={theme === 'dark' ? '#8b5cf6' : '#a78bfa'}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

// Optimized particles with reduced count for better performance
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={theme === 'dark' ? '#8b5cf6' : '#a78bfa'}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Floating geometric objects
const FloatingGeometry = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#d946ef"
          metalness={0.9}
          roughness={0.1}
          emissive="#d946ef"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Camera controller with mouse parallax and scroll effects
const CameraController = ({ mouseX, mouseY, scrollY }: { mouseX: number; mouseY: number; scrollY: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Mouse parallax effect
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY * 0.5, 0.05);
    
    // Scroll-based camera movement
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 + scrollY * 0.01, 0.05);
  });

  return null;
};

export const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Mouse position state
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    // GSAP text reveal animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.4'
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      buttonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    );

    // Mouse move parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* 3D Background - Fixed z-index */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.9 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
        >
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#d946ef" />
          <pointLight position={[0, 0, 0]} intensity={0.8} color="#8b5cf6" />
          
          <AnimatedSphere />
          <Particles />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Floating geometric objects */}
          <FloatingGeometry position={[-3, 2, -2]} />
          <FloatingGeometry position={[3, -2, -3]} />
          <FloatingGeometry position={[-2, -3, -1]} />
          <FloatingGeometry position={[2, 3, -4]} />
          
          <CameraController 
            mouseX={mouseX.current} 
            mouseY={mouseY.current} 
            scrollY={scrollYProgress.get()}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30 dark:from-black/30 dark:via-transparent dark:to-black/40 pointer-events-none z-[5]" />

      {/* Content Overlay - Higher z-index */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="text-center px-6 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-6">
            <motion.span
              className="hero-badge inline-block px-6 py-3 mb-4 text-sm font-semibold text-violet-500 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/20 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              ✨ Welcome to my portfolio
            </motion.span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Creative Developer
          </h1>

          <p
            ref={descRef}
            className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
          >
            Crafting immersive digital experiences with cutting-edge technology and stunning 3D
            animations
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View My Work
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 -z-10" />
            </motion.button>

            <motion.button
              className="group relative px-8 py-4 bg-white/20 dark:bg-white/10 backdrop-blur-xl text-gray-800 dark:text-gray-100 rounded-full font-semibold border-2 border-white/40 dark:border-white/20 shadow-xl overflow-hidden"
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get In Touch
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  ✉
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30"
                initial={{ scale: 0, borderRadius: '50%' }}
                whileHover={{ scale: 2, borderRadius: '0%' }}
                transition={{ duration: 0.5 }}
              />
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-violet-300 to-fuchsia-300 -z-10" />
            </motion.button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-7 h-12 border-2 border-white/40 dark:border-white/30 rounded-full flex justify-center p-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm">
              <motion.div
                className="w-2 h-2 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full shadow-lg"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};