import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../store/auth-slice";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı adı zorunludur"),
  password: Yup.string().required("Şifre zorunludur"),
});

const Login = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation(
    (values) => axios.post("http://localhost:5001/api/auth/login", values),
    {
      onSuccess: (data, variables) => {
        console.log(data);
        toast.success("Başarıyla giriş yaptınız");
        queryClient.invalidateQueries("user");
        dispatch(loginSuccess({ user: data.data.user, token: data.data.token }));
      },
      onError: () => {

        toast.error("Bir hata oluştu, lütfen daha sonra tekrar deneyin");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await mutation.mutate(values);
      } catch (err) {
        toast.error("Bir hata oluştu, lütfen daha sonra tekrar deneyin");
      }
    },
  });

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
                <h3 className="font-semibold text-2xl text-gray-800">Giriş Yap </h3>
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
                  <button type="submit" className=" mb-4 w-full flex justify-center bg-sky-400  hover:bg-sky-500 text-gray-100 p-3  rounded-full tracking-wide   shadow-lg cursor-pointer transition ease-in duration-500">
                  {mutation.isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </button>
                </div>
                {mutation.isError && <p>Something went wrong. Please try later...</p>}
                <Link to="/signup" className="capitalize underline px-8 mt-3 text-center w-full">
                  Kayıtlı bir kullanıcı adınız yok mu?
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
      </div>
      {/* <div className="px-4 w-full h-screen flex justify-center items-center bg-login bg-no-repeat bg-cover">
        <form
          onSubmit={formik.handleSubmit}
          className="border rounded-xl bg-white p-6 flex flex-col min-w-[17rem] sm:min-w-[22rem] md:min-w-[25rem]"
        >
          <h1 className="uppercase text-xl mb-4 font-bold">Giriş</h1>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Kullanıcı Adı"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="p-2 mb-4 rounded-xl border-2  focus:outline-none"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 mb-4">{formik.errors.username}</div>
          ) : null}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Şifre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="p-2 mb-4 border-2  rounded-xl focus:outline-none"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 mb-4">{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            disabled={formik.isSubmitting || mutation.isLoading}
            className="mb-4 bg-sky-500 rounded-xl text-white p-2 disabled:bg-sky-700 disabled:cursor-not-allowed"
          >
            {" "}
            Giriş yap
          </button>
          {mutation.isError && <p>Something went wrong. Please try later...</p>}
          <Link to="/signup" className="capitalize underline mb-4">
            Kayıtlı bir kullanıcı adınız yok mu?
          </Link>
        </form>
      </div> */}

    </>
  );
};

export default Login;
