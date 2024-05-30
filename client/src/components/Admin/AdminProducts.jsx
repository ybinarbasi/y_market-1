import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import UpdateProductModal from './UpdateProductModal';

const fetchUserProducts = async (userId) => {
  const response = await axios.get(`http://localhost:5001/api/products?userID=${userId}`);
  return response.data;
};

function AdminProducts() {
  const userId = useSelector((store) => store.auth.currentUser?._id);
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();
  const [onClose, setOnClose] = useState(false)

  const { data: products, isLoading, error } = useQuery(
    ['userProducts', userId],
    () => fetchUserProducts(userId),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /*   const deleteProduct = async (userId) => {
      try {
        await axios.delete(
          `http://localhost:5001/api/products/${userId}`,
          {
            headers: {
              Authorization: `Barear ${token}`,
              id: userId,
            },
          }
        );
  
        queryClient.invalidateQueries("products");
      } catch (err) {
        console.log(err);
      }
    };
   */

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        }
      );
      // Invalidate the cache for the "products" query to reflect the changes made
      queryClient.invalidateQueries("products");

      console.log("Product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  }


  console.log(products);

  return (
    <div className="m-3 text-xl text-gray-900 font-semibold w-full overflow-hidden  ">
      <div className="mt-6 lg:mt-0 lg:px-2 ">
        <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
          <p className="text-gray-500 dark:text-gray-300 py-2">{products.length} Items</p>
          <div className="flex justify-center items-center">

          </div>
        </div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-screen ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0  text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
               Fotograf
                </th>
                <th scope="col" className="px-6 py-3">
                  Ürün Adı
                </th>
                <th scope="col" className="px-6 py-3">
                  Ürün Açıklaması
                </th>
                <th scope="col" className="px-6 py-3">
                  Fiyat
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, key) => (
                <tr key={key} className="bg-white border-b h-full ">
                  <td className="w-32 p-4">
                    <img src={product.image} alt="Apple Imac" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 text-black max-w-xs">
                    <p>{product.description}</p>

                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    ₺{product.price}.00
                  </td>
                  <td className=" p-8 flex flex-col  justify-center items-center  h-full ">
                    <button onClick={() => deleteProduct(product._id)} type="button" className="text-teal-500 hover:text-white border border-teal-500 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sil</button>
                    <button onClick={() => setOnClose(true)} type="button" className="text-teal-500 hover:text-white border border-teal-500 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Düzenle</button>

                  </td>
                  {
                    onClose ? (

                      <UpdateProductModal onClose={onClose} setOnClose={setOnClose} productId={product._id} product={product} />
                    ) : (
                      null
                    )
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </div>
  )
}

export default AdminProducts