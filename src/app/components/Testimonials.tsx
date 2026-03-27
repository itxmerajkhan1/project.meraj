import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechVision Inc.',
      content:
        'Working with this developer was an absolute game-changer for our company. The attention to detail, creativity, and technical expertise exceeded all expectations. The 3D animations and smooth interactions brought our vision to life in ways we never imagined possible.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLabs',
      content:
        'Exceptional work! The portfolio website created for us has received countless compliments from clients and partners. The performance is outstanding, and the visual effects are truly next-level. Highly recommend for any cutting-edge web project.',
      rating: 5,
      avatar: '👨‍💻',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'Design Studio Pro',
      content:
        'A true professional who understands both design and development. The collaborative process was smooth, and the final result was beyond impressive. The 3D elements and animations perfectly captured our brand aesthetic while maintaining excellent performance.',
      rating: 5,
      avatar: '👩‍🎨',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Founder',
      company: 'StartupHub',
      content:
        'The best investment we made for our online presence. The website not only looks stunning but also performs flawlessly across all devices. The custom animations and interactive elements have significantly improved our user engagement metrics.',
      rating: 5,
      avatar: '👨‍💼',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
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
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real feedback from amazing people I've worked with
          </p>
        </motion.div>

        {/* 3D Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateY: 90, z: -200 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              exit={{ opacity: 0, rotateY: -90, z: -200 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{ transformStyle: 'preserve-3d' }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                className="p-12 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                style={{ transform: 'translateZ(100px)' }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute top-8 left-8 text-violet-500/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Quote className="w-20 h-20" />
                </motion.div>

                {/* Avatar */}
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-4xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {currentTestimonial.avatar}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="text-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      >
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-violet-500 font-semibold">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                  </div>
                </motion.div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3), transparent 70%)',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 200%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-violet-500 to-fuchsia-500'
                      : 'w-3 h-3 bg-white/20 dark:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
