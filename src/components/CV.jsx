import './CV.css';

const CV = () => {
  const cvFilePath = '/FEYZULLAH_AS_CV.pdf';

  return (
    <section className="cv" id="cv">
      <div className="container">
        <h2 className="section-title">CV / Özgeçmiş</h2>

        <div className="cv-content">
          <div className="cv-download">
            <p>CV dosyamı PDF olarak indirebilir veya tarayıcıda görüntüleyebilirsiniz.</p>
            <div className="cv-buttons">
              <a
                href={cvFilePath}
                className="btn btn-primary"
                download="FEYZULLAH_AS_CV.pdf"
              >
                PDF İndir
              </a>
              <a
                href={cvFilePath}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Çevrimiçi Görüntüle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
