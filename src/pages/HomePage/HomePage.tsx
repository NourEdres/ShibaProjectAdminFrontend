import React, { useState } from "react";
import { MainNavbar, AdminMenu } from "../../components";
import './HomePage.scss';
import { buttonsName } from "../../models/Types";
import SectorsPage from "../Sectors/SectorsPage";
import { sectors } from "../../data/sectors";

function HomePage() {
    const [menuActiveButton, setMenuActiveButton] = useState("סקטורים");
    return (
        <div className="home-page">
            <div className="common-section-main-admin">
                <div className="left-side">
                    <div className="main-navbar">
                        <MainNavbar activeButton={menuActiveButton} />
                    </div>
                    <div className="content">
                        {
                            menuActiveButton == buttonsName.Sectors ? (
                                <SectorsPage sectors={sectors} />
                            ) : (
                                <>
                                </>
                            )

                        }
                    </div>
                </div>
                <div className="menu">
                    <AdminMenu
                        setActiveButton={setMenuActiveButton}
                        activeButton={menuActiveButton} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
