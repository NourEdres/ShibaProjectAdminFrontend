import { createBrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage,NewSectorPage } from '../pages';
import { Navbar } from '../components';

import { Outlet } from "react-router-dom";

function Layout() {
  return (
      <>
        <Navbar/>
        <Outlet/>
      </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [  
      {
        path: '/',
        element: <LoginPage/>
      },{
        path: '/newSector',
        element: <NewSectorPage/>
      },
    ]
  }
])

export default router;