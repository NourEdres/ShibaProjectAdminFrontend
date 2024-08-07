import { FC, useEffect, useState } from "react";
import LocationCard from "./LocationCard/LocationCard";
import "./LocationPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { locationAPI } from "../../../redux/services/LocationApi";
import { useDispatch } from "react-redux";
import { setLocations } from "../../../redux/slices/saveAllData";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog/ConfirmationDialog";
import { Location } from "../../../redux/models/Interfaces";
import { buttonsName } from "../../../redux/models/Types";
import { setPage } from "../../../redux/slices/GlobalStates";

const LocationsPage: FC = () => {
    // const page = useSelector((state: RootState) => state.globalStates.page);
    const dispatch = useDispatch();
    const locations = useSelector((state: RootState) => state.AllData.locations);
    const [showConfirm, setShowConfirm] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);


    useEffect(() => {
        const fetchLocations = async () => {
            dispatch(setLocations(await locationAPI.getAllLocations()));
            // dispatch(setPage(buttonsName.Locations))

        };
        fetchLocations()

    }, []);

    const handleDelete = (location: Location) => {
        setLocationToDelete(location);
        setShowConfirm(true);

    };

    const handleDeleteConfirm = async () => {
        if (locationToDelete) {
            try {
                const response = await locationAPI.deleteLocation(locationToDelete.locationID);
                console.log("response location ", response.data);
                console.log("sttus is " + response.status);
                if (response.status === 200) {
                    const message = locationToDelete.name + "מקום נמחק בהצלחה ";
                    alert(message);
                    setShowConfirm(false);
                    dispatch(setLocations(locations.filter(obj => obj.locationID !== locationToDelete.locationID)));
                }
            } catch (error: any) {
                console.error("Error deleting location: ", error);
                alert("שגיאה במחיקת המקום:\n" + error);
            }
        }

    };
    //tbd
    const handleEdit = (location: Location) => {

    }
    return (
        <div dir="rtl">
            {<HomePage objects={locations} page="Location" Component={(props) => (
                <LocationCard {...props}
                    onShowConfirm={handleDelete}
                    onEditLocation={handleEdit} />
            )} addButton="הוספת חדר חדש" addButtonPath="AddLocation" />}
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirm(false)}
                    message={`את/ה בטוח/ה שאת/ה רוצה למחוק את המקום "${locationToDelete?.name}"?\nפעולה זו תמחק גם את האובייקטים בתוך המקום`}
                />
            )}
        </div>
    );
};

export default LocationsPage;
