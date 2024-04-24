import React, { FC } from 'react'
// import './RoomCard.scss';
import { Room } from '../../../models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface RoomCardProps {
    object: Room;
}
const roomSectionTitles = {
    roomName: " שם החדר : ",
    roomDescription: " תיאור : ",
    objectsNumber: " מספר האובייקטים : ",
};

const RoomCard: FC<RoomCardProps> = ({ object }) => {
    { console.log("roomCard: ", object.name); }
    return (
        <div className='room-card' dir="rtl" style={{ backgroundColor: 'white' }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{object.name}</div>
            </div>
            <div className='room-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {roomSectionTitles.roomName + object.name}
                    </div>
                    <div className='section-title'>
                        {roomSectionTitles.roomDescription + object.description}
                    </div>
                    <div className='section-title'>
                        {roomSectionTitles.objectsNumber + object.objects.length}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RoomCard;