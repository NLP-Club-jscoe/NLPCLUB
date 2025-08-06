import React, { useState, useEffect } from 'react';

const galleryImages = [
  { 
    id: 1, 
    src: 'act1.jpg', 
    alt: 'Team collaboration',
    description: 'Showcasing our participation in Smart India Hackathon 2024 with a government-backed project on Alumni Connect, under the mentorship of the Government of Gujarat.',
    date: '2024-09-15'
  },
  { 
    id: 2, 
    src: 'act2.jpg',
    alt: 'Workshop session',
    description: 'Team working on Smart India Hackathon 2024 solution focused on Bus Route Prediction and Management, in collaboration with Delhi Transport Corporation (DTC).',
    date: '2024-09-15'
  },
  { 
    id: 3, 
    src: 'act3.jpg', 
    alt: 'Live demo',
    description: 'Industrial visit to Bharat Forge AI Research Lab, exploring cutting-edge innovations in artificial intelligence and real-time industrial applications.',
    date: '2025-02-10'
  },
  { 
    id: 4, 
    src: 'act5.jpeg', 
    alt: 'Hackathon winners',
    description: 'Celebrating International Women’s Day with GDG Pune through engaging sessions and networking with women tech leaders and innovators.',
    date: '2025-03-15'
  },
  { 
    id: 5, 
    src: 'act4.jpeg',  
    alt: 'Deep learning session',
    description: 'DevOps and CI/CD workshop hosted by Infobip at Coditas, where students explored real-world practices in modern software development pipelines.',
    date: '2025-03-25'
  },
  { 
    id: 6, 
    src: 'act6.jpeg', 
    alt: 'Team photo',
    description: 'Inside the NLP Club workspace, where brilliant minds brainstorm, build, and collaborate on next-gen language AI projects.',
    date: '2025-08-02'
  },
];

const NlpClubGallery = ({isDarkMode}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [imageLoadStatus, setImageLoadStatus] = useState({});

 

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleImageLoad = (imageId) => {
    setImageLoadStatus(prev => ({ ...prev, [imageId]: true }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      switch(e.key) {
        case 'Escape': closeModal(); break;
        case 'ArrowRight': showNextImage(); break;
        case 'ArrowLeft': showPrevImage(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

 const themeClasses = isDarkMode ? {
  bg: 'bg-black',
  cardBg: 'bg-black', // Or use a very dark gray if needed
  text: 'text-white',
  textSecondary: 'text-gray-300',
  textMuted: 'text-gray-400',
  button: 'bg-neutral-900 hover:bg-neutral-800', // black-feeling button
  overlay: 'bg-black/90' // this will be a semi-transparent black overlay
} : {
    bg: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
    cardBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    button: 'bg-white/80 hover:bg-white',
    overlay: 'bg-white/90'
  };

  return (
    <div id="team" className={`min-h-screen transition-all duration-500  ${themeClasses.bg}`}>
      
      {/* Theme Toggle */}


      <div className="container mx-auto px-6 py-1">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <h1 className={`text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4`}>
            NLP Club Gallery
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${themeClasses.textMuted}`}>
            Discover our journey through cutting-edge research, innovative projects, and memorable moments that define our community.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid p-2  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group overflow-hidden rounded-3xl cursor-pointer transform transition-all   hover:scale-105  border  duration-700  hover:shadow-2xl   border-neutral-800/70 "
              onClick={() => openModal(index)}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all  h-full duration-500 ${themeClasses.cardBg}`}>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  {!imageLoadStatus[image.id] && (
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
                  )}
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${themeClasses.textMuted}`}>
                      {new Date(image.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <p className={`leading-relaxed text-sm ${themeClasses.textSecondary}`}>
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
          
              
              {/* Image */}
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${themeClasses.cardBg}`}>
                <img 
                  src={galleryImages[currentImageIndex].src} 
                  alt={galleryImages[currentImageIndex].alt} 
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="p-6">
                  <p className={`text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                    {galleryImages[currentImageIndex].description}
                  </p>
                  <p className={`text-sm mt-3 ${themeClasses.textMuted}`}>
                    {new Date(galleryImages[currentImageIndex].date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={showPrevImage} 
              className={`absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 ${themeClasses.overlay} ${themeClasses.text}`}
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={showNextImage} 
              className={`absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 ${themeClasses.overlay} ${themeClasses.text}`}
              aria-label="Next image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NlpClubGallery;