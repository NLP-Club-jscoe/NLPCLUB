import { useState } from 'react';
import { Github, ExternalLink, Play, Award } from 'lucide-react';
import { Button } from "../../assets/components/ui/button";


const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'research', name: 'Research' },
    { id: 'applications', name: 'Applications' },
    { id: 'tools', name: 'Tools' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Sentiment Analysis for Social Media',
      description: 'Real-time sentiment analysis of social media posts using transformer models with 94% accuracy.',
      category: 'research',
      technologies: ['Python', 'BERT', 'PyTorch', 'React'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['Published at EMNLP 2023', 'Best Student Paper Award'],
      videoUrl: '#'
    },
    {
      id: 2,
      title: 'Medical Document Parser',
      description: 'AI-powered system to extract key information from medical records and reports.',
      category: 'applications',
      technologies: ['spaCy', 'TensorFlow', 'FastAPI', 'Vue.js'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['Deployed in 3 hospitals', '50% time savings'],
      videoUrl: '#'
    },
    {
      id: 3,
      title: 'Multilingual Chatbot Framework',
      description: 'Open-source framework for building chatbots that understand 15+ languages.',
      category: 'tools',
      technologies: ['Transformers', 'Flask', 'Docker', 'Angular'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['1000+ GitHub stars', 'Used by 50+ companies'],
      videoUrl: '#'
    },
    {
      id: 4,
      title: 'Code Generation Assistant',
      description: 'GPT-powered tool that generates code from natural language descriptions.',
      category: 'tools',
      technologies: ['OpenAI API', 'Node.js', 'TypeScript', 'Electron'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['Featured on Product Hunt', '10k+ users'],
      videoUrl: '#'
    },
    {
      id: 5,
      title: 'News Summarization Engine',
      description: 'Automatic summarization of news articles using extractive and abstractive methods.',
      category: 'research',
      technologies: ['T5', 'ROUGE', 'Streamlit', 'PostgreSQL'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['ACL Workshop 2023', 'Industry Partnership'],
      videoUrl: '#'
    },
    {
      id: 6,
      title: 'Voice Command Interface',
      description: 'Natural language interface for smart home devices with voice recognition.',
      category: 'applications',
      technologies: ['Whisper', 'Rasa', 'IoT', 'React Native'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      demoUrl: '#',
      achievements: ['Patent Filed', 'Startup Incubated'],
      videoUrl: '#'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the innovative NLP projects our members have built, from research papers 
              to production applications making real-world impact.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'glass-button hover-glow'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group glass-card rounded-3xl overflow-hidden hover-glow transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-primary text-white text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 gradient-text">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-muted rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2 mb-6">
                    {project.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Award className="w-4 h-4 text-accent mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 glass-button hover-glow">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 glass-button hover-glow">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 gradient-text">Want to Build Something Amazing?</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Join our project teams and contribute to cutting-edge NLP research and applications.
              </p>
              <Button className="glass-button hover-glow px-8 py-4 text-lg font-semibold">
                Propose a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;