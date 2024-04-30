import React, { useState } from 'react';
import './EditTask.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperConfig } from '../../../components';
import { MediaTask } from '../../../../redux/models/Interfaces';

const AddNewTaskHebrew = {
    CreateNewTask: "עריכת משימה ",
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
    AddAnswer: "הוספת תשובה",
    FreeText: "טקסט חופשי :",
    Media: "מדיה :",
    answers: "תשובות :"
};

function EditTask() {
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState<string>('');
    const [showMedia, setShowMedia] = useState<boolean>(false);
    const [showQuestion, setShowQuestion] = useState<boolean>(false);
    const [showNotes, setShowNotes] = useState<boolean>(false);
    const task = useSelector((state: RootState) => state.globalStates.selectedCard);

    return (
        <div className='main-container-edit-task'>
            <div className='edit-task-header'>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='edit-task-container' dir="rtl">
                <div className='edit-task-title'>{AddNewTaskHebrew.CreateNewTask}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Name}</label>
                    <input placeholder={task.name} type='text' className='task-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Description}</label>
                    <textarea placeholder={task.description} className='task-textarea'></textarea>
                </div>
                <div className='options-container'>
                    <div className="option-section">
                        <div className='task-content'>
                            {task.taskFreeTexts.length > 0 &&
                                <div className='task-free-text'>
                                    < div className='section-title'>{AddNewTaskHebrew.FreeText}</div>
                                    {task.taskFreeTexts.map((text: string, index: number) => <div className='text-free' key={index}>{text}</div>)}
                                </div>}
                            <div className='task-ques'>
                                {task.questionTask && (
                                    <div className='question-section'>
                                        <div className='q-head'>
                                            <div className='section-title'>{AddNewTaskHebrew.Q}</div>
                                            <div className='q-task-text'>{task.questionTask.question}</div>
                                        </div>
                                        < div className='section-title'>{AddNewTaskHebrew.answers}</div>
                                        <div className='answers'>
                                            {task.questionTask.answers.map((answer: string, index: number) => (
                                                <div key={index} className={index === task.questionTask.correctAnswer ? 'correct-answer' : ''}>
                                                    {answer}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='task-media-list'>
                                <div className='section-title'>{AddNewTaskHebrew.Media}</div>
                                <Swiper {...SwiperConfig("horizontal")}>
                                    {task.mediaList.map((media: MediaTask, index: number) => (
                                        <SwiperSlide key={media.mediaTaskID} className='swiper-slide'>
                                            <img className='img-media'
                                                src={
                                                    media.mediaPath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')
                                                }
                                                alt={media.fileName}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
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
                                {answers.length < 4 && <button type="button" className='edit-answer-button' onClick={() => setAnswers([...answers, ''])}>{AddNewTaskHebrew.AddAnswer}</button>}
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
                        <div className='edit-buttons'>
                            <button type="button" className='option-button' onClick={() => setShowMedia(true)}>{AddNewTaskHebrew.ToggleMedia}</button>
                            {<button type="button" className='option-button' onClick={() => setShowQuestion(true)}>{AddNewTaskHebrew.ToggleQuestion}</button>}
                            {<button type="button" className='option-button' onClick={() => setShowNotes(true)}>{AddNewTaskHebrew.AdditionalNotes}</button>}
                        </div>

                    </div>
                </div>

                <button className='save-task-button'>{AddNewTaskHebrew.Save}</button>
            </div>

        </div >
    );
}

export default EditTask;
