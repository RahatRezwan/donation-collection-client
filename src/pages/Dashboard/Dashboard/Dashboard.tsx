import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
const Dashboard = () => {
   const [setPageTitle]: [setPageTitle: React.Dispatch<React.SetStateAction<string>>] =
      useOutletContext();
   useEffect(() => {
      setPageTitle('Profile');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className='flex gap-2 py-2 h-full'>
         <div className='bg-white rounded-lg border border-gray-300 p-5 h-full w-[16rem]'></div>
         <div className='bg-white rounded-lg border border-gray-300 p-5 h-full flex-grow'></div>
      </div>
   );
};

export default Dashboard;
