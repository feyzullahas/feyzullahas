import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.scrollTo !== undefined) {
      const { scrollTo } = location.state;

      // State'i temizle ki geri/ileri yaparken tekrar tetiklenmesin
      navigate(location.pathname, { replace: true, state: {} });

      if (!scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(scrollTo);
        if (el) {
          // Header yüksekliği için scroll-margin-top zaten section CSS'inde var
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
      <Contact />
    </>
  );
};

export default Home;
