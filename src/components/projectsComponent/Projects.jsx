import { useState } from 'react'
import styles from './projects.module.css'
import ProjectCard from './projectCard/projectCard'
import Finance from '/src/assets/Finance.png'
import openGov from '/src/assets/openGov.png'
import berikWeb from '/src/assets/berikWeb.png'
import ProjectMiniCard from './projectMiniCard/ProjectMiniCard'

function Projects() {
    const [showMore, setShowMore] = useState(false);

    const projects = [
        {
            position: "left",
            openLink: "https://github.com/Daelijek/FinanceManagementApp",
            github: "https://github.com/Daelijek/FinanceManagementApp",
            src: Finance,
            featured: "Featured Project",
            title: "Finance Management Application",
            description: "A mobile app for smarter finance tracking. Users can monitor expenses, set spending limits, and analyze their budgets with visual charts. The built-in AI assistant provides personalized insights to improve financial decisions.",
            tags: ['Mobile Development', 'AI - Assistent', 'React Native']
        },
        {
            position: "right",
            openLink: "https://qbs-solutions.vercel.app/",
            github: "https://github.com/Daelijek/www-opengov-kz",
            src: openGov,
            featured: "Featured Project",
            title: "OpenGov.kz",
            description: "An open government platform designed to provide transparency, easy access to public data, and improved communication between citizens and government services.",
            tags: ['React', 'Next.js', 'API', 'SCSS']
        },
        {
            position: "left",
            openLink: "https://berikzhunusbek.kz/",
            github: "https://github.com/Daelijek/BerikWeb",
            src: berikWeb,
            featured: "Featured Project",
            title: "Berik Zhunusbek",
            description: "A personal website created for sculptor, artist, actor, and CG specialist Berik Zhunusbek. The site presents his biography, portfolio of works, and career highlights, designed as a clean and accessible digital presence.",
            tags: ['HTML', 'CSS', 'JavaScript', 'Portfolio', 'Multilanguage']
        },
    ]

    const miniProjects = [
        { title: "Project 1", description: "A brief description of Project 1.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 2", description: "A brief description of Project 2.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 3", description: "A brief description of Project 3.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 4", description: "A brief description of Project 4.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 5", description: "A brief description of Project 5.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 6", description: "A brief description of Project 6.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 7", description: "A brief description of Project 7.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 8", description: "A brief description of Project 8.", tags: ['React', 'JavaScript', 'CSS'] },
        { title: "Project 9", description: "A brief description of Project 9.", tags: ['React', 'JavaScript', 'CSS'] },
    ]
    return (
        <>
            <div id='projects' className={styles.projects}>
                <div className={styles.projectsInner}>
                    <div className={styles.title}>
                        <span>03.</span> Some of My Work
                    </div>
                    <div className={styles.projectsGrid}>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                position={project.position}
                                openLink={project.openLink}
                                github={project.github}
                                src={project.src}
                                featured={project.featured}
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                            />
                        ))}
                    </div>
                    <div className={styles.other}>
                        <h2 className={`${styles.title} ${styles.center}`}>Other Noteworthy Projects</h2>
                        <small className={styles.archive}><a href="">view the archive</a></small>
                        <div className={styles.otherProjects}>
                            {miniProjects.slice(0, showMore ? miniProjects.length : 6).map((miniProjects, index) => (
                                <ProjectMiniCard
                                    key={index}
                                    title={miniProjects.title}
                                    description={miniProjects.description}
                                    tags={miniProjects.tags}
                                />
                            ))}
                        </div>
                        {miniProjects.length > 6 && (
                            <div
                                className={`${styles.holographic_container} ${styles.showMore}`}
                                onClick={() => setShowMore(!showMore)}
                            >
                                <button className={styles.holographic_card}>
                                    <h2>{showMore ? 'Show Less' : 'Show More'}</h2>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Projects