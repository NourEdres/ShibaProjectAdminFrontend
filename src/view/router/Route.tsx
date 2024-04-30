import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, NewSectorPage, Base, SectorDetails, SectorsPage, LocationPage, TasksPage } from '../pages';
import { Outlet } from "react-router-dom";
import GamesPage from '../pages/Games/GamesPage';
import AddTask from '../pages/Tasks/AddTask/AddTask';
import TaskDetails from '../pages/Tasks/TaskDetails/TaskDetails';
import AddLocation from '../pages/Location/AddLocation/AddLocation';
import LocationDetails from '../pages/Location/LocationDetails/LocationDetails';
import EditTask from '../pages/Tasks/EditTask/EditTask';

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
        path: '/Locations',
        element: <LocationPage />
      }, {
        path: '/Tasks',
        element: <TasksPage />
      }, {
        path: '/Games',
        element: <GamesPage />
      }, {
        path: '/EditTask',
        element: <EditTask />
      }, {
        path: '/AddTask',
        element: <AddTask />
      }, {
        path: '/AddLocation',
        element: <AddLocation />
      }, {
        path: '/TaskDetails/:task',
        element: <TaskDetails />
      },
      {
        path: '/LocationDetails/:location',
        element: <LocationDetails />
      }
    ]
  }
]);

export default router;
