// import { FC, useState } from 'react';
// import { DoctorUserIcon } from '../../photos';
// import { RootState } from '../../../redux/store';
// import { useSelector } from 'react-redux';
// import { SketchPicker } from "react-color";
// import { HospitalIcon, DoctorUserIcon, PasswordIcon, ViewPasswordIcon, ColorPicker, HeroPhoto } from "../../photos";

// const SectorDetails: FC = () => {
//     const sector = useSelector((state: RootState) => state.globalStates.selectedCard);
//     const [color, setColor] = useState('בחר צבע');
//     const [showColorPicker, setShowColorPicker] = useState(false);

//     const handleColorChange = (newColor: any) => {
//         setColor(newColor.hex);
//     };

//     const toggleColorPicker = () => {
//         setShowColorPicker(!showColorPicker);
//     };

//     return (
//         <div className='sector-details'>
//             <div className='arrow-icon'><img className='arrow-icon' src={''} alt="arrow" /></div>
//             <div className='sector-title'>{sector.name}</div>
//             <div className="inputs-button">
//                 <div className="admin-user-name">
//                     <input className="admin-user-name-input" placeholder="שם משתמש" />
//                     <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
//                 </div>
//                 {showColorPicker && (
//                     <SketchPicker className="color-picker-popup" color={color} onChange={handleColorChange} />
//                 )}
//                 <div className="color-input-container">
//                     <input
//                         className="color-picker-input"
//                         placeholder={color}
//                     />
//                     <img
//                         className="navbar-icon-color"
//                         src={ColorPicker}
//                         alt="admin-icon"
//                         onClick={toggleColorPicker}
//                     />
//                 </div>
//             </div>
//         </div>
//         </div >
//     );
// };

// export default SectorDetails;
