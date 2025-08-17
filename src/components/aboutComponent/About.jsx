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
                                Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS! <br /><br />
                                Fast-forward to today, and I’ve had the privilege of working at <span>an advertising agency</span>, <span>a start-up</span>, <span>a huge corporation</span>, and <span>a student-led design studio</span>. My main focus these days is building accessible, inclusive products and digital experiences at <span>Upstatement</span> for a variety of clients. <br /><br />
                                I also recently <span>launched a course</span> that covers everything you need to build a web app with the Spotify API using Node & React. <br /><br />
                                Here are a few technologies I’ve been working with recently:
                            </p>
                            <ul className={styles.skills}>
                                <li className={styles.skillsItem}><span>‣</span> JavaScript (ES6+)</li>
                                <li className={styles.skillsItem}><span>‣</span> React</li>
                                <li className={styles.skillsItem}><span>‣</span> Node.js</li>
                                <li className={styles.skillsItem}><span>‣</span> TypeScript</li>
                                <li className={styles.skillsItem}><span>‣</span> Eleventy</li>
                                <li className={styles.skillsItem}><span>‣</span> WordPress</li>
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