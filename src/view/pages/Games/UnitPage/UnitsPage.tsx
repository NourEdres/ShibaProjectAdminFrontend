import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UnitsPage.scss';
import { Unit } from '../../../../redux/models/Interfaces';

const UnitsPageHeb = {
    Units: "חוליות",
    AddUnits: "הוספת חוליה",
    Duplicate: "שכפול",
    Delete: "מחיקה",
    Save: "שמירה"
};

const unitsData: Unit[] = [
    {
        unitID: 1,
        name: "חוליה 1",
        description: "תיאור לחוליה 1",
        hint: "רמז לחוליה 1",
        objectID: 1,
        taskID: 1,
        locationID: 1
    },
    {
        unitID: 2,
        name: "חוליה 2",
        // description: "Description of Unit 2",
        hint: "רמז לחוליה 2",
        objectID: 2,
        taskID: 2,
        locationID: 2
    },
    {
        unitID: 3,
        name: "חוליה 3",
        description: "תיאור לחוליה 3",
        hint: "רמז לחוליה 2",
        objectID: 2,
        taskID: 2,
        locationID: 2
    },

    {
        unitID: 4,
        name: "חוליה 4",
        description: "תיאור לחוליה 43",
        hint: "רמז לחוליה 2",
        objectID: 2,
        taskID: 2,
        locationID: 2
    },

    {
        unitID: 5,
        name: "חוליה 5",
        description: "תיאור לחוליה 5",
        hint: "רמז לחוליה 5",
        objectID: 2,
        taskID: 2,
        locationID: 2
    },

    {
        unitID: 6,
        name: "חוליה 6",
        description: "תיאור לחוליה 6",
        hint: "רמז לחוליה 6",
        objectID: 2,
        taskID: 2,
        locationID: 2
    },
];

function UnitsPage() {
    const [units, setUnits] = useState(unitsData);

    return (
        <div className='main-container'>
            <div className='units-container' dir="rtl">
                <div className='units-title'>{UnitsPageHeb.Units}</div>
                <div className='units-list'>
                    {units.map((unit, index) => (
                        <div
                            key={unit.unitID}
                            className="unit-card"
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("index", index.toString());
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const dragIndex = parseInt(e.dataTransfer.getData("index"));
                                const newUnits = [...units];
                                const draggedUnit = newUnits[dragIndex];
                                newUnits.splice(dragIndex, 1);
                                newUnits.splice(index, 0, draggedUnit);
                                setUnits(newUnits);
                            }}
                            title={unit.hint}
                        >
                            <div className="unit-name">{unit.name}</div>
                            {unit.description && <div className="unit-description">{unit.description}</div>}
                            <div className="unit-actions">
                                <button className="duplicate-button" onClick={() => {
                                    const newUnit = { ...unit, unitID: Math.max(...units.map(u => u.unitID)) + 1 };
                                    setUnits([...units, newUnit]);
                                }}>{UnitsPageHeb.Duplicate}</button>
                                <button className="delete-button" onClick={() => {
                                    setUnits(units.filter((_, idx) => idx !== index));
                                }}>{UnitsPageHeb.Delete}</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='options-container'>
                    <div className="option-section">
                        <div className='add-buttons'>
                            <Link to='/AddUnit'>
                                <button type="button" className='option-button'>{UnitsPageHeb.AddUnits}</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <button className='save-button'>{UnitsPageHeb.Save}</button>
            </div>
        </div>
    );
}

export default UnitsPage;