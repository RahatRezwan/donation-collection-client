/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useAppDispatch, useAppSelector } from '../../../Redux/app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DataTable from '../../../components/DataTable/DataTable';
import { MdDelete, MdEdit } from 'react-icons/md';
import HomeLoader from '../../../components/Loaders/HomeLoader/HomeLoader';

import {
   deleteDonations,
   fetchDonations,
} from '../../../Redux/features/donationSlice/donationSlice';
import CreateAndEditDonationModal from '../../../components/Modals/CreateAndEditDonationModal/CreateAndEditDonationModal';

const DonationsList = () => {
   const [setPageTitle]: [setPageTitle: React.Dispatch<React.SetStateAction<string>>] =
      useOutletContext();
   useEffect(() => {
      setPageTitle('Donations List');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
   const [editDonation, setEditDonation] = useState<any>();

   const { donations, isLoading } = useAppSelector((state) => state.donations);
   const dispatch: any = useAppDispatch();
   useEffect(() => {
      dispatch(fetchDonations());
   }, [dispatch]);

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
                        dispatch(fetchDonations());
                     }}
                     className=' text-xl text-red-500'
                  >
                     <MdDelete />
                  </button>
               </div>
            ),
         },
      ],
      [dispatch],
   );

   return (
      <div className='bg-white my-3 h-[calc(100vh-4.5rem)] p-5 border border-gray-300 rounded-lg'>
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
            fetchFunction={() => dispatch(fetchDonations())}
         />
      </div>
   );
};

export default DonationsList;
