import React, { FC, useState } from 'react';
import { StaticsIcon, SearchIcon } from "../../../photos"
import './MainNavbar.scss'

interface MainNavbarProps {
  activeButton: string;
}

const MainNavbar: FC<MainNavbarProps> = ({ activeButton }) => {

  return (
    <div className='main-navbar'>
      <button className='statics-button'><img className='statics-img' src={StaticsIcon} /></button>
      <div className='title'>{activeButton}</div>
    </div>
  )
}

export default MainNavbar;