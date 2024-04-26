import React, { FC } from 'react';
import { HospitalIcon, ApplicationsIcon, RoomIcon, TaskIcon, LogOutIcon, WhiteLogo } from '../../../photos';
import './AdminMenu.scss';
import { buttonsName } from '../../../../redux/models/Types';
import { Link } from 'react-router-dom';
import { setPage } from '../../../../redux/slices/GlobalStates';
import { useDispatch } from 'react-redux';

interface AdminMenuProps {
    setActiveButton: (buttonName: string) => void;
    activeButton: string;
}

const AdminMenu: FC<AdminMenuProps> = ({ setActiveButton, activeButton }) => {
    // { console.log(activeButton) }
    const dispatch = useDispatch();
    return (
        <div className='admin-menu'>
            <div className='title'> חפש את המטמון ב </div>
            <img className='logo' src={WhiteLogo} alt="logo" />
            <div className='buttons'>

                <Link className="menu-button" to="/Sectors" >
                    <button
                        className={`menu-button ${activeButton === buttonsName.Sectors ? "active" : ""}`}
                        onClick={() => {
                            setActiveButton(buttonsName.Sectors);
                            dispatch(setPage("Sectors"));
                        }
                        }
                    >
                        <div className='button-txt'>{buttonsName.Sectors}</div>
                        <img className="navbar-icon-sectors" src={HospitalIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Games" >
                    <button
                        className={`menu-button ${activeButton === buttonsName.Games ? "active" : ""}`}
                        onClick={() => {
                            setActiveButton(buttonsName.Games)
                            dispatch(setPage("Games"));
                        }}
                    >
                        <div className='button-txt'>{buttonsName.Games}</div>
                        <img className="navbar-icon" src={ApplicationsIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Rooms" >
                    <button
                        className={`menu-button ${activeButton === buttonsName.Rooms ? "active" : ""}`}
                        onClick={() => {
                            console.log("yess");
                            dispatch(setPage("Rooms"));
                            setActiveButton(buttonsName.Rooms);

                        }}
                    >
                        <div className='button-txt'>{buttonsName.Rooms}</div>
                        <img className="navbar-icon" src={RoomIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Tasks" >
                    <button
                        className={`menu-button ${activeButton === buttonsName.Tasks ? "active" : ""}`}
                        onClick={() => { setActiveButton(buttonsName.Tasks); setPage("Tasks") }}
                    >
                        <div className='button-txt'>{buttonsName.Tasks}</div>
                        <img className="navbar-icon" src={TaskIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/" >
                    <button
                        className={`menu-button ${activeButton === buttonsName.Logout ? "active" : ""}`}
                        onClick={() => { setActiveButton(buttonsName.Logout); setPage("Sectors") }}
                    >
                        <div className='button-txt'>{buttonsName.Logout}</div>
                        <img className="navbar-icon" src={LogOutIcon} alt="menu-icon" />
                    </button>
                </Link>
            </div>
        </div >
    );
};

export default AdminMenu;
