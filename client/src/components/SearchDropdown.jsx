
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SearchDropdown = ({ searchQuery }) => {
    const { data, isLoading, error } = useQuery(
        ['search', searchQuery],
        () =>
            axios
                .get(`http://localhost:5001/api/products?title=${searchQuery}`)
                .then((res) => res.data),
        {
            enabled: searchQuery.length > 0,
        }
    );

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    console.log(data);
    return (
        <div className="absolute w-full max-h-80 overflow-hidden overflow-y-scroll  z-10  bg-transparent border-2  rounded-b-lg shadow-lg">
            {data.map((product) => (
                <div key={product._id} className="px-4 py-2 rounded-b-lg w-full  hover:bg-gray-50 hover:text-gray-700  text-white   cursor-pointer">
                        <Link

                            to={`/products/${product._id}`}
                        >
                    <div className='flex flex-row justify-between items-center '>
                            <img className='w-16 ' src={product.image} alt="" />
                           

                               <p>{product.title}</p> 
                                <p className=''> ₺{product.price}.00 </p>
                           
                    </div>
                        </Link>
                </div>
            ))
            }

        </div >
    );
};

export default SearchDropdown