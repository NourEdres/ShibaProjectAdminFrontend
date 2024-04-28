import React, { FC } from 'react'
import '../RoomsPage.scss'
import { Room } from '../../../../redux/models/Types'
interface RoomDetailsProps {
    room: Room;
}

const RoomDetails: FC<RoomDetailsProps> = ({ room }) => {
    return (
        <div className='room-details'>
            <div className='room-d-title'>room</div>
        </div>
    )
}

export default RoomDetails