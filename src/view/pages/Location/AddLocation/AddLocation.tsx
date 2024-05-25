import React from 'react';
import './AddLocation.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos'; // Ensure these are the correct paths
import { Link } from 'react-router-dom';

const AddLocationHebrew = {
    AddNewRoom: "הוספת מקום חדש",
    Name: "שם : ",
    Description: "תיאור : ",
    Floor: "קומה : ",
    UploadFiles: "העלאת קבצים : ",
    AddObjects: "הוספת אובייקטים",
    Save: "שמירה"
};

const AddLocation = () => {
    return (
        <div className='main-container-add-location'>
            <div className='add-location-header'>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-location-container' dir="rtl">
                <div className='add-location-title'>{AddLocationHebrew.AddNewRoom}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Name}</label>
                    <input type='text' className='location-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Description}</label>
                    <textarea className='location-textarea'></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Floor}</label>
                    <input type='number' className='location-input' />
                </div>

                <div className='input-group file-upload-group'>
                    <label className='input-label'>{AddLocationHebrew.UploadFiles}</label>
                    <label htmlFor="file-upload" className="file-upload-label">
                        <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        onChange={(e) => {/* Handle file upload */ }}
                        multiple
                        style={{ display: 'none' }}
                    />
                </div>
                <div className='location-buttons'>
                    <Link to='/ObjectsPage2'>
                        <button type="button" className='add-objects-button'>{AddLocationHebrew.AddObjects}</button>
                    </Link>
                </div>
                <button className='save-location-button'>{AddLocationHebrew.Save}</button>
            </div>
        </div >
    );
};

export default AddLocation;