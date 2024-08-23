import React, { useEffect, useState } from 'react';
import './AddTask.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { Admin, MediaTaskTBC, QuestionTask, TaskTBC, UserRole } from '../../../../redux/models/Interfaces';
import { taskAPI } from '../../../../redux/services/TaskApi';
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import MediaViewer from '../../../components/Common/MediaViewer/MediaViewer';
import { CiCircleInfo } from "react-icons/ci";
import Loader from "../../../components/Common/LoadingSpinner/Loader";


const AddNewTaskHebrew = {
    CreateNewTask: "הוספת משימה חדשה",
    Name: "שם : ",
    Description: "תיאור : ",
    AddMedia: "הוספת מדיה : ",
    Q: "שאלה : ",
    AdditionalNotes: "הוספת טקסט",
    ToggleOnMedia: 'הצג מדיה',
    ToggleOnQuestion: 'הצג שאלה',
    ToggleOnNotes: 'הצג טקסט',
    ToggleOffMedia: 'הסתר מדיה',
    ToggleOffQuestion: 'הסתר שאלה',
    ToggleOffNotes: 'הסתר טקסט',
    Save: "שמירה",
    HideQuestion: "מחיקת שאלה",
    UploadFile: "הורדת קובץ",
    HideMedia: "מחיקת מדיה",
    DeleteAnswer: "מחיקת תשובה",
    Answer: "תשובה",
    HideNotes: "מחיקת הטקסט",
    AddAnswer: "הוספת תשובה",
    Delete_Media: "מחיקה",
    WithMsg: "הצגת הודעת הצלחה ",
    Sectors: "בחירת מחלקה",
};

function AddTask() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [additionalNotes, setAdditionalNotes] = useState<string>('');
    const [showMedia, setShowMedia] = useState<boolean>(false);
    const [showQuestion, setShowQuestion] = useState<boolean>(false);
    const [showNotes, setShowNotes] = useState<boolean>(false);
    const [mediaFiles, setMediaFiles] = useState<MediaTaskTBC[]>([]);
    const sectors = useSelector((state: RootState) => state.AllData.Sectors);
    const [withMsg, setWithMsg] = useState<boolean>(true);
    const adminStr = localStorage.getItem('admin');
    const admin: Admin = adminStr ? { ...JSON.parse(adminStr), role: UserRole[JSON.parse(adminStr).role as keyof typeof UserRole] } : null;
    const [selectedSector, setSelectedSector] = useState<number | null>(admin.role === UserRole.SectorAdmin ? admin.adminID : null);
    const [visibleInfo, setVisibleInfo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');

    useEffect(() => {
        return () => {
            mediaFiles.forEach(file => URL.revokeObjectURL(file.mediaPath));
        };
    }, [mediaFiles]);

    const handleInfoClick = (info: string) => {
        if (visibleInfo === info) {
            setVisibleInfo(null);
        } else {
            setVisibleInfo(info);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newMediaTasks: MediaTaskTBC[] = Array.from(selectedFiles).map(file => ({
                fileName: file.name,
                mediaPath: URL.createObjectURL(file),
                mediaType: file.type,
                file: file
            }));
            setMediaFiles(prevFiles => [...prevFiles, ...newMediaTasks]);
        }
    };

    const handleDeleteMedia = (index: number) => {
        setMediaFiles(files => {
            const newFiles = [...files];
            URL.revokeObjectURL(newFiles[index].mediaPath);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    function validateQuestion(): boolean {
        if ((!question.trim()) || answers.length < 1) {
            return false;
        }
        if (correctAnswer === null) {
            alert("You should mark an answer as correct");
            return false;
        }
        return true;
    }

    const validateAndSave = async () => {
        if (!name.trim()) {
            alert("A task must have a name.");
            return;
        }
        if (!validateQuestion() && mediaFiles.length === 0 && !additionalNotes.trim()) {
            alert("A task must have at least one element (question, media, or notes).");
            return;
        }
        if (selectedSector === null) {
            alert("A task must have a sector.");
            return;
        }

        const task: TaskTBC = {
            name,
            description,
            taskFreeTexts: additionalNotes ? [additionalNotes] : [],
            withMsg
        };

        const questionTask: QuestionTask | undefined = showQuestion ? {
            questionTaskID: 0,
            question,
            answers,
            correctAnswer: correctAnswer ?? 0,
            taskID: 0,
        } : undefined;
        setIsLoading(true);
        setLoadingMessage('שומר משימה ...');
        const formData = new FormData();
        formData.append('task', new Blob([JSON.stringify(task)], { type: 'application/json' }));
        if (questionTask) {
            formData.append('question', new Blob([JSON.stringify(questionTask)], { type: 'application/json' }));
        }
        const selectedSectorName = sectors.find(sector => sector.adminID === selectedSector)?.sector || '';
        formData.append('admin', selectedSectorName);

        mediaFiles.forEach((mediaFile) => {
            formData.append(`media`, mediaFile.file, mediaFile.fileName);
        });

        try {
            const response = await taskAPI.createTask(formData);
            console.log("Task created successfully", response);
            setLoadingMessage('המשימה נשמרה בהצלחה!');
            setTimeout(() => {
                setIsLoading(false);
                setLoadingMessage('');
                navigate('/Tasks');
            }, 1000);
        } catch (error) {
            console.error("Failed to create task", error);
            setLoadingMessage('שגיאה בשמירת המשימה');
            setTimeout(() => {
                setIsLoading(false);
                setLoadingMessage('');
            }, 2000);
        }
    };

    return (
        <div className='main-container-add-task'>
            <Loader isLoading={isLoading} message={loadingMessage} />
            <div className='add-task-header'>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-task-container' dir="rtl">
                <div className='add-task-title'>{AddNewTaskHebrew.CreateNewTask}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Name}</label>
                    <div className='info-icon-container'>
                        <input type='text' className='task-input' value={name} onChange={e => setName(e.target.value)} />
                        <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                        {visibleInfo === 'name' && <div className='info-box'>some dumb text here</div>}
                    </div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Description}</label>
                    <div className='info-icon-container'>
                        <textarea className='task-textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                        {visibleInfo === 'description' && <div className='info-box'>some dumb text here</div>}
                    </div>
                </div>

                <div className='options-container'>
                    <div className="option-section">
                        {showMedia && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AddMedia}</label>
                                <div className='info-icon-container'>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*, video/*, audio/*"
                                        id="file-upload"
                                        className="file-input"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-upload" className="file-upload-label">
                                        <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                                    </label>
                                    <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                                    {visibleInfo === 'media' && <div className='info-box'>some dumb text here</div>}
                                </div>
                                <MediaViewer
                                    mediaList={mediaFiles.map(file => ({
                                        mediaTaskID: Math.random(),
                                        fileName: file.fileName,
                                        mediaPath: file.mediaPath,
                                        mediaType: file.mediaType,
                                        mediaUrl: file.mediaPath
                                    }))}
                                    onDelete={handleDeleteMedia}
                                    deletable={true}
                                />
                                <button type="button" className='delete-option-button' onClick={() => setShowMedia(false)}>
                                    {AddNewTaskHebrew.HideMedia}
                                </button>
                            </div>
                        )}
                        {showQuestion && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.Q}</label>
                                <div className='info-icon-container'>
                                    <input type='text' className='task-input' placeholder='הוספת שאלה' value={question} onChange={(e) => setQuestion(e.target.value)} />
                                    <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                                    {visibleInfo === 'question' && <div className='info-box'>some dumb text here</div>}
                                </div>
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="answer-container">
                                        <input
                                            type="text"
                                            className='task-input'
                                            value={answers[index] || ''}
                                            onChange={(e) => {
                                                const newAnswers = [...answers];
                                                newAnswers[index] = e.target.value;
                                                setAnswers(newAnswers);
                                            }}
                                            placeholder={`${AddNewTaskHebrew.Answer} ${index + 1}`}
                                        />
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={correctAnswer === index}
                                            onChange={() => setCorrectAnswer(index)}
                                        />
                                    </div>
                                ))}
                                <button type="button" className='delete-option-button' onClick={() => setShowQuestion(false)}>
                                    {AddNewTaskHebrew.HideQuestion}
                                </button>
                            </div>
                        )}


                        {showNotes && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AdditionalNotes}</label>
                                <div className='info-icon-container'>
                                    <textarea className='task-textarea' value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)}></textarea>
                                    <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                                    {visibleInfo === 'notes' && <div className='info-box'>some dumb text here</div>}
                                </div>
                                <button type="button" className='delete-option-button' onClick={() => setShowNotes(false)}>{AddNewTaskHebrew.HideNotes}</button>
                            </div>
                        )}
                        <div className='add-buttons'>
                            <button type="button" className='option-button' onClick={() => setShowMedia(!showMedia)}>
                                {showMedia ? AddNewTaskHebrew.ToggleOffMedia : AddNewTaskHebrew.ToggleOnMedia}
                            </button>
                            <button type="button" className='option-button' onClick={() => setShowQuestion(!showQuestion)}>
                                {showQuestion ? AddNewTaskHebrew.ToggleOffQuestion : AddNewTaskHebrew.ToggleOnQuestion}
                            </button>
                            <button type="button" className='option-button' onClick={() => setShowNotes(!showNotes)}>
                                {showNotes ? AddNewTaskHebrew.ToggleOffNotes : AddNewTaskHebrew.ToggleOnNotes}
                            </button>
                        </div>

                        <div className='input-group'>
                            <label className='input-label'>{AddNewTaskHebrew.Sectors}</label>
                            <div className='info-icon-container'>
                                <select
                                    value={selectedSector ?? ''}
                                    onChange={(e) => setSelectedSector(Number(e.target.value))}
                                    className='task-input'
                                    disabled={admin.role === UserRole.SectorAdmin}
                                >
                                    <option value='' disabled hidden>{AddNewTaskHebrew.Sectors}</option>
                                    {sectors.map((sector, index) => (
                                        <option key={index} value={sector.adminID}>{sector.sector}</option>
                                    ))}
                                </select>
                                <CiCircleInfo className='info-icon' onClick={() => handleInfoClick('name')} />

                                {visibleInfo === 'sectors' && <div className='info-box'>some dumb text here</div>}
                            </div>
                        </div>
                        <div className='input-group'>
                            <label className='input-label'>
                                <input type="checkbox" checked={withMsg} onChange={(e) => setWithMsg(e.target.checked)} />
                                {AddNewTaskHebrew.WithMsg}
                            </label>
                        </div>
                    </div>
                </div>

                <button className='save-task-button' onClick={validateAndSave}>{AddNewTaskHebrew.Save}</button>
            </div>
        </div>
    );
}

export default AddTask;

