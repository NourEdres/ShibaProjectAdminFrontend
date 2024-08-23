import { FC } from 'react'
import './GameCard.scss'
import { Game } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';
import { useDispatch } from 'react-redux';
import { setCard } from '../../../../redux/slices/GlobalStates';
import { Link } from 'react-router-dom';

interface GameCardProps {
    object: Game;
    onShowConfirm: (game: Game) => void;
    onEditGame: (game: Game) => void;
}

const GameCard: FC<GameCardProps> = ({ object, onShowConfirm }) => {
    const dispatch = useDispatch();
    // console.log("object in game card ", JSON.stringify(object));

    return (
        <div className='game-card'>
            <div className='card-header'>
                <div className='buttons'>
                    <Link to="/EditGame">
                        <button className="edit-button" onClick={() => dispatch(setCard(object))}>
                            <img className='edit-icon' src={EditIcon} alt="Edit" />
                        </button>
                    </Link>
                    <button className="delete-button"
                        onClick={(e) => {
                            e.preventDefault();
                            onShowConfirm(object);
                        }}>
                        <img className='delete-icon' src={DeleteIcon} alt="Delete" />
                    </button>
                </div>
                <div className='title'>{object.gameName}</div>
            </div>
        </div>
    );
}

export default GameCard;
