/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MdDelete, MdEdit } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../Redux/app/hooks';
import {
   deleteDonations,
   fetchDonationByDonorId,
} from '../../../Redux/features/donationSlice/donationSlice';
import DataTable from '../../../components/DataTable/DataTable';
import HomeLoader from '../../../components/Loaders/HomeLoader/HomeLoader';
import { useEffect, useMemo } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import { useState } from 'react';
import CreateAndEditDonationModal from '../../../components/Modals/CreateAndEditDonationModal/CreateAndEditDonationModal';

const UserDonations = () => {
   const { user } = useContext(UserContext);
   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
   const [editDonation, setEditDonation] = useState<any>();
   const { donations, isLoading } = useAppSelector((state) => state.donations);
   const dispatch: any = useAppDispatch();
   useEffect(() => {
      dispatch(fetchDonationByDonorId(user?.donor?.id));
   }, [dispatch, user?.donor?.id]);
   const data = useMemo(() => donations, [donations]);
   const columns = useMemo(
      () => [
         {
            Header: 'Donation Plan',
            Cell: ({ row }: any) => (
               <div className='flex items-center gap-2'>
                  <p>{row?.original?.donation_plan ?? '-'}</p>
               </div>
            ),
         },
         {
            Header: 'Amount',
            accessor: 'amount',
         },
         {
            Header: 'Currency',
            accessor: 'currency',
         },
         {
            Header: 'Payment Method',
            accessor: 'paymentMethod',
         },
         {
            Header: 'Donor',
            Cell: ({ row }: any) => (
               <div className='flex items-center gap-2'>
                  <p>{row?.original?.donor?.email ?? '-'}</p>
               </div>
            ),
         },
         {
            Header: 'Created Time',
            accessor: 'createdAt',
         },
         {
            Header: ' ',
            Cell: ({ row }: any) => (
               <div className=' items-center gap-2 hidden group-hover:flex'>
                  <button
                     onClick={() => {
                        setEditDonation(row?.original);
                        setOpenEditModal(true);
                     }}
                     className=' text-xl text-dark-blue'
                  >
                     <MdEdit />
                  </button>
                  <button
                     onClick={() => {
                        dispatch(deleteDonations(row?.original?.id));
                        dispatch(fetchDonationByDonorId(user?.donor?.id));
                     }}
                     className=' text-xl text-red-500'
                  >
                     <MdDelete />
                  </button>
               </div>
            ),
         },
      ],
      [dispatch, user?.donor?.id],
   );
   return (
      <div className='h-full'>
         {donations.length === 0 ? (
            <div className='flex items-center justify-center h-full'>
               <p className='text-xl font-bold'>No Donations Data Found</p>
            </div>
         ) : (
            <>{isLoading ? <HomeLoader /> : <DataTable data={data} columns={columns} />}</>
         )}
         <CreateAndEditDonationModal
            isOpen={openEditModal}
            setIsOpen={setOpenEditModal}
            edit={true}
            editData={editDonation}
            fetchFunction={() => dispatch(fetchDonationByDonorId(user?.donor?.id))}
         />
      </div>
   );
};

export default UserDonations;
