/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NavMenu } from './NavMenu';
import { Link } from 'react-router-dom';
import donatenow from '../../assets/donatenow.png';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
const Navbar = () => {
   const { user } = useContext(UserContext);
   return (
      <div className='h-[3.5rem] border-b border-b-gray-300'>
         <div className='flex items-center justify-between w-[97%] max-w-[1400px] mx-auto h-full'>
            <div>
               <img src={donatenow} alt='' className='w-[120px]' />
            </div>

            <div className='flex items-center gap-5'>
               {NavMenu.map((item, index) => (
                  <a key={index} href={item.url}>
                     {item.title}
                  </a>
               ))}

               {user?.email ? (
                  <>
                     <Link to='/dashboard'>Dashboard</Link>
                  </>
               ) : (
                  <Link to='/login'>
                     <button className='px-5 py-2 bg-light-blue text-dark-blue rounded-md'>
                        Login
                     </button>
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
