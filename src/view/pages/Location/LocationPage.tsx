import { FC } from "react";
import LocationCard from "./LocationCard/LocationCard";
import "./LocationPage.scss";
import { Locations } from "../../../data/Locations";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const LocationsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    return (
        <>
            {/* {console.log("page :", page)} */}
            {page == "Locations" && <HomePage objects={Locations} page="Location" Component={LocationCard} addButton="הוספת חדר חדש" addButtonPath="AddLocation" />}
        </>
    );
};

export default LocationsPage;
