import styles from './projectCard.module.css'
import { FaGithub, FaShareSquare } from "react-icons/fa";

function ProjectCard(props) {
    return (
        <div className={`${props.position === 'left' ? styles.left : styles.right} ${styles.projCard}`}>
            <div className={styles.cardImage}>
                <img src={props.src} alt={props.title} />
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
                        <a href="#" target='_blank' className={styles.iconLink}>
                            <FaGithub size={22} className={styles.icon} />
                        </a>
                        <a href="#" target='_blank' className={styles.iconLink}>
                            <FaShareSquare size={22} className={styles.icon} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
