import React, { useState, useEffect } from 'react';

const galleryImages = [
  { 
    id: 1, 
    src: 'act1.jpg', 
    alt: 'Team collaboration',
    description: 'Our team collaborating on a new sentiment analysis model for social media trends.',
    date: '2024-03-15'
  },
  { 
    id: 2, 
    src: 'act2.jpg',
    alt: 'Workshop session',
    description: 'An insightful workshop on Transformer architectures and their real-world applications.',
    date: '2024-02-20'
  },
  { 
    id: 3, 
    src: 'act3.jpg', 
    alt: 'Live demo',
    description: 'Live demo session of our award-winning conversational AI project.',
    date: '2024-04-10'
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=300&fit=crop', 
    alt: 'Hackathon winners',
    description: 'Celebrating the winners of our annual 24-hour NLP hackathon.',
    date: '2024-01-25'
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop',  
    alt: 'Deep learning session',
    description: 'Deep dive into the complex architectures that power modern language models.',
    date: '2024-03-08'
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1543269664-647b39c49ea2?w=500&h=300&fit=crop', 
    alt: 'Team photo',
    description: 'The brilliant minds of the NLP Club after a successful semester.',
    date: '2024-04-30'
  },
];

const NlpClubGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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

 const themeClasses = isDark ? {
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
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg}`}>
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => openModal(index)}
            >
              <div className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${themeClasses.cardBg}`}>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  {!imageLoadStatus[image.id] && (
                    <div className={`absolute inset-0 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
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