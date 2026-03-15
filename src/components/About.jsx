import './About.css';

const About = () => {
  return (
    <section className="about" id="hakkimda">
      <div className="container">
        <h2 className="section-title">Hakkımda</h2>
        
        <div className="about-content">
          <div className="about-images">
            <div className="image-placeholder">
              <span>Fotoğraf 1</span>
            </div>
            <div className="image-placeholder">
              <span>Fotoğraf 2</span>
            </div>
            <div className="image-placeholder">
              <span>Fotoğraf 3</span>
            </div>
          </div>

          <div className="about-text">
            <p>
              {/* Buraya kendi hakkınızda bilgileri yazın */}
              Yazılım geliştirme ve mühendislik alanında aktif olarak çalışan bir profesyonel olarak,
              teorik bilgiyi pratik deneyime dönüştürme misyonuyla hareket ediyorum.
            </p>
            <p>
              Teknik odak noktam, modern web teknolojileri ve yazılım mimarileridir.
              Aktif olarak çeşitli projelerde yer alarak bu yenilikçi alanlarda çalışmalar yürütmekteyim.
            </p>
            <p>
              Liderlik ve takım çalışmasında aktif rol almanın yanı sıra, yaratıcı düşünce ve
              estetik bakış açımı besleyen çeşitli ilgi alanlarına sahibim.
            </p>
          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="highlight-icon">🎓</div>
            <h3>Eğitim</h3>
            <p>
              {/* Eğitim bilgilerinizi buraya ekleyin */}
              Üniversite Adı<br />
              Bölüm Adı<br />
              Burs Durumu
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🚀</div>
            <h3>Uzay & Havacılık</h3>
            <p>
              {/* İlgili bilgileri buraya ekleyin */}
              Takım Adı<br />
              Görev Alanları
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">👥</div>
            <h3>Liderlik</h3>
            <p>
              {/* Liderlik pozisyonlarınızı buraya ekleyin */}
              Pozisyon 1<br />
              Pozisyon 2
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
