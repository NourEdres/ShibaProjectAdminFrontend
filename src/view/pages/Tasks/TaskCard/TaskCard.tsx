import React, { FC } from 'react'
import './TaskCard.scss'
import { Task } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';

interface TaskCardProps {
    object: Task;
}
const sectionTitles = {
    userName: "",
    gamesNumber: "תיאור : ",
};
const TaskCard: FC<TaskCardProps> = ({ object }) => {
    console.log("task in tasks card: ", object)
    return (
        <div className='task-card' style={{ backgroundColor: "#D9D9D9" }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{object.name}</div>
            </div>
            <div className='task-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + object.description}
                    </div>
                    <div className='section-title'>
                        {/* {sectionTitles.gamesNumber + task.sector} */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskCard;