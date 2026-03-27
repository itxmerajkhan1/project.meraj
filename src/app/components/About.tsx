import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Code2, Palette, Rocket, Sparkles } from 'lucide-react';

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <div style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

const SkillOrb = ({ skill, delay }: { skill: string; delay: number }) => {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
    >
      <motion.div
        className="px-6 py-3 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 text-sm font-semibold"
        whileHover={{ scale: 1.1, y: -5 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(139, 92, 246, 0.3)',
            '0 0 40px rgba(139, 92, 246, 0.5)',
            '0 0 20px rgba(139, 92, 246, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {skill}
      </motion.div>
    </motion.div>
  );
};

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    'React',
    'Three.js',
    'GSAP',
    'TypeScript',
    'Node.js',
    'WebGL',
    'Blender',
    'Figma',
    'Tailwind CSS',
    'Next.js',
    'Motion',
    'Unity',
  ];

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing scalable and maintainable code that stands the test of time',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Creative Design',
      description: 'Crafting beautiful interfaces that captivate and engage users',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Performance',
      description: 'Building lightning-fast applications optimized for all devices',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technologies and ideas',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-violet-500 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Bringing Ideas to Life
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TiltCard>
              <div className="p-8 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl">
                <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-1">
                  <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                    <motion.div
                      className="text-8xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                          <img src="https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.82787-15/543755289_17916840327159781_4227001206674056634_n.webp?_nc_cat=110&ig_cache_key=MzcxNjc0ODk2NDcwNDg1ODkyOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMTZ4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=yExbM2LSst8Q7kNvwGNhq0-&_nc_oc=AdoSQuRSGHy7_Ui9gLUTVXbBrCeXx9UyIj73Yt5fNF9k-nMbr57zNe15P31OX5DcyTw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi22-1.fna&_nc_gid=2YKcvE87T-rUWxbj_2fMOA&_nc_ss=7a32e&oh=00_AfxDpy18vBF3BkrbMxq7siJUnqDAad53Dz8wJjS2SJpT1g&oe=69CCB730" alt="">

                    </motion.div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Full Stack Developer & 3D Enthusiast
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Passionate about creating immersive web experiences that blend cutting-edge
                  technology with stunning visuals. Specialized in React, Three.js, and modern web
                  animation techniques.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 cursor-pointer group"
              >
                <motion.div
                  className="text-violet-500 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <SkillOrb key={skill} skill={skill} delay={0.7 + index * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
