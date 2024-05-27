import { FC, useEffect, useState } from "react";
import { taskAPI } from "../../../../../redux/services/TaskApi";
import ChoosableTaskCard from "./ChooseTaskCard";
import HomePage from "../../../../components/Common/HomePage/HomePage";
import { Task } from "../../../../../redux/models/Interfaces";

const ChoosableTasksPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await taskAPI.getAllTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    return (
        <HomePage objects={tasks} page="ChooseTask" Component={ChoosableTaskCard} addButton="הוספת משימה חדשה" addButtonPath="addTask" setCardOnClick={false} />
    );
};

export default ChoosableTasksPage;