import { FC, useEffect, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { taskAPI } from "../../../redux/services/TaskApi";
import { useDispatch } from "react-redux";
import { setTasks } from "../../../redux/slices/saveAllData";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ConfirmationDialog from '../../components/Common/ConfirmationDialog/ConfirmationDialog';
import { Task } from '../../../redux/models/Interfaces';

const TasksPage: FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.AllData.Tasks);
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch(setTasks(await taskAPI.getAllTasks()));
        };
        fetchTasks();
    }, [dispatch]);

    const handleDelete = async () => {
        if (taskToDelete) {
            try {
                await taskAPI.deleteTask(taskToDelete.taskID);
                alert("Task was deleted successfully");
                setShowConfirm(false);
                const updatedTasks = await taskAPI.getAllTasks();
                dispatch(setTasks(updatedTasks));
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };
    return (
        <>
            <HomePage objects={tasks} page="Task" Component={(props) => (
                <TaskCard {...props}
                    onShowConfirm={(task) => {
                        setTaskToDelete(task);
                        setShowConfirm(true);
                    }}
                />
            )} addButton="הוספת משימה חדשה" addButtonPath="addTask" />
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                    message={`Are you sure you want to delete the task "${taskToDelete?.name}"?`}
                />
            )}
        </>
    );
};

export default TasksPage;
