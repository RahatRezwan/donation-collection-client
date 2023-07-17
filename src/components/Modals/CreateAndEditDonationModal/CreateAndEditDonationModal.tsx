/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/InputField';
import { GrClose } from 'react-icons/gr';
import {
   createDonations,
   updateDonations,
} from '../../../Redux/features/donationSlice/donationSlice';
import { useAppDispatch } from '../../../Redux/app/hooks';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';

interface Props {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   edit?: boolean;
   editData?: any;
   donation_plan?: string;
   amount?: string | number | undefined;
   fetchFunction?: () => void;
}

const CreateAndEditDonationModal = ({
   isOpen,
   setIsOpen,
   edit,
   editData,
   amount,
   donation_plan,
   fetchFunction,
}: Props) => {
   const { user } = useContext(UserContext);
   const donor = user?.donor ?? null;
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const [loading, setLoading] = React.useState<boolean>(false);
   const navigate = useNavigate();

   const closeModal = () => {
      reset();
      setIsOpen(false);
   };

   const dispatch = useAppDispatch();

   const onSubmit = async (data: any) => {
      setLoading(true);
      const newDonation = {
         amount: Number(data.amount),
         donation_plan: data.donation_plan,
         currency: data.currency,
         paymentMethod: data.paymentMethod,
         donor: donor?.id,
         createdAt: new Date().toLocaleString(),
      };

      await dispatch(createDonations(newDonation)).then((res: any) => {
         if (res.meta.requestStatus === 'fulfilled') {
            setLoading(false);
            closeModal();
            navigate('/dashboard');
         }
      });
   };

   const handleEdit = async (data: any) => {
      setLoading(true);
      const updateDonation = {
         amount: Number(data.amount),
         donation_plan: data.donation_plan,
         currency: data.currency,
         paymentMethod: data.paymentMethod,
         donor: editData?.donor?.id,
         updatedAt: new Date().toLocaleString(),
      };

      await dispatch(updateDonations({ id: editData?.id, data: updateDonation })).then(
         (res: any) => {
            if (res.meta.requestStatus === 'fulfilled') {
               setLoading(false);
               closeModal();
               fetchFunction && fetchFunction();
            }
         },
      );
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
                              <p>Create New Donation</p>
                              <button
                                 onClick={() => closeModal()}
                                 className='border border-gray-300 rounded-lg hover:bg-gray-300 p-1'
                              >
                                 <GrClose />
                              </button>
                           </div>

                           <div>
                              <form
                                 onSubmit={handleSubmit(edit ? handleEdit : onSubmit)}
                                 className='w-full h-[50%] m-auto items-center bg-white rounded-lg'
                              >
                                 <div className='px-5 py-2'>
                                    {/* body start */}
                                    <div className='flex flex-col gap-4 w-full mx-auto p-3'>
                                       {/* Amount */}
                                       <div className='flex flex-col lg:flex-row items-center gap-2'>
                                          <InputField
                                             label='Amount'
                                             name='amount'
                                             defaultValue={
                                                edit ? editData?.amount : amount ? amount : ''
                                             }
                                             register={register}
                                             placeholder='Enter Your Donation Amount'
                                             required={true}
                                             errorField={errors?.amount}
                                          />
                                          <InputField
                                             label='Currency'
                                             name='currency'
                                             register={register}
                                             defaultValue={edit ? editData?.currency : 'Taka'}
                                             placeholder='Enter Your Donation Currency'
                                             required={true}
                                             errorField={errors?.currency}
                                          />
                                       </div>

                                       {/* Donation Type */}
                                       <InputField
                                          label='Enter Donation plan'
                                          name='donation_plan'
                                          defaultValue={
                                             edit
                                                ? editData?.donation_plan
                                                : donation_plan
                                                ? donation_plan
                                                : ''
                                          }
                                          placeholder='Personal Donation, Food For Poor, etc.'
                                          register={register}
                                       />
                                       {/* payment method */}
                                       <InputField
                                          label='Enter Payment Method'
                                          name='paymentMethod'
                                          defaultValue={edit ? editData?.paymentMethod : ''}
                                          placeholder='Bkash, Nagad, Rocket, etc.'
                                          register={register}
                                       />

                                       {edit || (
                                          <div className='flex gap-2'>
                                             {/* donor name */}
                                             <InputField
                                                label='Donor Name'
                                                name='donorName'
                                                defaultValue={
                                                   donor?.firstName + ' ' + donor?.lastName
                                                }
                                                register={register}
                                             />

                                             {/* donor name */}
                                             <InputField
                                                label='Donor Email'
                                                name='donorEmail'
                                                defaultValue={donor?.email ?? ''}
                                                register={register}
                                             />
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 <div className='absolute bottom-0 w-full flex gap-2 justify-end items-center border-t border-border bg-white py-3 px-4 z-20'>
                                    <button
                                       type='button'
                                       onClick={() => closeModal()}
                                       className='border text-md px-10 py-[6px] rounded-lg bg-white text-dark-blue transition hover:border-red-500 hover:text-white hover:bg-red-500 hover:delay-100'
                                    >
                                       Cancel
                                    </button>
                                    <button
                                       type='submit'
                                       className='border text-md px-10 py-[6px] rounded-lg bg-green-500 text-white transition  hover:bg-transparent hover:border-green-500 hover:text-green-500 hover:delay-100'
                                    >
                                       Donate
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

export default CreateAndEditDonationModal;
