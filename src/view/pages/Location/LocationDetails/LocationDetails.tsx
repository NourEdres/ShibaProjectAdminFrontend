import React from 'react';
import './LocationDetails.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const LocationDetails: React.FC = () => {
    const location = useSelector((state: RootState) => state.globalStates.selectedCard);

    return (
        <div className='location-details' dir='rtl'>
            <div className="location-header">
                {location.locationImage &&
                    <div className='location-image'>
                        <img src={location.locationImage.imagePath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')}
                            alt={location.locationImage.name} className='location-image-file' />
                    </div>
                }
                <div className='location-title-floor'>
                    <h1 className='location-name'>{location.name}</h1>
                    <div className='location-floor'>
                        נמצא בקומה {location.floor}
                    </div>
                </div>
            </div>

            <div className='location-description'>
                <h2>תיאור</h2>
                <p>{location.description}</p>
            </div>

            <div className='location-qr-section'>
                <div className='location-qr'>
                    <img src={location.qrcode.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')}
                        alt='QR Code' className='qr-code-image' />
                </div>
                <button className='download-qr-btn' onClick={() => {
                    const fileName = location.qrcode.substring(location.qrcode.lastIndexOf('/') + 1);
                    const link = document.createElement('a');
                    link.href = location.qrcode.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..');
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}>
                    הורדת QR
                </button>
            </div>

            <button className='view-objects' onClick={() => {/* handleViewObjectsClick */ }}>
                הצג אובייקטים של החדר
            </button>
        </div>
    );
};

export default LocationDetails;
