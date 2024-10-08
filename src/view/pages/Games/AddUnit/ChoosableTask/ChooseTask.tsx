import { FC, useEffect, useState } from "react";
import { taskAPI } from "../../../../../redux/services/TaskApi";
import ChoosableTaskCard from "./ChooseTaskCard";
import HomePage from "../../../../components/Common/HomePage/HomePage";
import { Task } from "../../../../../redux/models/Interfaces";

interface ChoosableTasksPageProps {
    fromParent: string;
}

const ChoosableTasksPage: FC<ChoosableTasksPageProps> = ({ fromParent }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    console.log("parent is " + fromParent);


    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await taskAPI.getAllTasks();
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    const navigationPath = fromParent === "EditUnit" ? "/EditUnit" : "/AddUnit";

    return (
        <HomePage objects={tasks}
            page="ChooseTask"
            Component={(props) => (
                <ChoosableTaskCard {...props} navigationPath={navigationPath} />
            )}
            addButton="הוספת משימה חדשה"
            addButtonPath="addTask"
            setCardOnClick={false} />
    );
};

export default ChoosableTasksPage;
