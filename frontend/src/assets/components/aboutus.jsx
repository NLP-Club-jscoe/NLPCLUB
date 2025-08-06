import React from "react";
import { Users } from "lucide-react";

const AboutUsSection = ({ isDarkMode }) => {
  // Theme-based utilities
  const containerBg = isDarkMode ? "bg-black" : "bg-white";
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900";
  const headingGradient = isDarkMode
    ? "from-white via-gray-400 to-gray-200"
    : "from-gray-800 via-gray-500 to-gray-600";
  const introTextColor = isDarkMode ? "text-gray-200" : "text-gray-700";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const overlayGradient = isDarkMode
    ? "from-black/30 via-transparent to-transparent"
    : "from-white/30 via-transparent to-transparent";
  const glowBorder = isDarkMode
    ? "from-gray-600 to-gray-900"
    : "from-yellow-200 to-orange-200";
  const teamBoxBg = isDarkMode
    ? "from-gray-900 to-black"
    : "from-white to-orange-50";
  const teamBorder = isDarkMode
    ? "border-2 border-gray-700/30"
    : "border-2 border-gray-200/50";

  return (
    <div id="about"
      className={`transition-all duration-500 relative overflow-hidden ${containerBg} ${
        isDarkMode ? "text-white" : "text-gray-900"
      }` }
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-10 animate-pulse ${
            isDarkMode ? "bg-white/10" : "bg-orange-300/30"
          }`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl opacity-10 animate-pulse delay-1000 ${
            isDarkMode ? "bg-white/10" : "bg-yellow-300/25"
          }`}
        ></div>
        <div
          className={`absolute bottom-32 left-1/4 w-40 h-40 rounded-full blur-3xl opacity-10 animate-pulse delay-2000 ${
            isDarkMode ? "bg-white/10" : "bg-red-200/20"
          }`}
        ></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            color: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          }}
        ></div>
      </div>

      {/* About Us Section */}
      <section className="relative z-10 container mx-auto px-6 py-12 max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className={`text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r ${headingGradient}`}
          >
            About Us
          </h1>
          <div
            className={`w-24 h-1 mx-auto rounded-full bg-gradient-to-r ${
              isDarkMode ? "from-white to-gray-500" : "from-gray-800 to-gray-400"
            }`}
          ></div>
        </div>

        {/* Introduction Paragraph */}
        <div className="text-center mb-16">
          <div
            className={`max-w-4xl mx-auto p-10 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              isDarkMode
                ? "border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                : "border border-gray-200 bg-white shadow-sm"
            }`}
          >
           <p className="text-xl md:text-2xl leading-relaxed mb-6 font-light text-gray-200">
      In Shaping future-ready Computer Engineers through Excellence in Education, Innovation and Imapct.
    </p>
    <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
      We are Commited to deliver cutting Edge Research , and Nuturing innovative Mindset.
    </p>
     <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
      Developing a Leading Technical centre grooming Entrepreneurship and Confident Enginners.
    </p>

          </div>
        </div>

        {/* Team Image / Illustration */}
        <div className="relative mb-20">
          {/* Glowing Border */}
          <div
            className={`absolute -inset-1 rounded-3xl blur-lg opacity-20 bg-gradient-to-r ${glowBorder}`}
          ></div>

          <div
            className={`relative overflow-hidden rounded-3xl shadow-2xl ${teamBorder} bg-gradient-to-br ${teamBoxBg}`}
          >
            <div className="aspect-video w-full flex items-center justify-center p-8">
              <div className="text-center">
                <div
                  className={`relative inline-block p-8 rounded-full mb-6 ${
                    isDarkMode
                      ? "bg-white/5 border border-white/10"
                      : "bg-orange-100 border border-orange-200"
                  }`}
                >
                  <Users
                    className={`w-16 h-16 ${
                      isDarkMode ? "text-white" : "text-orange-600"
                    }`}
                  />
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse ${
                      isDarkMode ? "bg-white/20" : "bg-yellow-200/40"
                    }`}
                  ></div>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                  Our Amazing Team
                </h3>
                <p
                  className={`text-lg mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Diverse group of young professionals and students
                </p>
                <p
                  className={`text-sm opacity-75 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Perfect 16:9 aspect ratio for your team photo
                </p>

                {/* Animated dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full animate-pulse ${
                        isDarkMode ? "bg-white/20" : "bg-orange-200/40"
                      }`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} opacity-50`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;