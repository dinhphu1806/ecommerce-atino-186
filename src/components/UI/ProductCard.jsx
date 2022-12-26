import React from "react";
import "./productCard.scss";
import { Col, Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// 11 setting npm install --save react-toastify  => xong sang file index.js paste đoạn vừa copi
import { toast } from "react-toastify";

// từ file index.js
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/CartSlide";

const ProductCard = ({ item }) => {
  //7
  const dispatch = useDispatch();  

  const addToCart = () => {  
    // use dispatch send to 1 action
    dispatch(
      cartActions.addItem({
        // get data 1 product into cart
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    // alert("product added to the cart") co chu
    // toast add to cart successfully
    toast.success("Product added successfully");
  };

  //9

  // 10 sang file cartSlice.js  console.log)

  // 8 xuông chỗ dấu plus
  return (
    <Col
      xs={12} // hiện 2
      sm={12}  // hiện 2
      md={8}   // hiện 3
      lg={6}  // hiện 4
      xl={6}  // hiện 4
      className="product__item"
      style={{ textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="product__card">
        <Link to={`/shop/${item.id}`}>
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </Link>
        <div className="product__info">
          <h3 className="product__name">
            {/* <Link to='/shop/:id'>{item.productName}</Link> */}
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom">
          <span className="product__price">$ {item.price}</span>
          {/* <Button type='primary' className='product__btn' onClick={addToCart}> */}
          <Button type="primary" className="product__btn" onClick={addToCart}>
            <i class="fa-solid fa-plus"></i>
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
