
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Subcategories({id}) {
  const [subcategories, setSubcategories] = useState([]);
  // const { id } = useParams();



  useEffect(() => {
    if(id){
   axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then(({ data }) => {
        console.log(data?.data);
        setSubcategories(data?.data || []);
      })
      .catch((error) => {
        console.log(error);
         
      });}
  }, [id]);

  return (
    <>
  

      {subcategories.length > 0  ?<div className="flex flex-wrap px-10 py-10 ">
          {subcategories.map((sub) => (
            <div key={sub._id} className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-lg hover:shadow-[0_0_20px_rgba(20,185,129,0.6)]  duration-500 rounded-lg p-6 text-center transition-all ">
                <span className="text-xl font-semibold text-black-600">
                  {sub.name}
                </span>
              </div>
            </div>
          ))}
        </div>: null
      }
    </>
  );
}
