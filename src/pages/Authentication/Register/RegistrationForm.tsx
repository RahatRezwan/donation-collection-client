/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../../components/InputField/InputField';
import config from '../../../config';
import { GrClose } from 'react-icons/gr';

interface Props {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   modalName: string;
}

const RegistrationForm = ({ isOpen, setIsOpen, modalName }: Props) => {
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm();
   const data = watch();
   const [loading, setLoading] = React.useState<boolean>(false);
   const navigate = useNavigate();

   const closeModal = () => {
      setIsOpen(false);
      reset();
      navigate('/login');
   };

   const onSubmit = (data: any) => {
      setLoading(true);
      const profileImg = data.profileImage[0];
      if (!data?.profileImage[0]) {
         setLoading(false);
         return toast.error('Profile image is required!');
      }

      const formData = new FormData();
      formData.append('image', profileImg);

      /* Host image to imgbb */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${config.imgbbKey}`, formData)
         .then((res) => {
            const newUser = {
               password: data.password,
               [modalName]: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  permanentAddress: data.permanentAddress,
                  presentAddress: data.presentAddress,
                  profilePic: res.data.data.url ?? undefined,
               },
            };
            console.log(newUser);
            axios
               .post(`${config.apiUrl}/users/create-${modalName}`, newUser)
               .then((res) => {
                  if (res.data.success) {
                     closeModal();
                     toast.success(res.data.message);
                  } else {
                     setLoading(false);
                     toast.error(res.data.message);
                  }
               })
               .catch((err) => {
                  setLoading(false);
                  toast.error(err.message);
               });
         })
         .catch((err) => {
            setLoading(false);
            console.error('cannot updload image');
         });
   };
   return (
      <>
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={() => {}}>
               <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-320'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
               >
                  <div className='fixed inset-0 bg-black bg-opacity-25' />
               </Transition.Child>

               <div className='fixed inset-0 overflow-y-auto font-inter'>
                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                     <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-320'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                     >
                        <Dialog.Panel className='w-full max-w-[1024px] h-[95vh] overflow-y-auto transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-sm transition-all relative'>
                           <div className='text-xl sticky top-0 font-semibold text-gray-90 text-center bg-white p-4 z-20 flex justify-between items-center'>
                              <p>
                                 Sign Up as <span className='capitalize'>{modalName}</span>
                              </p>
                              <button
                                 onClick={() => setIsOpen(false)}
                                 className='border border-gray-300 rounded-lg hover:bg-gray-300 p-1'
                              >
                                 <GrClose />
                              </button>
                           </div>

                           <div>
                              <form
                                 onSubmit={handleSubmit(onSubmit)}
                                 className='w-full h-[50%] m-auto items-center bg-white rounded-lg'
                              >
                                 <div className='px-5 py-2'>
                                    {/* body start */}
                                    <div className='flex flex-col gap-4 w-full mx-auto p-3'>
                                       {data?.profileImage?.length ? (
                                          <button
                                             type='button'
                                             className='flex relative overflow-hidden w-32 h-32 rounded-lg group'
                                          >
                                             <img
                                                src={URL.createObjectURL(data.profileImage[0])}
                                                alt={data.profileImage[0].name}
                                                className='w-full h-full'
                                             />
                                             <label className='group-hover:flex cursor-pointer flex-col justify-center items-center w-32 h-32 border-2 rounded-lg absolute bottom-0 bg-gray-5 opacity-70 hidden'>
                                                <div className='flex flex-col items-center justify-center pt-7'>
                                                   <FaCamera className='text-3xl text-gray-500' />
                                                </div>
                                                <input
                                                   type='file'
                                                   className='opacity-0'
                                                   {...register('profileImage', {
                                                      required: false,
                                                   })}
                                                />
                                             </label>
                                          </button>
                                       ) : (
                                          <div className='flex flex-col'>
                                             <label className='flex cursor-pointer flex-col justify-center items-center w-32 h-32 border-2 rounded-lg hover:bg-gray-100 hover:border-gray-300'>
                                                <div className='flex flex-col items-center justify-center pt-7'>
                                                   <FaCamera className='text-3xl text-gray-500' />
                                                </div>
                                                <input
                                                   type='file'
                                                   className='opacity-0'
                                                   {...register('profileImage', {
                                                      required: false,
                                                   })}
                                                />
                                             </label>
                                          </div>
                                       )}

                                       {/* name */}
                                       <div className='flex flex-col lg:flex-row items-center gap-2'>
                                          <InputField
                                             label='First Name'
                                             name='firstName'
                                             register={register}
                                             placeholder='Enter Your First Name'
                                             required={true}
                                             errorField={errors?.firstName}
                                          />
                                          <InputField
                                             label='Last Name'
                                             name='lastName'
                                             register={register}
                                             placeholder='Enter Your Last Name'
                                             required={true}
                                             errorField={errors?.lastName}
                                          />
                                       </div>

                                       {/* Email */}
                                       <InputField
                                          label='Enter Your Email'
                                          name='email'
                                          type='email'
                                          placeholder='Enter Your Email'
                                          register={register}
                                          required={true}
                                          errorField={errors?.email}
                                       />

                                       {/* Password */}
                                       <div className='flex flex-col lg:flex-row items-center gap-2'>
                                          <InputField
                                             label='Enter Your Password'
                                             name='password'
                                             type='password'
                                             placeholder='Enter Your Password'
                                             register={register}
                                             required={true}
                                             errorField={errors?.password}
                                          />

                                          {/* Confirm Password */}
                                          <InputField
                                             label='Confirm Your Password'
                                             name='confirmPassword'
                                             type='password'
                                             placeholder='Confirm Your Password'
                                             register={register}
                                             required={true}
                                             errorField={errors?.confirmPassword}
                                          />
                                       </div>

                                       {/* Permanent Address */}
                                       {modalName === 'donor' && (
                                          <div className='flex flex-col items-center gap-2'>
                                             <InputField
                                                label='Permanent Address'
                                                name='permanentAddress'
                                                placeholder='Enter your permanent address'
                                                register={register}
                                             />
                                             {/* Present Address */}
                                             <InputField
                                                label='Present Address'
                                                name='presentAddress'
                                                placeholder='Enter your present address'
                                                register={register}
                                             />
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 <div className='absolute bottom-0 w-full flex gap-2 justify-end items-center border-t border-border bg-white py-3 px-4 z-20'>
                                    <button
                                       type='button'
                                       onClick={() => setIsOpen(false)}
                                       className='border text-md px-10 py-[6px] rounded-lg bg-white text-dark-blue transition hover:border-red-500 hover:text-white hover:bg-red-500 hover:delay-100'
                                    >
                                       Cancel
                                    </button>
                                    <button
                                       type='submit'
                                       className='border text-md px-10 py-[6px] rounded-lg bg-green-500 text-white transition  hover:bg-transparent hover:border-green-500 hover:text-green-500 hover:delay-100'
                                    >
                                       Signup
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};

export default RegistrationForm;
