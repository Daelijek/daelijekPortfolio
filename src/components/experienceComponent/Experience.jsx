import { useTranslation } from 'react-i18next'
import styles from './experience.module.css'
import { Timeline } from './timelineCard/Timeline'
import { experienceData } from './experienceData'
import SectionTitle from '../ui/SectionTitle/SectionTitle'

function Experience() {
    const { t } = useTranslation()

    const timelineData = experienceData.map((item) => ({
        title: t(`experience.${item.id}.title`),
        subtitle: t(`experience.${item.id}.subtitle`),
        date: t(`experience.${item.id}.date`),
        info: t(`experience.${item.id}.info`),
    }))

    return (
        <div id="exp" className={styles.exp}>
            <div className={styles.expInner}>
                <SectionTitle number="02." className={styles.title}>
                    {t('experience.sectionTitle')}
                </SectionTitle>
                <Timeline data={timelineData} />
            </div>
        </div>
    )
}

export default Experience