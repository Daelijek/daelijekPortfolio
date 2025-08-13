import styles from "./header.module.css"

function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_inner}>
                    <div className={styles.logo}></div>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}><a href="#home">Home</a></li>
                            <li className={styles.navItem}><a href="#about"><span>01.</span> About</a></li>
                            <li className={styles.navItem}><a href="#exp"><span>02.</span> Experience</a></li>
                            <li className={styles.navItem}><a href="#projects"><span>03.</span> Projects</a></li>
                            <li className={styles.navItem}><a href="#contact"><span>04.</span> Contact</a></li>
                            <li className={styles.navItem}><a href=""><button>Resume</button></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Header