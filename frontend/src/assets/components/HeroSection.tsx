import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
const heroImage = "/components/hero-nlp.jpg";

const HeroSection = ({ isDarkMode = true }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Theme helpers
  const bgOverlay = isDarkMode ? "bg-black/60" : "bg-white/30";
  const headingColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const gradientText = isDarkMode
    ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500"
    : "bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-yellow-500 to-pink-500";
  const badgeBg = isDarkMode ? "bg-white/10" : "bg-black/5";
  const buttonPrimaryBg = isDarkMode ? "glass-button" : "glass-button";
  const buttonOutline = isDarkMode ? "border border-white/60" : "border border-gray-700";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="NLP Hero"
          className="w-full h-full object-cover"
          style={{ mixBlendMode: isDarkMode ? "multiply" : "normal" }}
        />
        <div
          className={`absolute inset-0 ${bgOverlay} transition-colors duration-500`}
        ></div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
            : "linear-gradient(135deg,#fcd34d,#fb7185)",
        }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full blur-3xl opacity-20"
        style={{
          animationDelay: "3s",
          background: isDarkMode
            ? "linear-gradient(135deg,#22c55e,#14b8a6)"
            : "linear-gradient(135deg,#a78bfa,#f9a8d4)",
        }}
      ></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className={`inline-flex items-center space-x-2 rounded-full px-6 py-3 mb-8 transition-all ${badgeBg}`}
          >
            <Sparkles
              className={`w-4 h-4 ${isDarkMode ? "text-yellow-300" : "text-indigo-600"}`}
            />
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Advancing Natural Language Processing
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${headingColor}`}>
            <span className={gradientText}>Decode</span>
            <br />
            <span className={headingColor}>Language with</span>
            <br />
            <span className={gradientText}>AI</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${subtitleColor}`}
          >
            Join our community of passionate students exploring the frontiers of
            Natural Language Processing. Build intelligent systems that
            understand, interpret, and generate human language.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button
              size="lg"
              onClick={() => scrollToSection("about")}
              className={`group px-8 py-4 text-lg font-semibold flex items-center gap-2 ${
                isDarkMode
                  ? "bg-white text-black hover:brightness-105"
                  : "bg-black text-white hover:brightness-90"
              }`}
            >
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("projects")}
              className={`group px-8 py-4 text-lg font-semibold flex items-center gap-2 ${
                isDarkMode
                  ? "border border-white text-white"
                  : "border border-gray-700 text-gray-900"
              }`}
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`rounded-2xl p-6 hover-glow transition ${
                isDarkMode
                  ? "backdrop-blur-md bg-white/10"
                  : "bg-white shadow-md border border-gray-200"
              }`}
            >
              <div className={`text-3xl font-bold mb-2 ${gradientText}`}>
                150+
              </div>
              <div className={`text-base ${subtitleColor}`}>Active Members</div>
            </div>
            <div
              className={`rounded-2xl p-6 hover-glow transition ${
                isDarkMode
                  ? "backdrop-blur-md bg-white/10"
                  : "bg-white shadow-md border border-gray-200"
              }`}
            >
              <div className={`text-3xl font-bold mb-2 ${gradientText}`}>
                25+
              </div>
              <div className={`text-base ${subtitleColor}`}>
                Research Projects
              </div>
            </div>
            <div
              className={`rounded-2xl p-6 hover-glow transition ${
                isDarkMode
                  ? "backdrop-blur-md bg-white/10"
                  : "bg-white shadow-md border border-gray-200"
              }`}
            >
              <div className={`text-3xl font-bold mb-2 ${gradientText}`}>
                5+
              </div>
              <div className={`text-base ${subtitleColor}`}>
                Published Papers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div
          className={`w-6 h-10 rounded-full flex justify-center border-2 ${
            isDarkMode ? "border-gray-300" : "border-gray-600"
          }`}
        >
          <div
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{
              background: isDarkMode
                ? "linear-gradient(135deg,#a5b4fc,#c7d2fe)"
                : "linear-gradient(135deg,#fbbf24,#f472b6)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
