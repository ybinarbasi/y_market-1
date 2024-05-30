import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Product from './Product';

import Loading from './Loading';
const fetchProducts = async (category, title) => {
  const params = {};
  if (category && category !== 'allproduct') {
    params.category = category;
  }
  if (title) {
    params.title = title;
  }

  const response = await axios.get('http://localhost:5001/api/products', {
    params,
  });

  return response.data;
};

const Products = ({ category, title }) => {
  const fetchCategory = category === 'allproduct' ? '' : category;

  const { data: products, isLoading, error } = useQuery(
    ['products', fetchCategory, title],
    () => fetchProducts(fetchCategory, title),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    }
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='w-full'>


        <h1 className='text-4xl font-black text-gray-900 dark:text-black flex flex-col justify-center items-center p-4 '> ÜRÜNLER</h1>
        {
          isLoading ? (
            <Loading />
          ) : (
            <section className='pb-8 mx-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4' id='products'>
              {

                products.map((product) => (
                  <Product key={product._id} useProducts={product} />
                ))
              }

            </section>
          )
        }
      </div>
    </>
  );
};

export default Products;