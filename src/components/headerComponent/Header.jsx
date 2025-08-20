import { useState, useEffect } from 'react';
import styles from './header.module.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Если прокрутка вниз, скрываем хедер
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsVisible(false); // Прокрутка вниз
            }
            // Если прокрутка вверх, показываем хедер
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true); // Прокрутка вверх
            }

            setLastScrollY(currentScrollY); // Обновляем последний Y

            if (currentScrollY > 200) {
                setIsScrolled(true); // Меняем состояние, если прокручено более 200px
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`${styles.header} 
        ${isScrolled ? styles['header--active'] : ''} 
        ${!isVisible ? styles['header--hidden'] : ''}`}
        >
            <div className={styles.header_inner}>
                <div className={styles.logo}>
                    <a href="/">
                        <img src={isScrolled ? '/images/logo.png' : '/images/logo.png'} alt="Logo" />
                    </a>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}><a href="#home">Home</a></li>
                        <li className={styles.navItem}><a href="#about"><span>01.</span>About</a></li>
                        <li className={styles.navItem}><a href="#exp"><span>02.</span>Experience</a></li>
                        <li className={styles.navItem}><a href="#projects"><span>03.</span>Projects</a></li>
                        <li className={styles.navItem}><a href="#contact"><span>04.</span>Contact</a></li>
                        <li className={styles.navItem}><a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><button>Resume</button></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
