import React from "react";
import { FallingLines } from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className=' text-7xl bg-red-400d h-screen text-center  flex justify-center items-center w-full '>
            <div>
                <FallingLines
                    height="100"
                    width="100"
                    radius="9"
                    color="#0284c7"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        </div>
    );
};

export default Loading;