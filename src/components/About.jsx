import './About.css';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { text } = useLanguage();

  return (
    <section className="about" id="hakkimda">
      <div className="container">
        <h2 className="section-title">{text.about.title}</h2>
        
        <div className="about-content">
          <div className="about-images">
            <div className="image-placeholder">
              <span>{text.about.photos[0]}</span>
            </div>
            <div className="image-placeholder">
              <span>{text.about.photos[1]}</span>
            </div>
            <div className="image-placeholder">
              <span>{text.about.photos[2]}</span>
            </div>
          </div>

          <div className="about-text">
            <p>{text.about.paragraphs[0]}</p>
            <p>{text.about.paragraphs[1]}</p>
            <p>{text.about.paragraphs[2]}</p>
          </div>
        </div>

        <div className="about-highlights" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* EĞİTİM KARTI */}
          <div className="highlight-card">
            <div className="highlight-icon">
              <img src="/comu.png" alt="ÇOMÜ" className="card-logo" />
            </div>
            <h3>{text.about.highlights.education.title}</h3>
            <p>
              {text.about.highlights.education.lines[0]}<br />
              {text.about.highlights.education.lines[1]}<br />
              <span className="sub-text">{text.about.highlights.education.lines[2]}</span>
            </p>
          </div>

          {/* UZAY & HAVACILIK (KURUCU) KARTI */}
          <div className="highlight-card">
            <div className="highlight-icon">
              <img src="/ygk.png" alt="Yazılım Geliştirme Kulübü" className="card-logo" />
            </div>
            <h3>{text.about.highlights.aerospace.title}</h3>
            <p>
              {text.about.highlights.aerospace.lines[0]}<br />
              <span className="sub-text">{text.about.highlights.aerospace.lines[1]}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
