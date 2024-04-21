import React, { FC } from 'react'
import './RoomCard.scss'
import { Room } from '../../../models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface RoomCardProps {
    room: Room;
}
const sectionTitles = {
    userName: "שם משתמש : ",
    gamesNumber: "מספר המשחקים : ",
};
const RoomCard: FC<RoomCardProps> = ({ room }) => {
    return (
        <div className='room-card' style={{ backgroundColor: room.color }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{room.name}</div>
            </div>
            <div className='room-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + room.userName}
                    </div>
                    <div className='section-title'>
                        {sectionTitles.gamesNumber + room.gamesNumber}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RoomCard;