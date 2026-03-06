import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import styles from './hero.module.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: 'easeOut' },
  },
};

function Hero() {
  const { t } = useTranslation();
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
          spacing: 15.00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} id="hero" className={styles.hero}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.heroInner}
      >
        <motion.div variants={itemVariants} className={styles.intro}>{t('hero.intro')}</motion.div>
        <motion.div variants={itemVariants} className={styles.title}>{t('hero.title')}</motion.div>
        <motion.div variants={itemVariants} className={styles.subtitle}>{t('hero.subtitle')}</motion.div>
        <motion.div variants={itemVariants} className={styles.text}>{t('hero.description')}</motion.div>
        <motion.div variants={itemVariants} className={styles.btn_group}>
          <a href="#projects" className={styles.btn}>{t('hero.primaryCta')}</a>
          <a href="#contact" className={styles.btn}>{t('hero.secondaryCta')}</a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;