import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Award, TrendingUp } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: React.ReactNode;
  type: 'work' | 'education' | 'achievement';
}

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
    >
      {/* Card */}
      <motion.div
        className="flex-1"
        whileHover={{ scale: 1.05, y: -10 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 relative overflow-hidden group"
          style={{ transform: 'translateZ(50px)' }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Year Badge */}
            <motion.div
              className="inline-block px-4 py-2 mb-4 text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {item.year}
            </motion.div>

            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
              {item.title}
            </h3>
            <p className="text-lg text-violet-500 mb-3 font-semibold">{item.company}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center Icon */}
      <motion.div
        className="relative flex-shrink-0"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg relative z-10"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white">{item.icon}</div>
        </motion.div>

        {/* Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline: TimelineItem[] = [
    {
      year: '2024 - Present',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Innovation Labs',
      description:
        'Leading development of cutting-edge web applications with focus on 3D experiences, performance optimization, and modern architecture. Mentoring junior developers and driving technical excellence.',
      icon: <Briefcase className="w-8 h-8" />,
      type: 'work',
    },
    {
      year: '2023',
      title: 'Awwwards Site of the Day',
      company: 'Portfolio Project Recognition',
      description:
        'Received Site of the Day recognition for innovative 3D portfolio website featuring advanced WebGL animations and immersive user interactions.',
      icon: <Award className="w-8 h-8" />,
      type: 'achievement',
    },
    {
      year: '2022 - 2024',
      title: 'Full Stack Developer',
      company: 'Creative Digital Studio',
      description:
        'Developed award-winning websites and web applications for high-profile clients. Specialized in React, Three.js, and advanced animation techniques using GSAP and Motion.',
      icon: <Briefcase className="w-8 h-8" />,
      type: 'work',
    },
    {
      year: '2021',
      title: 'Advanced Web Development Certification',
      company: 'Tech Academy Pro',
      description:
        'Completed comprehensive certification in modern web development, including React, Node.js, WebGL, and 3D web technologies. Graduated with honors.',
      icon: <GraduationCap className="w-8 h-8" />,
      type: 'education',
    },
    {
      year: '2020 - 2022',
      title: 'Frontend Developer',
      company: 'StartUp Ventures',
      description:
        'Built responsive and performant web applications for various startups. Gained expertise in React ecosystem, state management, and modern CSS frameworks.',
      icon: <Briefcase className="w-8 h-8" />,
      type: 'work',
    },
    {
      year: '2019',
      title: 'Computer Science Degree',
      company: 'University of Technology',
      description:
        'Bachelor of Science in Computer Science with focus on web technologies, computer graphics, and software engineering principles.',
      icon: <GraduationCap className="w-8 h-8" />,
      type: 'education',
    },
  ];

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            style={{ top: `${i * 10}%`, left: 0, right: 0 }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
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
            My Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A timeline of professional growth and achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-pink-500 transform -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timeline.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '5+', label: 'Years Experience' },
            { number: '30+', label: 'Happy Clients' },
            { number: '15+', label: 'Awards Won' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, type: 'spring' }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
