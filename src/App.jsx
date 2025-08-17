import "./reset.css"
import Header from "./components/headerComponent/Header"
import Hero from './components/heroComponent/Hero'
import About from "./components/aboutComponent/About";
import Experience from './components/experienceComponent/Experience'
import Projects from "./components/projectsComponent/Projects";

function App() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Experience />
            <Projects />
        </>
    );
}

export default App