interface ISectionHeader {
   title: string;
   description: string;
}

const SectionHeader = ({ title, description }: ISectionHeader) => {
   return (
      <div className='flex flex-col gap-7 text-center'>
         <h1 className='text-5xl font-bold'>{title}</h1>
         <p className='text-[18px] font-medium text-gray-400 px-[18rem]'>{description}</p>
      </div>
   );
};

export default SectionHeader;
