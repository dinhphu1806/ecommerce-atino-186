import React from 'react';
import CommonSecsion from '../components/UI/CommonSecsion';
import '../sass/cart.scss';
import { Row, Col, Button } from 'antd';
// import products from '../assets/data/Product';
import img from '../assets/images/arm-chair-01.jpg';
import { motion } from 'framer-motion';

// use when create layout
import { cartActions } from '../redux/slices/CartSlide';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
const Cart = () => {

  // use when add to cart and delete product
  const cartItems = useSelector(state => state.cart.cartItems);
 
  // use when calc total price
  const totalAmount = useSelector(state => state.cart.totalAmount)
  
  return (
    <div>
      <CommonSecsion />
      <section >
        <div className='cart__list'>
          <Row gutter={[16, 16]} style={{marginRight: '10px'}}>
              <Col lg={16} md={16} sm={24}>
                {cartItems.length === 0 ? <h2 style={{fontSize: '18px'}}>No item added to the cart <Link to='/shop'>Continue shopping</Link> </h2> 
                : (
                  <table className='table'>
                      <thead>
                        <tr>
                          <td>Image</td>
                          <td>Title</td>
                          <td>Price</td>
                          <td>Quantity</td>
                          <td>Delete</td>
                        </tr>
                      </thead>

                        <tbody>
                          {cartItems.map((item, index) => {
                            return(
                              <Tr item={item} index={index} />
                              )
                            
                          })}
                      </tbody>

                      {/* sang cardSlide delete */}
                  </table>
                  )}
              </Col>
              <Col lg={8} md={8} sm={24}>
                <div className='cart__subtotal'>
                  <h3>Subtotal</h3>
                  <span>${totalAmount}</span>
                </div>
                <p className='sub__text'>Taxes and shipping will calculate in checkout</p>
                <div>
                
                  <Button className='buy__btn'>
                    <Link to='/checkout'>Checkout</Link>
                  </Button>
                </div>
              </Col>
          </Row>
        </div>
         
      </section>

    </div>
  )
}

// từ delete file cartSLide
const Tr = ({item, index}) => {

  const dispatch = useDispatch()

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))

    toast.success("Product deleted successfully");
  }

  return(
    <tr key={index}>
      <td>
            <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>$ {item.price}</td>
      <td>{item.quantity}</td>
      <td className='delete__icon'  >
          <motion.i whileTap={{scale: 1.2}} class="fa-solid fa-trash" onClick={deleteProduct}></motion.i>     
      </td>
      </tr>
  )
}

export default Cart