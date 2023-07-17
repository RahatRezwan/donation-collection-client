/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { UserContext } from '../../../context/UserProvider';
import UserDonations from './UserDonations';
interface IUserData {
   firstName: string;
   lastName: string;
   email: string;
   profilePic: string;
   presentAddress?: string;
   permanentAddress?: string;
}
const Dashboard = () => {
   const { user } = useContext(UserContext);
   const data: IUserData = user?.role === 'admin' ? user?.admin : user?.donor;
   const [setPageTitle]: [setPageTitle: React.Dispatch<React.SetStateAction<string>>] =
      useOutletContext();
   useEffect(() => {
      setPageTitle('Profile');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className='pt-2 max-h-full'>
         <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-2 mb-2 capitalize'>
            <div className='bg-white rounded-lg border border-gray-300 p-4 w-full flex gap-3'>
               <div>
                  <img
                     src={data?.profilePic}
                     alt=''
                     className='w-[80px] h-[80px] border border-gray-300 p-1 rounded-lg'
                  />
               </div>
               <div>
                  <p>Name: {data?.firstName + ' ' + data?.lastName}</p>
                  <p>Email: {data?.email}</p>
                  <p>Role: {user?.role}</p>
               </div>
            </div>
            <div className='bg-white rounded-lg border border-gray-300 p-4 w-full'>
               <div>
                  <p>Present Address: {data?.presentAddress ?? '-'}</p>
                  <p>Permanent Address: {data?.permanentAddress ?? '-'}</p>
               </div>
            </div>
         </div>
         {user?.role === 'donor' && (
            <div className='bg-white rounded-lg border border-gray-300 p-4 w-full h-[calc(100vh-12.6rem)]'>
               <h3 className='text-2xl font-bold mb-2'>My Donations Data</h3>
               <UserDonations />
            </div>
         )}
      </div>
   );
};

export default Dashboard;
