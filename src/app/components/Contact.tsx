import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Optimized 3D Particles for background
const ContactParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
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
      <pointsMaterial size={0.04} color="#8b5cf6" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // 3D tilt effect for form container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (inView && formRef.current) {
      // GSAP animations for form fields
      gsap.fromTo(
        '.contact-field',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [inView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('success');
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'hello@portfolio.com',
      link: 'mailto:hello@portfolio.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'San Francisco, CA',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
          <ContactParticles />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-6 py-3 mb-6 text-sm font-semibold text-violet-500 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            ✉️ Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing
                new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/20 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
              >
                <motion.div
                  className="p-4 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl text-white shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {info.icon}
                </motion.div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {info.title}
                  </h4>
                  <p className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8"
            >
              <h4 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {['T', 'L', 'G', 'D'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-14 h-14 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 md:p-10 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/20 space-y-6 shadow-2xl"
              style={{ transform: 'translateZ(50px)' }}
            >
              {/* Name Field */}
              <div className="contact-field relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? 'top-3 text-xs text-violet-500 font-semibold'
                      : 'top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 pt-7 pb-3 bg-white/20 dark:bg-white/10 border-2 rounded-xl outline-none text-gray-900 dark:text-white transition-all duration-300 ${
                    focusedField === 'name'
                      ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                      : 'border-white/30 dark:border-white/20'
                  }`}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="contact-field relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? 'top-3 text-xs text-violet-500 font-semibold'
                      : 'top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 pt-7 pb-3 bg-white/20 dark:bg-white/10 border-2 rounded-xl outline-none text-gray-900 dark:text-white transition-all duration-300 ${
                    focusedField === 'email'
                      ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                      : 'border-white/30 dark:border-white/20'
                  }`}
                  required
                />
              </div>

              {/* Subject Field */}
              <div className="contact-field relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'subject' || formData.subject
                      ? 'top-3 text-xs text-violet-500 font-semibold'
                      : 'top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 pt-7 pb-3 bg-white/20 dark:bg-white/10 border-2 rounded-xl outline-none text-gray-900 dark:text-white transition-all duration-300 ${
                    focusedField === 'subject'
                      ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                      : 'border-white/30 dark:border-white/20'
                  }`}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="contact-field relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? 'top-3 text-xs text-violet-500 font-semibold'
                      : 'top-6 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full px-4 pt-9 pb-3 bg-white/20 dark:bg-white/10 border-2 rounded-xl outline-none text-gray-900 dark:text-white transition-all duration-300 resize-none ${
                    focusedField === 'message'
                      ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                      : 'border-white/30 dark:border-white/20'
                  }`}
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitStatus === 'success'}
              >
                {submitStatus === 'success' ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Message Sent Successfully!
                  </motion.span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </>
                )}
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 -z-10" />
              </motion.button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-600 dark:text-green-400 text-center font-semibold backdrop-blur-sm"
                >
                  ✅ Thank you! I'll get back to you soon.
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
