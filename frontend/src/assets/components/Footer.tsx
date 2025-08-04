import React, { useState, useEffect } from 'react';
import { Brain, Mail, Github, Twitter, Linkedin, MapPin, Calendar, Users, Send, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load Visme form script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const vismeScript = document.querySelector('script[src="https://static-bundles.visme.co/forms/vismeforms-embed.js"]');
      if (vismeScript) {
        vismeScript.remove();
      }
    };
  }, []);

  const quickLinks = [
    { name: 'About Us', href: '#about', description: 'Learn about our mission' },
    { name: 'Research', href: '#projects', description: 'Explore our projects' },
    { name: 'Events', href: '#events', description: 'Join our activities' },
    { name: 'Join Club', href: '#contact', description: 'Become a member' }
  ];

  const resources = [
    { name: 'Getting Started', href: '#', icon: ExternalLink, new: true },
    { name: 'Tutorials', href: '#', icon: ExternalLink },
    { name: 'Documentation', href: '#', icon: ExternalLink },
    { name: 'GitHub Repos', href: '#', icon: ExternalLink, popular: true }
  ];

  const contact = [
    { icon: Mail, text: 'nlpclub@university.edu', href: 'mailto:nlpclub@university.edu', type: 'email' },
    { icon: MapPin, text: 'Computer Science Building, Room 204', href: '#', type: 'location' },
    { icon: Calendar, text: 'Weekly meetings: Fridays 6 PM', href: '#', type: 'schedule' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', name: 'Twitter', followers: '2.1K' },
    { icon: Github, href: '#', name: 'GitHub', followers: '850' },
    { icon: Linkedin, href: '#', name: 'LinkedIn', followers: '1.5K' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="relative bg-black text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced CTA Section */}
          <div className="text-center mb-20">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-12 hover:bg-gray-900/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 animate-bounce">
                  <Brain className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to <span className="text-white">Join</span> Us?
                </h2>
              </div>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Take the first step towards advancing your NLP skills and being part of a 
                community that's shaping the future of artificial intelligence.
              </p>
              
              <div className="w-full flex justify-center">
                <div 
                  className="visme_d" 
                  data-title="Contact Form" 
                  data-url="op607kjy-contact-form" 
                  data-domain="forms"
                  data-full-page="false" 
                  data-min-height="500px"
                  data-form-id="138857"
                  data-form-id={isdark}
                  style={{width: '100%'}}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="p-3 rounded-xl bg-white group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-black" />
                </div>
                <span className="text-2xl font-bold text-white">NLP Club</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering the next generation of NLP researchers and practitioners through 
                collaborative learning, innovative research, and real-world applications.
              </p>
              
              {/* Enhanced Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    <a 
                      href={social.href} 
                      className="w-12 h-12 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                    {hoveredSocial === index && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap animate-fadeIn">
                        {social.followers} followers
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                Quick Links
                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-white group-hover:w-2 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </button>
                    <p className="text-xs text-gray-500 ml-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Resources */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={resource.name} className="relative">
                    <a 
                      href={resource.href}
                      className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {resource.name}
                      </span>
                      <resource.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    {resource.new && (
                      <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-0.5 rounded-full font-medium">
                        NEW
                      </span>
                    )}
                    {resource.popular && (
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        POPULAR
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              <ul className="space-y-4">
                {contact.map((item, index) => (
                  <li key={index} className="group">
                    <a 
                      href={item.href}
                      className="flex items-start space-x-3 text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5 group-hover:animate-pulse">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="leading-relaxed group-hover:translate-x-1 transition-transform duration-300">
                        {item.text}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Enhanced Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 NLP Club. All rights reserved. Built with passion for natural language processing.
              </p>
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((link) => (
                  <a 
                    key={link}
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 shadow-lg z-50 animate-bounce"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;