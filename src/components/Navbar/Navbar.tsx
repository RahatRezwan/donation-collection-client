import { NavMenu } from './NavMenu';
import { Link } from 'react-router-dom';
import donatenow from '../../assets/donatenow.png';
const Navbar = () => {
   return (
      <div className='flex items-center justify-between max-w-[1400px] mx-auto h-[3.5rem]'>
         <div>
            <img src={donatenow} alt='' className='w-[120px]' />
         </div>

         <div className='flex items-center gap-5'>
            {NavMenu.map((item, index) => (
               <Link key={index} to={item.url}>
                  {item.title}
               </Link>
            ))}
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/login'>
               <button className='px-5 py-2 bg-light-blue text-dark-blue rounded-md'>Login</button>
            </Link>
         </div>
      </div>
   );
};

export default Navbar;
