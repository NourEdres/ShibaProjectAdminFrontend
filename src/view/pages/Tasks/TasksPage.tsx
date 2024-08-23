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
import { Admin, Task, UserRole } from '../../../redux/models/Interfaces';
import { setCard, setPage } from '../../../redux/slices/GlobalStates';
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Common/LoadingSpinner/Loader";
import { buttonsName } from "../../../redux/models/Types";

const TasksPage: FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.AllData.Tasks);
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const adminStr = localStorage.getItem('admin');
    const currAdmin: Admin = adminStr ? { ...JSON.parse(adminStr), role: UserRole[JSON.parse(adminStr).role as keyof typeof UserRole] } : null;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [refetchTrigger, setRefetchTrigger] = useState(0);


    useEffect(() => {
        const fetchTasks = async () => {
            dispatch(setTasks(await taskAPI.getAllTasks()));
            dispatch(setPage(buttonsName.Tasks))
        };
        fetchTasks();
    }, [dispatch, refetchTrigger]);

    const handleDelete = (task: Task) => {
        if (currAdmin.adminID !== task.adminIDAPI && currAdmin.role !== UserRole.MainAdmin) {
            alert("אי אפשר למחוק משימה שלא שייכת למחלקה שלך");
        } else {
            setTaskToDelete(task);
            setShowConfirm(true);

        }
    };

    const handleDeleteConfirm = async () => {
        setShowConfirm(false);
        setIsLoading(true);
        setLoadingMessage('מוחק משימה ...');
        if (taskToDelete) {
            try {
                const response = await taskAPI.deleteTask(taskToDelete.taskID);
                console.log("response data is ", response.data);

                if (response.status === 200) {
                    // const updatedTasks = await taskAPI.getAllTasks();
                    // dispatch(setTasks(updatedTasks));
                    // alert("Task was deleted successfully");
                    dispatch(setTasks(tasks.filter(obj => obj.taskID !== taskToDelete.taskID)));
                    setLoadingMessage('המשימה נמחקה בהצלחה!');
                    setTimeout(() => {
                        setRefetchTrigger(prev => prev + 1);
                        setIsLoading(false);
                        setLoadingMessage('');
                    }, 500);
                }
            } catch (error: any) {
                dispatch(setTasks(tasks));
                setLoadingMessage('שגיאה במחיקת המשימה');
                console.error('Error deleting task in tasks page:' + error);
                setTimeout(() => {
                    setIsLoading(false);
                    setLoadingMessage('');
                }, 2000);
            }
        }
    };

    const handleEdit = (task: Task) => {
        if (currAdmin.adminID !== task.adminIDAPI && currAdmin.role !== UserRole.MainAdmin) {
            alert("אי אפשר לערוך משימה שלא שייכת למחלקה שלך");
        } else {
            dispatch(setCard(task));
            navigate('/EditTask');
        }
    };

    return (
        <>
            <Loader isLoading={isLoading} message={loadingMessage} />
            <HomePage
                objects={tasks}
                page="Task"
                Component={(props) => (
                    <TaskCard {...props}
                        onShowConfirm={handleDelete}
                        onEditTask={handleEdit}
                    />
                )}
                addButton="הוספת משימה חדשה"
                addButtonPath="addTask"
            />
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirm(false)}
                    message={`Are you sure you want to delete the task "${taskToDelete?.name}"?`}
                />
            )}
        </>
    );
};

export default TasksPage;
