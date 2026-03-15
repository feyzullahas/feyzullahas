import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Liderlik & Yönetim',
      skills: [
        'Takım Liderliği',
        'Proje Yönetimi',
        'Kriz Yönetimi',
        'Etkinlik Organizasyonu',
        'İletişim Becerileri',
      ],
    },
    {
      title: 'Teknik Beceriler',
      skills: [
        'React',
        'JavaScript',
        'Node.js',
        'Python',
        'Git',
        'HTML/CSS',
      ],
    },
    {
      title: 'İlgi Alanları',
      skills: [
        'Yazılım Geliştirme',
        'Web Teknolojileri',
        'Yapay Zeka',
        'Mobil Uygulamalar',
        'UI/UX Tasarım',
      ],
    },
  ];

  return (
    <section className="skills" id="beceriler">
      <div className="container">
        <h2 className="section-title">Beceriler & Yetkinlikler</h2>

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
