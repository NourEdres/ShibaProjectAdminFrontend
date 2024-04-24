import { FC } from "react";
import GameCard from "./GameCard/GameCard";
import "./GamesPage.scss";
// import { games } from "../../../data/games";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const GamesPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    return (
        <>
            {console.log("page :", page)}
            {/* {page == "Games" && <HomePage objects={games} page="Game" Component={GameCard} />} */}
        </>
    );
};

export default GamesPage;
