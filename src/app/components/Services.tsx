import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, Box, Sparkles, Layers, Zap } from 'lucide-react';

const ServiceCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, type: 'spring' }}
      whileHover={{
        y: -20,
        rotateY: 5,
        rotateX: 5,
        scale: 1.05,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative group cursor-pointer"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card */}
      <div
        className="relative p-8 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden"
        style={{ transform: 'translateZ(50px)' }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Icon */}
        <motion.div
          className="relative w-20 h-20 mb-6 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="text-white"
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Hover Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Web Development',
      description:
        'Building responsive, fast, and SEO-optimized websites with modern frameworks and best practices.',
    },
    {
      icon: <Box className="w-10 h-10" />,
      title: '3D Experiences',
      description:
        'Creating immersive 3D web experiences using Three.js, WebGL, and advanced animation techniques.',
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Mobile Apps',
      description:
        'Developing cross-platform mobile applications with native performance and beautiful UI.',
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: 'UI/UX Design',
      description:
        'Designing intuitive and visually stunning interfaces that provide exceptional user experiences.',
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: 'Animation & Motion',
      description:
        'Implementing smooth animations and micro-interactions that bring websites to life.',
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Performance',
      description:
        'Optimizing applications for lightning-fast load times and smooth 60fps interactions.',
    },
  ];

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
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
            className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-violet-500 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            What I Do
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Services & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Delivering cutting-edge solutions with passion and precision
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
