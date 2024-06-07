import { ReactNode, useEffect, useState } from "react";
import { MainNavbar, AdminMenu } from "../..";
import './Base.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { setPage } from "../../../../redux/slices/GlobalStates";
import { buttonsName } from "../../../../redux/models/Types";

interface BaseProps {
    children: ReactNode;
}

function Base({ children }: BaseProps) {
    const object = useSelector((state: RootState) => state.globalStates.selectedCard);
    const page = useSelector((state: RootState) => state.globalStates.page);
    console.log("pageee " + page)
    const [menuActiveButton, setMenuActiveButton] = useState(page);
    const dispatch = useDispatch();

    // { console.log(object.color) }
    useEffect(() => {
        console.log("Updated page in games: " + page);
        dispatch(setPage(buttonsName.Games))
        console.log("Updated page in games: after  " + page)
    }, []);


    return (
        <div className="home-page">
            <div className="common-section-main-admin">
                <div className="left-side">
                    <div className="main-navbar">
                        <MainNavbar activeButton={menuActiveButton} />
                    </div>
                    <div className="content" style={{ backgroundColor: object != undefined ? object.color : "#D9D9D9" }}>
                        {children}
                    </div>
                </div>
                <div className="menu">
                    <AdminMenu
                        setActiveButton={setMenuActiveButton}
                        activeButton={menuActiveButton} />
                </div>
            </div>
        </div >
    );
}

export default Base;
