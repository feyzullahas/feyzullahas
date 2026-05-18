import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import CV from '../components/CV';
import Contact from '../components/Contact';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const extraScrollOffsets = {
    hakkimda: 64,
    deneyim: 64,
    projeler: 64,
    beceriler: 64,
  };

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) {
      return;
    }

    const headerOffset = window.innerWidth <= 768 ? 60 : 72;
    const extraOffset = extraScrollOffsets[targetId] || 0;
    const top = element.offsetTop - headerOffset + extraOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo !== undefined) {
      const { scrollTo } = location.state;

      // State'i temizle ki geri/ileri yaparken tekrar tetiklenmesin
      navigate(location.pathname, { replace: true, state: {} });

      if (!scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(scrollTo);
      }
    }
  }, [location, navigate]);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <CV />
      <Contact />
    </>
  );
};

export default Home;
