import MainLayout from '../../layouts/MainLayout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home/Home';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <Home /> }],
   },
]);
