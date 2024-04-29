import React from 'react';
import './LocationDetails.scss';
import { Location } from '../../../../redux/models/Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'


const LocationDetails: React.FC = () => {
    const location = useSelector((state: RootState) => state.globalStates.selectedCard);
    return (
        <div className='location-details'>
            <h1 className='location-name'>{location.name}</h1>
            <div className='location-meta'>
                <div className='location-floor'>
                    Located in {location.floor}{location.floor === 1 ? 'st' : location.floor === 2 ? 'nd' : location.floor === 3 ? 'rd' : 'th'} floor
                </div>
                <div className='location-description'>
                    <h2>Description</h2>
                    <p>{location.description}</p>
                </div>
            </div>
            <div className='location-qr'>
                <img src={location.QRCode} alt='QR Code' />
            </div>
            {location.locationImage &&
                <div className='location-image'>
                    <h2>Location's Image</h2>
                    <img src={location.locationImage.imagePath} alt={location.locationImage.name} />
                </div>
            }
            <button className='view-objects' onClick={() => {/* handleViewObjectsClick */ }}>
                View Location's Objects
            </button>
        </div>
    );
};

export default LocationDetails;
