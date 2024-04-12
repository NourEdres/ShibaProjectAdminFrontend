import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, NewSectorPage, HomePage } from '../pages';
import { Navbar } from '../components';

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
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
  }, {
    path: '/AdminHome',
    element: <HomePage />
  },
])

export default router;