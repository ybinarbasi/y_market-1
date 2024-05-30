import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { color } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart-slice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useQueryClient } from "@tanstack/react-query";
import UpdateProductModal from "./Admin/UpdateProductModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const Product = ({ useProducts }) => {
    const [overlayIsShown, setOverlayIsShown] = useState(false);
    const [like, setLike] = useState(useProducts.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const [onClose, setOnClose] = useState(false);
    const queryClient = useQueryClient();
    const [product, setProduct] = useState(useProducts);

    const userId = useSelector((store) => store.auth.currentUser?._id);
    const token = useSelector((store) => store.auth.token);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const likeHandler = () => {
        try {
            axios.put("http://localhost:5001/api/products/" + useProducts._id + "/like", { userId: userId })

            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        setIsLiked(useProducts.likes?.includes(userId));
    }, [userId, useProducts.likes]);
    const deleteProduct = async () => {
        try {
            await axios.delete(
                `http://localhost:5001/api/products/${useProducts._id}`,
                {
                    headers: {
                        Authorization: `Barear ${token}`,
                        id: userId,
                    },
                }
            );

            // Invalidate the cache for the "products" query to reflect the changes made
            queryClient.invalidateQueries("products");
        } catch (err) {
            console.log(err);
        }
    };


    console.log(product);
    return (
        <>

            {
                onClose ? (

                    <UpdateProductModal onClose={onClose} setOnClose={setOnClose} productId={useProducts._id} product={useProducts} />
                ) : (
                    null
                )
            }

            <figure
                key={useProducts._id}
                className={`relative bg m-2  shadow-lg transform hover:scale-105 transition duration-300  rounded-xl  `}


            >
                <div className="group group-hover:bg-opacity-60 transition duration-500 relative h-full bg-gray-50  rounded-xl shadow-xl   flex justify-center items-center">
                    <img className="group-hover:opacity-60 transition duration-500 rounded-xl " src={useProducts.image} alt="sofa-3" />
                    <div className="flex flex-row w-full justify-center items-center absolute top-12 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <p className="sm:text-sm md:text-md lg:text-md uppercase font-serif text-black font-bold">{useProducts.title}</p>
                    </div>
                    <div className="flex flex-row w-full  justify-center items-center absolute bottom-8 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                   
                        <button
                            className=" bg-sky-700 px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out text-white "
                            onClick={() => handleAddToCart(product)}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z" fill="currentColor" />
                            </svg>
                        </button>


                        <Link
                            className="p-1 bg-sky-700 px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out text-white "
                            to={`/products/${useProducts._id}`}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor" />
                                <path d="M21.8701 11.5C21.2301 10.39 17.7101 4.82001 11.7301 5.00001C6.20007 5.14001 3.00007 10 2.13007 11.5C2.0423 11.652 1.99609 11.8245 1.99609 12C1.99609 12.1755 2.0423 12.348 2.13007 12.5C2.76007 13.59 6.13007 19 12.0201 19H12.2701C17.8001 18.86 21.0101 14 21.8701 12.5C21.9578 12.348 22.004 12.1755 22.004 12C22.004 11.8245 21.9578 11.652 21.8701 11.5ZM12.0001 15.5C11.3078 15.5 10.6311 15.2947 10.0556 14.9102C9.48 14.5256 9.0314 13.9789 8.76649 13.3394C8.50158 12.6999 8.43227 11.9961 8.56732 11.3172C8.70237 10.6383 9.03571 10.0146 9.52519 9.52514C10.0147 9.03565 10.6383 8.70231 11.3173 8.56726C11.9962 8.43221 12.6999 8.50152 13.3395 8.76643C13.979 9.03134 14.5256 9.47994 14.9102 10.0555C15.2948 10.6311 15.5001 11.3078 15.5001 12C15.5001 12.9283 15.1313 13.8185 14.4749 14.4749C13.8186 15.1313 12.9283 15.5 12.0001 15.5Z" fill="currentColor" />
                            </svg>
                        </Link>


                        <button
                            className={`${isLiked ? 'text-sky-500 p-1  px-3 py-3 transition duration-300 hover:bg-white ease-in-out bg-sky-700  ' : 'text-white p-1 hover:bg-sky-500 px-3 py-3 transition duration-300 ease-in-out bg-sky-700'} `}
                            onClick={likeHandler} >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="currentColor" />
                            </svg>
                        </button>
                        {userId == useProducts.userID ? (
                            <>
                                <button

                                    className="p-1 bg-sky-700 px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out text-white " onClick={deleteProduct}>
                                    <DeleteOutlineIcon fontSize="large" />
                                </button>
                                <button
                                    className="p-1 bg-sky-700 px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out text-white "
                                    onClick={() => setOnClose(true)} >
                                    <ModeEditIcon fontSize="large" />
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </figure>


            {/*  <figure className="w-full  flex justify-center items-center">
                <div >
                    <div className="max-h-full">
                        <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
                            <div className="overflow-hidden relative">
                                <img className="w-full transition duration-700 ease-in-out group-hover:opacity-60"src={useProducts.image} alt="image" />
                                <div className="flex justify-center">
                                    <div className="absolute bottom-4 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                        <a href="#" className="bg-white px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out">
                                            GGGG
                                        </a>
                                        <a href="#" className="bg-white px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out">
                                            DDDD
                                        </a>
                                        <a href="#" className="bg-white px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out">
                                         FFFF
                                        </a>
                                        <a href="#" className="bg-white px-3 py-3 hover:bg-sky-500 transition duration-300 ease-in-out">
                                         JJJJ
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-white">
                                <a href="#" className=""><h1 className="text-gray-800 font-semibold text-lg hover:text-sky-500 transition duration-300 ease-in-out">White Line Dress</h1></a>
                                <div className="flex py-2">
                                    <p className="mr-2 text-xs text-gray-600">$45.00</p>
                                    <p className="mr-2 text-xs text-sky-600 line-through">$15.00</p>
                                </div>
                                <div className="flex">
                                    <div className="">
                                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                                        <i className="fas fa-star text-yellow-400 text-xs"></i>
                                        <i className="far fa-star text-gray-400 text-xs"></i>
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-gray-500 font-medium text-sm">(1)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </figure> */}

        </>
    );
};

export default Product;
