import React from 'react';

interface AudioProgressBarProps {
    duration: number;
    currentTime: number;
    onChange: (time: number) => void;
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({ duration, currentTime, onChange }) => {
    return (
        <input
            type="range"
            className="progress-bar"
            value={currentTime}
            max={duration}
            onChange={(e) => onChange(parseFloat(e.target.value))}
        />
    );
};

export default AudioProgressBar;
