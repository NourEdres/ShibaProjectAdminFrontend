import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, NewSectorPage, Base, SectorDetails, SectorsPage } from '../pages';
import { Outlet } from "react-router-dom";

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
      }
    ]
  }
]);

export default router;
