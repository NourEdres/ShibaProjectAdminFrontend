import React, { FC } from 'react';
import { HospitalIcon, ApplicationsIcon, RoomIcon, TaskIcon, LogOutIcon, WhiteLogo } from '../../../photos';
import './AdminMenu.scss';
import { buttonsName } from '../../../models/Types';

interface AdminMenuProps {
    setActiveButton: (buttonName: string) => void;
    activeButton: string;
}

const AdminMenu: FC<AdminMenuProps> = ({ setActiveButton, activeButton }) => {
    { console.log(activeButton) }
    return (
        <div className='admin-menu'>
            <div className='title'> חפש את המטמון ב </div>
            <img className='logo' src={WhiteLogo} alt="logo" />
            <div className='buttons'>
                <button
                    className={`menu-button ${activeButton === buttonsName.Sectors ? "active" : ""}`}
                    onClick={() => setActiveButton(buttonsName.Sectors)}
                >
                    <div className='button-txt'>{buttonsName.Sectors}</div>
                    <img className="navbar-icon-sectors" src={HospitalIcon} alt="menu-icon" />
                </button>
                <button
                    className={`menu-button ${activeButton === buttonsName.Games ? "active" : ""}`}
                    onClick={() => setActiveButton(buttonsName.Games)}
                >
                    <div className='button-txt'>{buttonsName.Games}</div>
                    <img className="navbar-icon" src={ApplicationsIcon} alt="menu-icon" />
                </button>
                <button
                    className={`menu-button ${activeButton === buttonsName.Rooms ? "active" : ""}`}
                    onClick={() => setActiveButton(buttonsName.Rooms)}
                >
                    <div className='button-txt'>{buttonsName.Rooms}</div>
                    <img className="navbar-icon" src={RoomIcon} alt="menu-icon" />
                </button>
                <button
                    className={`menu-button ${activeButton === buttonsName.Tasks ? "active" : ""}`}
                    onClick={() => setActiveButton(buttonsName.Tasks)}
                >
                    <div className='button-txt'>{buttonsName.Tasks}</div>
                    <img className="navbar-icon" src={TaskIcon} alt="menu-icon" />
                </button>
                <button
                    className={`menu-button ${activeButton === buttonsName.Logout ? "active" : ""}`}
                    onClick={() => setActiveButton(buttonsName.Logout)}
                >
                    <div className='button-txt'>{buttonsName.Logout}</div>
                    <img className="navbar-icon" src={LogOutIcon} alt="menu-icon" />
                </button>
            </div>
        </div>
    );
};

export default AdminMenu;
