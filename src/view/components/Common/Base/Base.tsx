import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setPage } from "../../../../redux/slices/GlobalStates";
import { MainNavbar, AdminMenu } from "../..";
import "./Base.scss";
import { buttonsName } from "../../../../redux/models/Types";

interface BaseProps {
  children: ReactNode;
}

function Base({ children }: BaseProps) {
  const page = useSelector((state: RootState) => state.globalStates.page);
  const [menuActiveButton, setMenuActiveButton] = useState(page);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      dispatch(setPage(savedPage));
    } else {
      dispatch(setPage(buttonsName.Games)); // Default page
    }
  }, [dispatch]);

  useEffect(() => {
    if (page) {
      localStorage.setItem("page", page);
      setMenuActiveButton(page); // Update navbar state
    }
  }, [page]);

  return (
    <div className="home-page">
      <div className="common-section-main-admin">
        <div className="left-side">
          <div className="main-navbar">
            <MainNavbar activeButton={menuActiveButton} />
          </div>
          <div className="content">{children}</div>
        </div>
        <div className="menu">
          <AdminMenu
            setActiveButton={setMenuActiveButton}
            activeButton={menuActiveButton}
          />
        </div>
      </div>
    </div>
  );
}

export default Base;
