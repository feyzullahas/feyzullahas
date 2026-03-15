import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Ana Sayfa', targetId: null },
    { label: 'Hakkımda', targetId: 'hakkimda' },
    { label: 'Deneyim', targetId: 'deneyim' },
    { label: 'Projeler', targetId: 'projeler' },
    { label: 'Beceriler', targetId: 'beceriler' },
    { label: 'CV', targetId: 'cv' },
    { label: 'İletişim', targetId: 'iletisim' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (targetId, event) => {
    event.preventDefault();
    setIsMenuOpen(false);

    // Eğer ana sayfadaysak, direkt kaydır
    if (location.pathname === '/') {
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    // Ana sayfada değilsek önce ana sayfaya git, sonra kaydırma için state gönder
    navigate('/', { state: { scrollTo: targetId } });
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-text">Feyzullah As</span>
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.targetId, e)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
