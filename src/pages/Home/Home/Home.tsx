import Banner from '../HomeComponents/Banner/Banner';
import DonatePlans from '../HomeComponents/DonatePlans/DonatePlans';
import DonateToday from '../HomeComponents/DonationToday/DonateToday';

const Home = () => {
   return (
      <div className='font-inter'>
         <Banner />
         <DonateToday />
         <DonatePlans />
      </div>
   );
};

export default Home;
