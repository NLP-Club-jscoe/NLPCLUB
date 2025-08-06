import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Play, Award, Moon, Sun, Sparkles } from 'lucide-react';

const ProjectsSection = ({isDarkMode}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Dynamic canvas background
 
  const projects = [
  {
    id: 1,
    title: 'Alumni Connect',
    description:
      'Cloud-powered platform that connects students with alumni for mentorship and growth. Features AI-based mentor matching, achievement sharing, and real-time chat.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=faces', // Added image
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'LangChain', 'AWS'],
    gradient: 'from-blue-600 to-purple-600',
    achievements: ['Finalist in SIH 2024', 'Used by 200+ users', 'Real-time role-based chat implemented'],
  },
  {
    id: 2,
    title: 'AI Interview Agent',
    description:
      'Modular AI system that conducts round-wise technical interviews with voice, resume parsing, and anti-cheat monitoring. Powered by real-time STT, TTS, and RAG pipelines.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces', // Added image
    technologies: ['LangChain', 'FastAPI', 'PyTorch', 'Groq API', 'React'],
    gradient: 'from-emerald-600 to-teal-600',
    achievements: ['Supports 5+ job roles', 'RAG-based question generation', 'Voice-based interaction prototype ready'],
  },
  {
    id: 3,
    title: 'AI Health Chain',
    description:
      'AI-powered platform bridging patients and hospitals using chatbots. Offers symptom-based guidance, real-time hospital connection, and post-treatment monitoring.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center', // Added image
    technologies: ['FastAPI', 'LangChain', 'React', 'MongoDB', 'HuggingFace'],
    gradient: 'from-red-600 to-pink-600',
    achievements: ['Supports 10+ symptoms', 'Secure patient-hospital chat', 'Tested with real users'],
  },
  {
    id: 4,
    title: 'Revizio AI',
    description:
      'AI note-enhancement tool that transforms handwritten notes into enriched study material, mind maps, and Q&A using authentic sources like YouTube and books.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop&crop=center', // Added image
    technologies: ['Python', 'LangChain', 'YouTube API', 'GPT-4', 'React'],
    category:'',
    gradient: 'from-amber-600 to-orange-600',
    achievements: ['Transforms raw notes into 3 formats', 'Used by 100+ students', 'YouTube transcript integration'],
  }
];


  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

 const themeClasses = {
  background: isDarkMode ? 'bg-black' : 'bg-gray-50',
  text: isDarkMode ? 'text-white' : 'text-gray-900',
  muted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  card: isDarkMode 
    ? 'bg-black/70 border-neutral-800/70' 
    : 'bg-white/70 border-gray-200/50',
  button: isDarkMode 
    ? 'bg-black/60 border-neutral-700 hover:bg-neutral-800/70' 
    : 'bg-white/50 border-gray-300 hover:bg-gray-100/50',
  activeButton: isDarkMode 
    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
};


  return (
    <div id='projects' className={`min-h-screen relative overflow-hidden transition-all duration-700 ${themeClasses.background} ${themeClasses.text}`}>
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
                  {/* Image/Gradient Header */}
                  <div className={`relative h-48 overflow-hidden ${project.image ? '' : `bg-gradient-to-br ${project.gradient}`}`}>
                    {project.image ? (
                      <>
                        {/* Project Image */}
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay gradient for better text readability */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}></div>
                      </>
                    ) : null}
                    
                    {/* Floating Shapes */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
                    
                    {/* Project Icon/Logo area - optional */}
                    <div className="absolute top-4 left-4">
                      
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">
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
                            isDarkMode ? 'bg-gray-700/50 border-gray-600 text-gray-300' : 'bg-gray-100/70 border-gray-300 text-gray-700'
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