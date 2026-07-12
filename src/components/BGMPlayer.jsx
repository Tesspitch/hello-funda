import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import quizSound from '../assets/sound/sound.mp3';
import defaultSound from '../assets/sound/quizPhase.mp3';
import summarySound from '../assets/sound/sumaryScore.mp3';
import '../index.css';

export default function BGMPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const location = useLocation();
    const isInitialMount = useRef(true);

    const getSoundSource = () => {
        const path = location.pathname;
        if (path === '/quiz' || path === '/mission-equipment' || path === '/mission-sequence' || path === '/video-review') {
            return quizSound;
        }
        if (path === '/simulation-score') {
            return summarySound;
        }
        return defaultSound;
    };

    const currentSound = getSoundSource();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4; // Set a pleasant default volume

            if (isInitialMount.current) {
                isInitialMount.current = false;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((error) => {
                            setIsPlaying(false);
                            console.log("Auto-play prevented. User must interact first.");
                        });
                }
            } else {
                if (isPlaying) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => console.log("Play interrupted", error));
                    }
                }
            }
        }
    }, [currentSound]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src={currentSound} loop />
            <button
                className="global-sound-btn"
                onClick={togglePlay}
                title={isPlaying ? "ปิดเสียง (Mute)" : "เปิดเสียง (Unmute)"}
            >
                {isPlaying ? (
                    // Unmuted Icon (Sound Waves)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sound-btn-icon"
                    >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                ) : (
                    // Muted Icon (Crossed Out)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sound-btn-icon"
                    >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                )}
            </button>
        </>
    );
}
