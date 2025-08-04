import { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const initialTeamMembers = [
  {
    id: 1,
    name: "Shreyash Sudhakar Gadekar",
    role: "Club Lead",
    bio: "Versatile programmer with cross-domain experience, strong problem-solving skills, and a focus on building efficient, real-world solutions. Quick learner who thrives in dynamic environments.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com/in/shreyashgadekar",
      github: "https://github.com/Shreyash68",
    },
  },
  {
    id: 2,
    name: "Neha Jakate",
    role: "Co-Lead",
    bio: "Highly driven into deep interest in AI/ML, Data Science, Generative AI, Large Language Models, and Vision-Language Models, pushing the boundaries of intelligent systems.",
    image: "neha.jpg",
    social: {
      github: "https://github.com/NEHAJAKATE ",
      linkedin: "https://www.linkedin.com/in/neha-jakate-13853728b",
    },
  },
  {
    id: 3,
    name: "Mayank Chaudhari",
    role: "Management Lead",
    bio: "DevOps enthusiast with a strong passion for AI prompting and Python development — combining architectural thinking, DSA skills, and team leadership to drive innovation.",
    image: "mayank.png",
    social: {
      linkedin: "https://linkedin.com/in/mayankchaudhari2004",
      github: "https://github.com/Mayank11104",
    },
  },
  {
    id: 4,
    name: "Pranao Adhau",
    role: "Technical Lead",
    bio: "Research-driven in AI/ML and Generative AI with strong mathematical foundations in optimization, linear algebra, and probability—focused on LLM fine-tuning, semantic search, and scalable model systems.",
    image: "pranao.png",
    social: {
      github: "https://github.com/pranao0609",
      linkedin: "https://linkedin.com/in/Pranaoadhau",
    },
  },
  {
    id: 5,
    name: "Sahil Anil Shirsath",
    role: "AI Full Stack Developer",
    bio: "Passionate about building scalable web apps, automating workflows, and integrating cutting-edge AI into real-world solutions.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com/in/sahil-shirsath-572b83285",
      github: "https://github.com/sahilshirsath0",
    },
  },
  {
    id: 6,
    name: "Saee Bhagwan Gaikwad",
    role: "UI/UX Designer",
    bio: "Creative UI/UX designer skilled in Figma and Adobe tools, with a strong focus on crafting clean, responsive interfaces. Also a React-based web developer exploring AI and NLP integration.",
    image:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    social: {
      github: "https://github.com/SaeeGaikwad",
      linkedin: "https://linkedin.com/in/saee-gaikwad-147054374",
    },
  },
  {
    id: 7,
    name: "Parth Mahale",
    role: "Software Developer",
    bio: "Driven Software Developer combining DSA proficiency with backend development expertise to solve real-world problems.",
    image:
      "parth.jpg",
    social: {
      linkedin: "https://linkedin.com/in/priya",
      github: "https://github.com/priya",
    },
  },
  {
    id: 8,
    name: "Vaidehi Sachin Amrutkar",
    role: "ML Developer",
    bio: "AI & ML enthusiast driven by innovation, passionate about solving real-world problems through intelligent solutions. Skilled in Data Structures and Algorithms, continuously learning and building impactful projects that push boundaries.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    social: {
      github: "https://github.com/VAIDEHI-28",
      linkedin: "https://linkedin.com/in/vaidehi-amrutkar-419b02293",
    },
  },
  {
    id: 9,
    name: "Priyal Kothari",
    role: "Full Stack Developer",
    bio: "Full Stack Developer skilled in building dynamic web applications using React, Node.js, and MongoDB. Passionate about delivering clean, efficient, and user-friendly solutions.",
    image:
      "priyal.jpg",
    social: {
      linkedin: "https://linkedin.com/in/anjali",
      github: "https://github.com/anjali",
    },
  },
  {
    id: 10,
    name: "Tejas Deshmukh",
    role: "AI Developer",
    bio: "Passionate about exploring emerging AI/ML technologies, with a keen interest in learning and building innovative solutions.",
    image:
      "Exploring new emerging techs in ai-ml and like to learn and develop",
    social: {
      github: "https://github.com/Tejas22096",
      linkedin: "https://linkedin.com/in/tejas-deshmukh112305",
    },
  },
  {
    id: 11,
    name: "Shristi Dube",
    role: "Full Stack Developer",
    bio: "Focused on developing scalable full-stack applications with clean, responsive frontends, robust backend systems, and integration of APIs and authentication ",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com/in/shristi-dubey-5a4886284",
      github: "https://github.com/sheistidubs101",
    },
  },
  {
    id: 12,
    name: "Abhishek Bhabad",
    role: "Aspiring Full Stack Developer",
    bio: "Beginner frontend developer exploring intuitive UI design and learning backend development with FastAPI.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    social: {
      github: "https://github.com/abhishek-bhabad-a36baa2b3",
      linkedin: "https://linkedin.com/in/nothingstep159       ",
    },
  },
  {
    id: 13,
    name: "Diksha Nautiyal",
    role: "Member",
    bio: "I find coding fascinating and am interested in problem solving and logical building",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    social: {
      //linkedin: 'https://linkedin.com/in/sneha',
      //github: 'https://github.com/sneha'
    },
  },
  {
    id: 14,
    name: "Manjuli",
    role: "Member",
    bio: "Optimizing model deployment and monitoring systems.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com/in/amit",
      github: "https://github.com/amit",
    },
  },
];

// Club Info Component
const ClubInfo = ({ isDarkMode }) => {
  return (
    <div className="animate-fade-in text-center">
      <div
        className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full p-[3px]`}
      >
        <div
          className={`w-full h-full ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } rounded-full flex items-center justify-center`}
        >
          <span className="text-6xl">🤖</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">NLP Club</h2>
      <p className="text-lg text-teal-400 mb-4">
        Exploring Language AI Together
      </p>
      <p
        className={`text-sm leading-relaxed mb-6 max-w-xs mx-auto ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        A community of passionate developers and researchers pushing the
        boundaries of Natural Language Processing.
      </p>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">14</div>
          <div className="text-sm text-teal-400">Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">5+</div>
          <div className="text-sm text-teal-400">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">2021</div>
          <div className="text-sm text-teal-400">Founded</div>
        </div>
      </div>
    </div>
  );
};

// Member Details Component
const MemberDetails = ({ member, isDarkMode }) => {
  return (
    <div className="animate-slide-in">
      {/* Member Image */}
      <div className="w-32 h-32 mx-auto mb-6 relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-[3px]"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <div
            className={`w-full h-full ${isDarkMode ? "bg-black" : "bg-white"}`}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Member Details */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          {member.name}
        </h2>
        <p className="text-lg text-teal-400 mb-4">{member.role}</p>
        <p
          className={`leading-relaxed text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {member.bio}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-6">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-all transform hover:scale-125"
          >
            <FaLinkedin className="w-8 h-8" />
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            } transition-all transform hover:scale-125`}
          >
            <FaGithub className="w-8 h-8" />
          </a>
        )}
        {member.social.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-all transform hover:scale-125"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
        )}
      </div>
    </div>
  );
};

// Info Sidebar Component
const InfoSidebar = ({ selectedMember, isDarkMode }) => {
  return (
    <div
      className={`absolute left-10 top-42 h-[85vh] w-96 z-30 p-8 overflow-y-auto transition-all duration-500 ease-in-out
        ${
          isDarkMode
            ? "bg-gradient-to-br from-[#1f2937cc] via-[#111827cc] to-[#0f172acc] text-white border border-gray-700 shadow-[0_0_25px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-br from-[#ffffffcc] via-[#f3f4f6cc] to-[#e5e7ebcc] text-gray-900 border border-gray-300 shadow-lg"
        }
        backdrop-blur-2xl rounded-3xl animate-slide-in transform hover:scale-[1.01] hover:shadow-2xl`}
    >
      <div className="space-y-6 animate-fade-in mt-20">
        {selectedMember ? (
          <MemberDetails member={selectedMember} isDarkMode={isDarkMode} />
        ) : (
          <ClubInfo isDarkMode={isDarkMode} />
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4B5563" : "#D1D5DB"};
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

// TeamMember Component
const TeamMember = ({ member, onHover, onLeave, isActive, isDarkMode }) => {
  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => onHover(member)}
      onMouseLeave={onLeave}
    >
      {/* Hexagon Container */}
      <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative   ">
        {/* Colorful Aurora Gradient Border */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 p-[2.5px] rounded-md  transition-all duration-300 ease-in-out transform
             
           

            ${
              isActive
                ? "scale-110  shadow-2xl shadow-amber-500/40 rotate-1"
                : "group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-1  "
            }`}
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          {/* Inner Hexagon with Image */}
          <div
            className={`w-full h-full overflow-hidden  ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } rounded-md shadow-inner`}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isActive ? "scale-110" : "group-hover:scale-105"
              }`}
            />
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center px-3 py-4
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          ${
            isDarkMode
              ? "bg-gradient-to-br from-black/80 to-gray-900/80 text-white"
              : "bg-gradient-to-br from-white/90 to-gray-100/80 text-gray-800"
          }`}
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <h3 className="text-sm font-bold text-emerald-500 mb-1">
            {member.name}
          </h3>
          <p className="text-xs text-indigo-500 mb-2">{member.role}</p>
          <div className="flex space-x-4">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-transform hover:scale-125"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
            {member.social.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-black"
                } transition-transform hover:scale-125`}
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-transform hover:scale-125"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const TeamMembers = ({ isDarkMode }) => {
  const [teamMembers] = useState(initialTeamMembers);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberHover = (member) => {
    setSelectedMember(member);
  };

  const handleMemberLeave = () => {
    setSelectedMember(null);
  };

  // Honeycomb positioning logic
  const getHexagonPosition = (index) => {
    const hexWidth = 200;
    const hexHeight = 160;

    // Calculate row and position based on alternating pattern
    let row = Math.floor(index / 7) * 2; // Each complete pattern has 7 members (4+3)
    let posInCurrentPattern = index % 7;

    // Adjust row and position within pattern
    if (posInCurrentPattern >= 4) {
      row += 1;
      posInCurrentPattern -= 4;
    }

    // Calculate final position
    const maxInCurrentRow = row % 2 === 0 ? 4 : 3;
    const xOffset = row % 2 === 1 ? hexWidth * 0.01 : 0;

    // Center the blocks in each row
    const rowWidth = maxInCurrentRow * hexWidth * 0.95;
    const centeringOffset = (900 - rowWidth) / 2;

    // Calculate vertical spacing for perfect honeycomb fit
    const verticalSpacing = hexHeight * 0.85;
    const top = row * verticalSpacing;

    // Position hexagons with adjusted spacing for alternating pattern
    const horizontalSpacing = hexWidth * 0.95;
    const left =
      posInCurrentPattern * horizontalSpacing + xOffset + centeringOffset;

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  return (
    <div id="members"
      className={`${
        isDarkMode ? "bg-black" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Theme Toggle Button */}

      {/* Team Members Section */}
      <div className="relative overflow-hidden">
        {/* Info Sidebar - Constrained to this section */}
        <InfoSidebar selectedMember={selectedMember} isDarkMode={isDarkMode} />

        <div className="relative z-10 ml-80 px-4 py-15">
          {/* Header */}
          <div className="flex justify-between items-center mb-12 max-w-4xl mx-5px">
            <h2 className={`text-4xl md:text-5xl font-bold ml-0`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MEET THE TECH-DRIVEN NLP CREW
              </span>
            </h2>
          </div>

          {/* Honeycomb Grid with calculated height */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative w-full" style={{ height: "600px" }}>
              {teamMembers.map((member, index) => {
                const position = getHexagonPosition(index);
                return (
                  <div
                    key={member.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: position.left,
                      top: position.top,
                      marginLeft: "20%",
                      marginTop: "10%",
                    }}
                  >
                    <TeamMember
                      member={member}
                      onHover={handleMemberHover}
                      onLeave={handleMemberLeave}
                      isActive={selectedMember?.id === member.id}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default TeamMembers;
