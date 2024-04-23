import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import SearchDropdown from './SearchDropdown';
const CAROUSEL_DATA = [
    {
        url: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-2041540.jpg&fm=jpghttps://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        url: 'https://images.pexels.com/photos/261821/pexels-photo-261821.jpeg?cs=srgb&dl=pexels-pixabay-261821.jpg&fm=jpg',
    },
];
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const incrementIndex = () => {
        setCurrentIndex((currentIndex) => {
            return (currentIndex + 1) % CAROUSEL_DATA.length;
        });
    };
    const decrementIndex = () => {
        setCurrentIndex((currentIndex) => {
            return currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1;
        });
    };

    console.log(searchQuery);
    return (
        <section className='   h-carousel relative bg-sky-300 '>
            <div
                onClick={decrementIndex}
                className='w-12 h-12 rounded-full bg-sky-100/50 absolute top-1/2 left-4 cursor-pointer'
            >
                <ArrowLeft className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
            </div>
            <img
                src={CAROUSEL_DATA[currentIndex].url}
                className='w-full h-full object-cover '
            />
            <div className='absolute h-full w-full top-0 left-0 bg-black/30'></div>
            <div className='absolute h-full w-full -top-12 left-0 flex flex-col justify-center items-center text-white uppercase px-4 text-center'>
                <h1 className='text-4xl md:text-6xl font-bold mb-8'>Lorem ipsum dolor sit amet.</h1>

                <Formik initialValues={{ search: '' }} onSubmit={() => { }}>
                    <Form>
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="search"
                                className="block w-full p-4 pl-10 pr-40 text-md bg-transparent border border-sky-500 rounded-t-lg   focus:border-sky-600 "
                                placeholder="Search for title..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            {searchQuery.length > 0 && <SearchDropdown searchQuery={searchQuery} />}
                        </div>
                    </Form>
                </Formik>
            </div>
            <div
                onClick={incrementIndex}
                className='w-12 h-12 rounded-full bg-sky-100/50 absolute top-1/2 right-4 cursor-pointer'
            >
                <ArrowRight className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
            </div>
        </section>
    );
};

export default Carousel;
