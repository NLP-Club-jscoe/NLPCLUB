import { Brain, Mail, Github, Twitter, Linkedin, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from "../../assets/components/ui/button";


const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Research', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Join Club', href: '#contact' }
  ];

  const resources = [
    { name: 'Getting Started', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'GitHub Repos', href: '#' }
  ];

  const contact = [
    { icon: Mail, text: 'nlpclub@university.edu', href: 'mailto:nlpclub@university.edu' },
    { icon: MapPin, text: 'Computer Science Building, Room 204', href: '#' },
    { icon: Calendar, text: 'Weekly meetings: Fridays 6 PM', href: '#' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative overflow-hidden pt-32 pb-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* CTA Section */}
          <div className="text-center mb-20">
            <div className="glass-card rounded-3xl p-12 hover-glow">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Join</span> Us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Take the first step towards advancing your NLP skills and being part of a 
                community that's shaping the future of artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="glass-button hover-glow px-8 py-4 text-lg font-semibold">
                  <Users className="mr-2 w-5 h-5" />
                  Become a Member
                </Button>
                <Button variant="outline" className="glass-button hover-glow px-8 py-4 text-lg font-semibold">
                  <Calendar className="mr-2 w-5 h-5" />
                  Attend Next Meeting
                </Button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-primary">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">NLP Club</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Empowering the next generation of NLP researchers and practitioners through 
                collaborative learning, innovative research, and real-world applications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 glass-button hover-glow rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 glass-button hover-glow rounded-full flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 glass-button hover-glow rounded-full flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <a 
                      href={resource.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-6">Get in Touch</h3>
              <ul className="space-y-4">
                {contact.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <a 
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="glass-card rounded-2xl p-8 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold gradient-text mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest news about our research, events, and opportunities directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button className="glass-button hover-glow px-6 py-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2024 NLP Club. All rights reserved. Built with passion for natural language processing.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Code of Conduct
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;