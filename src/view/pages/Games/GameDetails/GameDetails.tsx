import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Game } from "../../../../redux/models/Interfaces";
import { Link, useNavigate } from "react-router-dom";
import "./GameDetails.scss";
import { LeftArrowIcon } from "../../../photos";
import { adminAPI } from "../../../../redux/services/AdminApi";

const GameHeb = {
  CreateNewGame: "הוספת משחק חדש ",
  Name: "שם : ",
  Description: "תיאור : ",
  ViewUnits: "הצגת חוליות",
  NoUnits: "עדיין אין חוליות",
  DownloadQR: "הורדת QR",
  GameName: "שם המשחק: ",
  Sector: "סקטור: ",
};

const GameDetails: React.FC = () => {
  const game: Game = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  const navigate = useNavigate();

  const [sectorName, setSectorName] = useState<string>("כללי");

  useEffect(() => {
    console.log(game.gameName);
    const fetchSectorName = async () => {
      try {
        const admins = await adminAPI.getAllAdmins(); // Fetch all admins
        const adminDetails = admins.find(
          (admin) => admin.adminID === game.adminID
        ); // Find the admin by adminID
        if (adminDetails) {
          setSectorName(adminDetails.sector); // Set the sector name
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchSectorName();
  }, [game.adminID]);

  const downloadQRCode = () => {
    if (game.qrcodePath) {
      fetch(game.qrcodePath)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `QR_${game.gameName}.png`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch((error) => console.error("Error downloading QR code:", error));
    }
  };

  return (
    <div className="game-container">
      <Link to="/Games" className="back-link">
        <img src={LeftArrowIcon} alt="Back" className="back-arrow-icon" />
      </Link>
      <div className="game-overlay"></div>
      <div className="game-details-content">
        {/* Main Title as Sector Name */}
        <div className="game-title">{game.gameName}</div>

        <div className="main-title">
          {" "}
          {GameHeb.Sector} {sectorName}
        </div>

        {/* Game Name with Label */}

        <div className="game-details">
          {game.description && (
            <>
              <div className="section-title">{GameHeb.Description}</div>
              <div className="game-desc">{game.description}</div>
            </>
          )}
          {game.units?.length === 0 ? (
            <div className="no-units">{GameHeb.NoUnits}</div>
          ) : (
            <button
              className="view-units"
              onClick={() => {
                navigate(`/UnitsPageView`, { state: { game } });
              }}
            >
              {GameHeb.ViewUnits}
            </button>
          )}
          {game.qrcodePath && (
            <div className="qr-section">
              <div className="game-qr">
                <img
                  src={game.qrcodePath}
                  alt="QR Code"
                  className="qr-code-image"
                />
              </div>
              <button className="download-qr-btn" onClick={downloadQRCode}>
                {GameHeb.DownloadQR}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
