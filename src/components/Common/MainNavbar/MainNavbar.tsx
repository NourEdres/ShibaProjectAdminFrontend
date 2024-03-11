import React,{useState} from 'react';
import {StaticsIcon,SearchIcon} from "../../../photos"

const MainNavbar = () => {


  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const togglePopup = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        closePopups(); // Close all other popups
        setter(prevState => !prevState);
      };
      
      const closePopups = () => {
        setIsSearchPopupOpen(false);
      };
  return (
    <div className='main-navbar'>
        <div className='title'></div>
        <div className='right-bar'>
        <div className="desktop-searchbar">
              <div
                className="animated-search-bar"
                onClick={() => togglePopup(setIsSearchPopupOpen)}
              >
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search for restaurant cuisine, chef"
                />
                <img className="navbar-icon" src={SearchIcon} alt="Search" />
              </div>
          </div>
          <button className='statics-button'><img className='statics-img' src={StaticsIcon}></img></button>
        </div>
    </div>
  )
}

export default MainNavbar