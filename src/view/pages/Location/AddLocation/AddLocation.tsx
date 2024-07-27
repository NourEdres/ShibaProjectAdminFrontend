import React, { useState } from 'react';
import './AddLocation.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { useNavigate } from 'react-router-dom';
import { locationAPI } from '../../../../redux/services/LocationApi';
import { LocationTBC } from '../../../../redux/models/Interfaces';

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
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [floor, setFloor] = useState<number | undefined>(undefined);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const file = selectedFiles[0];
            setMediaFile(file);

            const previewUrl = URL.createObjectURL(file);
            setMediaPreview(previewUrl);
        }
    };

    const handleSave = () => {
        if (!name.trim() || floor === undefined) {
            alert("Name and floor are required.");
            return;
        }
        const location: LocationTBC = {
            locationID: 0,
            name,
            description,
            floor: floor!,
            qrcode: '',
        };
        const formData = new FormData();
        formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));
        if (mediaFile) {
            formData.append('image', mediaFile);
        }

        // Log the FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        locationAPI.createLocation(formData)
            .then(response => {
                console.log("Full response:", response);
                navigate('/Locations');
            })
            .catch(error => {
                console.error("Detailed error:", error.response || error);
                alert("Failed to save location.");
            });
    };

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
                    <input type='text' className='location-input' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Description}</label>
                    <textarea className='location-textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Floor}</label>
                    <input
                        type='number'
                        className='location-input'
                        value={floor === undefined ? '' : floor}
                        onChange={e => {
                            const value = e.target.value;
                            setFloor(value === '' ? undefined : Number(value));
                        }}
                    />                </div>

                <div className='input-group file-upload-group'>
                    <label className='input-label'>{AddLocationHebrew.UploadFiles}</label>
                    <label htmlFor="file-upload" className="file-upload-label">
                        <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {mediaPreview && (
                        <div>
                            <img src={mediaPreview} alt="Uploaded" style={{ width: 100, height: 100 }} />
                            <button className='delete-image-btn' onClick={() => {
                                URL.revokeObjectURL(mediaPreview);
                                setMediaFile(null);
                                setMediaPreview(null);
                            }}>
                                מחיקה
                            </button>
                        </div>
                    )}
                </div>
                <div className='location-buttons'>
                    <button className='save-location-button' onClick={handleSave}>{AddLocationHebrew.Save}</button>
                </div>
            </div>
        </div>
    );
};

export default AddLocation;