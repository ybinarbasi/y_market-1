import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const AdminOrderDetail = ({ isOpen, setIsOpen }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);

    const userId = useSelector((store) => store.auth.currentUser._id);
    const { isLoading, error, data } = useQuery(['order', id], async () => {
        const response = await axios.get(`http://localhost:5001/api/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                id: userId,
            },
        });
        return response.data;
    });

    const [formState, setFormState] = useState({
        status: data?.status || '',
        deliveryCode: data?.deliveryCode || '',
    });
    const updateStatus = async (formData) => {
        try {
            const response = await axios.patch(`http://localhost:5001/api/orders/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

const { mutate } = useMutation(updateStatus);
/* updateStatus.isSuccess &&  */
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('geldi');
    mutate(formState, {
        onSuccess: () => {
            toast.success("Durum başarıyla değiştirildi");
            queryClient.invalidateQueries('order');
        },
        onError: (response) => {
            alert("An error occured while submiting the form", response.data);

        },

    });
};

useEffect(() => {
    if (formState.status === "Şpariş Hazır") {
        setFormState({ ...formState, deliveryCode: getFirstFiveCharacters(data._id) })
        console.log(getFirstFiveCharacters(data._id), "getFirstFiveCharacters");
        function getFirstFiveCharacters(id) {
            const firstFive = id.substring(0, 5);
            return firstFive;
        }
    }
}, [])


console.log(formState, "formState");
return (
    <div
        className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? '' : 'hidden'}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => setIsOpen(false)}
    >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 text-center font-medium text-gray-900" id="modal-title">
                            Spariş Kodu #{data?.deliveryCode}
                        </h3>

                        <div className="mt-2 text-center">
                            {error && <div className="text-red-500">An error occurred: {error.message}</div>}
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <>

                                    {
                                        data?.products.map((product, key) => (

                                            <div key={key} className=" mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md">
                                                <div className="relative flex h-full flex-col text-gray-600 md:flex-row p-2">

                                                    <div className="relative md:w-4/6 space-y-1">
                                                        <div className="flex flex-col md:flex-row">
                                                            <h2 className="mb-2 text-md font-serif">{product.title}</h2>

                                                        </div>
                                                        <div className="flex flex-col md:flex-row md:items-end">
                                                            <p className=" text-xl font-black">$70</p>

                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-1">
                                                            <a href={`http://localhost:5001/public/${product.pdf}`}

                                                                className=" flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-4 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">

                                                                Hemen Yazdır
                                                            </a>
                                                            {/* <button className=" flex cursor-pointer items-center justify-center rounded-md border py-2 px-4  text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-sky-500 hover:text-white">Preview</button> */}
                                                        </div>
                                                    </div>
                                                    <div className="mx-auto flex items-center px-5 pt-1">
                                                        <img className="block  w-16 rounded-md shadow-lg" src={product.image} alt="Shop image" />
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }



                                    {/* <div>
                                            <span className="font-medium">Şehir:</span> {data?.address.city}
                                        </div>
                                        <div>
                                            <span className="font-medium">Ülke:</span> {data?.address.country}
                                        </div>
                                        <div>
                                            <span className="font-medium">Sokak:</span> {data?.address.street}
                                        </div>
                                        <div>
                                            <span className="font-medium">Order Date:</span> {new Date(data?.createdAt).toLocaleString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Durum:</span> {data?.status}
                                        </div> */}
                                    <form className='py-2' onSubmit={handleSubmit}>
                                        <div className="mt-4">
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                Durum
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={formState.status}
                                                onChange={(e) => setFormState({ status: e.target.value })}
                                            >
                                                <option value="">Durum değiştir </option>
                                                <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                <option value="Şpariş Hazır">Şpariş Hazır</option>

                                            </select>
                                        </div>
                                        <div className="mt-4  ">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                disabled={updateStatus.isLoading}
                                            >
                                                {updateStatus.isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                                            </button>
                                        </div>
                                    </form>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex w-full justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"

                                    >
                                        Kapat
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

)

}

export default AdminOrderDetail


/* const { id } = useParams()
const { token } = useSelector((state) => state.auth);
const userId = useSelector((store) => store.auth.currentUser._id);
const { isLoading, error, data } = useQuery(['order'], () => {
    return axios.get(`http://localhost:5001/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
        }
    }).then(res => res.data);
}); */