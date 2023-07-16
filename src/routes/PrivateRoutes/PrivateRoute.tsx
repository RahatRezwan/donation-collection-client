/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReactNode, useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';
import HomeLoader from '../../components/Loaders/HomeLoader/HomeLoader';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
   const { user, loading } = useContext(UserContext);
   const location = useLocation();

   if (loading) {
      return <HomeLoader />;
   }
   console.log(user);

   if (user) {
      return children;
   }
   return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
