import styles from './timelineCard.module.css';

function TimelineCard(props) {
    return (
        <div className={`${props.position === 'left' ? styles.left : styles.right} ${styles.container}`}>
            <div className={styles.content}>
                <h2 className={styles.contentTitle}>{props.title}</h2>
                <small className={styles.subtitle}>{props.subtitle}</small>
                <small className={styles.date}>{props.date}</small>
                <p className={styles.info}>{props.info}</p>
            </div>
        </div>
    );
}

export default TimelineCard;