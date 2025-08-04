import React from "react";
import { Code, Database, Cpu, Zap, BookOpen, Globe } from "lucide-react";

const feature1 = "/assets/nlp-feature-1.jpg";
const feature2 = "/assets/nlp-feature-2.jpg";

const FeaturesSection = ({ isDarkMode }) => {
  const features = [
    {
      icon: Code,
      title: "Hands-on Coding",
      description:
        "Build real NLP applications using Python, TensorFlow, PyTorch, and cutting-edge frameworks.",
      image: feature1,
    },
    {
      icon: Database,
      title: "Data Science",
      description:
        "Learn to work with large datasets, preprocessing techniques, and feature engineering.",
      image: feature2,
    },
    {
      icon: Cpu,
      title: "Deep Learning",
      description:
        "Master neural networks, transformers, and state-of-the-art architectures like BERT and GPT.",
      image: feature1,
    },
    {
      icon: Zap,
      title: "Research Projects",
      description:
        "Contribute to ongoing research in sentiment analysis, machine translation, and more.",
      image: feature2,
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description:
        "Access curated materials, tutorials, and personalized mentorship from experienced members.",
      image: feature1,
    },
    {
      icon: Globe,
      title: "Community Impact",
      description:
        "Deploy models that solve real-world problems and make a difference in society.",
      image: feature2,
    },
  ];

  // Theme-based helpers
  const sectionBg = isDarkMode ? "bg-black" : "bg-white";
  const headingText = isDarkMode ? "text-white" : "text-gray-900";
  const subText = isDarkMode ? "text-gray-300" : "text-gray-700";
  const cardBg = isDarkMode ? "backdrop-blur-md bg-white/5" : "bg-white";
  const cardBorder = isDarkMode
    ? "border border-white/10"
    : "border border-gray-200";
  const gradientTextClass = isDarkMode
    ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500"
    : "bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500";
  const buttonBg = isDarkMode
    ? "bg-white/10 hover:bg-white/20 text-white"
    : "bg-black text-white hover:bg-gray-800";

  return (
    <section
      id="features"
      className={`py-32 relative overflow-hidden transition-colors duration-500 ${sectionBg}`}
    >
      {/* Background Elements */}
      <div
        className={`absolute top-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-gradient-to-br from-purple-600 to-indigo-800" : "bg-gradient-to-br from-yellow-300 to-pink-200"
        }`}
      ></div>
      <div
        className={`absolute bottom-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-gradient-to-br from-blue-600 to-teal-800" : "bg-gradient-to-br from-green-200 to-cyan-100"
        }`}
      ></div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 ${headingText}`}
            >
              What You'll{" "}
              <span className={`${gradientTextClass}`}>Learn</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${subText}`}>
              Dive deep into the world of Natural Language Processing with our
              comprehensive programs designed to take you from beginner to
              expert.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group rounded-3xl overflow-hidden transition-all duration-500 ${cardBg} ${cardBorder} hover:shadow-2xl`}
              >
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                         style={{
                           background: isDarkMode
                             ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                             : "linear-gradient(135deg,#f59e0b,#ef4444)"
                         }}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${gradientTextClass}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${subText}`}>
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className={`w-12 h-1 rounded-full ${
                        isDarkMode
                          ? "bg-gradient-to-r from-white to-gray-400"
                          : "bg-gradient-to-r from-orange-500 to-pink-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div
              className={`rounded-3xl p-12 max-w-4xl mx-auto ${isDarkMode ? "backdrop-blur-md bg-white/5 border border-white/20" : "bg-white shadow-md border border-gray-200"}`}
            >
              <h3
                className={`text-3xl font-bold mb-4 ${gradientTextClass}`}
              >
                Ready to Start Your NLP Journey?
              </h3>
              <p className={`text-xl mb-8 ${subText}`}>
                Join workshops, contribute to projects, and learn from industry
                experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className={`px-8 py-4 text-lg font-semibold rounded-xl transition ${buttonBg}`}
                >
                  View Curriculum
                </button>
                <button
                  className={`px-8 py-4 text-lg font-semibold rounded-xl transition ${buttonBg}`}
                >
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
