import styles from './projects.module.css'
import ProjectCard from './projectCard/projectCard'
import Finance from '/src/assets/Finance.png'
import ProjectMiniCard from './projectMiniCard/ProjectMiniCard'

function Projects() {
    return (
        <>
            <div id='projects' className={styles.projects}>
                <div className={styles.projectsInner}>
                    <div className={styles.title}>
                        <span>03.</span> Some of My Work
                    </div>
                    <div className={styles.projectsGrid}>
                        <div className={styles.left}>
                            <ProjectCard
                                position="left"
                                src={Finance}
                                featured="Featured Project"
                                title="Finance Management Application"
                                description="A comprehensive finance management application designed to help users track their expenses, manage budgets, and gain insights into their financial health."
                                tags={['Mobile Development', 'AI - Assistent', 'React Native']}
                            />
                        </div>
                        <div className={styles.right}>
                            <ProjectCard
                                src={Finance}
                                featured="Featured Project"
                                title="Finance Management Application"
                                description="A comprehensive finance management application designed to help users track their expenses, manage budgets, and gain insights into their financial health."
                                tags={['Mobile Development', 'AI - Assistent', 'React Native']}
                            />
                        </div>
                        <div className={styles.left}>
                            <ProjectCard
                                position="left"
                                src={Finance}
                                featured="Featured Project"
                                title="Finance Management Application"
                                description="A comprehensive finance management application designed to help users track their expenses, manage budgets, and gain insights into their financial health."
                                tags={['Mobile Development', 'AI - Assistent', 'React Native']}
                            />
                        </div>
                    </div>
                    <div className={styles.other}>
                        <h2 className={`${styles.title} ${styles.center}`}>Other Noteworthy Projects</h2>
                        <small className={styles.archive}><a href="">view the archive</a></small>
                        <div className={styles.otherProjects}>
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                            <ProjectMiniCard
                                title="Project 1"
                                description="A brief description of Project 1."
                                tags={['React', 'JavaScript', 'CSS']}
                            />
                        </div>
                        <div class={styles.holographic_container}>
                            <button class={styles.holographic_card}>
                                <h2>Show More</h2>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects