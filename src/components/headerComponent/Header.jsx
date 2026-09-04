import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './header.module.css';
import { navLinks, resumeUrl } from './navData';
import LanguageSwitcher from '../ui/LanguageSwitcher/LanguageSwitcher';

function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${isScrolled && !isMenuOpen ? styles['header--active'] : ''} ${!isVisible ? styles['header--hidden'] : ''}`}
    >
      <div className={styles.header_inner}>
        <div className={styles.logo}>
          <a href="/">
            <img src="/images/logo.png" alt={t('a11y.logoAlt')} />
          </a>
        </div>

        <button
          className={styles.menuToggle}
          aria-controls="main-nav"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(v => !v)}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${isMenuOpen ? styles.isOpen : ''}`}
          aria-label={t('a11y.mainNavAria')}
        >
          <ul className={styles.navList}>
            {navLinks.map(({ id, href, number }) => (
              <li key={id} className={styles.navItem}>
                <a href={href} onClick={closeMenu}>
                  {number && <span>{number}</span>} {t(`nav.${id}`)}
                </a>
              </li>
            ))}
            <li className={styles.navItem}>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <button type="button">{t('nav.resume')}</button>
              </a>
            </li>
            <li className={styles.navItem}>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
