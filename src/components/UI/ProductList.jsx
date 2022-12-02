import React from 'react';
import ProductCard from './ProductCard';
import './productLists.scss';
import { Row } from 'antd';

const ProductList = ({data}) => {
  return (
    <div className='product'>
        <div className="product__container">
        <Row gutter={[12, 12]} className="">
          {data?.map((item, index) => {
            return(
              <ProductCard item={item} className="list" key={index}/>
            )
          })}
           
        </Row>
        </div>
    </div>
  )
}

export default ProductList