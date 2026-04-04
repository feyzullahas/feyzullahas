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
            <p>
              {/* Buraya kendi hakkınızda bilgileri yazın */}
              {text.about.paragraphs[0]}
            </p>
            <p>
              {text.about.paragraphs[1]}
            </p>
            <p>
              {text.about.paragraphs[2]}
            </p>
          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="highlight-icon">🎓</div>
            <h3>{text.about.highlights.education.title}</h3>
            <p>
              {/* Eğitim bilgilerinizi buraya ekleyin */}
              {text.about.highlights.education.lines[0]}<br />
              {text.about.highlights.education.lines[1]}<br />
              {text.about.highlights.education.lines[2]}
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🚀</div>
            <h3>{text.about.highlights.aerospace.title}</h3>
            <p>
              {/* İlgili bilgileri buraya ekleyin */}
              {text.about.highlights.aerospace.lines[0]}<br />
              {text.about.highlights.aerospace.lines[1]}
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">👥</div>
            <h3>{text.about.highlights.leadership.title}</h3>
            <p>
              {/* Liderlik pozisyonlarınızı buraya ekleyin */}
              {text.about.highlights.leadership.lines[0]}<br />
              {text.about.highlights.leadership.lines[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
