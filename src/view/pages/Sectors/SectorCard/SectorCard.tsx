import React, { FC } from 'react';
import './SectorCard.scss';
import { Sector } from '../../../models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface SectorCardProps {
    sector?: Sector;
}

const sectionTitles = {
    userName: "שם משתמש : ",
    gamesNumber: "מספר המשחקים : ",
};

const SectorCard: FC<SectorCardProps> = ({ sector }) => {
    return (
        <div>
            {sector && (
                <div className='sector-card' style={{ backgroundColor: sector.color }}>
                    <div className='card-header'>
                        <div className='buttons'>
                            <button className="edit-button">
                                <img className='edit-icon' src={EditIcon} alt="edit icon" />
                            </button>
                            <button className="delete-button">
                                <img className='delete-icon' src={DeleteIcon} alt="delete icon" />
                            </button>
                        </div>
                        <div className='title'>{sector.name}</div>
                    </div>
                    <div className='sector-card-content'>
                        <div className='sections'>
                            <div className='section-title'>
                                {sectionTitles.userName + sector.userName}
                            </div>
                            <div className='section-title'>
                                {sectionTitles.gamesNumber + sector.gamesNumber}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectorCard;
