import Header from "../assets/components/Header";
import HeroSection from "../assets/components/HeroSection";
import AboutSection from "../assets/components/AboutSection";
import FeaturesSection from "../assets/components/FeaturesSection";
import ProjectsSection from "../assets/components/ProjectsSection";
import VideoSection from "../assets/components/VideoSection";
import Mentors from "../assets/components/Mentors";
import Footer from "../assets/components/Footer";
import HeaderFrame from "../assets/components/HeaderFrame"
import Head from "../assets/components/Head"
import TeamMembers from "../assets/components/TeamMembers";
import NlpClubGallery from "../assets/components/TeamMemberGallery";

const Index = () => {
  return (
    <div className="min-h-screen " style={{ backgroundColor: '#FFF8F0',fontFamily: 'StencilFont' }}>
      <Header />
 <Head></Head>
      <ProjectsSection />
      <NlpClubGallery/>
      <Mentors />
      <TeamMembers/>
      <Footer />
    </div>
  );
};

export default Index;
