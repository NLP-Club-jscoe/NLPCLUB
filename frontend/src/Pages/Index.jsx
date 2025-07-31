import Header from "../assets/components/Header";
import HeroSection from "../assets/components/HeroSection";
import AboutSection from "../assets/components/AboutSection";
import FeaturesSection from "../assets/components/FeaturesSection";
import ProjectsSection from "../assets/components/ProjectsSection";
import VideoSection from "../assets/components/VideoSection";
import TestimonialsSection from "../assets/components/TestimonialsSection";
import Footer from "../assets/components/Footer";
import HeaderFrame from "../assets/components/HeaderFrame"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
     <HeaderFrame/>
<HeroSection></HeroSection>
      <AboutSection />
      <FeaturesSection />
      <ProjectsSection />
      <VideoSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
