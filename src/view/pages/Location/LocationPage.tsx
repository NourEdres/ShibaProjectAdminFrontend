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
import Loader from "../../components/Common/LoadingSpinner/Loader";

const LocationsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);
    const dispatch = useDispatch();
    const locations = useSelector((state: RootState) => state.AllData.locations);
    const [showConfirm, setShowConfirm] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [refetchTrigger, setRefetchTrigger] = useState(0);


    useEffect(() => {
        const fetchLocations = async () => {
            dispatch(setLocations(await locationAPI.getAllLocations()));
            dispatch(setPage(buttonsName.Locations))
            console.log("page in locs " + page)

        };
        fetchLocations()

    }, [dispatch, refetchTrigger]);

    const handleDelete = (location: Location) => {
        setLocationToDelete(location);
        setShowConfirm(true);

    };

    const handleDeleteConfirm = async () => {
        if (locationToDelete) {
            setShowConfirm(false);
            setIsLoading(true);
            setLoadingMessage('מוחק מקום ...');
            try {
                const response = await locationAPI.deleteLocation(locationToDelete.locationID);
                console.log("sttus is " + response.status);
                if (response.status === 200) {
                    // const message = locationToDelete.name + "מקום נמחק בהצלחה ";
                    // alert(message);
                    dispatch(setLocations(locations.filter(obj => obj.locationID !== locationToDelete.locationID)));
                    setLoadingMessage('מקום נמחקה בהצלחה!');
                    setTimeout(() => {
                        setRefetchTrigger(prev => prev + 1);
                        setIsLoading(false);
                        setLoadingMessage('');
                    }, 500);
                }
            } catch (error: any) {
                dispatch(setLocations(locations));
                console.error("Error deleting location: ", error);
                setTimeout(() => {
                    setIsLoading(false);
                    setLoadingMessage('');
                }, 2000);
                alert("שגיאה במחיקת המקום:\n" + (error || 'Unknown error'));
            }
        }

    };
    //tbd
    const handleEdit = (location: Location) => {

    }
    return (
        <div dir="rtl">
            <Loader isLoading={isLoading} message={loadingMessage} />
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
