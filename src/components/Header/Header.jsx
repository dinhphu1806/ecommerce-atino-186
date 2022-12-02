import React from 'react';
import { useState, useRef } from 'react';
import './header.scss';
import { motion } from 'framer-motion'; 

import { FaShoppingBag, FaRegUserCircle, FaBars } from 'react-icons/fa';

import { ImCross } from 'react-icons/im';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { menuData } from './MenuData';
//15
import { useSelector } from 'react-redux';

const Header = () => {

  const [ openMobile, setOpenMobile ] = useState(false);

  const [ isActive, setIsActive ] = useState(false)

  const headerRef = useRef(null)

  const navigate = useNavigate()
  //16
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  // xuống chõ icon cart


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

    return () => window.removeEventListener('scroll', stickyHeader)
  })

  // use useNavigate of react-router-dom 
  // use when finish layout cart 
  const navigateToCart = () => {
      navigate('/cart')
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
            <NavLink className='header__icon__heart'>
              <motion.i whileTap={{scale: 1.2}}  class="fa-solid fa-heart"></motion.i>
              <div className="badge__num">
                  0
                </div>
            </NavLink>
            
            <NavLink to="/cart" className="header__icon__cart" onClick={navigateToCart}>
               <i class="fa-solid fa-cart-plus">
                <div className="badge__num">
                  {totalQuantity}
                </div>
              </i>
              {/* <span className='badge'>0</span> */}
              {/* <span className='badge'> */}
                
              {/* </span> */}
            </NavLink>

            <NavLink to="/login" className="header__icon__login">
              <FaRegUserCircle />
              
            </NavLink>

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