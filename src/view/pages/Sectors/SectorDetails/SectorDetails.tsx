import { FC } from "react";
import { DoctorUserIcon, HospitalIcon, LeftArrowIcon } from "../../../photos";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SectorDetails.scss";

const SectorDetails: FC = () => {
  const sector = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  console.log(sector);

  return (
    <div className="sector-details" dir="rtl">
      <Link to="/Sectors" className="back-link">
        <img src={LeftArrowIcon} alt="Back" className="back-arrow-icon" />
      </Link>
      <div className="overlay"></div>
      <div className="sector-details-content">
        <div className="edit-sector-header">
          <div className="title">
            {sector.role === "MainAdmin" && "מנהל ראשי"}
          </div>
        </div>
        <div className="info-section">
          <div className="info-item">
            <img className="icon" src={HospitalIcon} alt="Hospital Icon" />
            <span className="info-text">{"שם: " + sector.username}</span>
          </div>
          <div className="info-item">
            <img className="icon" src={DoctorUserIcon} alt="Doctor Icon" />
            <span className="info-text">{"תפקיד: " + sector.sector}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDetails;
