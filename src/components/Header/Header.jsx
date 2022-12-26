import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './header.scss';
import { motion } from 'framer-motion'; 
import imgUser from '../../assets/images/user-avatar.png';

import { FaShoppingBag, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ImCross } from 'react-icons/im';
import { NavLink, useNavigate } from 'react-router-dom';
import { menuData } from './MenuData';
//15
import { useSelector } from 'react-redux';

// import when finish useAuth protechrouter
import useAuth from '../../custom-hooks/useAuth';


// use when create modal sign in sign up
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';  // funx logout
import { toast } from 'react-toastify';

const Header = () => {

  const [ openMobile, setOpenMobile ] = useState(false);

  const [ isActive, setIsActive ] = useState(false)

  const headerRef = useRef(null) // use useRef when make stiky header

  const navigate = useNavigate()
  //16
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  // xuống chõ icon cart


  // use Sign in
  // useAuth
  const { currentUser } = useAuth() // xuoong cho img user

  // show list action user login log out
  const profileAction = useRef(null)  // const toggle profileAction

  // use after import logOut and auth 
  const logout = () => {
    signOut(auth).then(err => {
      toast.success('Logged out')  
      navigate('/home')  // after when logout back to page home
    }).catch(err => {
      toast.error(err.message)  // xuong onclick logout
    })
  }

  // sticky header
  const stickyHeader = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky')
      } else {
        headerRef.current.classList.remove('sticky')
      }
    })
  }
 
  useEffect(() => {
    stickyHeader()
    // cleanup func memory 
    return () => window.removeEventListener('scroll', stickyHeader)
  })

  // use useNavigate of react-router-dom 
  // use when finish layout cart 
  const navigateToCart = () => {
      navigate('/cart')
  }

  const toggleProfileAction = () => {
    profileAction.current.classList.toggle('show__list__action')  // xuong ref={profileAction}
  }
  return (
    <div className='header'>
      <div className="header__container" ref={headerRef}>
        {/* logo */}
        <NavLink to='/' className="header__logo d__flex">
          <div className="header__logo__icon">
            <FaShoppingBag style={{fontSize: '40px', color: 'orange', marginRight: '7px'}}/>
          </div>
          <div className="header__logo__title">
            <h1 style={{letterSpacing: '1px'}}>AtinoShop</h1>
          </div>
        </NavLink>
        {/* menu nav */}
         <div className="header__nav">
            <ul className={openMobile ? 'header__mobile__menu' : 'header__menu'} >
                  {menuData.map(item => {
                    return(
                      <li key={item.id} className={isActive ? 'active' : ''} >
                        <NavLink to={item.path}>
                          {item.title}
                        </NavLink>
                      </li>
                    )
                  })}
            </ul>
         </div>

        {/* header icon */}
        <div className="header__icon">
            <span className='header__icon__heart'>
              <motion.i whileTap={{scale: 1.2}}  class="fa-solid fa-heart"></motion.i>
              <div className="badge__num">
                  0
              </div>
            </span>
            
            <span className="header__icon__cart" onClick={navigateToCart}>
               <i class="fa-solid fa-cart-plus">
                <div className="badge__num">
                  {totalQuantity}
                </div>
              </i>
              {/* <span className='badge'>0</span> */}
              {/* <span className='badge'> */}
                
              {/* </span> */}
            </span>

            <div className="header__icon__login">
              <motion.img whileTap={{scale: 1.2}} 
                style={{width: '30px', height: '30px', objectFit: 'cover'}} 
                src={currentUser ? currentUser.photoURL : imgUser} 
                alt="" 
                onClick={toggleProfileAction}
              />

              {/* <p>{currentUser.displayName}</p> */}
              <div className="login__list__action" ref={profileAction} onClick={toggleProfileAction}>
                {
                  currentUser ? <span onClick={logout}>Logout</span> // use after create func logout 
                  : <div className='flex'>
                      <Link to='/signup'>Sign up</Link>
                      <Link to='/login'>Log in</Link>
                  </div> 
                }
              </div>
            </div>


             {/* header mobile menu */}
            <div className="header__mobile__icon" onClick={() => setOpenMobile(!openMobile)}>
                    {openMobile ? <ImCross /> : <FaBars />} 
            </div>
        </div>

        

      </div>
    </div>
  )
}

export default Header