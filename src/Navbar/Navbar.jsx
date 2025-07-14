import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'
import { Menu} from 'lucide-react';
export default function Navbar() {
  let navigate=useNavigate()
 let { numOfCartItems,setnumOfCartItems} =useContext(CartContext)
 let {userLogin,setuserLogin}= useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false);

 function logout(){
   localStorage.removeItem('usertoken')
   setnumOfCartItems(0)
   setuserLogin(null)
   navigate('/login')
 }


 
  return<>
  <nav className='  bg-slate-100 p-2   top-0 start-0 end-0 z-50 fixed flex justify-between px-15 py-3'>
    <div className='container m-auto flex flex-col justify-between items-center md:flex-row'>
    <div className="logo flex justify-between">
       <Link to='/'><div> <i className="fa fa-shopping-cart text-green-600 text-3xl"></i> <span className='text-2xl font-semibold'>fresh cart</span></div></Link>

       <button className='md:hidden ms-39' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Menu className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

        

  <div className={`md:flex md:items-center justify-between lg:space-x-56 ${menuOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>

      <ul className='flex items-center flex-col md:flex-row'>
     {userLogin !== null &&
    <>
      <li className='text-l mx-2 py-2'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black '}>
          Home
        </NavLink>
      </li>

      <li className='text-l mx-2 py-2'>
        <NavLink to='/cart' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black'}>
          Cart
        </NavLink>
      </li>

      <li className='text-l mx-2 py-2'>
        <NavLink to='/wishlist' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black'}>
          Wish list
        </NavLink>
      </li>

      <li className='text-l mx-2 py-2'>
        <NavLink to='/product' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black'}>
          Products
        </NavLink>
      </li>

      <li className='text-l mx-2 py-2'>
        <NavLink to='/categories' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black'}>
          Categories
        </NavLink>
      </li>

      <li className='text-l mx-2 py-2'>
        <NavLink to='/brands' className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-slate-600 hover:text-black'}>
          Brands
        </NavLink>
      </li>
    </>
  }
</ul>

      
        
        <div>
          <ul className='flex flex-col items-center md:flex-row'>
            {userLogin ===null ? <> <li className='py-2 text-x mx-2 text-slate-700'>
              <NavLink to='/Register' className='relative active'>Register</NavLink></li>

            <li className='py-2 text-l mx-2 text-slate-700'>
              <NavLink to='/login' className='relative active'>Login</NavLink>
            </li></>:

             <div className='md:flex mt-2'> 
              <li>
              <NavLink to='/Cart'><i className="relative fa fa-shopping-cart text-gray-600 text-3xl">
                
              <span className="absolute bg-green-600 w-5.5 h-5.5 text-sm text-center me-2 rounded-sm -top-3 -end-5 text-amber-50">{numOfCartItems}</span>
            </i>
            </NavLink>
            </li>
            


              <li onClick={logout} className=' text-l  text-slate-700'>
              
                <NavLink to='' className='relative active md:ms-5'>Log out</NavLink>
            </li>
            </div>
}
           
         
          </ul>
        </div>
    </div>
    </div>
  </nav>
  
 
  
  </>
}
