import { FC } from "react";
import { Admin } from "../../../../redux/models/Interfaces";
import "./SectorCard.scss";
import { EditIcon, DeleteIcon } from "../../../photos";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard } from "../../../../redux/slices/GlobalStates";
// import { objectAPI } from '../../../../redux/services/AdminApi';
// import ConfirmationDialog from '../../../components/Common/ConfirmationDialog/ConfirmationDialog';

interface SectorCardProps {
  object: Admin;
  // onShowConfirm: (object: Admin) => void;
}

const SectorCard: FC<SectorCardProps> = ({ object }) => {
  const dispatch = useDispatch();
  console.log("curr objects  " + object);
  return (
    <div className="sector-card">
      <div className="card-header">
        <div className="title">{object.username}</div>
        <div className="buttons">
          <Link to="/EditSector">
            <button
              className="edit-button"
              onClick={() => dispatch(setCard(object))}
            >
              <img className="edit-icon" src={EditIcon} />
            </button>
          </Link>
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              // onShowConfirm(object);
            }}
          >
            <img className="delete-icon" src={DeleteIcon} />
          </button>
        </div>
      </div>
      <div className="sector-card-content">
        <div className="sections">
          <div className="section-title">{"תפקיד: " + object.sector}</div>
        </div>
      </div>
    </div>
  );
};

export default SectorCard;
