import { useState, useEffect } from 'react';
import styles from './header.module.css';

function Header() {
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
            <img src="/images/logo.png" alt="Logo" />
          </a>
        </div>

        <button
          className={styles.menuToggle}
          aria-controls="main-nav"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(v => !v)}
        >
          ☰
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${isMenuOpen ? styles.isOpen : ''}`}
          aria-label="Main menu"
        >
          <ul className={styles.navList}>
            <li className={styles.navItem}><a href="#hero" onClick={closeMenu}>Home</a></li>
            <li className={styles.navItem}><a href="#about" onClick={closeMenu}><span>01.</span> About</a></li>
            <li className={styles.navItem}><a href="#exp" onClick={closeMenu}><span>02.</span> Experience</a></li>
            <li className={styles.navItem}><a href="#projects" onClick={closeMenu}><span>03.</span> Projects</a></li>
            <li className={styles.navItem}><a href="#contact" onClick={closeMenu}><span>04.</span> Contact</a></li>
            <li className={styles.navItem}>
              <a href="https://drive.google.com/file/d/1MVf9uNXEDI-n2uvY0pNn_O7svENXn65C/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <button>Resume</button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
