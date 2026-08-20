import './About.css';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { text } = useLanguage();

  return (
    <section className="about" id="hakkimda">
      <div className="container">
        <h2 className="section-title">{text.about.title}</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>{text.about.paragraphs[0]}</p>
            <p>{text.about.paragraphs[1]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
