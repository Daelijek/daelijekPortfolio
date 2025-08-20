// Intro.jsx
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/lotties/intro.json';
import styles from './Intro.module.css';

export default function Intro({ onFinish }) {
    const [finished, setFinished] = useState(false);

    const defaultOptions = {
        loop: false, // проигрывается только один раз
        autoplay: true,
        animationData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    };

    const handleComplete = () => {
        setFinished(true);
        // добавляем задержку перед завершением интро
        setTimeout(onFinish, 2000);
    };

    return (
        <div className={styles.intro}>
            <Lottie
                options={defaultOptions}
                height={300}
                width={300}
                isClickToPauseDisabled={true} // запрещаем останавливать по клику
                eventListeners={[
                    { eventName: 'complete', callback: handleComplete },
                ]}
            />
            {finished && (
                <p className={styles.introText}>
                    LET YOUR WORK DO THE TALKING
                </p>
            )}
        </div>
    );
}