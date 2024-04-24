import { FC } from "react";
import RoomCard from "./RoomCard/RoomCard";
import "./RoomsPage.scss";
import { rooms } from "../../../data/rooms";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const RoomsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    return (
        <>
            {console.log("page :", page)}
            {page == "Rooms" && <HomePage objects={rooms} page="Room" Component={RoomCard} addButton="הוספת חדר חדש" />}
        </>
    );
};

export default RoomsPage;
