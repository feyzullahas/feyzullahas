import './Footer.css';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { text } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Feyzullah As. {text.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
