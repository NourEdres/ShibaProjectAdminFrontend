import React, { useState } from 'react';
import './AddTask.scss';

function AddTask() {
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState<string>('');
    const [showMedia, setShowMedia] = useState<boolean>(false);
    const [showQuestion, setShowQuestion] = useState<boolean>(false);
    const [showNotes, setShowNotes] = useState<boolean>(false);

    return (
        <div className='add-task-container' dir="rtl">
            <div className='add-new-task-title'>Create New Task</div>
            <div className='input-group'>
                <label className='input-label'>Name:</label>
                <input type='text' className='task-input' />
            </div>
            <div className='input-group'>
                <label className='input-label'>Description:</label>
                <textarea className='task-textarea'></textarea>
            </div>

            <div className='options-container'>
                <div className="option-section">
                    {showMedia && (
                        <div className='input-group'>
                            <label className='input-label'>Add Media:</label>
                            <input type="file" className="file-input" onChange={(e) => e.target.files && e.target.files[0] && setSelectedFile(e.target.files[0])} id="file-upload" style={{ display: 'none' }} />
                            <label htmlFor="file-upload" className="file-upload-button">Upload file</label>
                            <button type="button" className='delete-option-button' onClick={() => setShowMedia(false)}>Hide Media</button>
                        </div>
                    )}

                    {showQuestion && (
                        <div className='input-group'>
                            <label className='input-label'>Q:</label>
                            <input type='text' className='task-input' />
                            {answers.map((answer, index) => (
                                <div key={index} className="answer-container">
                                    <input type="text" className='task-input' value={answer} onChange={(e) => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = e.target.value;
                                        setAnswers(newAnswers);
                                    }} placeholder={`Answer ${index + 1}`} />
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
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {answers.length < 4 && <button type="button" className='add-answer-button' onClick={() => setAnswers([...answers, ''])}>Add Answer</button>}
                            <button type="button" className='delete-option-button' onClick={() => setShowQuestion(false)}>Hide Question</button>
                        </div>
                    )}

                    {showNotes && (
                        <div className='input-group'>
                            <label className='input-label'>Additional Notes:</label>
                            <textarea className='task-textarea' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)}></textarea>
                            <button type="button" className='delete-option-button' onClick={() => setShowNotes(false)}>Hide Notes</button>
                        </div>
                    )}
                    <button type="button" className='option-button' onClick={() => setShowMedia(true)}>Toggle Media</button>
                    <button type="button" className='option-button' onClick={() => setShowQuestion(true)}>Toggle Question</button>
                    <button type="button" className='option-button' onClick={() => setShowNotes(true)}>Toggle Notes</button>

                </div>
            </div>

            <button className='save-task-button'>Save</button>
        </div>
    );
}

export default AddTask;
