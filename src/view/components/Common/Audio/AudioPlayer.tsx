import React, { useState, useRef, useEffect } from 'react';
import IconButton from './AudioComponents/IconButton';
import AudioProgressBar from './AudioComponents/AudioProgressBar';
import VolumeInput from './AudioComponents/VolumeInput';

interface AudioPlayerProps {
    src: string;
    mediaName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, mediaName }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.75); // Default volume set to 75%
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => setDuration(audio.duration || 0);
        const setAudioTime = () => setCurrentTime(audio.currentTime || 0);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} src={src} preload="auto" />
            <div className="track-info">
                {mediaName}
            </div>
            <AudioProgressBar duration={duration} currentTime={currentTime} onChange={(time) => audioRef.current ? audioRef.current.currentTime = time : null} />
            <div className="controls">
                <IconButton onClick={togglePlayPause} icon={isPlaying ? 'pause' : 'play'} />
                <VolumeInput volume={volume} onVolumeChange={(newVolume) => {
                    if (audioRef.current) audioRef.current.volume = newVolume;
                    setVolume(newVolume);
                }} />
            </div>
        </div>
    );
};

export default AudioPlayer;
