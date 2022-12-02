import React from "react";
import { Row, Col } from "antd";
import {  FaShoppingBag } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import './footer.scss';

const Footer = () => {
  return (
      <div className="footer">
         <div className="footer__container">
           <div className="footer__top">
           <Row gutter={[16, 16]}>
              <Col sm={12} md={12} lg={6} >
                <div className="footer__item">
                  <h2 className="footer__d-flex" style={{letterSpacing: '1px'}}>
                    <FaShoppingBag style={{fontSize: '50px', color: 'orange', marginRight: '10px'}}/>
                    AtinoShop
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
                    in fuga voluptas alias delectus explicabo totam impedit et. Sint
                    tempore quos unde iste repellat labore esse culpa nobis
                    perferendis nam.
                  </p>
                </div>
              </Col>
              <Col sm={12} md={12} lg={6} >
                <div className="footer__item">
                  <h2>Top Categories</h2>
                  <ul className="footer__link">
                    <li>Mobile Phones</li>
                    <li>Modern Sofa</li>
                    <li>Arm chair</li>
                    <li>Smart Watches</li>
                  </ul>
                </div>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <div className="footer__item">
                  <h2>Useful Links</h2>
                  <ul className="footer__link">
                    <li>Shop</li>
                    <li>Login</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <div className="footer__item">
                  <h2>Contact</h2>
                  <div className="footer__link">
                    <p>
                      <MdOutlineLocationOn className="footer__icon" />
                      123 Hanoi, Vietnam
                    </p>
                    <p>
                      <BsFillTelephoneFill className="footer__icon"/>
                      +84.123.456.789
                    </p>
                    <p>
                      <AiOutlineMail className="footer__icon"/>
                      dinhphu.le186it@gmail.com
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
           </div>

           <div className="footer__bottom">
              <p className="footer__d-flex footer__bottom__center">
                Copyright 2022 developed by Dinhphu186. All rights reserved
              </p>
           </div>
        </div>
      </div>
  );
};

export default Footer;
