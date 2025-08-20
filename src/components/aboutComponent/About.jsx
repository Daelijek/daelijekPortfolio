import styles from './about.module.css'
import aboutImg from '../../assets/about.png'

function About() {
    return (
        <>
            <div id='about' className={styles.about}>
                <div className={styles.about_inner}>
                    <h2 className={styles.title}><span>01. </span>About Me</h2>
                    <div className={styles.group}>
                        <div className={styles.info}>
                            <p className={styles.text}>
                                Hello! My name is <b>Dias</b>, and I’ve been passionate about web development since high school, when I first became curious about how websites are built. In my first year at university, I created a simple website and quickly realized that frontend was what I enjoyed most — I love seeing my <b>code come to life visually</b>.
                                <br /><br />
                                Since then, I’ve had the chance to gain experience in different environments. I started as a <b>React Native Developer at Stolovka</b>, a fast-moving startup where I worked on mobile applications. Later, I joined <b>QB Solutions as a frontend intern</b>, learning how to build responsive websites in a team setting. Currently, I’m a <b>Junior Frontend Developer at TrustMe</b>, where I focus on creating user-friendly interfaces and working with APIs.
                                <br /><br />
                                Some of the technologies I work with most often include:
                            </p>
                            <ul className={styles.skills}>
                                <li className={styles.skillsItem}><span>‣ </span> JavaScript (ES6+)</li>
                                <li className={styles.skillsItem}><span>‣ </span> React</li>
                                <li className={styles.skillsItem}><span>‣ </span> React Native</li>
                                <li className={styles.skillsItem}><span>‣ </span> Vue.js</li>
                                <li className={styles.skillsItem}><span>‣ </span> Node.js</li>
                                <li className={styles.skillsItem}><span>‣ </span> TypeScript</li>
                            </ul>
                        </div>
                        <div className={styles.image}>
                            <img src={aboutImg} alt="About Image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About