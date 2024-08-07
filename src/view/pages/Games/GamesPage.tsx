import { FC, useEffect, useState } from "react";
import GameCard from "./GameCard/GameCard";
import "./GamesPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setGames } from "../../../redux/slices/saveAllData";
import { gameAPI } from "../../../redux/services/GameApi";
import { setPage } from "../../../redux/slices/GlobalStates";
import { buttonsName } from "../../../redux/models/Types";
import { Admin, Game, UserRole } from "../../../redux/models/Interfaces";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog/ConfirmationDialog";

const GamesPage: FC = () => {
    const dispatch = useDispatch();
    const games = useSelector((state: RootState) => state.AllData.Games);
    const page = useSelector((state: RootState) => state.globalStates.page);
    const [showConfirm, setShowConfirm] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
    const adminStr = localStorage.getItem('admin');
    const currAdmin: Admin = adminStr ? { ...JSON.parse(adminStr), role: UserRole[JSON.parse(adminStr).role as keyof typeof UserRole] } : null;
    useEffect(() => {
        const fetchGames = async () => {
            dispatch(setGames(await gameAPI.getAllGames()))
            dispatch(setPage(buttonsName.Games))
            console.log("page in gms " + page)

        };
        fetchGames()

    }, [dispatch]);

    const handleDelete = (game: Game) => {
        if (currAdmin.adminID !== game.adminID && currAdmin.role !== UserRole.MainAdmin) {
            alert("אי אפשר למחוק משחק שלא שייך למחלקה שלך");
        }
        else {
            setGameToDelete(game);
            setShowConfirm(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (gameToDelete) {
            try {
                const response = await gameAPI.deleteGame(gameToDelete.gameID);
                console.log("response game ", response.data);
                console.log("sttus is " + response.status);
                if (response.status === 200) {
                    const message = gameToDelete.gameName + "משחק נמחק בהצלחה ";
                    alert(message);
                    setShowConfirm(false);
                    dispatch(setGames(games.filter(obj => obj.gameID !== gameToDelete.gameID)));
                }
            } catch (error: any) {
                console.error("Error deleting game: ", error);
                alert("שגיאה במחיקת המשחק:\n" + error);
            }
        }
    };
    const handleEdit = (game: Game) => {

    }

    return (
        <div dir="rtl">
            <HomePage objects={games} page="Game" Component={(props) => (
                <GameCard {...props}
                    onShowConfirm={handleDelete}
                    onEditLocation={handleEdit} />
            )}
                addButton="הוספת משחק חדש" addButtonPath="AddGame" />
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirm(false)}
                    message={`את/ה בטוח/ה שאת/ה רוצה למחוק את המשחק "${gameToDelete?.gameName}"?`}
                />
            )}
        </div>
    );
};

export default GamesPage;
