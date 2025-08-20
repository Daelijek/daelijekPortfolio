import styles from './projectCard.module.css'
import { FaGithub, FaShareSquare } from "react-icons/fa";

function ProjectCard(props) {
    return (
        <div className={`${props.position === 'left' ? styles.left : styles.right} ${styles.projCard}`}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <a href={props.openLink} target='_blank' rel="noopener noreferrer">
                        {console.log("LINK:", props.link)}
                        <img src={props.src} alt={props.title} />
                    </a>
                </div>
                <div className={styles.info}>
                    <small className={styles.featured}>{props.featured}</small>
                    <h2 className={styles.title}>{props.title}</h2>
                    <div className={styles.description}>
                        <p>{props.description}</p>
                    </div>
                    <ul className={styles.tags}>
                        {props.tags && props.tags.map((tag, index) => (
                            <li key={index} className={styles.tag}>{tag}</li>
                        ))}
                    </ul>

                    <div className={styles.icons}>
                        <a href={props.github} target='_blank' rel="noopener noreferrer" className={styles.iconLink}>
                            <FaGithub size={22} className={styles.icon} />
                        </a>
                        <a href={props.openLink} target='_blank' rel="noopener noreferrer" className={styles.iconLink}>
                            <FaShareSquare size={22} className={styles.icon} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
