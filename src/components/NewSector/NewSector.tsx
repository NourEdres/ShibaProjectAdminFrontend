import React from "react";
import "./NewSector.scss";

import {
  ViewPasswordIcon,
  DoctorUserIcon,
  HeroPhoto,
  HospitalIcon,
  PasswordIcon,
} from "../../photos";
import { Link } from "react-router-dom";

const NewSector = () => {
  return (
    <div className="new-sector-page">
      <div className="hero-container-part-one">
        <div className="hero-content">
          <img className="hero-img" src={HeroPhoto} alt="hero-photo" />
          <div className="hero-right">
            <div className="title">הוספת</div>
            <div className="title">סקטור חדש</div>
          </div>
        </div>
      </div>
      <div className="inputs-button">
        <div className="new-sector">
          <input className="sector-input" placeholder="סקטור" />
          <img
            className="hospital-icon"
            src={HospitalIcon}
            alt="hospital-icon"
          />
        </div>
        <div className="admin-user-name">
          <input className="admin-user-name-input" placeholder="שם משתמש" />
          <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
        </div>
        <div className="admin-code">
          <input
            className="admin-code-input"
            type="password"
            placeholder=" קוד"
          />
          <img className="navbar-icon" src={PasswordIcon} alt="password-icon" />
          <img
            className="view-password-icon"
            src={ViewPasswordIcon}
            alt="password-icon"
          />
        </div>
        <div className="final-buttons">
          <Link to="/NewSector">
            <button className="button-s">התחבר</button>
          </Link>
          <button className="button-s">לְבַטֵל</button>
        </div>
      </div>
    </div>
  );
};

export default NewSector;
