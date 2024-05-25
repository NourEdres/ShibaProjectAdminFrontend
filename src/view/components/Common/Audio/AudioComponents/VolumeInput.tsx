import React from 'react';

interface VolumeInputProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

const VolumeInput: React.FC<VolumeInputProps> = ({ volume, onVolumeChange }) => {
    return (
        <input
            type="range"
            className="volume-slider"
            value={volume}
            min={0}
            max={1}
            step={0.01}

            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        />
    );
};

export default VolumeInput;
