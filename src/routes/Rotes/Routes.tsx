import MainLayout from '../../layouts/MainLayout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home/Home';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Dashboard from '../../pages/Dashboard/Dashboard/Dashboard';
import Login from '../../pages/Authentication/Login/Login';
import Register from '../../pages/Authentication/Register/Register';
import PrivateRoute from '../PrivateRoutes/PrivateRoute';
import DonorsList from '../../pages/Dashboard/DonorsList/DonorsList';
import AdminRoutes from '../PrivateRoutes/AdminRoutes';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      children: [
         { path: '/', element: <Home /> },
         { path: '/login', element: <Login /> },
         { path: '/register', element: <Register /> },
      ],
   },
   {
      path: '/dashboard',
      element: (
         <PrivateRoute>
            <DashboardLayout />
         </PrivateRoute>
      ),
      children: [
         { path: '/dashboard', element: <Dashboard /> },
         {
            path: '/dashboard/donors',
            element: (
               <AdminRoutes>
                  <DonorsList />
               </AdminRoutes>
            ),
         },
      ],
   },
]);
