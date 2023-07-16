import { GrUserAdmin } from 'react-icons/gr';
import { useState } from 'react';
import { LiaDonateSolid } from 'react-icons/lia';
import RegistrationForm from './RegistrationForm';

const Register = () => {
   const [modalName, setModalName] = useState<string>('');
   const [isOpen, setIsOpen] = useState<boolean>(false);
   return (
      <div className='flex justify-center gap-2 items-center h-[calc(100vh-4rem)]'>
         <button
            onClick={() => {
               setIsOpen(true);
               setModalName('admin');
            }}
            className='p-5 text-lg flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-lg hover:bg-gray-100'
         >
            <GrUserAdmin className='text-4xl' />
            <p>Register as Admin</p>
         </button>
         <button
            onClick={() => {
               setIsOpen(true);
               setModalName('donor');
            }}
            className='p-5 text-lg flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-lg hover:bg-gray-100'
         >
            <LiaDonateSolid className='text-4xl' />
            <p>Register as Donor</p>
         </button>

         {isOpen && (
            <RegistrationForm isOpen={isOpen} modalName={modalName} setIsOpen={setIsOpen} />
         )}
      </div>
   );
};

export default Register;
