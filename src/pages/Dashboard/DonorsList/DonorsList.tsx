/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useAppDispatch, useAppSelector } from '../../../Redux/app/hooks';
import { useEffect, useMemo } from 'react';
import { deleteDonor, fetchDonors } from '../../../Redux/features/donorSlice/donorSlice';
import { useOutletContext } from 'react-router-dom';
import DataTable from '../../../components/DataTable/DataTable';
import { MdDelete, MdEdit } from 'react-icons/md';
import HomeLoader from '../../../components/Loaders/HomeLoader/HomeLoader';

const DonorsList = () => {
   const [setPageTitle]: [setPageTitle: React.Dispatch<React.SetStateAction<string>>] =
      useOutletContext();
   useEffect(() => {
      setPageTitle('Donors List');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { donors, isLoading } = useAppSelector((state) => state.donors);
   const dispatch: any = useAppDispatch();
   useEffect(() => {
      dispatch(fetchDonors());
   }, [dispatch]);

   console.log(donors);
   const data = useMemo(() => donors, [donors]);
   const columns = useMemo(
      () => [
         {
            Header: 'Name',
            Cell: ({ row }: any) => (
               <div className='flex items-center gap-2'>
                  <img
                     src={row?.original?.profilePic ?? ''}
                     alt=''
                     className='w-10 h-10 rounded-full object-cover'
                  />
                  <p>
                     {row?.original?.firstName} {row?.original?.lastName}
                  </p>
               </div>
            ),
         },
         {
            Header: 'Email',
            accessor: 'email',
         },
         {
            Header: 'Phone',
            accessor: 'phone',
         },
         {
            Header: 'Present Address',
            accessor: 'presentAddress',
         },
         {
            Header: 'Permanent Address',
            accessor: 'permanentAddress',
         },
         {
            Header: ' ',
            Cell: ({ row }: any) => (
               <div className=' items-center gap-2 hidden group-hover:flex'>
                  {/* <button className=' text-xl text-dark-blue'>
                     <MdEdit />
                  </button> */}
                  <button
                     onClick={() => dispatch(deleteDonor(row?.original?.id))}
                     className=' text-xl text-red-500'
                  >
                     <MdDelete />
                  </button>
               </div>
            ),
         },
      ],
      [],
   );

   return (
      <div className='bg-white my-3 h-[calc(100vh-4.5rem)] p-5 border border-gray-300 rounded-lg'>
         {isLoading ? <HomeLoader /> : <DataTable data={data} columns={columns} />}
      </div>
   );
};

export default DonorsList;
