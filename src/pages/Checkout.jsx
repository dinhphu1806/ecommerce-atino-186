import React from "react";
import { Row, Col, Form, Button } from "antd";
import "../sass/checkout.scss";

// xong layout
// dùng useSelector
import { useSelector } from 'react-redux';

const Checkout = () => {

  const totalAmount = useSelector(state => state.cart.totalAmount)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  return (
    <div>
      <section>
        <Row gutter={[12, 12]} className="checkout">
          <Col sm={24} md={18} lg={18} className='checkout__container' >
            <h3 className="">Billing Imformation</h3>
            <Form
              className="form"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item className="form__group">
                <input type="text" placeholder="Enter your name ..." />
              </Form.Item>
              <Form.Item className="form__group">
                <input type="email" placeholder="Enter your email ..." />
              </Form.Item>
              <Form.Item className="form__group">
                <input
                  type="number" 
                  placeholder="Phone number ..."
                />
              </Form.Item>
              <Form.Item className="form__group">
                <input type="text" placeholder="City" />
              </Form.Item>
              <Form.Item className="form__group">
                <input type="text" placeholder="Country" />
              </Form.Item>
            </Form>
          </Col>

          <Col sm={24} md={6} lg={6}>
            <div className="checkout__cart">
              <h4>
                <p>Total Quantity:</p> <span> {totalQuantity} items</span>
              </h4>
              <h4>
                <p>Subtotal:</p> <span>{totalAmount}</span>
              </h4>
              <h4 className="checkout__snipping">
                <p> 
                    Snipping <br />
                    free shipping
                </p> 
                <span>$ 0</span>
              </h4>
             
              <hr />
              <h4>
                <p>Total Cost:</p> <span>{totalAmount}</span>
              </h4>

              <Button type="primary" className="buy__btn auth__btn">Place an order</Button>
            </div>
            
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Checkout;




