import React from 'react';

import { Send } from '@mui/icons-material';

const Newsletter = () => {
  return (
    <section className=' py-32 px-8 flex flex-col items-center'>
      <h2 className='font-bold text-5xl sm:text-6xl md:text-7xl mb-10'>
        ILETIŞIM
      </h2>
      <p className='text-2xl mb-10 text-center w-1/2 font-urbanist'>
        Proje hakkında daha fazla bilgi almak, görüş ve önerilerinizi paylaşmak veya herhangi bir sorunuz varsa, bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan mutluluk duyarız.      </p>
      <form
        action=''
        className='border rounded-lg overflow-hidden flex flex-nowrap'
      >
        <input
          type='text'
          placeholder='Your email'
          className='px-6 py-2 focus:outline-none'
        />
        <button className='bg-sky-600 px-6 py-2 text-white'>
          <Send />
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
