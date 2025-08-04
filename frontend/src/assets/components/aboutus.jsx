import React, { useRef } from "react";
import { Users } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

const AboutUsSection = () => {
  const containerRef = useRef(null);
  
  // Simple scroll progress for the title background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create synchronized pathLength animations for title
  const titlePathLengths = [
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    useTransform(scrollYProgress, [0, 1], [0, 1]),
  ];

  return (
    <div
      ref={containerRef}
      className="transition-all duration-500 relative overflow-hidden bg-black text-white min-h-screen"
    >
      {/* About Us Section */}
      <section className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
        {/* Heading with Normal Scroll Gemini Effect */}
        <div className="text-center mb-12 relative">
          <GoogleGeminiEffect
            pathLengths={titlePathLengths}
            title="TechForward"
            description="Building the future of technology with passion and innovation"
            className="absolute inset-0 z-0 -translate-y-35 w-full h-full scale-x-150"
            enableScrollControl={false} // Normal scroll animation
          />

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-5"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-200">
              About Us
            </h1>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-white to-gray-500"></div>
          </div>
        </div>

        {/* Introduction Paragraph with Scroll-Controlled Gemini Effect */}
        <div className="text-center mb-20 relative">
          <div className="max-w-4xl mx-auto p-10 rounded-3xl backdrop-blur-md border border-white/10 bg-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/20 hover:bg-white/10 relative z-10">
            {/* Scroll-Controlled Gemini Effect Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <GoogleGeminiEffect
                title="TechForward"
                description="Building the future of technology with passion and innovation"
                className="absolute inset-0 z-0 scale-110"
                enableScrollControl={true} // Enable scroll control
                scrollControlType="manual" // Manual scroll control
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black/30 rounded-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-xl md:text-2xl leading-relaxed mb-6 font-light text-gray-200">
                We are{" "}
                <span className="font-semibold text-white">TechForward</span>, a
                dynamic community of passionate developers, designers, and
                innovators dedicated to pushing the boundaries of technology with
                creativity, curiosity, and collaboration.
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-light text-gray-400">
                Together, we're building the future of tech, one innovative
                solution at a time. 🚀 Whether it's AI, web development, or
                open-source contributions — we thrive on solving real problems.
              </p>
            </div>
          </div>
        </div>

        {/* Team Image / Illustration */}
        <div className="relative mb-20">
          {/* Glowing Border */}
          <div className="absolute -inset-1 rounded-3xl blur-lg opacity-20 bg-gradient-to-r from-gray-600 to-gray-900"></div>

          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-gray-700/30 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm">
            <div className="aspect-video w-full flex items-center justify-center p-8">
              <div className="text-center text-gray-400">
                <div className="relative inline-block p-8 rounded-full mb-6 bg-white/5 border border-white/10">
                  <Users className="w-16 h-16" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse bg-white/20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Our Amazing Team
                </h3>
                <p className="text-lg mb-2">
                  Diverse group of young professionals and students
                </p>
                <p className="text-sm opacity-75">
                  Perfect 16:9 aspect ratio for your team photo
                </p>

                {/* Animated dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full animate-pulse bg-white/20"
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;