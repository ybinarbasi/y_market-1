import React from 'react';

import Category from './Category';

const Categories = () => {
  return (
    <section className=' p-2 md:p-8 lg:p-12' id='categories '>
      <h1 className='text-4xl  font-black text-gray-900 dark:text-black flex flex-col justify-center items-center p-2 m-5 '> KATAGORİLER</h1>
      <div className=' grid gap-2 md:grid-cols-3 mb-2 grid-cols-2  lg:grid-cols-3 '>
        <Category
          category='notlar'
          image='https://images.pexels.com/photos/760709/pexels-photo-760709.jpeg?cs=srgb&dl=pexels-bich-tran-760709.jpg&fm=jpg'
        />
        <Category
          category='yayin'
          image='https://images.pexels.com/photos/7034644/pexels-photo-7034644.jpeg?cs=srgb&dl=pexels-george-milton-7034644.jpg&fm=jpg'

        />
        <Category
          category='Kitaplar'
          image='https://images.pexels.com/photos/415078/pexels-photo-415078.jpeg?cs=srgb&dl=pexels-pixabay-415078.jpg&fm=jpg'

        />
      </div>

    </section>
  );
};

export default Categories;
