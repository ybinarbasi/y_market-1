import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const [locationError, setLocationError] = useState(false);
  const mutation = useMutation(
    (userData) => axios.post("http://localhost:5001/api/auth/register", userData),
    {
      onSuccess: () => {
        toast.success("Hesap başarıyla oluşturuldu!");
        history.push("/login");
      },
      onError: () => {
        toast.error("Hesap oluşturulurken bir hata oluştu.");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      address: { lat: '', lng: '' }
    },
    onSubmit: (values) => {
      if (!locationError) {
        console.log(values);
        mutation.mutate(values);
      } else {
        toast.error("Konum bilgisi alınamadı. Form gönderilemez.");
      }
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          formik.setValues({
            ...formik.values,
            address: {
              lat: latitude,
              lng: longitude
            }
          });
        },
        (error) => {
          console.log(error);
          setLocationError(true);
        }
      );
    } else {
      console.log('Tarayıcınız konum bilgisini desteklemiyor.');
      setLocationError(true);
    }
  }, []);

  return (
    <>

      <div
        className="bg-no-repeat bg-cover bg-center relative bg-[url('https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-2041540.jpg&fm=jpghttps://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]" >
        <div className="  grid  md:absolute xl:absolute bg-gradient-to-b from-gray-800 to-gray-200 opacity-50 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">Hi Welcome back to <span className="text-sky-500">BINOTE</span> </h1>
              <p className="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                and publishing industries for previewing layouts and visual mockups</p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-16 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">Kayıt Ol </h3>
                <p className="text-gray-500">Lütfen kullanıcı adınız ile giriş yapınız</p>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">Kullanıcı Adı</label>
                  <input

                    id="username"
                    name="username"
                    type="text"
                    placeholder="Kullanıcı Adı"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-sky-400" />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 mb-4">{formik.errors.username}</div>
                  ) : null}
                </div>


                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-sky-400" />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 mb-4">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Şifre
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Şifre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-sky-400" />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 mb-4">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                    <label for="remember_me" className="ml-2 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-sky-400 hover:text-sky-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full mb-4 flex justify-center bg-sky-400  hover:bg-sky-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    {mutation.isLoading ? "Loading..." : "Hesap Oluştur"}
                  </button>

                </div>
                <Link to="/login" className="px-12  underline mb-4">
                  Zaten Bir Hesabınız var mı ?
                </Link>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  BINOTE © 2023-2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div >



      {/* <form
          onSubmit={formik.handleSubmit}
          className="border bg-white p-6 flex rounded-xl flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]"
        >
          <h1 className="uppercase text-xl mb-4 font-bold">Kayıt ol</h1>

          <div className="grid gap-4 md:grid-cols mb-4">
            <input
              className="block p-2 border-2 rounded-xl focus:outline-none"
              type="text"
              placeholder="Kullanıcı Adı"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <input
              className="block p-2 border-2 rounded-xl focus:outline-none"
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              className="block p-2 border-2 rounded-xl focus:outline-none"
              type="password"
              placeholder="Şifre"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>

          <p className="mb-4 ">
            Hesap oluşturarak kişisel verilerimin{" "}
            <a href="" className="uppercase font-bold">
              GİZLİLİK POLİTİKASI
            </a>
            'na uygun olarak işlenmesine izin veriyorum.&nbsp;
          </p>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="uppercase bg-sky-500 mb-4 text-white hover:bg-sky-700 transition ease-out duration-500 shadow rounded-lg p-2"
          >
            {mutation.isLoading ? "Loading..." : "Hesap Oluştur"}
          </button>
          {
            <Link to="/login" className="capitalize underline mb-4">
              Zaten Bir Hesabınız var mı ?
            </Link>
          }
        </form> */}

    </>
  );
};
export default Signup;
