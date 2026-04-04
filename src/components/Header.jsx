import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const navItems = [
  { label: 'Ana Sayfa', targetId: null },
  { label: 'Hakkımda', targetId: 'hakkimda' },
  { label: 'Deneyim', targetId: 'deneyim' },
  { label: 'Projeler', targetId: 'projeler' },
  { label: 'Beceriler', targetId: 'beceriler' },
  { label: 'CV', targetId: 'cv' },
  { label: 'İletişim', targetId: 'iletisim' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to="/"
                  className={`nav-link ${
                    (item.targetId === activeTargetId || (!item.targetId && activeTargetId === null))
                      ? 'active'
                      : ''
                  }`}
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
