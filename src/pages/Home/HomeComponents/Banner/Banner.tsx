import banner from '../../../../assets/banner.jpg';
import { Link } from 'react-router-dom';
const Banner = () => {
   return (
      <section
         className='relative'
         style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))' }}
      >
         <img src={banner} alt='' className='h-[600px] w-full object-cover object-top' />

         <div
            className='absolute top-0 flex flex-col gap-7 justify-center items-center w-full h-full text-white px-[2rem] md:px-[5rem] lg:px-[10rem] xl:px-[20rem] text-center'
            style={{
               backgroundImage: 'linear-gradient(rgba(122, 122, 122, 0.247), rgba(0, 0, 0, 0.705))',
            }}
         >
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold lg:leading-[1.5]'>
               Open Your Hands For The Peoples Who Are More In Need
            </h1>
            <p className='text-xl px-[2rem] lg:px-[5rem]'>
               In Bangladesh more than 30% of the population lived below the poverty line. So open
               your hand, donate now and save the people.
            </p>
            <Link to='' target='_blank'>
               <button className='bg-[#A6B6F8] py-[10px] px-[20px] rounded-lg text-xl text-[#041F60] font-semibold flex justify-center items-center'>
                  Donate Now
               </button>
            </Link>
         </div>
      </section>
   );
};

export default Banner;
