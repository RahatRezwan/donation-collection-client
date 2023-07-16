/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReactNode, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';
import HomeLoader from '../../components/Loaders/HomeLoader/HomeLoader';
import { toast } from 'react-toastify';

const AdminRoutes = ({ children }: { children: ReactNode }) => {
   const { user, loading } = useContext(UserContext);
   const location = useLocation();

   if (loading) {
      return <HomeLoader />;
   }
   console.log(user);

   if (user.role === 'admin') {
      return children;
   } else {
      toast.error('You are not authorized to access this page');
      return <Navigate to='/dashboard' state={{ from: location }} replace></Navigate>;
   }
};

export default AdminRoutes;
