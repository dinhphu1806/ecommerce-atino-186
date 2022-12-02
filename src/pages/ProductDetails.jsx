import React from 'react';
import { useState } from 'react';
import CommonSecsion from '../components/UI/CommonSecsion';
import { useParams } from 'react-router-dom';
import products from '../assets/data/Product';
import { Row, Col, Button } from 'antd';
import { AiFillStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import '../sass/productDetails.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductList from '../components/UI/ProductList';

// task 2 sau khi tạo layout xong theem product vaof cart
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/CartSlide';

import { toast } from 'react-toastify';

const ProductDetails = () => {

  // use btn cart
  const dispatch = useDispatch(); // xong xuoongs tao func cart

  
  // use when tab info
  const [ tab, setTab ] = useState('desc')

  // use when render 1 info product
  const {id} = useParams()
  const product = products.find(item => item.id === id)

  const {
    imgUrl, 
    productName, 
    price,  
    shortDesc, 
    description, 
    reviews, 
    avgRating,
    category 
  } = product;
  
  const relatedProduct = products.filter(item => item.category === category)

  const addToCart = () => {
     dispatch(
        cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price,
        })
     )
     //toast 
     toast.success('Product added successfully')
  }

  return (
    <div className='details__body'>
      {/* <CommonSecsion /> */}
      <section className='product__title'>
          <h2>
            <Link to='/home'>Home </Link>/ Shop / {productName}
          </h2>
      </section>

      <section                             >
        <Row gutter={[16, 16]} className="product">
          <Col sm={24} md={12} lg={12}>
            <img src={imgUrl} alt="" />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <div className="product__details">
              <h2>{productName}</h2>
              <div className="product__rating">
                 <div className='product__rating__icon'>
                    <span> <AiFillStar />  </span>
                    <span> <AiFillStar />  </span>
                    <span> <AiFillStar />  </span>
                    <span> <AiFillStar />  </span>
                    <span> <BsStarHalf />  </span>
                 </div>
                 <p>({avgRating} ratings)</p>

              </div>
              <div className="product__select">
                <div className="product__select__title">
                  Select size:
                </div>
                <div className="product__select__size">
                  <motion.span whileTap={{scale: 1.1}} className='box'>28</motion.span>
                  <motion.span whileTap={{scale: 1.1}} className='box'>29</motion.span>
                  <motion.span whileTap={{scale: 1.1}} className='box'>30</motion.span>
                  <motion.span whileTap={{scale: 1.1}} className='box'>31</motion.span>
                </div>
              </div>
              <div className="product__price">
                <h2 className='product__price'>$ {price} </h2>
                <h3 >$ 112</h3>
              </div>
              
              <p className='product__desc'>{shortDesc}</p>
              <Button className='buy__btn' onClick={addToCart}>Add to cart</Button>
             
              
            </div>
          </Col>
        </Row>
      </section>

      {/* tab desc   dùng useState*/}
      <section>
      <h2 className='related__heading'>product imformation </h2>
        <Row gutter={[16, 16]}>
          <Col sm={24} md={24}>
            <div className="tab__wrapper">
              <motion.h6
                whileTap={{scale: 1.1}} 
                className={`${tab === 'desc' ? 'active__tab' : ''}`} 
                onClick={() => setTab('desc')}>
                  Description
              </motion.h6>
              <motion.h6 
                whileTap={{scale: 1.1}} 
                className={`${tab === 'desc' ? 'active__tab ' : ''}`}
                onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
              </motion.h6>
            </div>
          {/* render content */}
            {
              tab === 'desc' ? <div className='tab__content'>
                <p>{description}</p>
              </div> 
              : (
                <div className='product__review'>
                   Reviews
                </div>
              )
             }

            
          </Col>
          
        </Row>
      </section>
      <section>
        <h2 className='related__heading'>Related Products</h2>
        <ProductList data={relatedProduct}/>
      </section>
    </div>
  )
}

export default ProductDetails