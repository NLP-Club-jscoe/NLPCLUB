import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "../../assets/components/ui/button";


const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'PhD Student, Computer Science',
      university: 'Stanford University',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'The NLP Club transformed my understanding of language models. The hands-on projects and mentorship helped me publish my first paper at EMNLP. The community here is incredibly supportive and innovative.',
      rating: 5,
      achievement: 'Published 3 papers'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'ML Engineer',
      university: 'Now at Google AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The skills I learned in the NLP Club directly led to my current role at Google AI. The practical experience with transformers and the collaborative research environment was invaluable.',
      rating: 5,
      achievement: 'Landed dream job'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Undergraduate Student',
      university: 'MIT',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'As a sophomore, I was intimidated by NLP research. The club\'s beginner-friendly workshops and peer mentoring system helped me build confidence and contribute to real projects.',
      rating: 5,
      achievement: 'First research contribution'
    },
    {
      id: 4,
      name: 'Dr. Alex Kumar',
      role: 'Faculty Advisor',
      university: 'Carnegie Mellon University',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'The quality of research and collaboration I see in this club rivals that of graduate programs. Students here are pushing boundaries and making real contributions to the field.',
      rating: 5,
      achievement: 'Faculty perspective'
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Industry Professional',
      university: 'OpenAI Alumni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      content: 'I regularly recruit from this club because the members have both theoretical knowledge and practical skills. They understand how to build production-ready NLP systems.',
      rating: 5,
      achievement: 'Recruiter testimonial'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Our <span className="gradient-text">Community</span> Says
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students, faculty, and industry professionals about their experience 
              with our NLP club and the impact it's made on their careers.
            </p>
          </div>

          {/* Main Testimonial */}
          <div className="relative">
            <div className="glass-card rounded-3xl p-12 mb-12 hover-glow transition-all duration-500">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
                  "{current.content}"
                </p>
                
                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={current.avatar} 
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
                />
                <div className="text-left">
                  <div className="font-bold text-lg gradient-text">{current.name}</div>
                  <div className="text-muted-foreground">{current.role}</div>
                  <div className="text-sm text-muted-foreground">{current.university}</div>
                </div>
                <div className="px-3 py-1 bg-gradient-primary text-white text-xs font-semibold rounded-full">
                  {current.achievement}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="glass-button hover-glow w-12 h-12 rounded-full p-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="glass-button hover-glow w-12 h-12 rounded-full p-0"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="text-center glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">98%</div>
              <div className="text-muted-foreground">Member Satisfaction</div>
            </div>
            <div className="text-center glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">85%</div>
              <div className="text-muted-foreground">Career Advancement</div>
            </div>
            <div className="text-center glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-muted-foreground">Industry Connections</div>
            </div>
            <div className="text-center glass-card rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold gradient-text mb-2">15+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;