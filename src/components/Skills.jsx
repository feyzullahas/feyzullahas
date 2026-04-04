import './Skills.css';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { text } = useLanguage();

  const skillCategories = [
    {
      title: text.skills.categories[0].title,
      skills: [
        text.skills.categories[0].items[0],
        text.skills.categories[0].items[1],
        text.skills.categories[0].items[2],
        text.skills.categories[0].items[3],
        text.skills.categories[0].items[4],
      ],
    },
    {
      title: text.skills.categories[1].title,
      skills: [
        text.skills.categories[1].items[0],
        text.skills.categories[1].items[1],
        text.skills.categories[1].items[2],
        text.skills.categories[1].items[3],
        text.skills.categories[1].items[4],
        text.skills.categories[1].items[5],
      ],
    },
    {
      title: text.skills.categories[2].title,
      skills: [
        text.skills.categories[2].items[0],
        text.skills.categories[2].items[1],
        text.skills.categories[2].items[2],
        text.skills.categories[2].items[3],
        text.skills.categories[2].items[4],
      ],
    },
  ];

  return (
    <section className="skills" id="beceriler">
      <div className="container">
        <h2 className="section-title">{text.skills.title}</h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="skill-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
