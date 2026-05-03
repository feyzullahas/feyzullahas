import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { text } = useLanguage();

  const handleExploreClick = () => {
    const aboutSection = document.getElementById('hakkimda');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-center">
          <div className="hero-image-wrapper">
            {/* Buraya kendi resminizi ekleyin */}
            <div className="hero-image">
              <div className="placeholder-image">
                <span>{text.hero.imagePlaceholder}</span>
              </div>
            </div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-name">Feyzullah As</span>
            </h1>
            <p className="hero-subtitle">
              {}
              {text.hero.subtitle}
            </p>
            <div className="hero-buttons">
              <button type="button" className="btn btn-primary" onClick={handleExploreClick}>
                {text.hero.explore}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => {
                const contactSection = document.getElementById('iletisim');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}>
                {text.hero.contact}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
