import React from 'react';

import { Link } from 'react-router-dom';

const Category = ({ category,image }) => {
  return (
    <Link to={`/categories/${category}`}>
      
      <figure className='relative hover:shadow-xl rounded-3xl m-3 transform hover:scale-105 transition duration-300 '>
        <img
          src={image}
          alt={category}
          className='w-full h-full rounded-3xl object-cover max-h-[30rem] '
        />
        <figcaption className='rounded-3xl bg-black/30 absolute z-100 top-0 left-0 w-full h-full flex flex-col justify-center items-center p-2'>
          <h2 className='mb-4 p-2 uppercase text-xl sm:text-lg md:text-3xl text-white font-bold text-center'>
            {category}
          </h2>
          <button className='border p-2 bg-sky-500 hover:text-black text-sm md:text-sm rounded-xl  hover:bg-white hover:border-sky-500 text-white transition ease-out	duration-500'>
           Hemen Gör
          </button>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Category;
