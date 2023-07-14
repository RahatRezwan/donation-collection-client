import { useState } from 'react';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';

const DonateToday = () => {
   const donationAmount = [100, 200, 500, 1000, 5000, 10000];
   const [donateAmount, setDonateAmount] = useState<number>();
   return (
      <section
         id='donate-today'
         className='min-h-[calc(100vh-10rem)] my-[5rem] flex flex-col gap-14 justify-center items-center text-center w-[95%] max-w-[1250px] mx-auto'
      >
         {/* section header */}
         <SectionHeader
            title='Donate Today'
            description='Donate for the poverty. Give them food, shelter, education facilities. Enter your
               Amount and Press Donate Now.'
         />

         <div className='grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
            {donationAmount.map((amount, index) => (
               <button
                  onClick={() => setDonateAmount(amount)}
                  key={index}
                  className={`p-12 bg-opacity-20 rounded-lg text-xl lg:text-2xl ${
                     amount === donateAmount
                        ? 'text-dark-blue bg-light-blue border-dark-blue'
                        : 'text-gray-500 bg-gray-400 border-transparent'
                  } font-bold border-2`}
               >
                  {amount}TK
               </button>
            ))}
         </div>

         <div className='w-full flex flex-col gap-5 justify-center'>
            <input
               type='number'
               name='donateAmount'
               id=''
               defaultValue={donateAmount}
               onChange={(e) => setDonateAmount(Number(e.target.value))}
               className='w-[80%] mx-auto border-b-2 text-center text-lg lg:text-2xl font-semibold p-5 focus:outline-none'
               placeholder='Write Your Amount (Taka)'
            />
            <button className='bg-light-blue py-[10px] px-[20px] rounded-lg text-xl text-dark-blue font-semibold flex justify-center items-center w-[10rem] mx-auto'>
               Donate Now
            </button>
         </div>
      </section>
   );
};

export default DonateToday;
