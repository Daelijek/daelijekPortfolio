import { useTranslation } from 'react-i18next'
import styles from '../projects.module.css'
import ProjectCard from '../projectCard/projectCard'

function FeaturedProjects({ projects }) {
    const { t } = useTranslation()

    return (
        <div className={styles.projectsGrid}>
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    position={project.position}
                    openLink={project.openLink}
                    github={project.github}
                    src={project.src}
                    featured={t('projects.featuredLabel')}
                    title={t(`projects.featured.${project.id}.title`)}
                    description={t(`projects.featured.${project.id}.description`)}
                    tags={project.tags}
                />
            ))}
        </div>
    )
}

export default FeaturedProjects
