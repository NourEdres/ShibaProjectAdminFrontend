import { FC } from "react";
import { DoctorUserIcon, PasswordIcon, LeftArrowIcon } from "../../../photos";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./EditSector.scss";

const EditSector: FC = () => {
  const sector = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  console.log(sector);

  return (
    <div className="edit-sector" dir="rtl">
      <Link to="/Sectors" className="back-link">
        <img src={LeftArrowIcon} alt="Back" className="back-arrow-icon" />
      </Link>
      <div className="overlay" />
      <div className="sector-form-container">
        <h2 className="form-title">עריכת מגזר</h2>
        <div className="form-group">
          <label className="form-label">שם משתמש</label>
          <div className="input-wrapper">
            <input className="sector-input" placeholder={sector.username} />
            <img className="input-icon" src={DoctorUserIcon} alt="User Icon" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">סיסמה</label>
          <div className="input-wrapper">
            <input
              className="sector-input"
              type="password"
              placeholder="עדכן את הסיסמה"
            />
            <img
              className="input-icon"
              src={PasswordIcon}
              alt="Password Icon"
            />
          </div>
        </div>
        <div className="form-buttons">
          <button className="update-button">{"עדכון"}</button>
        </div>
      </div>
    </div>
  );
};

export default EditSector;
