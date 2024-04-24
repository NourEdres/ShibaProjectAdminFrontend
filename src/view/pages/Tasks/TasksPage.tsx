import { FC } from "react";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksPage.scss";
// import { tasks } from "../../../data/tasks";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const TasksPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    return (
        <>
            {console.log("page :", page)}
            {page == "Tasks" && <HomePage objects={tasks} page="Task" Component={TaskCard} addButton="הוספת משימה חדשה" />}
        </>
    );
};

export default TasksPage;
