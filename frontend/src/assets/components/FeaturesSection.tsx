import { Code, Database, Cpu, Zap, BookOpen, Globe } from 'lucide-react';
const feature1 = "/assets/nlp-feature-1.jpg";
const feature2 = "/assets/nlp-feature-2.jpg";


const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: 'Hands-on Coding',
      description: 'Build real NLP applications using Python, TensorFlow, PyTorch, and cutting-edge frameworks.',
      image: feature1
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Learn to work with large datasets, preprocessing techniques, and feature engineering.',
      image: feature2
    },
    {
      icon: Cpu,
      title: 'Deep Learning',
      description: 'Master neural networks, transformers, and state-of-the-art architectures like BERT and GPT.',
      image: feature1
    },
    {
      icon: Zap,
      title: 'Research Projects',
      description: 'Contribute to ongoing research in sentiment analysis, machine translation, and more.',
      image: feature2
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access curated materials, tutorials, and personalized mentorship from experienced members.',
      image: feature1
    },
    {
      icon: Globe,
      title: 'Community Impact',
      description: 'Deploy models that solve real-world problems and make a difference in society.',
      image: feature2
    }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What You'll <span className="gradient-text">Learn</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive deep into the world of Natural Language Processing with our comprehensive programs 
              designed to take you from beginner to expert.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group glass-card rounded-3xl overflow-hidden hover-glow transition-all duration-500"
              >
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  
                  {/* Hover Indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 gradient-text">Ready to Start Your NLP Journey?</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Join workshops, contribute to projects, and learn from industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="glass-button hover-glow px-8 py-4 text-lg font-semibold rounded-xl">
                  View Curriculum
                </button>
                <button className="glass-button hover-glow px-8 py-4 text-lg font-semibold rounded-xl">
                  Meet Our Mentors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;