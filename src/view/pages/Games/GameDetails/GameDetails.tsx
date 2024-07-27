import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';
import { Game } from "../../../../redux/models/Interfaces";
import { useNavigate } from "react-router-dom";
import './GameDetails.scss';
const GameHeb = {
    CreateNewGame: "הוספת משחק חדש ",
    Name: "שם : ",
    Description: "תיאור : ",
    ViewUnits: "הצגת חוליות",
    NoUnits: "עדיין אין חוליות",
    DownloadQR: "הורדת QR"
};

const GameDetails: React.FC = () => {
    const game: Game = useSelector((state: RootState) => state.globalStates.selectedCard);
    const navigate = useNavigate();

    const downloadQRCode = () => {
        if (game.qrcodePath) {
            fetch(game.qrcodePath)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `QR_${game.gameName}.png`;
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                })
                .catch(error => console.error('Error downloading QR code:', error));
        }
    };
    console.log("qr path is  " + game.qrcodePath)

    return (
        <div className='game-container' dir='rtl' style={{ background: "#E9C46A" }}>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='game-details'>
                <div className='game-title'>{game.gameName}</div>
                {game.description && (
                    <>
                        <div className='section-title'>{GameHeb.Description}</div>
                        <div className='game-desc'>{game.description}</div>
                    </>
                )}
                {game.units?.length === 0 ? (
                    <div>{GameHeb.NoUnits}</div>
                ) : (
                    <button className='view-units' onClick={() => { navigate(`/UnitsPageView`, { state: { game } }); }}>
                        {GameHeb.ViewUnits}
                    </button>
                )}
                {game.qrcodePath && (
                    <div className='qr-section'>
                        <div className='game-qr'>
                            <img src={game.qrcodePath}
                                alt='QR Code' className='qr-code-image' />
                        </div>
                        <button className='download-qr-btn' onClick={downloadQRCode}>
                            {GameHeb.DownloadQR}
                            {/* <img className='download-icon' src={DownloadIcon} alt="download icon" /> */}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GameDetails;

