import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';

export default function RecentProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);

  const [allProducts, setAllProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function addProdToCart(prodId) {
    const response = await addToCart(prodId);
    if (response?.data?.status === 'success') {
      toast.success(response?.data?.message, {
        style: {
          background: '#16a34a',
          color: 'white',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      });
    } else {
      toast.error('Something went wrong.');
    }
  }

  async function addProdToWishlist(prodId) {
    try {
      const response = await addToWishlist(prodId);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message + ' ❤️', {
          style: {
            background: '#16a34a',
            color: 'white',
            fontWeight: '500',
            padding: '12px 16px',
            borderRadius: '8px',
          },
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        style: {
          background: '#dc2626',
          color: 'white',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      });
    }
  }

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setAllProducts(data?.data);
        setFilteredProducts(data?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (allProducts) {
      const results = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchTerm, allProducts]);

  return (
    <>
        <Helmet>
           <title>Home component</title>
         </Helmet>
      {allProducts ? (
        <div className="px-4">
          
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mt-3 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No matching products found.</p>
          ) : (
            <div className="flex flex-wrap gap-y-6 mb-20">
              {filteredProducts.map((prod) => {
                const isInWishlist = wishlistItems?.some(item => item._id === prod._id);

                return (
                  <div key={prod._id} className="w-full md:w-1/3 lg:w-1/4 px-2">
                    <div className="product p-5 relative group hover:shadow-[0_0_20px_rgba(20,200,139,0.6)] transition-all duration-300 rounded-lg overflow-hidden h-full gap-y-3">
                      <Link to={`/productdetails/${prod.id}`}>
                        <img src={prod.imageCover} className="w-full" alt={prod.title} />
                        <span className="text-green-600">{prod.category.name}</span>
                        <h3 className="text-xl font-medium">{prod.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <div className="flex justify-between mt-2">
                          <span>{prod.price} EGP</span>
                          <span>{prod.ratingsAverage}<i className="fas fa-star text-yellow-400"></i></span>
                        </div>
                      </Link>
                     
        


                      <div className='flex justify-between items-center mt-4'>
                      <button
                        onClick={() => addProdToCart(prod._id)}

                        className=" left-1/2 translate-x-1/2 translate-y-27 overflow-visible opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-green-600 text-white py-2  rounded-md w-11/12 cursor-pointer"
                      >
                        Add to Cart
                      </button>

                      <i
                        onClick={() => {
                          if (!isInWishlist) addProdToWishlist(prod._id);
                        }}
                        className={`fa fa-heart text-2xl ms-20 cursor-pointer transition-colors duration-300 ${
                          isInWishlist ? 'text-red-600' : 'text-green-900 hover:text-red-600'
                        }`}
                      ></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
