import React from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';

interface IconButtonProps {
    onClick: () => void;
    icon: 'play' | 'pause';
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon }) => {
    return (
        <button className="icon-button" onClick={onClick}>
            {icon === 'play' ? <MdPlayArrow size={24} color="#fff" /> : <MdPause size={24} color="#fff" />}
        </button>
    );
};

export default IconButton;
