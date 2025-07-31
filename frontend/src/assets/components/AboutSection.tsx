import { Brain, Users, Lightbulb, Target } from 'lucide-react';
const teamImage = "/assets/team-collaboration.jpg";


const AboutSection = () => {
  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Pushing the boundaries of what\'s possible with natural language understanding and generation.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building a diverse community where ideas flourish and knowledge is shared freely.'
    },
    {
      icon: Lightbulb,
      title: 'Learning',
      description: 'Continuous exploration of cutting-edge research and emerging technologies in NLP.'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Creating solutions that solve real-world problems and benefit society.'
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">About</span> Our Club
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a community of passionate students, researchers, and innovators dedicated to advancing 
              the field of Natural Language Processing through collaborative learning and research.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4 gradient-text">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To foster a collaborative environment where students can explore, learn, and contribute to 
                  the rapidly evolving field of Natural Language Processing. We bridge the gap between 
                  theoretical knowledge and practical applications.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-4 gradient-text">What We Do</h3>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    Conduct cutting-edge research in NLP and AI
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    Organize workshops and guest lectures
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    Participate in hackathons and competitions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                    Build open-source NLP tools and libraries
                  </li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="glass-card rounded-3xl p-4 hover-glow">
              <img 
                src={teamImage} 
                alt="Team Collaboration" 
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div>
            <h3 className="text-4xl font-bold text-center mb-12 gradient-text">Our Values</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="glass-card rounded-2xl p-8 text-center hover-glow group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 gradient-text">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;