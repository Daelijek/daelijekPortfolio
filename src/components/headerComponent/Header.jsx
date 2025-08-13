import styles from "./header.module.css"

function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_inner}>
                    <div className={styles.logo}></div>
                    <nav className={styles.nav}>
                        <li className={styles.navItem}><a href="#home">Home</a></li>
                        <li className={styles.navItem}><a href="#about">01. About</a></li>
                        <li className={styles.navItem}><a href="#exp">02. Experience</a></li>
                        <li className={styles.navItem}><a href="#projects">03. Projects</a></li>
                        <li className={styles.navItem}><a href="#contact">04. Contact</a></li>
                        <li className={styles.navItem}><a href=""><button>Resume</button></a></li>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Header