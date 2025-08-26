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
        {
            title: "Evently",
            description: "A streamlined platform for modern event planning featuring QR invitations, voting on time slots, customizable events, and seamless RSVPs.",
            tags: ["QR Invitations", "MongoDB"],
            github: "https://github.com/Daelijek/Evently",
            openLink: "https://github.com/Daelijek/Evently"
        },
        {
            title: "Kaz-data Solutions",
            description: "A streamlined platform for searching and booking events across Kazakhstan, similar to Ticketon.",
            tags: ["Event", "HTML/CSS/JS", "MongoDB"],
            github: "https://github.com/Daelijek/Kaz-Data_Solutions",
            openLink: "https://github.com/Daelijek/Kaz-Data_Solutions"
        },
        {
            title: "IT-Flower Shop",
            description: "A web-based flower shop platform for browsing, selecting, and purchasing floral arrangements online.",
            tags: ["E-Commerce", "HTML/CSS/JS", "MongoDB"],
            github: "https://github.com/Daelijek/IT-FlowerShop",
            openLink: "https://github.com/Daelijek/IT-FlowerShop"
        },
        {
            title: "AITU Grade Calculator",
            description: "A Python app with a CustomTkinter interface for calculating final grades and checking scholarship eligibility.",
            tags: ["Python", "CustomTkinter", "Education"],
            github: "https://github.com/Daelijek/AITU_grade_calculator",
            openLink: "https://github.com/Daelijek/AITU_grade_calculator"
        },
        {
            title: "QueueMS",
            description: "A microservices-based queue management system built with Go, featuring client, notification, and queue services for efficient task handling.",
            tags: ["Go", "Microservices", "Backend"],
            github: "https://github.com/Daelijek/QueueMS",
            openLink: "https://github.com/Daelijek/QueueMS"
        },
        {
            title: "Parameters Retrieval",
            description: `The "Daelijek Parameters Retrieval" program is a Python application designed to retrieve various system parameters and information using a graphical user interface (GUI).`,
            tags: ["Python", "GUI", "System Monitoring"],
            github: "https://github.com/Daelijek/ParametersRetrieval",
            openLink: "https://github.com/Daelijek/ParametersRetrieval"
        },
        {
            title: "NWA",
            description: "A simple website built with HTML, CSS, and JavaScript about the rap group N.W.A, featuring their history and members.",
            tags: ["HTML/CSS/JS", "Website", "Music"],
            github: "https://github.com/Daelijek/NWA",
            openLink: "https://github.com/Daelijek/NWA"
        },
        {
            title: "Book Review",
            description: "A simple program for browsing detailed book information across different categories.",
            tags: ["Python", "Books", "Education"],
            github: "https://github.com/Daelijek/Book_Review_Project",
            openLink: "https://github.com/Daelijek/Book_Review_Project"
        },
        {
            title: "Voice Assistant",
            description: "A Python-based voice assistant that executes simple commands activated by speech.",
            tags: ["Python", "Voice Recognition", "Assistant"],
            github: "https://github.com/Daelijek/Voice_Assistant",
            openLink: "https://github.com/Daelijek/Voice_Assistant"
        },
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
                                    github={miniProjects.github}
                                    openLink={miniProjects.openLink}
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