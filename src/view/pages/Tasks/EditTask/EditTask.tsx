import React, { useEffect, useState } from "react";
import "./EditTask.scss";
import { LeftArrowIcon, UploadFileIcon } from "../../../photos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { MediaTask, Task } from "../../../../redux/models/Interfaces";
import { useNavigate } from "react-router-dom";
import { taskAPI } from "../../../../redux/services/TaskApi";
import MediaViewer from "../../../components/Common/MediaViewer/MediaViewer";
import Loader from "../../../components/Common/LoadingSpinner/Loader";

const AddNewTaskHebrew = {
  CreateNewTask: "עריכת משימה ",
  Name: "שם : ",
  Description: "תיאור : ",
  AddMedia: "הוספת מדיה : ",
  Q: "שאלה : ",
  AdditionalNotes: "הוספת טקסט",
  ToggleOnMedia: "הצג מדיה",
  ToggleOnQuestion: "הצג שאלה",
  ToggleOnNotes: "הצג טקסט",
  ToggleOffMedia: "הסתר מדיה",
  ToggleOffQuestion: "הסתר שאלה",
  ToggleOffNotes: "הסתר טקסט",
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
  answers: "תשובות :",
  Delete_Media: "מחיקת תוכן",
  NoMedia: "אין מדיה למשימה הזאת",
  Sectors: "בחירת מחלקה",
  WithMsg: "הצגת הודעת הצלחה ",
};

function EditTask() {
  const task = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  ) as Task;
  const [taskName, setTaskName] = useState<string>(task.name);
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [question, setQuestion] = useState<string>(
    task.questionTask?.question || ""
  );
  const [answers, setAnswers] = useState<string[]>(
    task.questionTask ? task.questionTask.answers : []
  );
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(
    task.questionTask ? task.questionTask.correctAnswer : null
  );
  const [additionalNotes, setAdditionalNotes] = useState<string>(
    task.taskFreeTexts?.[0] || ""
  );
  const [showMedia, setShowMedia] = useState<boolean>(!!task.mediaList?.length);
  const [showQuestion, setShowQuestion] = useState<boolean>(
    !!task.questionTask
  );
  const [showNotes, setShowNotes] = useState<boolean>(
    !!task.taskFreeTexts?.length
  );
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [, setExistingMediaTasks] = useState<MediaTask[]>(task.mediaList || []);
  const [keptMediaTasks, setKeptMediaTasks] = useState<MediaTask[]>(
    task.mediaList || []
  );
  const [newMediaTasks, setNewMediaTasks] = useState<MediaTask[]>([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);
  const [deletedQuestionId, setDeletedQuestionId] = useState<number | null>(
    null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sectors = useSelector((state: RootState) => state.AllData.Sectors);
  const [selectedSector, setSelectedSector] = useState<number | null>(
    task.adminIDAPI || null
  );
  const [, setSelectedSectorName] = useState<string>("");
  const [withMsg, setWithMsg] = useState<boolean>(task.withMsg);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  useEffect(() => {
    if (selectedSector !== null) {
      const sector = sectors.find(
        (sector) => sector.adminID === selectedSector
      )?.sector;
      setSelectedSectorName(sector || "");
    }
  }, [selectedSector, sectors]);

  useEffect(() => {
    setShowQuestion(!!task.questionTask);
  }, [task]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setMediaFiles((prevFiles) => [...prevFiles, ...newFiles]);
      const newMediaTasks = newFiles.map((file) => ({
        mediaTaskID: Math.random(),
        fileName: file.name,
        mediaPath: URL.createObjectURL(file),
        mediaType: file.type,
        mediaUrl: URL.createObjectURL(file),
        taskID: task.taskID,
      }));
      setExistingMediaTasks((prevTasks) => [...prevTasks, ...newMediaTasks]);
      setNewMediaTasks((prevTasks) => [...prevTasks, ...newMediaTasks]);
    }
  };

  const handleDeleteMedia = (index: number) => {
    const mediaToDelete = [...keptMediaTasks, ...newMediaTasks][index];

    if (
      "mediaTaskID" in mediaToDelete &&
      typeof mediaToDelete.mediaTaskID === "number"
    ) {
      setDeletedMediaIds((prevIds) => [...prevIds, mediaToDelete.mediaTaskID]);
      setKeptMediaTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task.mediaTaskID !== mediaToDelete.mediaTaskID
        )
      );
    } else {
      setNewMediaTasks((prevTasks) =>
        prevTasks.filter((_, i) => i !== index - keptMediaTasks.length)
      );
      setMediaFiles((prevFiles) =>
        prevFiles.filter((_, i) => i !== index - keptMediaTasks.length)
      );
    }

    setExistingMediaTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );

    if (
      mediaToDelete.mediaPath &&
      mediaToDelete.mediaPath.startsWith("blob:")
    ) {
      URL.revokeObjectURL(mediaToDelete.mediaPath);
    }
  };

  const handleDeleteQuestion = () => {
    if (task.questionTask) {
      setDeletedQuestionId(task.questionTask.questionTaskID);
    }
    setShowQuestion(false);
    setQuestion("");
    setAnswers([]);
    setCorrectAnswer(null);
  };

  const handleSubmit = async () => {
    if (!taskName.trim()) {
      alert("A task must have a name.");
      return;
    }
    if (
      !showQuestion &&
      mediaFiles.length === 0 &&
      keptMediaTasks.length === 0 &&
      !additionalNotes.trim()
    ) {
      alert(
        "A task must have at least one element (question, media, or notes)."
      );
      return;
    }
    setIsLoading(true);
    setLoadingMessage("מעדכן משימה...");
    const formData = new FormData();
    formData.append(
      "task",
      new Blob(
        [
          JSON.stringify({
            taskID: task.taskID,
            name: taskName,
            description,
            taskFreeTexts: additionalNotes ? [additionalNotes] : [],
            withMsg,
          }),
        ],
        { type: "application/json" }
      )
    );

    formData.append(
      "admin",
      sectors.find((sector) => sector.adminID === selectedSector)?.sector || ""
    );

    if (showQuestion) {
      const questionTask = {
        questionTaskID: task.questionTask?.questionTaskID || 0,
        question,
        answers,
        correctAnswer,
        taskID: task.taskID,
      };
      formData.append(
        "question",
        new Blob([JSON.stringify(questionTask)], { type: "application/json" })
      );
    } else if (task.questionTask) {
      setDeletedQuestionId(task.questionTask.questionTaskID);
    }

    if (deletedQuestionId !== null) {
      formData.append(
        "tbdQuestion",
        new Blob([JSON.stringify(deletedQuestionId)], {
          type: "application/json",
        })
      );
    }

    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    formData.append(
      "toBeDeleted",
      new Blob([JSON.stringify(deletedMediaIds)], { type: "application/json" })
    );

    try {
      const updatedTask = await taskAPI.updateTask(task.taskID, formData);
      dispatch({ type: "UPDATE_TASK_SUCCESS", payload: updatedTask });
      alert("Task updated successfully!");
      setLoadingMessage("המשימה נשמרה בהצלחה!");
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
        navigate("/Tasks");
      }, 1000);
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update the task.");
      setLoadingMessage("שגיאה בשמירת המשימה");
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 2000);
    }
  };

  return (
    <div className="main-container-edit-task">
      <Loader isLoading={isLoading} message={loadingMessage} />
      <a href="/Tasks" className="back-link">
        <img className="back-arrow-icon" src={LeftArrowIcon} alt="Back" />
      </a>
      <div className="overlay" />
      <div className="edit-task-container" dir="rtl">
        <div className="scrollable-content">
          <div className="edit-task-title">
            {AddNewTaskHebrew.CreateNewTask}
          </div>
          <div className="input-group">
            <label className="input-label">{AddNewTaskHebrew.Name}</label>
            <input
              type="text"
              className="task-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">
              {AddNewTaskHebrew.Description}
            </label>
            <textarea
              className="task-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="options-container">
            <div className="option-section">
              {showMedia && (
                <div className="input-group">
                  <label className="input-label">
                    {AddNewTaskHebrew.AddMedia}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*, video/*, application/pdf, audio/*"
                    id="file-upload"
                    className="file-input"
                    onChange={handleMediaChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <img
                      src={UploadFileIcon}
                      alt="Upload File"
                      className="file-upload-icon"
                    />
                  </label>
                  <MediaViewer
                    mediaList={[...keptMediaTasks, ...newMediaTasks]}
                    onDelete={handleDeleteMedia}
                    deletable={true}
                  />
                  <button
                    type="button"
                    className="delete-option-button"
                    onClick={() => setShowMedia(false)}
                  >
                    {AddNewTaskHebrew.HideMedia}
                  </button>
                </div>
              )}

              {showQuestion && (
                <div className="input-group">
                  <label className="input-label">{AddNewTaskHebrew.Q}</label>
                  <input
                    type="text"
                    className="task-input"
                    placeholder="הוספת שאלה"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="answer-container">
                      <input
                        type="text"
                        className="task-input"
                        value={answers[index] || ""}
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
                  <button
                    type="button"
                    className="delete-option-button"
                    onClick={handleDeleteQuestion}
                  >
                    {AddNewTaskHebrew.HideQuestion}
                  </button>
                </div>
              )}

              {showNotes && (
                <div className="input-group">
                  <label className="input-label">
                    {AddNewTaskHebrew.AdditionalNotes}
                  </label>
                  <textarea
                    className="task-textarea"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  ></textarea>
                  <button
                    type="button"
                    className="delete-option-button"
                    onClick={() => setShowNotes(false)}
                  >
                    {AddNewTaskHebrew.HideNotes}
                  </button>
                </div>
              )}

              <div className="edit-buttons">
                <button
                  type="button"
                  className="option-button"
                  onClick={() => setShowMedia(!showMedia)}
                >
                  {showMedia
                    ? AddNewTaskHebrew.ToggleOffMedia
                    : AddNewTaskHebrew.ToggleOnMedia}
                </button>

                <button
                  type="button"
                  className="option-button"
                  onClick={() => setShowQuestion(!showQuestion)}
                >
                  {showQuestion
                    ? AddNewTaskHebrew.ToggleOffQuestion
                    : AddNewTaskHebrew.ToggleOnQuestion}
                </button>

                <button
                  type="button"
                  className="option-button"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  {showNotes
                    ? AddNewTaskHebrew.ToggleOffNotes
                    : AddNewTaskHebrew.ToggleOnNotes}
                </button>
              </div>

              <div className="input-group">
                <label className="input-label">
                  {AddNewTaskHebrew.Sectors}
                </label>
                <select
                  value={selectedSector ?? ""}
                  onChange={(e) => setSelectedSector(Number(e.target.value))}
                  className="task-input"
                >
                  <option value="" disabled hidden>
                    {AddNewTaskHebrew.Sectors}
                  </option>
                  {sectors.map((sector, index) => (
                    <option key={index} value={sector.adminID}>
                      {sector.sector}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group input-group-checkbox">
                <input
                  type="checkbox"
                  checked={withMsg}
                  onChange={(e) => setWithMsg(e.target.checked)}
                />
                <label className="checkbox-label">
                  {AddNewTaskHebrew.WithMsg}
                </label>
              </div>
            </div>
          </div>

          <button className="save-task-button" onClick={handleSubmit}>
            {AddNewTaskHebrew.Save}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
