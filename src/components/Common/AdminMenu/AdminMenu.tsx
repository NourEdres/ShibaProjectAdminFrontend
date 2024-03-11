import React from 'react'
import { HospitalIcon,ApplicationsIcon ,RoomIcon,TaskIcon,LogOutIcon,WhiteLogo } from '../../../photos'
const AdminMenu = () => {
  return (
    <div className='admin-menu'>
        <div className='title'>חפש את המטמון </div>
        <img className='logo' src={WhiteLogo}/>
        <div className='buttons'>
            <button className='menu-button'>
                <img className="navbar-icon" src={HospitalIcon} alt="menu-icon" />
                <div className='button text'>סקטורים</div>
            </button>
            <button className='menu-button'>
                <img className="navbar-icon" src={ApplicationsIcon} alt="menu-icon" />
                <div className='button text'>משחקים</div>
            </button>
            <button className='menu-button'>
                <img className="navbar-icon" src={RoomIcon} alt="menu-icon" />
                <div className='button text'>חדרים</div>
            </button>
            <button className='menu-button'>
                <img className="navbar-icon" src={TaskIcon} alt="menu-icon" />
                <div className='button text'>משימות</div>
            </button>
            <button className='menu-button'>
                <img className="navbar-icon" src={LogOutIcon} alt="menu-icon" />
                <div className='button text'>יציאה</div>
            </button>
        </div>
    </div>
  )
}

export default AdminMenu