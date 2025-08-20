import styles from './contact.module.css';
import { SocialIcon } from 'react-social-icons';

function Contact() {
    return (
        <>
            <div id='contact' className={styles.contactContainer}>
                <small className={styles.numeration}>04.Contacts</small>
                <h1 className={styles.title}>Get In Touch</h1>
                <p className={styles.text}>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and design. Whether you have a question or just want to say hi, I'll do my best to get back to you!</p>
                <button className={styles.button}><a href='https://t.me/daelijek_og'>Say Hello!</a></button>
            </div>
            <div className={styles.socialContainer}>
                <div className={styles.iconsWithLine}>
                    <SocialIcon className={styles.iconStyle} url="https://t.me/daelijek_og" bgColor="transparent" fgColor="currentColor" />
                    <SocialIcon className={styles.iconStyle} url="mailto:dias1605ermek@gmail.com" bgColor="transparent" fgColor="currentColor" />
                    <SocialIcon className={styles.iconStyle} url="https://instagram.com/daelijek_og" bgColor="transparent" fgColor="currentColor" />
                    <SocialIcon className={styles.iconStyle} url="https://wa.me/+77088350549" bgColor="transparent" fgColor="currentColor" />
                    <SocialIcon className={styles.iconStyle} url="https://linkedin.com/in/dias-yermek-a4026b32b" bgColor="transparent" fgColor="currentColor" />
                    <SocialIcon className={styles.iconStyle} url="https://github.com/daelijek" bgColor="transparent" fgColor="currentColor" />
                </div>
            </div>
            <footer>
                <p className={styles.footerText}><a href="https://github.com/Daelijek" target='_blank' rel="noopener noreferrer">Designed & Build by Dias Yermek</a></p>
            </footer>
        </>
    )
}

export default Contact;