import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HomePage from "../../components/Common/HomePage/HomePage";
import ObjectsCard from './ObjectsCard/ObjectsCard';
import './ObjectsPage.scss';
import { setObjects } from '../../../redux/slices/saveAllData';
import { objectAPI } from '../../../redux/services/ObjectLocationApi';
import { ObjectLocation } from '../../../redux/models/Interfaces';
import { useParams } from 'react-router-dom';
import ConfirmationDialog from '../../components/Common/ConfirmationDialog/ConfirmationDialog';
import { buttonsName } from '../../../redux/models/Types';
import { setPage } from '../../../redux/slices/GlobalStates';


const ObjectsPage: FC = () => {
    // const location = useSelector((state: RootState) => state.globalStates.selectedCard);
    const dispatch = useDispatch();
    const { locationID } = useParams<{ locationID: string }>();
    const objects = useSelector((state: RootState) => state.AllData.Objects);
    const [showConfirm, setShowConfirm] = useState(false);
    const [objectToDelete, setObjectToDelete] = useState<ObjectLocation | null>(null);

    console.log("location is ", locationID)

    useEffect(() => {
        const fetchObjects = async () => {
            if (locationID) {
                const objectsData = await objectAPI.getAllObjetsOfLocation(Number(locationID));
                dispatch(setObjects(objectsData));
                // dispatch(setPage(buttonsName.Locations))

            }
        };
        fetchObjects();
    }, [locationID, dispatch]);

    const handleDelete = (object: ObjectLocation) => {
        setObjectToDelete(object);
        setShowConfirm(true);
    }

    const handleDeleteConfirm = async () => {
        if (objectToDelete) {
            try {
                const response = await objectAPI.deleteObject(objectToDelete.objectID);
                console.log("response object ", response.data);
                console.log("sttus is " + response.status);
                if (response.status === 200) {
                    const message = objectToDelete.name + "אובייקט נמחק בהצלחה ";
                    alert(message);
                    setShowConfirm(false);
                    dispatch(setObjects(objects.filter(obj => obj.objectID !== objectToDelete.objectID)));
                }
            } catch (error) {
                alert("שגיאה במחיקת האובייקט:\n" + error);
                console.log(error);
            }
        }
    }

    const handleEdit = (object: ObjectLocation) => {

    }

    return (
        <div dir="rtl">
            {<HomePage objects={objects}
                page="Object" Component={(props) => (
                    <ObjectsCard {...props}
                        onShowConfirm={handleDelete}
                        onEditObject={handleEdit}
                    />
                )}
                addButton="הוספת אובייקט חדש" addButtonPath="AddObjectLocation" />}
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirm(false)}
                    message={`את/ה בטוח/ה שאת/ה רוצה למחוק את האובייקט "${objectToDelete?.name}"?`}
                />
            )}
        </div>
    );
};

export default ObjectsPage;
