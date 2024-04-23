
import { useEffect } from 'react';
import store from '../store';
import { removeFromCart, decreaseCart, addToCart, getTotals } from '../store/cart-slice';
import { useSelector, useDispatch } from 'react-redux'
const CartProduct = ({ product }) => {
  const dispatch = useDispatch()

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }

  store.dispatch(getTotals())
  const cart = useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(getTotals())
  }, [cart])


  const hundleDecreaseCart = (product) => {
    dispatch(decreaseCart(product))
  }


  const hundleIncreaseCart = (product) => {
    dispatch(addToCart(product))
  }

  console.log(product);
  return (

   
     

            <tr className="bg-white border-b   hover:bg-gray-50 ">
              <td className="p-4 w-32">
                <img src={product.image} alt="Apple Imac" />
              </td>
              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-black">
                {product.title}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-3">

                  <div className="flex h-8  text-gray-600">
                    <button
                      onClick={() => hundleDecreaseCart(product)}
                      className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-sky-500 hover:text-white">-</button>
                    <div className="flex  items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{product.cartQuantity}</div>
                    <button
                      onClick={() => hundleIncreaseCart(product)}
                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-sky-500 hover:text-white">+</button>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 font-semibold text-gray-900 dark:text-black">
                ₺ {product.cartQuantity * product.price}
              </td>
              <td className="py-4 px-6">
                <button onClick={() => handleRemoveFromCart(product)} className="font-medium text-4xl  hover:text-sky-500 transform hover:scale-105 transition duration-500 text-bold text-gray-600 dark:text-gray-500 ">
                  X
                </button>
              </td>
            </tr>


  );
};

export default CartProduct;
