import React, { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard } from "../../../../redux/slices/GlobalStates";
import "./HomePage.scss";

interface HomePageProps {
    objects: any[];
    page: string;
    Component: React.ElementType;
}

const HomePage: FC<HomePageProps> = ({ objects, page, Component }) => {
    const dispatch = useDispatch();

    return (
        <div className="home-page">
            <div className="content">
                <div className="homePage-grid">
                    {objects.map((ob: any, index: number) => (

                        <Fade key={index}>
                            <div className="link" onClick={() => dispatch(setCard(ob))}>
                                <Component sector={ob} />
                                {console.log(ob)}
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
            <div className="add-new">
                <Link to="/newSector" className="link">
                    <button className="add-button">הוספת סקטור חדש</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
