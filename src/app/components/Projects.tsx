import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  fullDescription: string;
}

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -15,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card */}
      <div
        className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden"
        style={{ transform: 'translateZ(50px)' }}
      >
        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-6 h-6 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-violet-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold bg-violet-500/20 text-violet-500 rounded-full border border-violet-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 border-2 border-violet-500 rounded-2xl opacity-0 group-hover:opacity-100"
          animate={{
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0)',
              '0 0 40px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(139, 92, 246, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden"
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Image */}
        <div className="relative w-full aspect-video">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-white">{project.title}</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{project.fullDescription}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-semibold bg-violet-500/20 text-violet-400 rounded-full border border-violet-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Tech Startup',
      description: 'A cutting-edge startup website with 3D animations and smooth interactions.',
      image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NzQ1NTQyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      fullDescription:
        'A fully responsive and interactive startup website featuring 3D elements, scroll-triggered animations, and a modern glassmorphism design. Built with performance and user experience in mind.',
    },
    {
      id: 2,
      title: 'Creative Workspace Platform',
      description: 'An immersive platform for creative professionals with real-time collaboration.',
      image: 'https://images.unsplash.com/photo-1763191213523-1489179a1088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQ1NDgzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Next.js', 'WebGL', 'Socket.io', 'TypeScript'],
      liveUrl: '#',
      githubUrl: '#',
      fullDescription:
        'A collaborative workspace platform featuring real-time updates, 3D visualizations, and an intuitive interface designed for creative teams to work together seamlessly.',
    },
    {
      id: 3,
      title: 'Futuristic City Explorer',
      description: 'An interactive 3D city visualization with immersive navigation.',
      image: 'https://images.unsplash.com/photo-1619960972542-d3965e0cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzQ2MjEwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Three.js', 'React Three Fiber', 'WebXR', 'Blender'],
      liveUrl: '#',
      githubUrl: '#',
      fullDescription:
        'An ambitious 3D city exploration experience built with Three.js and React Three Fiber. Navigate through a futuristic cityscape with smooth controls and stunning visuals.',
    },
    {
      id: 4,
      title: 'Abstract Digital Gallery',
      description: 'A stunning digital art gallery with interactive 3D exhibitions.',
      image: 'https://images.unsplash.com/photo-1633743252577-ccb68cbdb6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBhcnR8ZW58MXx8fHwxNzc0NTU1MDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'WebGL', 'Motion', 'Prisma'],
      liveUrl: '#',
      githubUrl: '#',
      fullDescription:
        'An immersive digital art gallery where users can explore 3D exhibitions, interact with artworks, and experience art in a completely new way through web technologies.',
    },
  ];

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
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
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my latest work and creative experiments
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
