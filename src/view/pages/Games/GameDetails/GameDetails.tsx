import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';

const GameHeb = {
    CreateNewGame: "הוספת משחק חדש ",
    Name: "שם : ",
    Description: "תיאור : ",
    AddUnits: "הוספת חוליות",
    Save: "שמירה",
};

const GameDetails: React.FC = () => {
    const game = useSelector((state: RootState) => state.globalStates.selectedCard);
    return (
        <div className='game-container' dir='rtl' style={{ background: "#E9C46A" }}>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='game-details'>
                <div className='game-title'>{game.gameName}</div>
                {game.description &&
                    < div className='section-title'>{GameHeb.Description}</div> &&
                    <div className='game-desc'>{game.description}</div>}
            </div>
        </div>
    )
}

export default GameDetails