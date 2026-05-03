import './CV.css';
import { useLanguage } from '../context/LanguageContext';
import cvFile from '../assets/feyzullah_as_cv.pdf';

const CV = () => {
  const { text } = useLanguage();
  const cvFilePath = cvFile;

  return (
    <section className="cv" id="cv">
      <div className="container">
        <h2 className="section-title">{text.cv.title}</h2>

        <div className="cv-content">
          <div className="cv-download">
            <p>{text.cv.description}</p>
            <div className="cv-buttons">
              <a
                href={cvFilePath}
                className="btn btn-primary"
                download="feyzullah_as_cv.pdf"
              >
                {text.cv.download}
              </a>
              <a
                href={cvFilePath}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {text.cv.view}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
