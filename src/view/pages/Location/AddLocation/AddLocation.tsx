import React from 'react';
import './AddLocation.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos'; // Ensure these are the correct paths

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
        <div className='main-container-add-room'>
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
                    <textarea className='room-textarea'></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Floor}</label>
                    <input type='number' className='room-input' />
                </div>
                <div className='input-group file-upload-group'>
                    <label htmlFor="file-upload" className="file-upload-label">
                        <img src={UploadFileIcon} alt={AddLocationHebrew.UploadFiles} />
                        {AddLocationHebrew.UploadFiles}
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
                <div className='room-buttons'>
                    <button type="button" className='add-objects-button'>{AddLocationHebrew.AddObjects}</button>
                </div>
                <button className='save-room-button'>{AddLocationHebrew.Save}</button>
            </div>
        </div >
    );
};

export default AddLocation;
