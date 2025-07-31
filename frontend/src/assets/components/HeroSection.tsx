import { Button } from "./ui/button";
import { ArrowRight, Play, Sparkles } from 'lucide-react';
const heroImage = "/components/hero-nlp.jpg";


const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="NLP Hero" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-secondary rounded-full blur-3xl opacity-20 float" style={{animationDelay: '3s'}}></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8 slide-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Advancing Natural Language Processing</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 slide-up stagger-1">
            <span className="gradient-text">Decode</span>
            <br />
            <span className="text-foreground">Language with</span>
            <br />
            <span className="gradient-text">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed slide-up stagger-2">
            Join our community of passionate students exploring the frontiers of Natural Language Processing. 
            Build intelligent systems that understand, interpret, and generate human language.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 slide-up stagger-3">
            <Button 
              size="lg"
              onClick={() => scrollToSection('about')}
              className="group glass-button hover-glow px-8 py-4 text-lg font-semibold"
            >
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('projects')}
              className="group glass-button px-8 py-4 text-lg font-semibold"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-up stagger-4">
            <div className="glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">25+</div>
              <div className="text-muted-foreground">Research Projects</div>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">5+</div>
              <div className="text-muted-foreground">Published Papers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;