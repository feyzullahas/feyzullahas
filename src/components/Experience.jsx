import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Pozisyon Başlığı',
      company: 'Şirket/Kurum Adı',
      period: 'Tarih Aralığı',
      description: 'Buraya deneyim açıklamanızı yazın. Görevlerinizi, başarılarınızı ve sorumluluklarınızı detaylandırın.',
      image: null, // Resim eklemek için: '/images/experience1.jpg'
    },
    {
      title: 'Pozisyon Başlığı 2',
      company: 'Şirket/Kurum Adı 2',
      period: 'Tarih Aralığı 2',
      description: 'Buraya deneyim açıklamanızı yazın.',
      image: null,
    },
    // Daha fazla deneyim ekleyebilirsiniz
  ];

  return (
    <section className="experience" id="deneyim">
      <div className="container">
        <h2 className="section-title">Deneyim & Liderlik</h2>

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
