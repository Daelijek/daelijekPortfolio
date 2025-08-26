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
                                info="Graduated with a Bachelor's degree in Software Engineering. These years laid the foundation of my career, shaping my passion for frontend development and modern web technologies."
                                position="left"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <TimelineCard
                                title="REACT NATIVE DEVELOPER"
                                subtitle="STOLOVKA (Startup Company)"
                                date="Sep 2023 - Nov 2024"
                                info="Worked on building and maintaining mobile applications using React Native. Gained hands-on experience in a fast-paced startup environment, delivering functional and user-focused features."
                                position="right"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.left}`}>
                            <TimelineCard
                                title="FRONTEND DEVELOPER (Internship)"
                                subtitle="QB Solutions"
                                date="Jan 2025 - May 2025"
                                info="Focused on creating responsive websites, integrating APIs, and collaborating with a professional team. Improved skills in modern frontend frameworks and best practices."
                                position="left"
                            />
                        </div>
                        <div className={`${styles.container} ${styles.right}`}>
                            <TimelineCard
                                title="Vue Markup Developer"
                                subtitle="TrustMe"
                                date="Nov 2024 - Present"
                                info="Creating new Vue markups from scratch according to task requirements. Maintaining and improving existing markups, fixing bugs, and implementing enhancements. Handling tasks in Bitrix24 with timely delivery. Collaborating with backend and frontend developers to solve specific issues. Utilizing Vue.js to implement dynamic elements and enhance the user experience."
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