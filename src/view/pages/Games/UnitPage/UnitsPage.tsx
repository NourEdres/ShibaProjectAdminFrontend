import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UnitsPage.scss";
import { Unit, Game } from "../../../../redux/models/Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const UnitsPageHeb = {
  Units: "חוליות",
  AddUnits: "הוספת חוליה",
  Duplicate: "שכפול",
  Delete: "מחיקה",
  Save: "שמירה",
};

function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const game: Game = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [tempUnitId, setTempUnitId] = useState<number>(() => {
    const storedUnits = JSON.parse(localStorage.getItem("units") || "[]");
    return (
      storedUnits.reduce(
        (maxId: number, unit: Unit) => Math.max(maxId, unit.unitID),
        0
      ) + 1
    );
  });

  useEffect(() => {
    // Check if we have a game in the state
    if (game) {
      setIsEditMode(true);
      console.log(game.units);
      setUnits(game.units || []);
    } else {
      // If no game is found, load units from local storage
      const initialUnits = JSON.parse(
        localStorage.getItem("units") || "[]"
      ).sort((a: Unit, b: Unit) => a.unitOrder - b.unitOrder);
      setUnits(initialUnits);
    }
  }, [game]); // Removed location.key and use only location.state

  // Handle addition of a new unit
  useEffect(() => {
    if (location.state?.newUnit) {
      setUnits((prevUnits) => {
        const maxOrder = prevUnits.reduce(
          (max, unit) => Math.max(max, unit.unitOrder),
          0
        );
        const newUnit = {
          ...location.state.newUnit,
          unitOrder: maxOrder + 1,
        };
        const updatedUnits = [...prevUnits, newUnit];
        if (!isEditMode) {
          localStorage.setItem("units", JSON.stringify(updatedUnits));
        }
        navigate(isEditMode ? "/EditGame" : "/UnitsPage", { replace: true });
        return updatedUnits;
      });
    }
  }, [location.state?.newUnit, isEditMode, navigate]);

  // Handle update of an existing unit
  useEffect(() => {
    if (location.state?.updatedUnit) {
      const updatedUnit = location.state.updatedUnit;
      setUnits((currUnits) => {
        const updatedUnits = currUnits.map((unit) =>
          unit.unitID === updatedUnit.unitID ? updatedUnit : unit
        );
        if (!isEditMode) {
          localStorage.setItem("units", JSON.stringify(updatedUnits));
        }
        return updatedUnits;
      });
      navigate(isEditMode ? "/EditGame" : "/UnitsPage", { replace: true });
    }
  }, [location.state?.updatedUnit, isEditMode, navigate]);

  // Handle saving the unit configuration
  const handleSave = () => {
    if (isEditMode && game) {
      const updatedGame = { ...game, units };
      navigate("/EditGame", { state: { updatedGame } });
    } else {
      navigate("/AddGame", { state: { units } });
    }
  };

  // Handle deleting a unit
  const handleDelete = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const updatedUnits = units
      .filter((_, idx) => idx !== index)
      .map((unit, idx) => ({ ...unit, unitOrder: idx + 1 }));
    setUnits(updatedUnits);
    if (!isEditMode) {
      localStorage.setItem("units", JSON.stringify(updatedUnits));
    }
  };

  // Handle duplicating a unit
  const handleDuplicate = (
    unit: Unit,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newUnit = {
      ...unit,
      unitID: tempUnitId,
      unitOrder: units.length + 1,
    };
    setUnits((prevUnits) => {
      const updatedUnits = [...prevUnits, newUnit];
      if (!isEditMode) {
        localStorage.setItem("units", JSON.stringify(updatedUnits));
      }
      return updatedUnits;
    });
    setTempUnitId((prevId) => prevId + 1);
  };

  // Handle dragging units to reorder them
  const handleDrag = (fromIndex: number, toIndex: number) => {
    const newUnits = [...units];
    const item = newUnits.splice(fromIndex, 1)[0];
    newUnits.splice(toIndex, 0, item);
    const updatedUnits = newUnits.map((unit, index) => ({
      ...unit,
      unitOrder: index + 1,
    }));
    setUnits(updatedUnits);
    if (!isEditMode) {
      localStorage.setItem("units", JSON.stringify(updatedUnits));
    }
  };

  // Handle editing a unit
  const handleEdit = (unit: Unit) => {
    navigate("/EditUnit", { state: { unit, isEditMode } });
  };

  return (
    <div className="main-container-units-page" dir="rtl">
      <div className="overlay" />
      <div className="units-container">
        <h2 className="units-title">{UnitsPageHeb.Units}</h2>
        <div className="units-list">
          {units.map((unit, index) => (
            <div
              key={unit.unitID}
              className="unit-card"
              onClick={() => handleEdit(unit)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("index", index.toString());
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData("index"));
                const toIndex = index;
                handleDrag(fromIndex, toIndex);
              }}
              title={unit.hint}
            >
              <div className="unit-name">{unit.name}</div>
              {unit.description && (
                <div className="unit-description">{unit.description}</div>
              )}
              <div className="unit-actions">
                <button
                  className="duplicate-button"
                  onClick={(e) => {
                    handleDuplicate(unit, e);
                  }}
                >
                  {UnitsPageHeb.Duplicate}
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => handleDelete(index, e)}
                >
                  {UnitsPageHeb.Delete}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="options-container">
          <div className="add-buttons">
            <Link to="/AddUnit" state={{ isEditMode }}>
              <button type="button" className="option-button">
                {UnitsPageHeb.AddUnits}
              </button>
            </Link>
          </div>
        </div>
        <button className="save-button" onClick={handleSave}>
          {UnitsPageHeb.Save}
        </button>
      </div>
    </div>
  );
}

export default UnitsPage;
