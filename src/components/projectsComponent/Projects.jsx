import styles from './projects.module.css'
import finance from '../../../public/images/works/Finance.png'

function Projects() {
    return (
        <>
            <div className={styles.projects}>
                <div className={styles.projectsInner}>
                    <div className={styles.title}>
                        <span>03. </span> Some of My Work
                    </div>
                    <img src={finance} alt="" />
                </div>
            </div>
        </>
    )
}

export default Projects