import React, { FC } from "react";
import { Sector } from "../../models/Types";
import { Fade } from "react-awesome-reveal";
import SectorCard from "../../components/Sectors/SectorCard/SectorCard";
import "./SectorsPage.scss"; // Import your custom styles for the page

interface SectorPageProps {
  sectors: Sector[];
}

const SectorsPage: FC<SectorPageProps> = ({ sectors }) => {
  return (
    <div className="sectors-page">
      <div className="content">
        <div className="sector-grid">
          {sectors.map((sector: Sector, index: number) => (
            <Fade key={index}>
              <SectorCard sector={sector} />
            </Fade>
          ))}
        </div>
      </div>
      <div className="add-sector">
        <button className="add-sector-button">
          <img src={""} alt="Add" />
        </button>
      </div>
    </div>
  );
};

export default SectorsPage;
