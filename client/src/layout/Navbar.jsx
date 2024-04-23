


import UserDropdownMenu from '../components/UserDropdownMenu';


import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';


import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



const Navbar = () => {
  const cart = useSelector((store) => store.cart);
  const { currentUser } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => { }, [location]);
  cart && console.log(cart?.totalQantity);
  return (

    <>


      {/* <div className='w-full sticky top-0 z-30 shadow-xl '>

      <nav className=' grid  grid-cols-2 p-4 bg-white font-semibold h-18'>
        <h1 className='font-bold text-4xl uppercase flex items-center justify-center px-4 tracking-wider'>
          <a href='/'> <span className=' text-sky-500'>BI</span>NOTE</a>
        </h1>
        <div className='flex justify-center items-center px-4 text-md md:text-lg'>

          <UserDropdownMenu currentUser={currentUser} totalQantity={cart?.totalQantity} />
        </div>
      </nav>
    </div> */}


      <div className=" sticky w-full shadow-lg  z-40 top-0 left-0  ">
        <nav className="bg-white  ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <h1 className='font-bold text-4xl uppercase flex items-center justify-center px-4 tracking-wider'>
              <a href='/'> <span className=' text-sky-500'>BI</span>NOTE</a>
            </h1>
            <div className="flex items-center ">
             

             
                <UserDropdownMenu currentUser={currentUser} totalQantity={cart?.totalQantity} />
         
           
            </div>
          </div>
        </nav>
        <nav className="bg-gray-100 ">
          <div className=" lg:sticky  xl:sticky md:sticky fixed  lg:top-0  xl:top-0 md:top-0  bottom-0 z-40 w-full h-16  flex bg-white border-t border-gray-200 ">
            <div className=" container mx-auto flex flex-row items-center max-w-screen-xl ">
              <ul className="flex lg:justify-start md:justify-start justify-between  xl:justify-start h-full w-full  font-medium mx-2 p-2 lg:space-x-10">
                <li className="inline-flex flex-col items-center justify-center text-center  p-4  rounded-lg  hover:bg-gray-50  group">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-red-400 text-center"
                        : isActive
                          ? " text-sky-500 text-center "
                          : "text-black text-center"
                    }
                  >
                    <HomeIcon className="text-center w-full  text-2xl" />
                    <span className="text-sm mb-2">   Home</span>

                    <hr
                      className={`${location.pathname == "/"
                        ? "w-full h-0.5  bg-sky-500 border-0 rounded "
                        : "w-full h-1 hidden "
                        }  `}
                    />
                  </NavLink>
                </li>

                {/*<li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                  <NavLink
                    to="/categories/allproduct"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-red-400 text-center"
                        : isActive
                          ? " text-sky-500 text-center "
                          : "text-gray-800 text-center"
                    }
                  >
                    <ProductionQuantityLimitsIcon className="text-center  w-full text-2xl" />
                    <span className="text-sm mb-2"> Ürünler</span>

                    <hr
                      className={`${location.pathname == "/categories/allproduct"
                        ? "w-full h-0.5  bg-sky-500 border-0 rounded-xl "
                        : "w-full h-1 hidden rounded-lg "
                        }  `}
                    />
                  </NavLink>
                </li>*/}
                <li className="inline-flex  items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg ">
                  <NavLink
                    to="/about"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-red-400 text-center"
                        : isActive
                          ? " text-sky-500 text-center"
                          : "text-gray-800 text-center"
                    }
                  >
                    <InfoIcon className="text-center  w-full text-2xl" />
                    <span className="text-sm mb-2"> About</span>

                    <hr
                      className={`${location.pathname == "/about"
                        ? "w-full h-0.5  bg-sky-500 border-0 rounded "
                        : "w-full h-1 hidden "
                        }  `}
                    />
                  </NavLink>
                </li>
                <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                  <NavLink
                    to="/contact"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-red-400 text-center"
                        : isActive
                          ? " text-sky-500 text-center "
                          : "text-gray-800 text-center"
                    }
                  >
                    <ContactMailIcon className="text-center  w-full text-2xl" />
                    <span className="text-sm mb-2"> Contact</span>

                    <hr
                      className={`${location.pathname == "/contact"
                        ? "w-full h-0.5  bg-sky-500 border-0 rounded "
                        : "w-full h-1 hidden "
                        }  `}
                    />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>


        </nav>
      </div>
    </>
  );
};

export default Navbar;