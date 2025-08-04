import React, { useState } from "react";
import Header from "../assets/components/Header";
import HeroSection from "../assets/components/HeroSection";
import ProjectsSection from "../assets/components/ProjectsSection";
import Mentors from "../assets/components/Mentors";
import Footer from "../assets/components/Footer";
import HeaderFrame from "../assets/components/HeaderFrame";
import Head from "../assets/components/Head";
import TeamMembers from "../assets/components/TeamMembers";
import NlpClubGallery from "../assets/components/TeamMemberGallery";
import AboutUsSection from "../assets/components/aboutus";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const themeValues = {
    buttonBg: isDarkMode
      ? "bg-white/10 hover:bg-white/20 text-white"
      : "bg-black text-white hover:bg-gray-800",
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "StencilFont" }}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-20 right-6  z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${themeValues.buttonBg}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          // Sun icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364
               6.364l-.707-.707M6.343 6.343l-.707-.707m12.728
               0l-.707.707M6.343 17.657l-.707.707M16
               12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646
               3.646 9.003 9.003 0 0012 21a9.003
               9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Pass isDarkMode to all components */}
      <Header isDarkMode={isDarkMode} />
      <Head isDarkMode={isDarkMode} />
      <AboutUsSection isDarkMode={isDarkMode} />
      <ProjectsSection isDarkMode={isDarkMode} />
      <NlpClubGallery isDarkMode={isDarkMode} />
      <Mentors isDarkMode={isDarkMode} />
      <TeamMembers isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme}  />
    </div>
  );
};

export default Index;
