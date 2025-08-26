import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import styles from './hero.module.css';
import { motion } from 'framer-motion';

function Hero() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: 'easeOut',
      },
    },
  };

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
          spacing: 15.00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} id='hero' className={styles.hero}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.heroInner}
      >
        <motion.div variants={itemVariants} className={styles.intro}>
          Hi, my name is
        </motion.div>
        <motion.div variants={itemVariants} className={styles.title}>
          Dias Yermek
        </motion.div>
        <motion.div variants={itemVariants} className={styles.subtitle}>
          I build digital experiences.
        </motion.div>
        <motion.div variants={itemVariants} className={styles.text}>
          I'm a frontend developer specializing in building exceptional digital
          experiences. Currently focused on creating accessible, human-centered
          products with modern web technologies.
        </motion.div>
        <motion.div variants={itemVariants} className={styles.btn_group}>
          <a href="#projects" className={styles.btn}>
            Check out my works
          </a>
          <a href="#contact" className={styles.btn}>
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;