import { SocialIcon } from 'react-social-icons'
import styles from '../contact.module.css'

function SocialLinks({ links }) {
    return (
        <div className={styles.iconsWithLine}>
            {links.map(({ id, url }) => (
                <SocialIcon
                    key={id}
                    className={styles.iconStyle}
                    url={url}
                    bgColor="transparent"
                    fgColor="currentColor"
                />
            ))}
        </div>
    )
}

export default SocialLinks
