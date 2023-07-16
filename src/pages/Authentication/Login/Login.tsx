/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/InputField/InputField';
import { Link } from 'react-router-dom';
import config from '../../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserProvider';

const Login = () => {
   const { setUser } = useContext(UserContext);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const [error, setError] = useState<string>('');

   const handleLogin = async (data: any) => {
      setError('');
      await axios
         .post(`${config.apiUrl}/auth/login`, data)
         .then((res: any) => {
            localStorage.setItem('token', res.data.data.accessToken);
            axios
               .get(`${config.apiUrl}/auth/user-data`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
               })
               .then((res: any) => {
                  setUser(res.data.data);
                  toast.success('Login Success');
                  reset();
               })
               .catch((err: any) => {
                  console.log(`error`, err.response);
                  setError(err.response.data.message);
                  toast.error(err.response.data.message);
               });
         })
         .catch((err: any) => {
            console.log(`error`, err.response);
            setError(err.response.data.message);
            toast.error(err.response.data.message);
         });
   };

   return (
      <div className='flex justify-center gap-2 items-center h-[calc(100vh-4rem)]'>
         <form
            onSubmit={handleSubmit(handleLogin)}
            className='w-[90%] md:w-[70%] lg:w-[45%] xl:w-[40%] border border-gray-300 rounded-lg p-5 flex flex-col gap-2'
         >
            <h1 className='text-center text-2xl font-bold'>Login To Your Account</h1>

            <InputField
               name='email'
               placeholder='Enter Your Valid Email'
               register={register}
               label='Email'
               errorField={errors.email}
               type='email'
               required={true}
            />
            <InputField
               name='password'
               placeholder='Enter Your Password'
               register={register}
               label='Password'
               errorField={errors.password}
               type='password'
               required={true}
            />
            {error && (
               <p className='text-base font-medium text-red-500 text-center'>{error}. Try Again</p>
            )}
            <button type='submit' className='btn-md mb-2'>
               Login
            </button>

            <div>
               <p>
                  Don't have an Account?{' '}
                  <Link to='/register'>
                     <strong className='text-dark-blue hover:underline'>Register</strong>
                  </Link>
               </p>
            </div>
         </form>
      </div>
   );
};

export default Login;
