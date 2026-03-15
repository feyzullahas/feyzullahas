import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
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
              Yazılım Geliştirici & Mühendis
            </p>
            <p className="hero-motto">
              Per aspera ad astra
            </p>
            <div className="hero-buttons">
              <Link to="/projeler" className="btn btn-primary">
                Keşfet
              </Link>
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
