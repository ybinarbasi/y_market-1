

import Navbar from '../layout/Navbar';
import Announcement from '../layout/Announcement';

import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../layout/Footer';
import Carousel from '../components/Carousel';
import Pdfviewer from '../components/Pdfviewer';



const Home = () => {

  return (
    <>
      
      <Carousel />
      {/*<Categories />*/}
      <Products />
      <Newsletter />
      
    </>
  );
};

export default Home;
