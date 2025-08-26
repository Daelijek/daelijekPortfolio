import styles from './ProjectMiniCard.module.css';
import { FiFolder } from 'react-icons/fi';
import { FaGithub, FaShareSquare } from "react-icons/fa";

function ProjectMiniCard(props) {
    return (
        <div className={styles.projectCardWrapper}>
            <div className={styles.projectMiniCard}>
                <div className={styles.icon}>
                    <FiFolder size={40} className={styles.folderIcon} />
                    <div className={styles.iconGroup}>
                        <a href={props.github} target='_blank' rel="noopener noreferrer" className={styles.iconLink}>
                            <FaGithub size={22} className={styles.icon} />
                        </a>
                        <a href={props.openLink} target='_blank' rel="noopener noreferrer" className={styles.iconLink}>
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
        </div>
    );
}

export default ProjectMiniCard;