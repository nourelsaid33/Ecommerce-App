import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from '../src/Navbar/Navbar'
import './App.css'
import Register from './components/Register/Register'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Forgetpassword from './components/Forgetpassword/Forgetpassword'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Wishlist from "./components/Wishlist/Wishlist"
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Productsdetail from './components/Productsdetail/Productsdetail'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import RecentProducts from './components/RecentProducts/RecentProducts'
import Subcategories from './components/Subcategories/Subcategories'
import CartContextProvider, { CartContext } from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import WishListContextProvider from './Context/WishListContext'
import Resetpassword from './components/Resetpassword/Resetpassword'
import VerifyCode from './components/Verifycode/Verifycode'

// import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

let route=createBrowserRouter([
       {path:'' ,element: <Layout/> ,children:[
       {index:true , element:<ProtectRoute><Home/></ProtectRoute>},
       {path:'brands' , element:<ProtectRoute><Brands/></ProtectRoute>},
       {path:'categories' , element:<ProtectRoute><Categories/></ProtectRoute>},
       {path:'subcategories/:id' , element:<ProtectRoute><Subcategories/></ProtectRoute>},
       {path:'cart' , element:<ProtectRoute><Cart/></ProtectRoute>},
       {path:'checkout', element:<ProtectRoute><Checkout/></ProtectRoute>},
       {path:'wishlist' , element:<ProtectRoute><Wishlist/></ProtectRoute>},
       {path:'Register' , element:<Register/>},
       {path:'login' , element:<Login/>},
       {path:"/forgetpassword", element:<Forgetpassword/>} ,
       {path:"/resetpassword/:resetCode", element:<Resetpassword/>} ,
       {path:"/verifycode", element:<VerifyCode/>} ,
       {path:'productdetails/:id',element:<ProtectRoute><Productsdetail/></ProtectRoute>},
       {path:'product' , element:<ProtectRoute><RecentProducts></RecentProducts></ProtectRoute>},
        {path:'*' , element:<NotFound/>},
        {path:'Ecommerce-App',element:<Register/>}
  ]}
 
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UserContextProvider>
    <CartContextProvider>
   <WishListContextProvider>

      <CounterContextProvider>
       <RouterProvider router={route}>
    
       </RouterProvider>
   <Toaster/>
    </CounterContextProvider>
    </WishListContextProvider>
    </CartContextProvider>
      </UserContextProvider>
   
    </>
  )
}

export default App
