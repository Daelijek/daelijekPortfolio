import styles from './Footer.module.css'

function Footer({ text, url }) {
    return (
        <footer>
            <p className={styles.footerText}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            </p>
        </footer>
    )
}

export default Footer
