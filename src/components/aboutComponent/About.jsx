import { useTranslation, Trans } from 'react-i18next'
import styles from './about.module.css'
import aboutImg from '../../assets/about.png'
import SectionTitle from '../ui/SectionTitle/SectionTitle'

function About() {
    const { t } = useTranslation()
    const skills = t('about.skills', { returnObjects: true })

    return (
        <div id='about' className={styles.about}>
            <div className={styles.about_inner}>
                <SectionTitle number="01. " as="h2" className={styles.title}>
                    {t('about.title')}
                </SectionTitle>
                <div className={styles.group}>
                    <div className={styles.info}>
                        <p className={styles.text}>
                            <Trans i18nKey="about.text1" components={{ b: <b /> }} />
                            <br /><br />
                            <Trans i18nKey="about.text2" components={{ b: <b /> }} />
                            <br /><br />
                            {t('about.text3')}
                        </p>
                        <ul className={styles.skills}>
                            {Array.isArray(skills) && skills.map((skill) => (
                                <li key={skill} className={styles.skillsItem}>
                                    <span>‣ </span> {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.image}>
                        <img src={aboutImg} alt={t('a11y.aboutImageAlt')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About
