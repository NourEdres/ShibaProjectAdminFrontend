import { FC } from "react";
import "./GameCard.scss";
import { Game } from "../../../../redux/models/Interfaces";
import { EditIcon, DeleteIcon } from "../../../photos";

interface GameCardProps {
  object: Game;
  onShowConfirm: (game: Game) => void;
  onEditGame: (game: Game) => void;
}

const GameCard: FC<GameCardProps> = ({ object, onShowConfirm, onEditGame }) => {
  console.log("object.gameName :", object.gameName);
  return (
    <div className="game-card">
      <div className="card-header">
        <div className="title">{object.gameName}</div>
        <div className="buttons">
          <button
            className="edit-button"
            onClick={(e) => {
              e.preventDefault();
              onEditGame(object);
            }}
          >
            <img className="edit-icon" src={EditIcon} alt="Edit" />
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              onShowConfirm(object);
            }}
          >
            <img className="delete-icon" src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      </div>
      {object.description !== undefined && (
        <div className="game-card-content">
          <div className="sections">
            <div className="section-title">
              {"תיאור: " + object.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
