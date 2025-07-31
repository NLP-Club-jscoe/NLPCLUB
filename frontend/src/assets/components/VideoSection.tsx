import { useState } from 'react';
import { Play, X, Volume2, Maximize } from 'lucide-react';
import { Button } from "./ui/button";

const VideoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Club Introduction',
      description: 'Get to know our mission, values, and the amazing work we do in NLP research.',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      duration: '3:45',
      category: 'Overview'
    },
    {
      id: 2,
      title: 'Research Showcase',
      description: 'Explore our latest research projects and breakthrough discoveries in natural language processing.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      duration: '8:20',
      category: 'Research'
    },
    {
      id: 3,
      title: 'Student Stories',
      description: 'Hear directly from our members about their journey and achievements in the club.',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      duration: '5:15',
      category: 'Community'
    }
  ];

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoClose = () => {
    setIsVideoPlaying(false);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              See Us in <span className="gradient-text">Action</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch our videos to get an inside look at our research, community, and the 
              innovative projects that define our NLP club.
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-20">
            <div className="relative glass-card rounded-3xl overflow-hidden hover-glow group">
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop"
                  alt="Featured Video"
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handleVideoPlay}
                    className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group-hover:bg-white/30"
                  >
                    <Play className="w-12 h-12 text-white ml-2" />
                  </button>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-gradient-primary text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                      12:30
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome to the Future of NLP
                  </h3>
                  <p className="text-gray-200 text-lg max-w-2xl">
                    An in-depth look at our cutting-edge research, vibrant community, and the incredible 
                    opportunities that await you in our NLP club.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className="group glass-card rounded-2xl overflow-hidden hover-glow transition-all duration-500"
              >
                <div className="relative h-48">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={handleVideoPlay}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>

                  {/* Duration & Category */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <span className="px-2 py-1 bg-gradient-primary text-white text-xs font-semibold rounded">
                      {video.category}
                    </span>
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 gradient-text">{video.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Modal */}
          {isVideoPlaying && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
              <div className="relative w-full max-w-6xl mx-4">
                {/* Close Button */}
                <button 
                  onClick={handleVideoClose}
                  className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Video Container */}
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="relative aspect-video bg-black">
                    {/* Placeholder for actual video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-12 h-12 text-white ml-2" />
                        </div>
                        <p className="text-white text-lg">Video would play here</p>
                        <p className="text-gray-400 text-sm mt-2">Click outside to close</p>
                      </div>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" className="glass-button hover-glow">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="glass-button hover-glow">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" className="glass-button hover-glow">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 gradient-text">Ready to Be Part of Our Story?</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Join our community and start creating the next breakthrough in NLP.
              </p>
              <Button className="glass-button hover-glow px-8 py-4 text-lg font-semibold">
                Join Our Next Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;