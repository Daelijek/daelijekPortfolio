import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../projects.module.css'
import ProjectMiniCard from '../projectMiniCard/ProjectMiniCard'

const INITIAL_COUNT = 6

function OtherProjects({ projects }) {
    const { t } = useTranslation()
    const [showMore, setShowMore] = useState(false)
    const visible = showMore ? projects : projects.slice(0, INITIAL_COUNT)
    const hasMore = projects.length > INITIAL_COUNT

    return (
        <div className={styles.other}>
            <h2 className={`${styles.title} ${styles.center}`}>{t('projects.otherTitle')}</h2>
            <small className={styles.archive}><a href="">{t('projects.archive')}</a></small>
            <div className={styles.otherProjects}>
                {visible.map((project) => (
                    <ProjectMiniCard
                        key={project.id}
                        github={project.github}
                        openLink={project.openLink}
                        title={t(`projects.mini.${project.id}.title`)}
                        description={t(`projects.mini.${project.id}.description`)}
                        tags={project.tags}
                    />
                ))}
            </div>
            {hasMore && (
                <div
                    className={`${styles.holographic_container} ${styles.showMore}`}
                    onClick={() => setShowMore(!showMore)}
                >
                    <button className={styles.holographic_card} type="button">
                        <h2>{showMore ? t('projects.showLess') : t('projects.showMore')}</h2>
                    </button>
                </div>
            )}
        </div>
    )
}

export default OtherProjects
