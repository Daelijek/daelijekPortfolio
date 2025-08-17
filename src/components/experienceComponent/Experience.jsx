import styles from './experience.module.css'

function Experience() {
    return (
        <>
            <div className={styles.exp}>
                <div className={styles.expInner}>
                    <div className={styles.title}>
                        <span>02.</span> Experience
                    </div>
                    <div className={styles.timeline}>
                        <div className={`${styles.container} ${styles.left}`}>
                            <div className={styles.content}>
                                <h2>ASTANA IT UNIVERSITY</h2>
                                <p>Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018.</p>
                            </div>
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <div className={styles.content}>
                                <h2>REACT NATIVE DEVELOPER</h2>
                                <p>Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018.</p>
                            </div>
                        </div>
                        <div className={`${styles.container} ${styles.left}`}>
                            <div className={styles.content}>
                                <h2>FRONTEND DEVELOPER (INTERN)</h2>
                                <p>Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018.</p>
                            </div>
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <div className={styles.content}>
                                <h2>JUNIOR FRONTEND DEVELOPER</h2>
                                <p>Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experience