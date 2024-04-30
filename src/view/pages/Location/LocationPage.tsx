import { FC, useEffect, useState } from "react";
import LocationCard from "./LocationCard/LocationCard";
import "./LocationPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { locationAPI } from "../../../redux/services/LocationApi";
import { Locations } from "../../../data/Locations";

const LocationsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);
    // const [locations, setLocations] = useState<Location[]>([]);

    // useEffect(() => {
    //     console.log("locations in fetch ");
    //     const fetchLocations = async () => {
    //         console.log("locations in fetch2 ");
    //         const fetchedLocations = await locationAPI.getAllLocations();
    //         console.log("fetch ", fetchLocations);
    //         setLocations(fetchedLocations);
    //     };
    //     fetchLocations()

    // }, []);

    return (
        <>
            {page == "Locations" && <HomePage objects={Locations} page="Location" Component={LocationCard} addButton="הוספת חדר חדש" addButtonPath="AddLocation" />}
        </>
    );
};

export default LocationsPage;
