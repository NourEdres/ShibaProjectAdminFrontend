import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { UploadFileIcon } from '../../../photos';
import { SwiperConfig } from '../../../components';
import './AddObjectLocation.scss'

interface FileWithPreview extends File {
    preview: string;
}

const AddNewObjectHebrew = {
    AddNewObjects: "הוספת אובייקט",
    Name: "שם : ",
    Description: "תיאור : ",
    UploadImages: "העלאת תמונות : ",
    Delete_Image: "מחיקת תמונה",
    ImagesNumber: "מספר תמונות: ",
    Save: "שמירה"
};

const AddObjectLocation: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
    return (
        <div className='main-container-add-task'>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-task-container' dir="rtl">
                <div className='add-task-title'>{AddNewObjectHebrew.AddNewObjects}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewObjectHebrew.Name}</label>
                    <input type='text' className='task-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewObjectHebrew.Description}</label>
                    <textarea className='task-textarea'></textarea>
                </div>

                <div className='options-container'>
                    <div className="option-section">
                        <label htmlFor="file-upload" className="input-label">{AddNewObjectHebrew.UploadImages}</label>
                        <label htmlFor="file-upload" className="file-upload-label">
                            <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                        </label>
                        <input
                            type="file"
                            multiple
                            accept=".png,.jpg,.jpeg,.webp"
                            id="file-upload"
                            className="file-input"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                if (e.target.files) {
                                    const filesArray: FileWithPreview[] = Array.from(e.target.files).map(file => ({
                                        ...file,
                                        preview: URL.createObjectURL(file)
                                    }));
                                    setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
                                    console.log("selectedFile:  ", selectedFiles);

                                }
                            }}
                        />
                    </div>
                    <div className='task-media-list'>
                        <div className="image-count">{AddNewObjectHebrew.ImagesNumber}{selectedFiles.length}</div>
                        {selectedFiles.length > 0 && (
                            <Swiper {...SwiperConfig}>
                                {selectedFiles.map((file, index) => (
                                    <SwiperSlide key={index} className='swiper-slide'>
                                        <img className='img-media' src={file.preview} alt={`Uploaded ${index}`} />
                                        <button className='delete-image-btn' onClick={() => {
                                            const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);
                                            setSelectedFiles(updatedFiles);
                                        }}>
                                            {AddNewObjectHebrew.Delete_Image}</button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
                <button className='save-task-button'>{AddNewObjectHebrew.Save}</button>
            </div>
        </div>
    );
};

export default AddObjectLocation;
