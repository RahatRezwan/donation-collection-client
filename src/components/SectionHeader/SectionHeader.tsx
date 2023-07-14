interface ISectionHeader {
   title: string;
   description: string;
}

const SectionHeader = ({ title, description }: ISectionHeader) => {
   return (
      <div className='flex flex-col gap-7 text-center'>
         <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>{title}</h1>
         <p className='text-[18px] px-[2rem] lg:px-[18rem] font-medium text-gray-400'>
            {description}
         </p>
      </div>
   );
};

export default SectionHeader;
