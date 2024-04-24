import React, { FC } from 'react'
import './TaskCard.scss'
import { Task } from '../../../models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface TaskCardProps {
    task: Task;
}
const sectionTitles = {
    userName: "שם משתמש : ",
    gamesNumber: "מספר המשחקים : ",
};
const TaskCard: FC<TaskCardProps> = ({ task }) => {
    return (
        <div className='task-card' style={{ backgroundColor: task.color }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{task.name}</div>
            </div>
            <div className='task-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + task.userName}
                    </div>
                    <div className='section-title'>
                        {sectionTitles.gamesNumber + task.gamesNumber}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskCard;