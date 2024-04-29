import React, { useState } from 'react';
import './AddTask.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';

const AddNewTaskHebrew = {
    CreateNewTask: "הוספת משימה חדשה",
    Name: "שם : ",
    Description: "תיאור : ",
    AddMedia: "הוספת מדיה : ",
    Q: "שאלה : ",
    AdditionalNotes: "הוספת טקסט",
    ToggleMedia: "הוספת מדיה",
    ToggleQuestion: "הוספת שאלה",
    ToggleNotes: "הוספת טקסט",
    Save: "שמירה",
    HideQuestion: "מחיקת שאלה",
    UploadFile: "הורדת קובץ",
    HideMedia: "מחיקת מדיה",
    DeleteAnswer: "מחיקת תשובה",
    Answer: "תשובה",
    HideNotes: "מחיקת הטקסט",
    AddAnswer: "הוספת תשובה"
};

function AddTask() {
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState<string>('');
    const [showMedia, setShowMedia] = useState<boolean>(false);
    const [showQuestion, setShowQuestion] = useState<boolean>(false);
    const [showNotes, setShowNotes] = useState<boolean>(false);

    return (
        <div className='main-container-add-task'>
            <div className='add-task-header'>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-task-container' dir="rtl">
                <div className='add-task-title'>{AddNewTaskHebrew.CreateNewTask}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Name}</label>
                    <input type='text' className='task-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Description}</label>
                    <textarea className='task-textarea'></textarea>
                </div>

                <div className='options-container'>
                    <div className="option-section">
                        {showMedia && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AddMedia}</label>
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="file-input"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setSelectedFile(e.target.files[0]);
                                            console.log("selectedFile:", e.target.files[0]);
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                />

                                <button type="button" className='delete-option-button' onClick={() => setShowMedia(false)}>{AddNewTaskHebrew.HideMedia}</button>
                            </div>
                        )}


                        {showQuestion && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.Q}</label>
                                <input type='text' className='task-input' placeholder='הוספת שאלה' />
                                {answers.map((answer, index) => (
                                    <div key={index} className="answer-container">
                                        <input type="text" className='task-input' value={answer} onChange={(e) => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = e.target.value;
                                            setAnswers(newAnswers);
                                        }} placeholder={`${AddNewTaskHebrew.Answer} ${index + 1}`} />
                                        <input type="radio" name="correctAnswer" checked={correctAnswer === index} onChange={() => setCorrectAnswer(index)} />
                                        <button type="button" className="delete-answer-button" onClick={() => {
                                            const newAnswers = answers.filter((_, i) => i !== index);
                                            setAnswers(newAnswers);
                                            if (correctAnswer === index) {
                                                setCorrectAnswer(null);
                                            } else if (correctAnswer !== null && index < correctAnswer) {
                                                setCorrectAnswer(correctAnswer - 1);
                                            }
                                        }}>
                                            {AddNewTaskHebrew.DeleteAnswer}
                                        </button>
                                    </div>
                                ))}
                                {answers.length < 4 && <button type="button" className='add-answer-button' onClick={() => setAnswers([...answers, ''])}>{AddNewTaskHebrew.AddAnswer}</button>}
                                <button type="button" className='delete-option-button' onClick={() => setShowQuestion(false)}>{AddNewTaskHebrew.HideQuestion}</button>
                            </div>
                        )}

                        {showNotes && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AdditionalNotes}</label>
                                <textarea className='task-textarea' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)}></textarea>
                                <button type="button" className='delete-option-button' onClick={() => setShowNotes(false)}>{AddNewTaskHebrew.HideMedia}</button>
                            </div>
                        )}
                        <div className='add-buttons'>
                            <button type="button" className='option-button' onClick={() => setShowMedia(true)}>{AddNewTaskHebrew.ToggleMedia}</button>
                            <button type="button" className='option-button' onClick={() => setShowQuestion(true)}>{AddNewTaskHebrew.ToggleQuestion}</button>
                            <button type="button" className='option-button' onClick={() => setShowNotes(true)}>{AddNewTaskHebrew.AdditionalNotes}</button>
                        </div>

                    </div>
                </div>

                <button className='save-task-button'>{AddNewTaskHebrew.Save}</button>
            </div>

        </div >
    );
}

export default AddTask;
