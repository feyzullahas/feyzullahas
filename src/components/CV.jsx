import './CV.css';

const CV = () => {
  return (
    <section className="cv" id="cv">
      <div className="container">
        <h2 className="section-title">CV / Özgeçmiş</h2>
        
        <div className="cv-content">
          <div className="cv-download">
            <p>CV'nizi PDF olarak indirebilir veya çevrimiçi görüntüleyebilirsiniz.</p>
            <div className="cv-buttons">
              <a href="#" className="btn btn-primary" download>
                PDF İndir
              </a>
              <a href="#" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Çevrimiçi Görüntüle
              </a>
            </div>
          </div>

          <div className="cv-preview">
            <div className="cv-placeholder">
              <span>CV Önizlemesi</span>
              <p>CV resminizi veya PDF önizlemesini buraya ekleyebilirsiniz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
