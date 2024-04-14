import React, { FC } from "react";
import { Sector } from "../../models/Types";
import { Fade } from "react-awesome-reveal";
import SectorCard from "../../components/Sectors/SectorCard/SectorCard";
import "./SectorsPage.scss";
import { PlusIcon } from "../../photos";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard } from "../../../redux/slices/GlobalStates";
import { sectors } from "../../../data/sectors";

const SectorsPage: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="sectors-page">
      <div className="content">
        <div className="sector-grid">
          {sectors.map((sector: Sector, index: number) => (
            <Fade key={index}>
              <Link to={`/SectorDetails/${encodeURIComponent(sector.name)}`} className='link' onClick={() => dispatch(setCard(sector))}>
                <SectorCard sector={sector} />
              </Link>
            </Fade>
          ))}
        </div>
      </div>
      <div className="add-sector">
        <Link to="/newSector" className="link">
          <button className="add-sector-button">
            הוספת סקטור חדש
          </button>
        </Link>
      </div>
    </div >
  );
};

export default SectorsPage;
