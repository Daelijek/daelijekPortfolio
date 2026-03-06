import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./reset.css";
import Header from "./components/headerComponent/Header";
import Hero from './components/heroComponent/Hero';
import About from "./components/aboutComponent/About";
import Experience from './components/experienceComponent/Experience';
import Projects from "./components/projectsComponent/Projects";
import Contact from "./components/contactComponent/Contact";
import Intro from "./components/Intro";

function App() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro ? (
                <Intro onFinish={() => setShowIntro(false)} />
            ) : (
                <>
                    <Header />
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Contact />
                </>
            )}
            <Analytics />
        </>
    );
}

export default App;