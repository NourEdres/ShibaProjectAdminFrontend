import React, { FC } from 'react'
import './LocationDetails.scss'
import { Location } from '../../../../redux/models/Types'
interface LocationDetailsProps {
    Location: Location;
}

const LocationDetails: FC<LocationDetailsProps> = ({ Location }) => {
    return (
        <div className='Location-details'>
            <div className='Location-d-title'>Location</div>
        </div>
    )
}

export default LocationDetails