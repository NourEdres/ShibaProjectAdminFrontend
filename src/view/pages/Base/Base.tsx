import React, { ReactNode, useState } from "react";
import { MainNavbar, AdminMenu } from "../../components";
import './Base.scss';
import { buttonsName } from "../../models/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface BaseProps {
    children: ReactNode;
}

function Base({ children }: BaseProps) {
    const [menuActiveButton, setMenuActiveButton] = useState("סקטורים");
    const sector = useSelector((state: RootState) => state.globalStates.selectedCard);

    return (
        <div className="home-page">
            <div className="common-section-main-admin">
                <div className="left-side">
                    <div className="main-navbar">
                        <MainNavbar activeButton={menuActiveButton} />
                    </div>
                    <div className="content" style={{ backgroundColor: (sector && !buttonsName.Sectors ? sector.color : "#d9d9d9") }}>
                        {children}
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

export default Base;
