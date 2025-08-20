// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import styles from './hero.module.css';

function Hero() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 0.5,
                    scaleMobile: 1.00,
                    color: 0x29bf12,
                    backgroundColor: 0x121619,
                    points: 10.00,
                    maxDistance: 12.00,
                    spacing: 15.00
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div ref={vantaRef} className={styles.hero}>
            <div className={styles.heroInner}>
                <div className={styles.intro}>Hi, my name is</div>
                <h1 className={styles.title}>Dias Yermek</h1>
                <h3 className={styles.subtitle}>I build digital experiences.</h3>
                <p className={styles.text}>
                    I'm a frontend developer specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products with modern web technologies.
                </p>
                <div className={styles.btn_group}>
                    <a href="#projects" className={styles.btn}>Check out my works</a>
                    <a href="#contact" className={styles.btn}>Get in touch</a>
                </div>
            </div>
        </div>
    );
}

export default Hero;
