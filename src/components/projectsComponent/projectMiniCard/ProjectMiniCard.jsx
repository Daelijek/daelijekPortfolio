import styles from './ProjectMiniCard.module.css';
import { FiFolder } from 'react-icons/fi';
import { FaGithub, FaShareSquare } from "react-icons/fa";

function ProjectMiniCard(props) {
    return (
        <div className={styles.projectMiniCard}>
            <div className={styles.icon}>
                <FiFolder size={40} className={styles.folderIcon} />
                <div className={styles.iconGroup}>
                    <a href="#" target='_blank' className={styles.iconLink}>
                        <FaGithub size={22} className={styles.icon} />
                    </a>
                    <a href="#" target='_blank' className={styles.iconLink}>
                        <FaShareSquare size={22} className={styles.icon} />
                    </a>
                </div>
            </div>
            <div className={styles.info}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.description}>{props.description}</p>
                <ul className={styles.tags}>
                    {props.tags && props.tags.map((tag, index) => (
                        <li key={index} className={styles.tag}>{tag}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProjectMiniCard;