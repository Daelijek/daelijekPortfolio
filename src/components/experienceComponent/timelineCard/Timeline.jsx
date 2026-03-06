import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import styles from './Timeline.module.css';
import cardStyles from './timelineCard.module.css';

/**
 * Single timeline entry: date (sticky left) + card with title, subtitle, info.
 * @param {{ title: string, subtitle: string, date: string, info: string }} entry
 */
function TimelineEntry({ entry }) {
  return (
    <div className={styles.entry}>
      <div className={styles.stickyBlock}>
        <div className={styles.dot} />
        <h3 className={styles.stickyTitle}>{entry.date}</h3>
      </div>
      <div className={styles.contentBlock}>
        <h3 className={styles.mobileTitle}>{entry.date}</h3>
        <div className={cardStyles.content}>
          <h2 className={cardStyles.contentTitle}>{entry.title}</h2>
          <small>{entry.subtitle}</small>
          <p>{entry.info}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Scroll-driven timeline with vertical progress line.
 * data: array of { title, subtitle, date, info }
 */
function measureHeight(ref) {
  if (!ref?.current) return 0;
  const rect = ref.current.getBoundingClientRect();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const paddingBottom = isMobile ? 40 : 80;
  return Math.max(0, rect.height - paddingBottom);
}

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = () => setHeight(measureHeight(ref));

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    const node = ref.current;
    if (node) resizeObserver.observe(node);

    const handleResize = () => requestAnimationFrame(updateHeight);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div ref={ref} className={styles.timelineInner}>
        {data.map((entry, index) => (
          <TimelineEntry key={index} entry={entry} />
        ))}
        <div
          className={styles.lineTrack}
          style={{ height: height + 'px' }}
          aria-hidden
        >
          <motion.div
            className={styles.lineFill}
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
