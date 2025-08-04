import React, { useState, useEffect } from 'react';
import { Brain, Mail, Github, Twitter, Linkedin, MapPin, Calendar, Users, Send, ChevronUp, ExternalLink, CheckCircle, Sun, Moon } from 'lucide-react';
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import VismeForm from './VismeForm';

// Accept isDarkMode (boolean) and toggleTheme (function) as props
const Footer = ({ isDarkMode, toggleTheme }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    // Clean up any lingering iframes when the theme changes
    const iframes = document.querySelectorAll('iframe[src*="visme.co"]');
    iframes.forEach(iframe => {
        const parent = iframe.parentElement;
        if(parent && parent.classList.contains('visme_d')) {
            parent.remove();
        }
    });

    // If Visme's script is already loaded, just tell it to render the forms
    if (window.VismeForms) {
      window.VismeForms.render();
    } else {
      // Otherwise, load the script
      const script = document.createElement('script');
      script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isDarkMode]); // Dependency is now the boolean

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { name: "About Us", href: "#about", description: "Learn about our mission" },
    { name: "Research", href: "#projects", description: "Explore our projects" },
    { name: "Events", href: "#events", description: "Join our activities" },
    { name: "Join Club", href: "#contact", description: "Become a member" },
  ];

  const resources = [
    { name: "Getting Started", href: "#", icon: ExternalLink, new: true },
    { name: "Tutorials", href: "#", icon: ExternalLink },
    { name: "Documentation", href: "#", icon: ExternalLink },
    { name: "GitHub Repos", href: "#", icon: ExternalLink, popular: true },
  ];

  const contact = [
    { icon: Mail, text: "nlpclub@university.edu", href: "mailto:nlpclub@university.edu", type: "email" },
    { icon: MapPin, text: "Computer Science Building, Room 204", href: "#", type: "location" },
    { icon: Calendar, text: "Weekly meetings: Fridays 6 PM", href: "#", type: "schedule" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", name: "Twitter", followers: "2.1K" },
    { icon: Github, href: "#", name: "GitHub", followers: "850" },
    { icon: Linkedin, href: "#", name: "LinkedIn", followers: "1.5K" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const themeClasses = {
    dark: {
      footer: 'bg-black text-white',
      cta: 'bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:shadow-white/10',
      heading: 'text-white',
      paragraph: 'text-gray-300',
      link: 'text-gray-300 hover:text-white',
      socialBg: 'bg-gray-800 hover:bg-white hover:text-black',
      bottomBar: 'border-gray-800',
      bottomBarLink: 'text-gray-400 hover:text-white',
    },
    light: {
      footer: 'bg-white text-black',
      cta: 'bg-gray-100/50 border-gray-200 hover:bg-gray-200/70 hover:shadow-black/10',
      heading: 'text-black',
      paragraph: 'text-gray-600',
      link: 'text-gray-600 hover:text-black',
      socialBg: 'bg-gray-200 hover:bg-black hover:text-white',
      bottomBar: 'border-gray-200',
      bottomBarLink: 'text-gray-500 hover:text-black',
    }
  };
  
  // Use a ternary operator to select the current theme's classes
  const currentTheme = isDarkMode ? themeClasses.dark : themeClasses.light;

  return (
    <footer id="contact" className={`relative overflow-hidden ${currentTheme.footer}`}>
      {/* Conditional rendering based on the isDarkMode boolean */}
      {isDarkMode && (
        <>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </>
      )}
      
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-8">
        {/* Note: This toggle button is now wired up with the toggleTheme prop */}
       

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className={`backdrop-blur-sm border rounded-3xl p-12 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${currentTheme.cta} relative overflow-hidden`}>
              {isDarkMode && (
                <>
                  <ShootingStars />
                  <StarsBackground />
                </>
              )}
              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className={`text-4xl md:text-6xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' : currentTheme.paragraph}`}>
                    Ready to <span className={currentTheme.heading}>Join</span> Us?
                  </h2>
                </div>
                <p className={`text-xl ${currentTheme.paragraph} mb-8 max-w-3xl mx-auto leading-relaxed`}>
                  Take the first step towards advancing your NLP skills and being part of a community that's shaping the future of artificial intelligence.
                </p>
                <div className="w-full flex justify-center ">
                  {isDarkMode ? (
                    <VismeForm formUrl="op607kjy-contact-form" formId="138857" />
                  ) : (
                    <VismeForm formUrl="p9nq9yr4-copy-of-contact-form" formId="139463" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className={`p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
                  <Brain className={`w-8 h-8 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                </div>
                <span className={`text-2xl font-bold ${currentTheme.heading}`}>NLP Club</span>
              </div>
              <p className={`${currentTheme.paragraph} mb-6 leading-relaxed`}>
                Empowering the next generation of NLP researchers and practitioners through collaborative learning, innovative research, and real-world applications.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    <a 
                      href={social.href} 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${currentTheme.socialBg}`}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-xl font-bold ${currentTheme.heading} mb-6 flex items-center`}>
                Quick Links
                <div className={`ml-2 w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`group ${currentTheme.link} transition-all duration-300 flex items-center space-x-2`}
                    >
                      <span className={`w-1 h-1 rounded-full group-hover:w-2 transition-all duration-300 ${isDarkMode ? 'bg-gray-600 group-hover:bg-white' : 'bg-gray-400 group-hover:bg-black'}`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </button>
                    <p className={`text-xs mt-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {link.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-bold ${currentTheme.heading} mb-6`}>Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name} className="relative">
                    <a href={resource.href} className={`group ${currentTheme.link} transition-all duration-300 flex items-center justify-between`}>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{resource.name}</span>
                      <resource.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-bold ${currentTheme.heading} mb-6`}>Get in Touch</h3>
              <ul className="space-y-4">
                {contact.map((item, idx) => (
                  <li key={idx} className="group">
                    <a href={item.href} className={`flex items-start space-x-3 ${currentTheme.link} transition-all duration-300`}>
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5 group-hover:animate-pulse">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="leading-relaxed group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`border-t ${currentTheme.bottomBar} pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4 md:mb-0`}>
                © 2024 NLP Club. All rights reserved. Built with passion for natural language processing.
              </p>
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((link) => (
                  <a key={link} href="#" className={`${currentTheme.bottomBarLink} transition-colors duration-300 hover:underline`}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-50 animate-bounce ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </footer>
  );
};

export default Footer;