import styles from './about.module.css'

function About() {
    return (
        <>
            <h2 className={styles.title}><span>01.</span> About Me</h2>
            <p className={styles.text}>
                Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS! <br /><br />
                Fast-forward to today, and I’ve had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients. <br /><br />
                I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React. <br /><br />
                Here are a few technologies I’ve been working with recently:
            </p>
            <ul className={styles.skills}>
                <li className={styles.skillsItem}>JavaScript (ES6+)</li>
                <li className={styles.skillsItem}>React</li>
                <li className={styles.skillsItem}>Node.js</li>
                <li className={styles.skillsItem}>TypeScript</li>
                <li className={styles.skillsItem}>Eleventy</li>
                <li className={styles.skillsItem}>WordPress</li>
            </ul>
        </>
    );
}

export default About