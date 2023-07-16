import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Rotes/Routes';
import { UserContext } from './context/UserProvider';
import { useContext } from 'react';
import HomeLoader from './components/Loaders/HomeLoader/HomeLoader';

const App = () => {
   const { loading } = useContext(UserContext);
   if (loading) {
      return <HomeLoader />;
   }
   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
};

export default App;
