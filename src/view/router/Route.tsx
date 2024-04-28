import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, NewSectorPage, Base, SectorDetails, SectorsPage, RoomsPage, TasksPage } from '../pages';
import { Outlet } from "react-router-dom";
import GamesPage from '../pages/Games/GamesPage';
import AddTask from '../pages/Tasks/AddTask/AddTask';

function Layout() {
  return (
    <>
      <Base>
        <Outlet />
      </Base>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  }, {
    path: '/newSector',
    element: <NewSectorPage />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/SectorDetails/:sector',
        element: <SectorDetails />
      }, {
        path: '/Sectors',
        element: <SectorsPage />
      }, {
        path: '/Rooms',
        element: <RoomsPage />
      }, {
        path: '/Tasks',
        element: <TasksPage />
      }, {
        path: '/Games',
        element: <GamesPage />
      }, {
        path: '/AddTask',
        element: <AddTask />
      }
    ]
  }
]);

export default router;
