import styles from './experience.module.css'
import TimelineCard from './timelineCard/timelineCard';

function Experience() {
    return (
        <>
            <div id='exp' className={styles.exp}>
                <div className={styles.expInner}>
                    <div className={styles.title}>
                        <span>02.</span> Experience
                    </div>
                    <div className={styles.timeline}>
                        <div className={`${styles.container} ${styles.left}`}>
                            <TimelineCard
                                title="ASTANA IT UNIVERSITY"
                                subtitle="Software Engineering"
                                date="2022-2025"
                                info="Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018."
                                position="left"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <TimelineCard
                                title="REACT NATIVE DEVELOPER"
                                subtitle="STOLOVKA (Startup Company)"
                                date="Sep 2023- Nov 2024"
                                info="Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018."
                                position="right"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.left}`}>
                            <TimelineCard
                                title="FRONTEND DEVELOPER (Internship)"
                                subtitle="QB Solutions"
                                date="Jan 2025- May 2025"
                                info="Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018."
                                position="left"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <TimelineCard
                                title="JUNIOR FRONTEND DEVELOPER"
                                subtitle="TrustMe"
                                date="Nov 2024- Present"
                                info="Candidate for Bachelor of Science in Information Science with a concentration in Human Computer Interaction (HCI) and a minor in Interaction Design. Graduating in May 2018."
                                position="right"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experience