import React, { useState } from 'react';
import './AddUnit.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../components/Common/ConfirmationDialog/ConfirmationDialog';
import { ObjectLocation, Task } from '../../../../redux/models/Interfaces';

const AddUnitHebrew = {
    CreateNewUnit: "הוספת חוליה",
    Name: "שם : ",
    Description: "תיאור : ",
    Hint: "רמז:",
    SelectedTask: "משימה לחוליה: ",
    SelectedLocation: "מקום לחוליה: ",
    SelectedObject: "אובייקט לחוליה: ",
    ChooseLocation: "בחירת מקום",
    ChooseTask: "בחירת משימה",
    CreateTask: "יצירת משימה",
    Save: "שמירה",
    Cancel: "ביטול"
};

function AddUnit() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const selectedTask: Task = location.state?.selectedTask;
    const selectedObject: ObjectLocation = location.state?.selectedObject;

    return (
        <div className='main-container-add-unit'>
            {showConfirm && <ConfirmationDialog
                onConfirm={() => {
                    setShowConfirm(false);
                    navigate('/AddGame');
                }}
                onCancel={() => setShowConfirm(false)}
            />}
            <div className='add-unit-container' dir="rtl">
                <div className='add-unit-title'>{AddUnitHebrew.CreateNewUnit}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Name}</label>
                    <input type='text' className='unit-input' />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Description}</label>
                    <textarea className='unit-textarea'></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Hint}</label>
                    <textarea className='unit-textarea'></textarea>
                </div>
                {selectedTask && (
                    <div className='input-group'>
                        <label className='input-label'>{AddUnitHebrew.SelectedTask}</label>
                        <div className='selected-task'>{selectedTask.name}</div>
                    </div>
                )}
                {selectedObject && (
                    <div className='input-group'>
                        <label className='input-label'>{AddUnitHebrew.SelectedObject}</label>
                        <div className='selected-task'>{selectedObject.location.name}</div>
                        <label className='input-label'>{AddUnitHebrew.SelectedObject}</label>
                        <div className='selected-task'>{selectedObject.name}</div>
                    </div>
                )}
                <div className='options-container'>
                    <div className="option-section">
                        <div className='add-buttons'>
                            {/* ChoosableLocation */}
                            <Link to='/Locations'>
                                <button type="button" className='option-button'>{AddUnitHebrew.ChooseLocation}</button>
                            </Link>
                            <Link to="/ChoosableTaskPage">
                                <button type="button" className='option-button'>{AddUnitHebrew.ChooseTask}</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='options-container'>
                    <div className="option-section">
                        <div className='button-group'>
                            <button type="button" className='cancel-button' onClick={() => setShowConfirm(true)}>{AddUnitHebrew.Cancel}</button>
                            <button type="button" className='save-button' onClick={() => navigate('/UnitsPage')}>{AddUnitHebrew.Save}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUnit;
