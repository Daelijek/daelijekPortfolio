import { useTranslation } from 'react-i18next'
import styles from './contact.module.css'
import Footer from '../ui/Footer/Footer'
import SocialLinks from './SocialLinks/SocialLinks'
import { socialLinks } from './contactData'

function Contact() {
    const { t } = useTranslation()

    return (
        <>
            <div id='contact' className={styles.contactContainer}>
                <small className={styles.numeration}>{t('contact.numeration')}</small>
                <h1 className={styles.title}>{t('contact.title')}</h1>
                <p className={styles.text}>{t('contact.text')}</p>
                <button className={styles.button} type="button">
                    <a href="https://t.me/daelijek_og">{t('contact.sayHello')}</a>
                </button>
            </div>
            <div className={styles.socialContainer}>
                <SocialLinks links={socialLinks} />
            </div>
            <Footer text={t('footer.text')} url="https://github.com/Daelijek" />
        </>
    )
}

export default Contact;