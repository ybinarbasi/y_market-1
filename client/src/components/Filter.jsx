import {useState} from 'react';
import { Link } from 'react-router-dom';
const Filter = ({ setTitle }) => {
  const [category, setCategory] = useState('');

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  return (
    <>

      <div className="flex items-center justify-between px-5">
        <p className="font-medium">
        Filtreler
        </p>

        <button onClick={()=> setCategory("")} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
          Filtre sıfırla
        </button>
      </div>
      <div className="w-full  flex  flex-row shadow p-5 space-x-5 rounded-lg bg-white">
        <div className="relative w-full">


          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder="İsime göre arama yapın...." className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
        </div>

        <div className="flex gap-2  w-full">
          <select
            className="px-4 py-3 w-full  rounded-md  bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white  text-sm"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="kitaplar">Kitaplar</option>
            <option value="yayin">Yayınlar</option>
            <option value="notlar">Notlar</option>
          </select>
          <Link to={`/categories/${category}`}>
            <button className="hover:bg-white hover:border hover:border-sky-600 hover:text-black bg-sky-500 text-white font-bold py-2 px-4 ">
              Filtrele
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Filter;
