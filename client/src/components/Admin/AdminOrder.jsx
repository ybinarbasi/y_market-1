import React, { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import axios from "axios";
import AdminOrderDetail from "./AdminOrderDetail";
import Loading from "../Loading";

function AdminOrder({ setIsOpen }) {
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((store) => store.auth);
  const { token } = useSelector((state) => state.auth);
  const providerId = currentUser._id;
  const {
    isLoading,
    isError,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders",providerId],
    queryFn: () => axios.get(`http://localhost:5000/api/orders/provider/${providerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });

  const [orderId, setOrderId] = useState();
  const [formReject, setFormReject] = useState({
    status: "Reddedildi",
  });
  const [formAccept, setFormAccept] = useState({
    status: "Hazırlanıyor",
  
  });

  const handleReject = (id) => {
    console.log('handleReject');
    setOrderId(id);
    updateStatusMutation.mutate(formReject);
    console.log(id);
  };

  const handleAccept = (id) => {
    console.log('handleAccept');
    setOrderId(id);
  
    updateStatusMutation.mutate(formAccept);
    console.log(id);
  };

  const updateStatusMutation = useMutation(async (formData) => {
    console.log(orderId);
    console.log(formData);
    try {
      const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const { isSuccess } = updateStatusMutation;

  if (isSuccess) {
    queryClient.invalidateQueries('orders');
    /* toast.success('Durum başarıyla güncellendi'); */
  }

  if (isLoading) return <Loading />;

  if (error) return "An error has occurred: " + error.message;



  return (
    <>
      <div className="h-full py-4  border-2 rounded-lg overflow-hidden overflow-y-scroll  ">
        <h1 className="text-center mt-2 uppercase text-4xl">Siparişler</h1>
        <div className="grid  px-6 ">
          <div className="relative  sm:rounded-lg">
            <div className="flex items-center justify-between bg-white ">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Action
                  <svg
                    className="w-3 h-3 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>
              <label htmlFor="table-search" className="sr-only">
                Arama
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 "
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search for users"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 p-2">

              {orders &&
                orders.data?.map((order) => (
                  <div key={order._id} className=" px-2">
                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                      <div className="bg-white shadow rounded-lg">
                        <div className="p-4 sm:px-8 ">
                          {/*  <ul className=" flex w-full  items-center justify-between">
                            {
                              order.products.map((product, key) => (


                                <li key={key} className="flex w-full flex-row items-center  py-2  justify-between   ">

                                  <div className="shrink-0 ">
                                    <img
                                      className="h-24 w-24 max-w-full rounded-lg object-cover"
                                      src={product.image}
                                      alt=""
                                    />
                                  </div>

                                  <div className="relative   flex-col justify-between">
                                    <div className=" text-center ">

                                      <p className="text-base font-semibold text-gray-900">
                                        {product.cartQuantity} X ₺{product.cartQuantity * product.price}.00
                                      </p>
                                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                        quantity: {product.cartQuantity}
                                      </p>

                                    </div>
                                  </div>
                                </li>
                              ))
                            }

                          </ul> */}

                          <ul className="flex flex-wrap w-full">
                            {order.products.map((product, key) => (
                              <li key={key} className="flex flex-col p-2">
                                <div className="flex items-center justify-center">
                                  <img
                                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                                    src={product.image}
                                    alt=""
                                  />
                                </div>
                                <div className="flex flex-col items-center mt-2">
                                  <p className="text-base font-semibold text-gray-900">
                                    {product.cartQuantity} X ₺{product.cartQuantity * product.price}.00
                                  </p>
                                  <p className="text-sm text-gray-400">Quantity: {product.cartQuantity}</p>
                                </div>
                              </li>
                            ))}
                          </ul>


                          <div className="mt-6 border-t border-b py-2">
                            <div className="  ">
                              <p className="text-sm text-gray-700">
                                <span>Username: </span>
                                {order?.userId?.username}
                              </p>

                              <p className="text-sm text-gray-700">
                                <span>Email: </span>
                                {order?.userId?.email}
                              </p>

                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Durum:</p>
                            <p className="text-2xl font-semibold text-gray-900">
                              <div className="flex flex-row justify-center items-center gap-1">

                                <div className={`${order.status == "Reddedildi" ? " bg-sky-500 h-2 w-2 rounded-full " : "bg-teal-500 h-2 w-2 rounded-full  "}`}></div>
                                <span className={`${order.status == "Reddedildi" ? "text-xs font-normal text-sky-500 " : "text-xs font-normal text-teal-500"}`}>
                                  {order.status}
                                </span>
                              </div>


                            </p>
                          </div>
                          <div className=" flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Toplam</p>
                            <p className="text-2xl font-semibold text-gray-900">
                              <span className="text-xs font-normal text-gray-800">
                                ₺{order.amount}.00
                              </span>{" "}


                            </p>
                          </div>

                          {
                            order.status == "Bekleniyor" ? (


                              <div className="mt-2 flex  gap-2">
                                <button

                                  className="group text-sm inline-flex w-full items-center justify-center rounded-md bg-teal-500 px-2 py-3  font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                  onClick={() => handleAccept(order._id)}
                                >
                                  Kabul et
                                </button>

                                <button

                                  className="group inline-flex w-full items-center justify-center rounded-md bg-sky-500 text-sm  px-2 py-3 font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                  onClick={() => handleReject(order._id)}
                                >
                                  Reddet
                                </button>
                              </div>
                            ) : order.status == "Reddedildi" ? (
                              <div className="mt-2 flex  gap-2">
                                <button
                                  className="group text-sm inline-flex w-full items-center justify-center rounded-md bg-sky-500 px-2 py-3  font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                 
                                >
                                  Spariş İptal edildi
                                </button>


                              </div>
                            ) : (

                              <div className="mt-2 flex  gap-2">
                                <Link
                                  to={`/admin/order/${order._id}`}
                                  onClick={() => setIsOpen(true)}
                                  className="group text-sm inline-flex w-full items-center justify-center rounded-md bg-teal-500 px-2 py-3  font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"

                                >
                                  Spariş Detayı
                                </Link>

                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>





          </div>
        </div>

      </div>

    </>
  );
}

export default AdminOrder;
