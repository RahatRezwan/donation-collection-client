import { FiHome } from 'react-icons/fi';
import { LiaDonateSolid, LiaUsersSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
export const DashboardMenus = [
   {
      name: 'Profile',
      icon: <CgProfile />,
      link: '/dashboard',
      role: ['admin', 'donor'],
   },
   {
      name: 'Home',
      icon: <FiHome />,
      link: '/',
      role: ['admin', 'donor'],
   },
   {
      name: 'Donations Lists',
      icon: <LiaDonateSolid />,
      link: '/dashboard/donations-list',
      role: ['admin'],
   },
   {
      name: 'Donors',
      icon: <LiaUsersSolid />,
      link: '/dashboard/donors',
      role: ['admin'],
   },
];
