import React from 'react';
import './commonSecsion.scss';
import bannerShop from '../../assets/images/banner-shop.avif';

const CommonSecsion = () => {

  return (
    <section className='common'>
        <div className="common__container">
            <img src={bannerShop} alt="" />
            <h1>Product</h1>
        </div>
         
    </section>
  )
}

export default CommonSecsion