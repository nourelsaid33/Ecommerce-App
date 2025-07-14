import React, { use, useContext, useEffect, useState } from 'react'
import style from './Productsdetail.module.css'
import Slider from "react-slick";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function Productsdetail() {
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false); 

  async function addProdToCart(prodId) {
    setIsAdding(true); 
    const response = await addToCart(prodId);
    setIsAdding(false); 

    if (response?.data?.status === 'success') {
      toast.success(response?.data?.message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#16a34a',
          color: 'white',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      });
    } else {
      toast.error('Failed to add product to cart');
    }
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetail() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data?.data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-wrap px-30 pt-20 items-center'>
    <div className='w-full md:w-1/4'>
        <Slider {...sliderSettings}>
          {productDetails?.images.map((src, index) => (
            <img key={index} className='w-full rounded-lg' src={src} alt={productDetails?.title} />
          ))}
        </Slider>
      </div>

      <div className='w-full md:w-1/2 lg:w-2/3 ps-6'>
        <h3 className='text-3xl font-bold mb-2'>{productDetails?.title}</h3>
        <p className='text-slate-600 mb-4'>{productDetails?.description}</p>
        <span className='inline-block mb-2 px-3 py-1 text-green-600 border border-green-600 rounded-full text-sm'>
          {productDetails?.category?.name}
        </span>

        <div className='flex justify-between items-center py-4'>
          <span className='text-xl font-semibold'>{productDetails?.price} EGP</span>
          <span className='text-yellow-500 text-lg'>
            {productDetails?.ratingsAverage} <i className='fas fa-star'></i>
          </span>
        </div>

        <div className='flex items-center gap-6'>
          <button
            onClick={() => addProdToCart(productDetails?._id)}
            disabled={isAdding}
            className={` bg-green-600 text-white py-2 px-4 rounded-md w-3/4 cursor-pointer ${isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'}`}
          >+ Add to Cart
            {isAdding ? (
              <Spinner/>
            ) : (
             null
            )}
          </button>

          <i className='fa fa-heart text-2xl text-green-800 hover:text-red-600 cursor-pointer ms-20'></i>
        </div>
      </div>
    </div>
  );
}



































