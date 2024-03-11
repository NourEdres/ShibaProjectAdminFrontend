import React from "react";
import { SectorType } from "../../models/Types";
import { MainNavbar, AdminMenu, SwiperConfig } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fade } from "react-awesome-reveal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SectorsPage({ sectors }: { sectors: SectorType[] }) {
  return (
    <div className="sectors-page">
      <div className="menu">
        <AdminMenu />
      </div>
      <div className="left-side">
        <div className="main-navbar">
          <MainNavbar />
        </div>
        <div className="content">
          <Fade>
            <Swiper className="swiper" {...SwiperConfig("vertical")}>
              {sectors.map((sector: SectorType) => (
                <SwiperSlide className="swiper-slide" key={sector.name}>
                  <div className="sector-card">
                    <div className="top-content">
                      <div className="title">{sector.name}</div>
                      <div className="left-buttons">
                        <button className="edit">
                          <img></img>
                        </button>
                        <button className="delete">
                          <img></img>
                        </button>
                      </div>
                      <div className="sector-content">
                        <div className="sector-details">
                          <div className="user-name">{sector.userName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Fade>

          <div className="add-sector">
            <button className="add-sector-button">
              <img></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectorsPage;
