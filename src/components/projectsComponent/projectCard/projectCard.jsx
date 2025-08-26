import { useState, useEffect } from "react";
import styles from './projectCard.module.css'
import { FaGithub, FaShareSquare } from "react-icons/fa";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

function ProjectCard(props) {
    const isMobile = useMediaQuery("(max-width: 1000px)");

    return (
        <div className={`${props.position === 'left' ? styles.left : styles.right} ${styles.projCard}`}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <a href={props.openLink} target='_blank' rel="noopener noreferrer">
                        <img src={props.src} alt={props.title} />
                    </a>

                    {/* В мобильной версии info будет прямо внутри cardImage */}
                    {isMobile && (
                        <div className={styles.infoMobile}>
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
                    )}
                </div>

                {/* Десктопная версия info (сбоку) */}
                {!isMobile && (
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
                )}
            </div>
        </div>
    )
}

export default ProjectCard