import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from '../request-methods';
import { removeFromCart, decreaseCart, addToCart, getTotals } from '../store/cart-slice';

import Navbar from '../layout/Navbar';
import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import Newsletter from '../components/Newsletter';
import Pdfviewer from '../components/Pdfviewer';
import axios from 'axios';
const fetchProducts = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/products/${id}`);
  return response.data;
};

const SingleProduct = () => {
  const [modal, setModal] = useState(false)
  const { id } = useParams();
  const dispatch = useDispatch();

  let [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };
  const { data: product, isLoading, isError } = useQuery(['product', id], () => fetchProducts(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user products</div>;
  }





  console.log(product);

  return (
    <>



      {/*  <div>

        <div className="min-w-screen min-h-screen bg-white-300 flex items-center p-5 lg:p-2  overflow-hidden relative">
          <div className="w-full max-w-7xl rounded bg-white shadow-2xl  lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <img src={product.image} className="w-[400px] rounded-lg relative z-10" alt="" />
                  <div className="border-4 border-sky-400 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full grid grid-flow-row  ">
                <div className="mb-10">
                  <p>Kitap adı</p>
                  <h1 className="font-bold uppercase text-2xl mb-5">{product.title}</h1>
                  <p className="text-lg"> {product.description} </p>
                </div>



                <div className='flex items-center justify-start py-3 '>
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity--);
                    }}
                  >
                    <Remove />
                  </span>
                  <span className='mx-2 text-xl h-10 w-10 rounded-2xl border flex justify-center items-center'>
                    {quantity}
                  </span>
                  <span
                    className='cursor-pointer'
                    onClick={() => {
                      setQuantity(quantity++);
                    }}
                  >
                    <Add />
                  </span>
                </div>
                <div className=' flex flex-col gap-6 '>
                  <div className="inline-block ">
                    <span className="text-2xl leading-none align-baseline">$</span>
                    <span className="font-bold text-5xl leading-none align-baseline">{product.price}</span>

                  </div>

                  <div >

                    <div className="inline-block align-bottom ">

                      <button onClick={addToCartHandler} className="bg-white-300 border-2 opacity-75 hover:opacity-100 text-black hover:text-white transition transform hover:-translate-y-0.5 hover:bg-sky-500 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> SEPETE EKLE                                        </button>
                    </div>


                    {
                      product?.isShow &&
                      <button

                        onClick={() => setModal(true)}
                        className="text-white py-2 px-2 mx-2 w-40 uppercase rounded-full  bg-gray-900 hover:bg-sky-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      >
                        PDF Görüntüle
                      </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pdfviewer product={product} isvisible={modal} onClose={() => setModal(false)} /> */}


      <section className="py-4 sm:py-4">
        
        <div className="container mx-auto px-4 ">
          <div className="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12  lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2 lg:row-end-2">
              <div className="lg:flex lg:items-center gap-24">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    <img
                      className="w-3/2 object-cover"
                      src={product.image}
                      alt=""
                    />
                  </div>
                </div>



              </div>
            </div>

            <div className="lg:col-span-3 lg:row-span-2 lg:row-end-2 p-2 lg:p-12 ">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-5 flex items-center">
                <div className="flex items-center">
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                </div>
                <p className="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
              </div>

              <h2 className=" text-base text-gray-900">{product.description}</h2>

              <div className="sm:order-1 mt-10">
                <div className="flex h-8  text-gray-600">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white"
                  >
                    -
                  </button>
                  <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-green-500 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">

                  <h1 className="text-3xl font-bold">
                    ${product.price}.00
                  </h1>

                </div>
                <div className='flex justify-center gap-2'>

                  <button
                    onClick={() => addToCartHandler(product)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Add to cart
                  </button>
                  {
                    product?.isShow &&
                    <button
                      type='button'
                      onClick={() => setModal(true)}
                      className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white hover:border-green-500 hover:text-green-500 transition-all duration-200 ease-in-out focus:shadow hover:bg-white"
                    >
                      PDF Görüntüle
                    </button>}
                </div>


              </div>


            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    title=""
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  >
                    {" "}
                    Description{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                  >
                    Reviews
                    <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                      {" "}
                      1,209{" "}
                    </span>
                  </a>
                </nav>
              </div>

              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
                <p className="mt-4">
                  We free deliver to your address within 2-3 days
                </p>
                <h1 className="mt-8 text-3xl font-bold">
                  Your Satisfaction is Our goal
                </h1>
                <p className="mt-4">
                  Your Satisfaction is Our goal
                  1. We are offering customer Low price but high
                  quality food containers.

                </p>
                <p className="mt-4">
                  2. we offer free deliver option abow 100$ order to DMV area
                  DMV area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pdfviewer product={product} isvisible={modal} onClose={() => setModal(false)} /> 

    </>
  );
};

export default SingleProduct;
