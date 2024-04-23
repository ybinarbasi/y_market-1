import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import CartProduct from '../components/CartProduct';
import { removeFromCart, decreaseCart, addToCart, getTotals } from '../store/cart-slice';
import store from '../store';


const createOrder = async ({ user_id, products, amount, provider }) => {
  const productIds = products.map((item) => ({ _id: item._id, cartQuantity: item.cartQuantity }));
  const token = useSelector((store) => store.auth.token);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/orders',
      {
        user_id,
        productIds,
        amount,
        provider
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          id: user_id
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



const ShoppingCart = () => {
  const auth = useSelector((store) => store.auth);
  const { mutate } = useMutation(createOrder);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const [selectedOption, setSelectedOption] = useState('');
  console.log(selectedOption);
  const handleOrder = async () => {
    try {
      await mutate({
        user_id: auth.currentUser._id,
        products: cart.cartItems,
        amount: cart.totalPrice,
        provider: ''
      });
      // order created successfully, redirect to success page
      /* history.push('/order-success'); */
      console.log('ssssss');
    } catch (error) {
      console.log('error creating order:', error);
      // handle error
    }
  };

  cart && console.log(cart);
  useEffect(() => {
    dispatch(getTotals())
  }, [cart])

  const continueShoppingClickHandler = () => {
    history.goBack();
  };


  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
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

  console.log(adminUsers);
  return (
    <>
    
      <section className='px-8 py-4'>
        <h1 className='uppercase mt-4 mb-8 text-4xl text-center'>SEPETINIZ</h1>
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
            <p className='text-sm'>Kırtasiye seç :</p>
            {/* <a className='underline cursor-pointer'>Your Wishlist (0)</a> */}
          </div>
          <div className='w-full flex'>
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              className="block appearance-none w-full bg-white border-2  hover:border-gray-500 px-4 py-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              {
                adminUsers?.map((admin, key) => (

                  <option value={admin._id}>{admin.username}</option>
                ))
              }

            </select>

          </div>
        </div>
        <div className='my-12 grid gap-8 lg:grid-cols-[2fr_1fr]'>
          <div>
            {
              cart && cart?.cartItems.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
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
                className='text-sm lg:text-md cursor-pointer uppercase block p-4 border-2 hover:text-black hover:border-black hover:bg-white bg-sky-500 rounded-lg text-white transition ease-out duration-500'>
                Hemen Öde
              </a>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ShoppingCart;
