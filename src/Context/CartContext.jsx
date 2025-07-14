import { createContext, useEffect, useState } from "react";
import Products from "../components/Products/Products";
import axios from "axios";

export let CartContext=createContext({})

export default function CartContextProvider(props){
    const[cardId, setcardId]=useState(null)
    const[totalPrice, settotalPrice]=useState(0)
    const[products, setproducts]=useState(null)
    const[numOfCartItems, setnumOfCartItems]=useState(0)

let token=localStorage.getItem('usertoken')
    let headers={
            token:localStorage.getItem('usertoken')
        }

 function RecetCard(){
    setcardId(null)
    setnumOfCartItems(0)
    settotalPrice(0)
    setproducts(null)
 }       
function addToCart(prodId){
    

  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:prodId

    },{
       headers:headers
    }).then((response)=>{
      getUserCartItem()
        return (response)
    }).catch((error)=>{
       return (error)
    })
}

function getUserCartItem(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
       setcardId(response?.data?.data?._id);
        settotalPrice(response?.data?.data?.totalCartPrice)
        setproducts(response?.data?.data?.products)
        setnumOfCartItems(response?.data?.numOfCartItems)
        return response
    }).catch((error)=>{
        console.log(error)
    })

}

function updateCart(prodId,count){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{
        count:count
    },{
        headers
    }).then((response)=>{
     getUserCartItem()
        
        return response;
    }).catch((error)=>{
        return error;
    })
}

function deleteCartItems(prodId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
    headers,
  }).then((response) => {
    getUserCartItem()
    // setcardId(response?.data?.cartId);
//    settotalPrice(response?.data?.data?.totalCartPrice);
//     setproducts(response?.data?.data?.products);
//     setnumOfCartItems(response?.data?.numOfCartItems);
    return response;
  }).catch((error) => {
    return error;
  });
}

function clearCart(){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
     getUserCartItem()
        
        return response;
    }).catch((error)=>{
        return error;
    })
}

useEffect(()=>{
    if(token){

    
  getUserCartItem()
    }
},[token])
   return <CartContext.Provider value={{addToCart ,updateCart,deleteCartItems,clearCart,numOfCartItems,totalPrice,cardId,products,RecetCard,setnumOfCartItems}}>
    {props.children}

</CartContext.Provider>
}
