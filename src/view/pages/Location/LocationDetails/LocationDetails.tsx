import React, { FC } from 'react'
import './LocationDetails.scss'
import { Room } from '../../../../redux/models/Types'
interface RoomDetailsProps {
    Location: Room;
}

const RoomDetails: FC<RoomDetailsProps> = ({ Location }) => {
    return (
        <div className='Location-details'>
            <div className='Location-d-title'>Location</div>
        </div>
    )
}

export default RoomDetails