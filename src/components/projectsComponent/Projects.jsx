import { useTranslation } from 'react-i18next'
import styles from './projects.module.css'
import SectionTitle from '../ui/SectionTitle/SectionTitle'
import FeaturedProjects from './FeaturedProjects/FeaturedProjects'
import OtherProjects from './OtherProjects/OtherProjects'
import { featuredProjects, miniProjects } from './projectsData'

function Projects() {
    const { t } = useTranslation()

    return (
        <div id='projects' className={styles.projects}>
            <div className={styles.projectsInner}>
                <SectionTitle number="03." className={styles.title}>
                    {t('projects.sectionTitle')}
                </SectionTitle>
                <FeaturedProjects projects={featuredProjects} />
                <OtherProjects projects={miniProjects} />
            </div>
        </div>
    )
}

export default Projects
