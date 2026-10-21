import "./index.css";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experiences from "./sections/Experiences";
import FAQ from "./sections/FAQ";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import HireBot from "./components/HireBot";
import PageLoader from "./components/PageLoader";
import ShootingStars from "./components/ShootingStars";
import StarTrail from "./components/StarTrail";
import Navbar from "./sections/Navbar";
import PlanetToolkit from "./components/PlanetToolkit";
import Projects from "./sections/Projects";
import Services from "./sections/Services";

function App() {
  return (
    <>
      <Navbar />
      <div className="relative z-[2]">
        <Hero currentBackground="cinematic" />
        <About />
        <PlanetToolkit />
      </div>
      <Services />
      <div className="container mx-auto max-w-8xl">
        <Projects showOrbit />
        <div className="relative z-[2]">
          <Experiences />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      </div>
      <ShootingStars />
      <StarTrail />
      <HireBot />
      <PageLoader />
    </>
  );
}

export default App;
