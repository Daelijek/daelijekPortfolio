import styles from './hero.module.css'

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroInner}>
                <div className={styles.intro}>Hi, my name is</div>
                <h1 className={styles.title}>Dias Yermek</h1>
                <h3 className={styles.subtitle}>I build digital experiences.</h3>
                <p className={styles.text}>
                    I'm a frontend developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products with modern web technologies.
                </p>
                <div className={styles.btn_group}>
                    <button className={styles.btn}>Check out my works</button>
                    <button className={styles.btn}>Get in touch</button>
                </div>
            </div>
        </div>
    );
}

export default Hero