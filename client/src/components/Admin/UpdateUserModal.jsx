import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../firebase";
import { publicRequest } from "../../request-methods";

// Modal component
function UpdateUserModal({ setOnClose, onClose, user }) {
    const { token } = useSelector((state) => state.auth);


    const updateUser = async (userData) => {
        console.log(userData, 'userdataa');
        const response = await axios.put(`http://localhost:5000/api/users/${user._id}`
            , userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                id:user._id,
            },
        });
        return response.data;
    };



    const formik = useFormik({
        initialValues: {
            username: user?.username ?? "",
            email: user?.email ?? "",
            image: null,
        },

        onSubmit: async (values) => {
            handleClick(values);
            console.log(values);
        },
    });

    const { mutate } = useMutation(updateUser);


    const handleClick = async (values) => {
        const imageName = "pp/" + values.image.name + new Date().getTime();
        const storage = getStorage(app);
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, values.image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const userData = { ...formik.values, image: downloadURL };
                    mutate(userData, {
                        onSuccess: () => {
                            console.log("Form submitted successfully");
                            setOnClose(false)
                        },
                        onError: (response) => {
                            alert("An error occured while submiting the form");
                            console.log(userData);
                            console.log(response);
                        },
                        onSettled: (response) => {
                            console.log(response);
                        },
                    });
                });
            }
        );
    };




    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>

            <div className="z-50 w-1/2 px-6 py-4 bg-white rounded shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Update User</h2>

                <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-4">
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.name && formik.errors.name
                                ? "border-red-500"
                                : "border-gray-300"
                                } appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter your name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                } appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Image
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]);
                                /* setFile(event.currentTarget.files[0]) */
                            }}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.image && formik.errors.image && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.image}</p>
                        )}

                    </div>
                    <div>
                        {/* <button
                            type="submit"
                            disabled={!formik.dirty || !formik.isValid || mutation.isLoading}
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {mutation.isLoading ? "Updating..." : "Update User"}
                        </button> */}
                        <div className="flex justify-end">
                            <button type="button" className="mr-4" onClick={() => setOnClose(false)}>Cancel</button>
                            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    );
}


export default UpdateUserModal