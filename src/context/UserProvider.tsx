/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { ReactNode, SetStateAction, Dispatch, createContext } from 'react';
import config from '../config';

type UserProviderProps = {
   user: any;
   setUser: Dispatch<SetStateAction<any>>;
   loading: boolean;
   setLoading: Dispatch<SetStateAction<boolean>>;
   logout: () => void;
};

export const UserContext = createContext<UserProviderProps>({
   user: null,
   setUser: () => {},
   loading: true,
   setLoading: () => {},
   logout: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = React.useState<any>(null);
   const [loading, setLoading] = React.useState<boolean>(true);

   React.useEffect(() => {
      const token = localStorage.getItem('token');
      if (token && user === null) {
         axios
            .get(`${config.apiUrl}/auth/user-data`, {
               headers: { Authorization: `Bearer ${token}` },
            })
            .then((res: any) => {
               setUser(res.data);
               setLoading(false);
            });
      }
   }, [user]);

   const userInfo: UserProviderProps = {
      user,
      setUser,
      loading,
      setLoading,
      logout: () => {
         localStorage.removeItem('token');
         setUser(null);
      },
   };

   return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>;
};

export default UserProvider;
