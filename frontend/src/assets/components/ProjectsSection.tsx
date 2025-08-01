import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Play, Award, Moon, Sun, Sparkles } from 'lucide-react';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDark, setIsDark] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Dynamic canvas background
 
  const projects = [
    {
      id: 1,
      title: 'Sentiment Analysis for Social Media',
      description: 'Real-time sentiment analysis of social media posts using transformer models with 94% accuracy.',
      category: 'research',
      technologies: ['Python', 'BERT', 'PyTorch', 'React'],
      gradient: '',
      achievements: ['Published at EMNLP 2023', 'Best Student Paper Award'],
    },
    {
      id: 2,
      title: 'Medical Document Parser',
      description: 'AI-powered system to extract key information from medical records and reports.',
      category: 'applications',
      technologies: ['spaCy', 'TensorFlow', 'FastAPI', 'Vue.js'],
      gradient: '',
      achievements: ['Deployed in 3 hospitals', '50% time savings'],
    },
    {
      id: 3,
      title: 'Multilingual Chatbot Framework',
      description: 'Open-source framework for building chatbots that understand 15+ languages.',
      category: 'tools',
      technologies: ['Transformers', 'Flask', 'Docker', 'Angular'],
      gradient: '',
      achievements: ['1000+ GitHub stars', 'Used by 50+ companies'],
    },
    {
      id: 4,
      title: 'Code Generation Assistant',
      description: 'GPT-powered tool that generates code from natural language descriptions.',
      category: 'tools',
      technologies: ['OpenAI API', 'Node.js', 'TypeScript', 'Electron'],
      gradient: '',
      achievements: ['Featured on Product Hunt', '10k+ users'],
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

 const themeClasses = {
  background: isDark ? 'bg-black' : 'bg-gray-50',
  text: isDark ? 'text-white' : 'text-gray-900',
  muted: isDark ? 'text-gray-400' : 'text-gray-600',
  card: isDark 
    ? 'bg-black/70 border-neutral-800/70' 
    : 'bg-white/70 border-gray-200/50',
  button: isDark 
    ? 'bg-black/60 border-neutral-700 hover:bg-neutral-800/70' 
    : 'bg-white/50 border-gray-300 hover:bg-gray-100/50',
  activeButton: isDark 
    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
};


  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Dynamic Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Theme Toggle */}
    

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <h2 className="text-5xl md:text-6xl font-bold">
                  Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
                </h2>
                
              </div>
              <p className={`text-xl max-w-3xl mx-auto ${themeClasses.muted}`}>
                Discover our innovative NLP projects that are pushing the boundaries of 
                artificial intelligence and making real-world impact.
              </p>
            </div>


            {/* Projects Grid - Optimized for 4 projects */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`group relative rounded-3xl overflow-hidden backdrop-blur-md border transition-all duration-700 hover:scale-105 hover:shadow-2xl ${themeClasses.card}`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  {/* Gradient Header */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    {/* Floating Shapes */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/30">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 bg-black">
                      {project.title}
                    </h3>
                    <p className={`${themeClasses.muted} mb-6 leading-relaxed text-lg`}>
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className={`px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border ${
                            isDark ? 'bg-gray-700/50 border-gray-600 text-gray-300' : 'bg-gray-100/70 border-gray-300 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3 mb-8">
                      {project.achievements.map((achievement, idx) => (
                        <div key={idx} className={`flex items-center text-sm ${themeClasses.muted}`}>
                          <Award className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                          {achievement}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${themeClasses.button} flex items-center justify-center`}>
                        <Github className="w-5 h-5 mr-2" />
                        Code
                      </button>
                      <button className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${themeClasses.button} flex items-center justify-center`}>
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Demo
                      </button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-10 blur-xl`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsSection;