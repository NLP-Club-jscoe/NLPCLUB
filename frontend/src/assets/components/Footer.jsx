import React, { useState, useEffect } from "react";
import {
  Brain,
  Mail,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Calendar,
  Users,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const Footer = ({ isDarkMode = true }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Visme form script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const vismeScript = document.querySelector(
        'script[src="https://static-bundles.visme.co/forms/vismeforms-embed.js"]'
      );
      if (vismeScript) {
        vismeScript.remove();
      }
    };
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
    {
      name: "GitHub Repos",
      href: "#",
      icon: ExternalLink,
      popular: true,
    },
  ];

  const contact = [
    {
      icon: Mail,
      text: "nlpclub@university.edu",
      href: "mailto:nlpclub@university.edu",
      type: "email",
    },
    {
      icon: MapPin,
      text: "Computer Science Building, Room 204",
      href: "#",
      type: "location",
    },
    {
      icon: Calendar,
      text: "Weekly meetings: Fridays 6 PM",
      href: "#",
      type: "schedule",
    },
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



  // Theme helpers
  const bg = isDarkMode ? "bg-black" : "bg-white";
  const textMain = isDarkMode ? "text-white" : "text-gray-900";
  const textSub = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-gray-900/50" : "bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-800" : "border-gray-200";
  const glowBg = isDarkMode ? "bg-white" : "bg-black";
  const secondaryGradientFrom = isDarkMode ? "from-white" : "from-orange-500";
  const gradientHeading =
    isDarkMode
      ? "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent";

  return (
    <footer
      id="contact"
      className={`${bg} ${textMain} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse delay-500" style={{ backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)" }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            isDarkMode ? "white" : "black"
          } 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced CTA Section */}
        <div className="text-center mb-20">
  <div
    className={`backdrop-blur-sm rounded-3xl p-12 hover:scale-105 transition-all duration-500 hover:shadow-2xl border ${borderColor}`}
    style={{
      backgroundColor: isDarkMode
        ? "rgba(30,30,30,0.6)"
        : "rgba(255,255,255,0.8)",
    }}
  >
    <div className="mb-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 animate-bounce">
        <Brain className="w-10 h-10 text-black" />
      </div>
      <h2
        className={`text-4xl md:text-6xl font-bold mb-6 ${gradientHeading}`}
      >
        Ready to <span className="text-white">Join</span> Us?
      </h2>
    </div>
    <p
      className={`text-xl ${textSub} mb-8 max-w-3xl mx-auto leading-relaxed`}
    >
      Take the first step towards advancing your NLP skills and being part of a
      community that's shaping the future of artificial intelligence.
    </p>

    <div className="w-full flex justify-center">
      {isDarkMode ? (
        <div
          className="visme_d"
          data-title="Contact Form"
          data-url="op607kjy-contact-form"
          data-domain="forms"
          data-full-page="false"
          data-min-height="500px"
          data-form-id="138857"
          style={{ width: "100%" }}
        ></div>
      ) : (
        <div className="visme_d" data-title="Copy of Contact Form" data-url="p9nq9yr4-copy-of-contact-form" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="139463"></div>
      )}
    </div>
  </div>
</div>



          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="p-3 rounded-xl bg-white group-hover:rotate-12 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-black" />
                </div>
                <span className="text-2xl font-bold">{`NLP Club`}</span>
              </div>
              <p className={`mb-6 leading-relaxed ${textSub}`}>
                Empowering the next generation of NLP researchers and practitioners through
                collaborative learning, innovative research, and real-world applications.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    <a
                      href={social.href}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-white hover:text-black"
                          : "bg-gray-200 hover:bg-black hover:text-white"
                      } hover:scale-110 hover:rotate-12`}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                    
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                Quick Links
                <div className="ml-2 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: isDarkMode ? "#fff" : "#000" }}></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-white group-hover:w-2 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </button>
                    <p className="text-xs text-gray-500 ml-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name} className="relative">
                    <a
                      href={resource.href}
                      className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300"
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

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              <ul className="space-y-4">
                {contact.map((item, idx) => (
                  <li key={idx} className="group">
                    <a
                      href={item.href}
                      className="flex items-start space-x-3 transition-all duration-300 hover:text-white text-gray-300"
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

          {/* Bottom Bar */}
          <div className={`border-t pt-8 ${borderColor ? `border-t ${borderColor}` : ""}`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0" style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
                © 2024 NLP Club. All rights reserved. Built with passion for natural language processing.
              </p>
              <div className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Code of Conduct"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className={`hover:underline transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
          style={{ backgroundColor: isDarkMode ? "#fff" : "#000", color: isDarkMode ? "#000" : "#fff" }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
