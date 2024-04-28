import React, { FC } from 'react'
import './LocationCard.scss';
import { Location } from '../../../../redux/models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface LocationCardProps {
    object: Location;
}
const LocationSectionTitles = {
    LocationName: " שם החדר : ",
    LocationDescription: " תיאור : ",
    objectsNumber: " מספר האובייקטים : ",
};

const LocationCard: FC<LocationCardProps> = ({ object }) => {
    // { console.log("LocationCard: ", object.name); }
    return (
        <div className='Location-card' dir="rtl" style={{ backgroundColor: 'white' }}>
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
            <div className='Location-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {LocationSectionTitles.LocationName + object.name}
                    </div>
                    <div className='section-title'>
                        {LocationSectionTitles.LocationDescription + object.description}
                    </div>
                    <div className='section-title'>
                        {LocationSectionTitles.objectsNumber + object.objects.length}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LocationCard;