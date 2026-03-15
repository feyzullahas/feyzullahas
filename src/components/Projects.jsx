import './Projects.css';

const Projects = () => {
  const projects = [
    {
      icon: '🔭',
      title: 'Proje Başlığı 1',
      description: 'Proje açıklaması buraya gelecek. Projenin amacı, kullanılan teknolojiler ve sonuçlar hakkında bilgi verin.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: null, // Resim eklemek için: '/images/project1.jpg'
      link: '#',
    },
    {
      icon: '⚛️',
      title: 'Proje Başlığı 2',
      description: 'Proje açıklaması buraya gelecek.',
      tags: ['Python', 'AI', 'Machine Learning'],
      image: null,
      link: '#',
    },
    {
      icon: '🚀',
      title: 'Proje Başlığı 3',
      description: 'Proje açıklaması buraya gelecek.',
      tags: ['JavaScript', 'API', 'Frontend'],
      image: null,
      link: '#',
    },
    // Daha fazla proje ekleyebilirsiniz
  ];

  return (
    <section className="projects" id="projeler">
      <div className="container">
        <h2 className="section-title">Projeler & Yarışmalar</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    Detayları Gör →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
