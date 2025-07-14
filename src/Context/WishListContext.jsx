import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let WishListContext = createContext({});

export default function WishListContextProvider(props) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const token = localStorage.getItem("usertoken");

  const headers = {
    token,
  };

  function addToWishlist(prodId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,{ 
            productId: prodId 
        },
          { 
            headers
         })
      .then((response) => {
        getUserWishlist();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function getUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
         headers 
        })
      .then((response) => {
        setWishlistItems(response?.data?.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeFromWishlist(prodId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
        headers,
      })
      .then((response) => {
        getUserWishlist();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  useEffect(() => {
    if (token) getUserWishlist();
  }, [token]);

  return (
    <WishListContext.Provider value={{
        addToWishlist,
        removeFromWishlist,
        wishlistItems,
        getUserWishlist,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
