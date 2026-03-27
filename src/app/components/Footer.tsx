import { motion } from 'motion/react';
import { Heart, Github, Twitter, Linkedin, Dribbble, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Navigation: ['Home', 'About', 'Services', 'Projects', 'Experience', 'Contact'],
    Services: [
      'Web Development',
      '3D Experiences',
      'Mobile Apps',
      'UI/UX Design',
      'Animation',
      'Consulting',
    ],
    Resources: ['Blog', 'Case Studies', 'Documentation', 'Support', 'FAQ', 'Privacy Policy'],
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: '#', name: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, url: '#', name: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, url: '#', name: 'LinkedIn' },
    { icon: <Dribbble className="w-5 h-5" />, url: '#', name: 'Dribbble' },
  ];

  return (
    <footer className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-transparent to-white/5 dark:to-black/20">
      {/* Animated Wave Effect */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <motion.svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="url(#gradient)"
            animate={{
              d: [
                'M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z',
                'M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,69.3C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              PORTFOLIO
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Creating immersive digital experiences with cutting-edge technology and stunning
              visuals. Let's build something amazing together.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-12 h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 dark:border-white/10 hover:bg-gradient-to-br hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            © 2026 Portfolio. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            Creative Developer
          </motion.p>

          <div className="flex items-center gap-6">
            <motion.a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms & Conditions
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg text-white z-40"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </footer>
  );
};
