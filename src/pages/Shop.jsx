import React from 'react';
import { useState } from 'react';
import CommonSecsion from '../components/UI/CommonSecsion'
import { Row, Col } from 'antd';
import { BiSearch } from 'react-icons/bi'
import '../sass/shop.scss';
// 3
import ProductList from '../components/UI/ProductList'

//2
import products from '../assets/data/Product'

const Shop = () => {

  const [ productsData, setProductsData ] = useState(products);

  // hanlde filter products
  const handleFilter = (e) => {   // xuonngs cho onChange={handleFilter}
      const filterValue = e.target.value;

      //filter sofa
      if(filterValue === 'sofa') {
        const filterProducts = products.filter(item => {
          return(
            item.category === "sofa"
          )
        })

        setProductsData(filterProducts)
      }

      // filter chair
      if(filterValue === 'chair') {
        const filterProducts = products.filter(item => {
          return(
            item.category === "chair"
          )
        })

        setProductsData(filterProducts)
      }

      // filter mobile
      if(filterValue === 'mobile') {
        const filterProducts = products.filter(item => {
          return(
            item.category === "mobile"
          )
        })

        setProductsData(filterProducts)
      }

      // filter watch
      if(filterValue === 'watch') {
        const filterProducts = products.filter(item => {
          return(
            item.category === "watch"
          )
        })

        setProductsData(filterProducts)
      }


  }
  // xong import ProductList  rôi xuống dưới để render ra
  

  //handle Search product
  const handleSearch = (e) => {
      const searchValue = e.target.value;

      const searchProduct = products.filter(item => {
        return(
          item.productName.toLowerCase().includes(searchValue.toLowerCase())
        )

        
      })
      setProductsData(searchProduct)   // xuong input
  }


  //hanlde sort product


  return (
    <div>
      <CommonSecsion />

      <section className='shop__cate'>
        <Row gutter={[32, 32]} >
          <Col>
            <div className="filter__widget">
              <select onChange={handleFilter}>
                <option>Filter By Category</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
                <option value="watch">Watch</option>
              </select>
            </div>
          </Col>

          <Col>
            <div className="filter__widget">
              <select name="" id="">
                <option>Sort By </option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
               
              </select>
            </div>
          </Col>

          <Col>
              <div className="search__box">
                <input 
                  type="text" 
                  placeholder='Search ...' 
                  onChange={handleSearch}
                />

                <span>
                  <BiSearch />
                </span>
              </div>
          </Col>
        </Row>
      </section>

     {/*render list filter product */}
      <section>
          <Row>
              <Col>
              {productsData.length === 0 ? <h1 className='product__err'>No product are found</h1>
                : <ProductList data={productsData}/>
              }
              </Col>

              
          </Row>
      </section>
    </div>
  )
}

export default Shop