import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const navItems = [
  { key: 'home', targetId: null },
  { key: 'about', targetId: 'hakkimda' },
  { key: 'experience', targetId: 'deneyim' },
  { key: 'projects', targetId: 'projeler' },
  { key: 'skills', targetId: 'beceriler' },
  { key: 'cv', targetId: 'cv' },
  { key: 'contact', targetId: 'iletisim' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const { text, toggleLanguage, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const extraScrollOffsets = {
    hakkimda: 64,
    deneyim: 64,
    projeler: 64,
    beceriler: 64,
  };

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) {
      return;
    }

    const headerOffset = window.innerWidth <= 768 ? 60 : 72;
    const extraOffset = extraScrollOffsets[targetId] || 0;
    const top = element.offsetTop - headerOffset + extraOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveTargetId(location.pathname.slice(1) || null);
      return undefined;
    }

    const sectionIds = navItems
      .map((item) => item.targetId)
      .filter(Boolean);

    let ticking = false;

    const updateActiveSection = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 120) {
        setActiveTargetId(null);
        return;
      }

      let currentActive = null;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const triggerPoint = element.offsetTop - 160;
        if (currentScroll >= triggerPoint) {
          currentActive = id;
        }
      });

      setActiveTargetId(currentActive);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (targetId, event) => {
    event.preventDefault();
    setIsMenuOpen(false);
    setActiveTargetId(targetId || null);

    // Eğer ana sayfadaysak, direkt kaydır
    if (location.pathname === '/') {
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(targetId);
      }
      return;
    }

    // Ana sayfada değilsek önce ana sayfaya git, sonra kaydırma için state gönder
    navigate('/', { state: { scrollTo: targetId } });
  };

  return (
    <header className="header">
      {/* Mobile Header Strip */}
      <div className="mobile-header-strip">
        <div className="mobile-header-container">
          <div className="mobile-name">Feyzullah As</div>
          
          <button
            type="button"
            className={`mobile-language-toggle ${language === 'en' ? 'language-toggle-en' : ''}`}
            onClick={toggleLanguage}
            aria-label={text.nav.languageAriaLabel}
          >
            <span className="language-toggle-glider"></span>
            <span className={`lang-text ${language === 'tr' ? 'active' : ''}`}>TR</span>
            <span className={`lang-text ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>

          <button className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="desktop-header">
        <div className="container">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to="/"
                    className={`nav-link ${
                      (item.targetId === activeTargetId || (!item.targetId && activeTargetId === null))
                        ? 'active'
                        : ''
                    }`}
                    onClick={(e) => handleNavClick(item.targetId, e)}
                  >
                    {text.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`language-toggle ${language === 'en' ? 'language-toggle-en' : ''}`}
            onClick={toggleLanguage}
            aria-label={text.nav.languageAriaLabel}
          >
            <span className="language-toggle-glider"></span>
            <span className={`lang-text ${language === 'tr' ? 'active' : ''}`}>TR</span>
            <span className={`lang-text ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                to="/"
                className={`mobile-nav-link ${
                  (item.targetId === activeTargetId || (!item.targetId && activeTargetId === null))
                    ? 'active'
                    : ''
                }`}
                onClick={(e) => handleNavClick(item.targetId, e)}
              >
                {text.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
