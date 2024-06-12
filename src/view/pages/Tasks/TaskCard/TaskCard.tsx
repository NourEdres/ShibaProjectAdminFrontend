import { FC } from 'react';
import './TaskCard.scss';
import { Task } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCard } from '../../../../redux/slices/GlobalStates';
import { RootState } from '../../../../redux/store';

interface TaskCardProps {
    object: Task;
    onShowConfirm: (task: Task) => void;
}

const sectionTitles = {
    userName: "",
    gamesNumber: "תיאור : ",
};

const TaskCard: FC<TaskCardProps> = ({ object, onShowConfirm }) => {
    const dispatch = useDispatch();
    const sector = useSelector((state: RootState) => state.globalStates.sector);


    return (
        <div className='task-card' style={{ backgroundColor: sector?.color }}>
            <div className='card-header'>
                <div className='buttons'>
                    <Link to="/EditTask">
                        <button className="edit-button" onClick={() => dispatch(setCard(object))}>
                            <img className='edit-icon' src={EditIcon} />
                        </button>
                    </Link>
                    <button className="delete-button"
                        onClick={(e) => {
                            e.preventDefault();
                            onShowConfirm(object);
                        }}>
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
        </div>
    );
};

export default TaskCard;
