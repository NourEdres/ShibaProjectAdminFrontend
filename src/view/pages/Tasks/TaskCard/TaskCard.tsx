import { FC } from "react";
import "./TaskCard.scss";
import { Task } from "../../../../redux/models/Interfaces";
import { EditIcon, DeleteIcon } from "../../../photos";

interface TaskCardProps {
  object: Task;
  onShowConfirm: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

const sectionTitles = {
  description: "תיאור : ",
};

const TaskCard: FC<TaskCardProps> = ({ object, onShowConfirm, onEditTask }) => {
  return (
    <div className="task-card-file">
      <div className="card-header-file">
        <div className="title-file">{object.name}</div>
        <div className="buttons-file">
          <button
            className="edit-button-file"
            onClick={(e) => {
              e.preventDefault();
              onEditTask(object);
            }}
          >
            <img className="edit-icon-file" src={EditIcon} alt="Edit" />
          </button>
          <button
            className="delete-button-file"
            onClick={(e) => {
              e.preventDefault();
              onShowConfirm(object);
            }}
          >
            <img className="delete-icon-file" src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      </div>
      <div className="task-card-content-file">
        <div className="sections-file">
          {object.description && (
            <div className="section-title-file">
              {sectionTitles.description + object.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
