import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu/SideMenu';
import { useState } from 'react';
import { FiSidebar } from 'react-icons/fi';

const DashboardLayout = () => {
   const [showMenu, setShowMenu] = useState<boolean>(true);
   const [pageTitle, setPageTitle] = useState('');
   return (
      <div className='flex justify-end'>
         <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />
         <div
            className={`flex flex-col transition-all delay-300 relative ${
               showMenu ? 'w-full lg:w-[calc(100%-16rem)]' : 'w-full'
            } bg-gray-50`}
         >
            <div className='h-[3rem] bg-light-blue bg-opacity-10 flex items-center gap-2 justify-start px-3 border-b border-gray-200 text-dark-blue'>
               <button onClick={() => setShowMenu((prev) => !prev)}>
                  <FiSidebar className='text-xl' />
               </button>
               <h3 className='text-xl text-dark-blue font-semibold'>{pageTitle}</h3>
            </div>

            <div className='h-[calc(100vh-3rem)] w-[98%] max-w-[1550px] mx-auto'>
               <Outlet context={[setPageTitle]} />
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
