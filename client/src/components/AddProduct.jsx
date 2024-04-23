import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useSelector } from "react-redux";

function AddProduct({ isvisible, onClose, userID }) {
  const token = useSelector((store) => store.auth.token);
  const [title, setTitle] = useState({});
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [isShow, setIsShow] = useState(false);

console.log(isShow);

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  const handleClick = (e) => {
    const data = new FormData();
    e.preventDefault();
    const imageName = "products/" + image.name + new Date().getTime();
    const storage = getStorage(app);
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // const product = { ...products, image: downloadURL };
          //console.log(product);
          //
          data.append("title", title);
          data.append("description", description);
          data.append("price", price);
          data.append("category", category);
          data.append("image", downloadURL);
          data.append("pdf", pdf);
          data.append("userID", userID);
          data.append("isShow",isShow)
          console.log(data);
          createProduct.mutate(data);
        });
      }
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  const createProduct = useMutation(async (data) => {
    setIsLoading(true);
    const response = await axios.post(
      `http://localhost:5000/api/products`,
      data,
      {
        headers: {
          Authorization: `Barear ${token}`,
          id: userID
        },

      }
    );
    setIsLoading(false);
    return response.data;
  });

  if (createProduct.isError) {
    return <p>Error creating product</p>;
  }

  if (createProduct.isSuccess) {
    onClose();
  }
  if (!isvisible) return null;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto ">
        <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
            <form>
              <div className="grid grid-cols gap-6 mt-4 sm:grid-cols-1">
                <div>
                  <label className="text-white dark:text-black" htmlFor="title">
                    Ürün Adı
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    id="title"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-white dark:text-black"
                    htmlFor="description"
                  >
                    Ürün Açıklaması
                  </label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    id="description"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label className="text-white dark:text-black" htmlFor="price">
                    Ürün Fiyati
                  </label>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                    id="price"
                    type="number"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <div>
                    <label
                      className="text-white dark:text-black"
                      htmlFor="category"
                    >
                      {" "}
                      category
                    </label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      name="category"
                      id="category"
                      className=" block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option selected>yayin</option>
                      <option value="kitaplar">kitaplar</option>
                      <option value="notlar">notlar</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <label
                    className="block  text-md font-medium  "
                    htmlFor="file_input"
                  >
                    PDF ekle
                  </label>
                  <input
                    id="pdf"
                    name="pdf"
                    onChange={(e) => setPdf(e.target.files[0])}
                    className="  block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none dark:border-gray-600 "
                    type="file"
                  />
                </div>

                <div className="flex ">

                  <div className="relative inline-block w-10 mr-2  align-middle select-none transition duration-200 ease-in">

                    <input
                   
                    onClick={()=> setIsShow(!isShow)}
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      className="toggle-checkbox absolute block w-6 h-6 checked:translate-x-5 checked:bg-sky-500 duration-100 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                    </label>

                  </div>
                  <p>Pdf okunabilsin mi</p>
                </div>


                <div>
                  <label className="block text-sm font-medium text-white">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-gray rounded-md font-medium text-black hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <svg
                          className="mx-auto h-12 w-12 text-black"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-black">
                          <span className="">Upload a file</span>
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                          />
                          <p className="pl-1 text-black">or drag and drop</p>
                        </div>
                        <p className="text-xs text-black">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClick}
                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                  >
                    Save
                  </button>
                </div>
                <div onClick={onClose} className="flex justify-end mt-6">
                  <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-700 focus:outline-none focus:bg-gray-600">
                    Kapat
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
