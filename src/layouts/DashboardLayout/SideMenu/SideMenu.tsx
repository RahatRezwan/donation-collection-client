/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NavLink, Link } from 'react-router-dom';
import './SideMenu.css';
import { DashboardMenus } from '../DashboardMenus';
import donateNow from '../../../assets/donatenow.png';
import { FiSidebar } from 'react-icons/fi';
import { UserContext } from '../../../context/UserProvider';
import { useContext } from 'react';
import { BiLogOut } from 'react-icons/bi';

interface SideMenuProps {
   showMenu: boolean;
   setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ showMenu, setShowMenu }: SideMenuProps) => {
   const { user, logout } = useContext(UserContext);
   return (
      <div
         className={`flex flex-col w-[16rem] bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-[6] transition-all delay-300 ${
            showMenu ? 'translate-x-0' : 'translate-x-[-100%] invisible'
         }`}
      >
         <nav className='flex-1 overflow-y-auto font-inter hide-scroll-bar bg-light-blue bg-opacity-10 p-3 pt-0'>
            <div className='flex items-center justify-between mb-7 h-[3rem]'>
               <Link to='/'>
                  <img src={donateNow} className='h-6 pl-1 ' />
               </Link>
               <button onClick={() => setShowMenu(false)}>
                  <FiSidebar className='text-xl block lg:hidden' />
               </button>
            </div>
            {DashboardMenus.map((menu, index) => (
               <div
                  key={index}
                  className={`${menu?.role?.includes(user?.role) ? 'block' : 'hidden'}`}
               >
                  <NavLink
                     to={menu.link}
                     className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
                     end
                  >
                     <span className='flex items-center justify-center mr-2 text-[16px]'>
                        {menu.icon}
                     </span>
                     <span>{menu.name}</span>
                  </NavLink>
               </div>
            ))}

            <button onClick={logout} className='inactive-menu'>
               <BiLogOut className='text-base mr-2' />
               Logout
            </button>
         </nav>
      </div>
   );
};

export default SideMenu;
