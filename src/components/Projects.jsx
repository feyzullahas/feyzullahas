import './Projects.css';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { text } = useLanguage();

  const projects = [
    {
      icon: '🔭',
      title: text.projects.items[0].title,
      description: text.projects.items[0].description,
      tags: ['React', 'Node.js', 'MongoDB'],
      image: null, // Resim eklemek için: '/images/project1.jpg'
      link: '#',
    },
    {
      icon: '⚛️',
      title: text.projects.items[1].title,
      description: text.projects.items[1].description,
      tags: ['Python', 'AI', 'Machine Learning'],
      image: null,
      link: '#',
    },
    {
      icon: '⚛️',
      title: text.projects.items[2].title,
      description: text.projects.items[2].description,
      tags: ['Python', 'AI', 'Machine Learning'],
      image: null,
      link: '#',
    },
    
    {
      icon: '🚀',
      title: text.projects.items[3].title,
      description: text.projects.items[3].description,
      tags: ['JavaScript', 'API', 'Frontend'],
      image: null,
      link: '#',
    },
    // Daha fazla proje ekleyebilirsiniz
  ];

  return (
    <section className="projects" id="projeler">
      <div className="container">
        <h2 className="section-title">{text.projects.title}</h2>

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
                    {text.projects.details}
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
