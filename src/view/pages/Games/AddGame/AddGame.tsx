import React from 'react';
import './AddGame.scss'
import { Link } from 'react-router-dom';

const AddNewGameHeb = {
    CreateNewGame: "הוספת משחק חדש ",
    Name: "שם : ",
    Description: "תיאור : ",
    AddUnits: "הוספת חוליות",
    Save: "שמירה",
};

function AddGame() {

    return (
        <div className='main-container-add-game'>
            <div className='add-game-header'>
                <div className='sector-name' dir='rtl'>פיזוטרפיה</div>
            </div>
            <div className='add-game-container' dir="rtl">
                <div className='add-game-title'>{AddNewGameHeb.CreateNewGame}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewGameHeb.Name}</label>
                    <input type='text' className='game-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewGameHeb.Description}</label>
                    <textarea className='game-textarea'></textarea>
                </div>
                <div className='input-group'>
                    <Link to='/UnitsPage'>
                        <button className='add-buttons'>{AddNewGameHeb.AddUnits}</button>
                    </Link>
                </div>
                <button className='save-button'>{AddNewGameHeb.Save}</button>

            </div>
        </div>
    )
}

export default AddGame;