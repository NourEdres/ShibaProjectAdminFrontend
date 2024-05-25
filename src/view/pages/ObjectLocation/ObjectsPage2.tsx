import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HomePage from "../../components/Common/HomePage/HomePage";
import { objectAPI } from '../../../redux/services/ObjectLocationApi';
import ObjectsCard from './ObjectsCard/ObjectsCard';
import { ObjectLocation } from '../../../redux/models/Interfaces';
import { useLocation, useParams } from 'react-router-dom';
import ObjectCard from './ObjectCard/ObjectCard';
import './ObjectsPage.scss';


const ObjectsPage2: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);
    const [objects, setObjects] = useState<ObjectLocation[]>([]);
    const location = useLocation();

    useEffect(() => {
        console.log("curr objects " + objects)
        if (location.state?.newObject) {
            setObjects(prevObjects => [...prevObjects, location.state.newObject]);
        }
    }, [location.state]);

    return (
        <div>
            {<HomePage objects={objects}
                {...objects.map(obj => (
                    <ObjectCard key={obj.objectID} object={obj} />
                ))}
                page="Object" Component={ObjectsCard} addButton="הוספת אובייקט חדש" addButtonPath="AddObjectLocation" />}
        </div>
    );
};

export default ObjectsPage2