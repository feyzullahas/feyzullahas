import './Experience.css';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const { text } = useLanguage();

  const experiences = [
    {
      title: text.experience.items[0].title,
      company: text.experience.items[0].company,
      period: text.experience.items[0].period,
      description: text.experience.items[0].description,
      image: '/econtech.png',
    },
    {
      title: text.experience.items[1].title,
      company: text.experience.items[1].company,
      period: text.experience.items[1].period,
      description: text.experience.items[1].description,
      image: '/kale1915.jpeg',
    },
    {
      title: text.experience.items[2].title,
      company: text.experience.items[2].company,
      period: text.experience.items[2].period,
      description: text.experience.items[2].description,
      image: '/ygk.png',
    },
    {
      title: text.experience.items[3].title,
      company: text.experience.items[3].company,
      period: text.experience.items[3].period,
      description: text.experience.items[3].description,
      image: '/blockchain.png',
    },
    {
      title: text.experience.items[4].title,
      company: text.experience.items[4].company,
      period: text.experience.items[4].period,
      description: text.experience.items[4].description,
      image: '/comu.png',
    },
  ];

  return (
    <section className="experience" id="deneyim">
      <div className="container">
        <h2 className="section-title">{text.experience.title}</h2>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              {exp.image && (
                <div className="experience-image">
                  <img src={exp.image} alt={exp.company} />
                </div>
              )}
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <h4 className="experience-company">{exp.company}</h4>
                <span className="experience-period">{exp.period}</span>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
