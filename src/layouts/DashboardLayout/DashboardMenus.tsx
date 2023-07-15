import { FiHome } from 'react-icons/fi';
import { LiaDonateSolid, LiaUsersSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
export const DashboardMenus = [
   {
      name: 'Profile',
      icon: <CgProfile />,
      link: '/dashboard',
   },
   {
      name: 'Home',
      icon: <FiHome />,
      link: '/',
   },
   {
      name: 'My Donations',
      icon: <LiaDonateSolid />,
      link: '/dashboard/my-donations',
   },
   {
      name: 'Donations Lists',
      icon: <LiaDonateSolid />,
      link: '/dashboard/donations-list',
   },
   {
      name: 'Donors',
      icon: <LiaUsersSolid />,
      link: '/dashboard/donors',
   },
];
