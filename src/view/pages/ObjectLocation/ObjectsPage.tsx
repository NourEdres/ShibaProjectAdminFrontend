import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HomePage from "../../components/Common/HomePage/HomePage";
import { objectAPI } from '../../../redux/services/ObjectLocationApi';
import ObjectsCard from './ObjectsCard/ObjectsCard';
import { ObjectLocation } from '../../../redux/models/Interfaces';
import { useParams } from 'react-router-dom';
import ObjectCard from './ObjectCard/ObjectCard';
import './ObjectsPage.scss';


const ObjectsPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);
    const [objects, setObjects] = useState<ObjectLocation[]>([]);
    const { locationID } = useParams();

    useEffect(() => {
        const locObjects = async () => {
            const locObjects = await objectAPI.getAllObjetsOfLocation(locationID);
            setObjects(locObjects);
        };
        locObjects();
    }, [locationID]);
    return (
        <div>
            {page == "Location" && <HomePage objects={objects}
                {...objects.map(obj => (
                    <ObjectCard key={obj.objectID} object={obj} />
                ))}
                page="Object" Component={ObjectsCard} addButton="הוספת אובייקט חדש" addButtonPath="AddObjectLocation" />}
        </div>
    );
};

export default ObjectsPage