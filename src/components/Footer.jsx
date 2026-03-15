import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Feyzullah As. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
