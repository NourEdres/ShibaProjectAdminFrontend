import { FC, useEffect, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksPage.scss";
import { Task } from "../../../redux/models/Interfaces";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { taskAPI } from "../../../redux/services/TaskApi";
import { tasks } from "../../../data/Tasks";

const TasksPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);
    // const [tasks, setTasks] = useState<Task[]>([]);

    // useEffect(() => {
    //     console.log("tasks in fetch ");
    //     const fetchTasks = async () => {
    //         console.log("tasks in fetch2 ");
    //         const fetchedTasks = await taskAPI.getAllTasks();
    //         console.log("fetch ", fetchTasks);
    //         setTasks(fetchedTasks);
    //     };
    //     fetchTasks()

    // }, []);

    return (
        <>
            {console.log("in tasks page: ", tasks)}
            {<HomePage objects={tasks} page="Task" Component={TaskCard} addButton="הוספת משימה חדשה" addButtonPath="addTask" />}
        </>
    );
};

export default TasksPage;
