import { useState, useRef } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import StarsCanvas from './StarCanvas';
import {SparklesCore} from './ui/sparkles';
 // Make sure this path is correct

// --- DATA ---
const initialMentors = [
  {
    id: 1,
    name: 'Dr. P.D. Lambhate',
    role: 'Head Of Department',
    image: 'mentor1.jpg',
    bio: 'Ph.D. in Computer Engineering with over 26 years of teaching experience and 2 years of industrial experience, providing strong academic and practical guidance to students.',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 2,
    name: 'Dr. S.B. Chaudhari',
    role: 'Club Co-ordinator',
    image: 'mentor2.jpg',
    bio: 'Ph.D. in Computer Engineering with over 32 years of teaching experience, specializing in Natural Language Processing, Machine Translation, and Transliteration, with expertise in C, C++, Java, AFL, and Python.',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
];

// --- MENTOR CARD COMPONENT ---
const MentorCard = ({ mentor, isDarkMode }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (x - centerX) / -20;
    
    const content = card.querySelector('.card-content');
    if(content) {
      content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    const content = card.querySelector('.card-content');
    if(content) {
      content.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-container group relative rounded-xl p-8 [perspective:1000px] transition-all duration-300 ${
        isDarkMode 
          ? 'border border-white/10 bg-black hover:border-cyan-400/30' 
          : 'border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-cyan-400/50 hover:-translate-y-1'
      }`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px at var(--mouse-x) var(--mouse-y), ${
            isDarkMode 
              ? 'rgba(3, 201, 255, 0.15)' 
              : 'rgba(3, 201, 255, 0.1)'
          }, transparent 80%)`,
        }}
      />
      
      {/* Decorative gradient overlay for light theme */}
      {!isDarkMode && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-50/50 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Card Content with 3D transform */}
      <div className="card-content transition-transform duration-300 ease-out flex flex-col items-center text-center relative z-10">
        {/* Mentor Image */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600'
          } p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-black' : 'bg-white'}`} />
          </div>
          <img
            className={`relative w-32 h-32 rounded-full object-cover border-4 transition-all duration-300 ${
              isDarkMode 
                ? 'border-white/10 group-hover:border-cyan-400/50' 
                : 'border-gray-300 group-hover:border-cyan-500/70 group-hover:shadow-lg'
            }`}
            src={mentor.image}
            alt={mentor.name}
          />
        </div>

        {/* Mentor Details */}
        <div className="mb-6">
          <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
            isDarkMode 
              ? 'text-slate-100' 
              : 'text-slate-800 group-hover:text-slate-900'
          }`}>
            {mentor.name}
          </h3>
          <p className={`text-md font-medium transition-colors duration-300 ${
            isDarkMode 
              ? 'text-cyan-400' 
              : 'text-cyan-600 group-hover:text-cyan-700'
          }`}>
            {mentor.role}
          </p>
        </div>

        {/* Biography */}
        <p className={`leading-relaxed mb-6 transition-colors duration-300 ${
          isDarkMode 
            ? 'text-slate-400' 
            : 'text-slate-600 group-hover:text-slate-700'
        }`}>
          {mentor.bio}
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-5">
          <a
            href={mentor.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 transform hover:scale-110 ${
              isDarkMode 
                ? 'text-slate-500 hover:text-cyan-400' 
                : 'text-slate-500 hover:text-cyan-600 hover:drop-shadow-md'
            }`}
            aria-label={`${mentor.name}'s LinkedIn Profile`}
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={mentor.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 transform hover:scale-110 ${
              isDarkMode 
                ? 'text-slate-500 hover:text-cyan-400' 
                : 'text-slate-500 hover:text-cyan-600 hover:drop-shadow-md'
            }`}
            aria-label={`${mentor.name}'s GitHub Profile`}
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MENTORS COMPONENT ---
const Mentors = ({isDarkMode}) => {
  const [mentors] = useState(initialMentors);




  return (
    <section className={`relative ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-900'
    } h-screen overflow-hidden flex items-center justify-center transition-all duration-500`}>
      
      {/* The StarsCanvas component for the animated background - only in dark theme */}
      {isDarkMode && <StarsCanvas isDarkMode={isDarkMode} />}

      {/* Floating elements for light theme */}
      {!isDarkMode && (
        <>
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </>
      )}

      {/* The main content, layered on top of the canvas */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Theme Toggle Button */}

        
        {/* Section Header */}
        {/* Section Header */}
<div className="text-center max-w-3xl mx-auto mb-16">
  <h2
    className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
      isDarkMode
        ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500'
        : 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600'
    }`}
  >
    Our Mentors
  </h2>
  <p
    className={`text-lg ${
      isDarkMode ? 'text-slate-400' : 'text-slate-600'
    }`}
  >
    Guidance from the best in the field, dedicated to fostering the next generation of innovators.
  </p>

 {isDarkMode && (
    <div className="w-[40rem] h-40 relative mx-auto">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={2}
        particleDensity={300}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_0%,white)]" />
    </div>
  )}
</div>


        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-4xl mx-auto">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;