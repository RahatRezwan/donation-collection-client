/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import food from '../../../../assets/icons/food.png';
import medicine from '../../../../assets/icons/medicine.svg';
import shelter from '../../../../assets/icons/shelter.png';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateAndEditDonationModal from '../../../../components/Modals/CreateAndEditDonationModal/CreateAndEditDonationModal';

const DonatePlans = () => {
   const { user } = useContext(UserContext);
   const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
   const [donatePlan, setDonatePlan] = useState<string>('');
   const navigate = useNavigate();
   const plans = [
      {
         title: 'Food for poor family',
         description:
            'Food problem is a biggest problem of our country. More than 40% people are starving. Our Food For Poor plan helps them to overcome their starvation problem.',
         bg_color: 'bg-blue-300',
         icon: food,
      },
      {
         title: 'Shelter for poor family',
         description:
            'In Bangladesh more than 5 millions peoples are homeless. and 124 million live in mud houses and slums. Our shelter for poor plan is for providing them a safe house.',
         bg_color: 'bg-red-300',
         icon: shelter,
      },
      {
         title: 'Health Care for poor family',
         description:
            'Another big problem for poor is health problem. They cannot get proper treatment and cannot buy medicine when they needed. Our healthcare plan will help them get proper healthcare facilities without any cost.',
         bg_color: 'bg-green-300',
         icon: medicine,
      },
   ];
   return (
      <section
         id='donate-plans'
         className='min-h-[calc(100vh-10rem)] my-[5rem] flex flex-col gap-14 justify-center items-center w-[95%] max-w-[1250px] mx-auto'
      >
         {/* section header */}
         <SectionHeader
            title='Our Donation Plans'
            description='We have three different donation plan. You can chose your favorite one or you can donate in all our plans.'
         />

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {plans.map((plan, index) => (
               <div
                  key={index}
                  className={`${plan.bg_color} bg-opacity-50 text-left p-8 rounded-lg text-[15px] font-bold flex flex-col gap-6`}
               >
                  <img src={plan.icon} alt='' className='w-[3.5rem]' />
                  <h2
                     onClick={() => {
                        user?.email
                           ? user?.role === 'donor'
                              ? (setOpenDonateModal(true), setDonatePlan(plan.title))
                              : toast.error('You Need a donor Account')
                           : (navigate('/login'), toast.error('You Need to Login'));
                     }}
                     className='text-xl hover:underline cursor-pointer'
                  >
                     {plan.title}
                  </h2>
                  <p className='font-medium text-justify text-[#949290]'>{plan.description}</p>
               </div>
            ))}
         </div>
         <CreateAndEditDonationModal
            isOpen={openDonateModal}
            setIsOpen={setOpenDonateModal}
            donation_plan={donatePlan}
         />
      </section>
   );
};
export default DonatePlans;
