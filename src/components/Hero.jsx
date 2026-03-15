import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
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
                <span>Resminizi buraya ekleyin</span>
              </div>
            </div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-name">Feyzullah As</span>
            </h1>
            <p className="hero-subtitle">
              {/* Buraya kendi unvanınızı yazın */}
              Bilgisayar Mühendisliği 3. Sınıf Öğrencisi
            </p>
            <div className="hero-buttons">
              <button type="button" className="btn btn-primary" onClick={handleExploreClick}>
                Keşfet
              </button>
              <Link to="/iletisim" className="btn btn-secondary">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
