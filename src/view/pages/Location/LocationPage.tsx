import { FC } from "react";
import RoomCard from "./LocationCard/LocationCard";
import "./LocationPage.scss";
import { Locations } from "../../../data/rooms";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const RoomsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    return (
        <>
            {/* {console.log("page :", page)} */}
            {page == "Rooms" && <HomePage objects={Locations} page="Room" Component={RoomCard} addButton="הוספת חדר חדש" addButtonPath="AddLocation" />}
        </>
    );
};

export default RoomsPage;
