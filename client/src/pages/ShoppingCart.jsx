import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import CartProduct from '../components/CartProduct';

import { removeFromCart, decreaseCart, addToCart, getTotals, clearCart } from '../store/cart-slice';
import store from '../store';
import OrderSuccessModal from '../components/Admin/OrderSuccessModal';
import MapsModal from '../components/MapsModal';

import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';



const ShoppingCart = () => {
  /*   const { mutate } = useMutation(createOrder); */
  const cart = useSelector((store) => store?.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const userId = useSelector((store) => store.auth.currentUser._id);

  /*  const productIds = cart?.cartItems?.map((item) => ({ product: item._id, cartQuantity: item.cartQuantity })); */

  const [onClose, setOnClose] = useState(false);






  const [formState, setFormState] = useState({
    userId: userId,
    products: cart?.cartItems,
    amount: cart.totalPrice,
    provider: null,
    address: {
      street: 'İstiklal Caddesi',
      city: 'İstanbul',
      country: 'Turkey'
    },
    status: 'Bekleniyor',
    deliveryCode: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/orders`,
        formState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId
          }
        }
      );
      toast.success('Order created successfully!');
      dispatch(clearCart());
      setIsOpen(true);
      return response.data;
    } catch (error) {
      toast.error('An error occurred while creating the order');
      throw error;
    }
  };



  const handleOrder = (event) => {
    event.preventDefault();

    createOrder();
  };


  const continueShoppingClickHandler = () => {
    history.goBack();
  };

  const { data: users, isLoading } = useQuery(['users'], async () => {
    const response = await axios.get('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,

      }
    },)


    return response.data;
  });

  const adminUsers = users?.filter(user => user.isAdmin === true) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

 


  return (
    <>
      <OrderSuccessModal isOpen={isOpen} setIsOpen={setIsOpen} />
     

      <section className='px-8 py-4'>
        <h1 className='uppercase mt-4 mb-8 text-4xl text-center'>SEPETINIZ</h1>
        <MapsModal onClose={onClose} setOnClose={setOnClose} adminUsers={adminUsers} />
        <div className='grid sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
          <div>
            <a
              onClick={continueShoppingClickHandler}
              className='text-sm lg:text-md cursor-pointer uppercase block p-4 border-2 rounded-lg  hover:bg-sky-500 hover:text-white transition ease-out duration-500'
            >
              Alişverile Devam Et
            </a>
          </div>
          <div className='flex justify-between items-center'>
            <p className='mr-4 cursor-pointer'>
              Sepet ({cart?.totalQantity})
            </p>

            {/* <a className='underline cursor-pointer'>Your Wishlist (0)</a> */}
          </div>
          <div>
            <a
              onClick={() => setOnClose(true)}
              className='text-sm lg:text-md cursor-pointer uppercase block p-4 border-2 rounded-lg  hover:bg-sky-500 hover:text-white transition ease-out duration-500'
            >
              Kırtasiye Seç
            </a>
          </div>
          <div className='w-full flex'>
            <select
              onChange={(e) => setFormState({ ...formState, provider: e.target.value })}
              className="block appearance-none w-full bg-white border-2  hover:border-gray-500 px-4 py-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              {
                adminUsers?.map((admin, key) => (

                  <option key={key} value={admin._id}>{admin.username}</option>
                ))
              }

            </select>

          </div>
        </div>
        <div className='my-12 grid gap-8 lg:grid-cols-[2fr_1fr]'>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase ">
                <tr>
                  <th scope="col" className="text-start py-3 px-6">
                    <span className="sr-only">Fotograf</span>
                  </th>
                  <th scope="col" className=" text-start py-3 px-6">
                    Ürün
                  </th>
                  <th scope="col" className=" text-start py-3 px-6">
                    Adet
                  </th>
                  <th scope="col" className=" text-start py-3 px-6">
                    Fiyat
                  </th>
                  <th scope="col" className=" text-start py-3 px-6">
                    Ürünü Çıkar
                  </th>
                </tr>
              </thead>
              <tbody>


                {
                  cart && cart.cartItems?.map((product) => (
                    <CartProduct key={product._id} product={product} />
                  ))

                }
              </tbody>
            </table>
          </div>

          <div>
            <div className='border rounded-xl p-4'>
              <h1 className='uppercase text-4xl mb-8'>SİPARİŞ ÖZETİ</h1>
              <div className='flex justify-between mb-8'>
                <span className='capitalize'>Toplam</span>
                <span>₺ {cart?.totalPrice}</span>
              </div>
              <div className='flex justify-between mb-8'>
                <span className='capitalize'>KDV</span>
                <span>₺ 00.00</span>
              </div>
              <div className='flex justify-between mb-8'>
                <span className='capitalize'>İndirimi</span>
                <span>-₺ 00.00</span>
              </div>
              <div className='flex justify-between mb-8'>
                <span className='capitalize font-bold text-2xl'>Toplam</span>
                <span className='font-bold text-2xl'>₺ {cart?.totalPrice}</span>
              </div>
            </div>
            <div className='mt-2'>

              <a
                onClick={handleOrder}
                className='text-sm lg:text-md cursor-pointer text-center uppercase block p-4 border-2 hover:text-black hover:border-black hover:bg-white bg-sky-500 rounded-lg text-white transition ease-out duration-500'>
                {createOrder.isLoading ? "Yükleniyor..." : "Spariş Ver"}
              </a>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ShoppingCart;
