import React from 'react';
import { useState } from 'react';
import CommonSecsion from '../components/UI/CommonSecsion'
import { Row, Col } from 'antd';
import { BiSearch } from 'react-icons/bi';
import '../sass/shop.scss';
// 3
import ProductList from '../components/UI/ProductList';

//2
import products from '../assets/data/Product';


const Shop = () => {

  const [ productsData, setProductsData ] = useState(products);

  // hanlde filter products
  const handleFilter = (e) => {   // xuonngs cho onChange={handleFilter}
      const { value } = e.target;

      // filter trousers
      if( value === 'trousers'){
        const filterTrousers = products.filter(item => {
          return(
            item.category === 'trousers'
          )
        })
        setProductsData(filterTrousers)
      }

      // filter jacket
      if(value === 'jacket'){
        const filterJackets= products.filter(item => {
          return(
            item.category === 'jacket'
          )
        })
        setProductsData(filterJackets)
      }

      // filter bags
      if(value === 'bags') {
        const filterJackets = products.filter(item => {
          return(
            item.category === 'bags'
          )
        })
        setProductsData(filterJackets)
      }

      // filter watch
      if(value === 'watch') {
        const filterWatch = products.filter(item => {
          return(
            item.category === 'watch'
          )
        })
        setProductsData(filterWatch)
        // console.log(filterWatch)
      }
  }
  // xong import ProductList  rôi xuống dưới để render ra
  

 


  //handle sort product

  const compare = (a, b, ascendingOrder) => {
    if (a < b) {
      return ascendingOrder ? -1 : 1;
    }
    if (a > b) {
      return ascendingOrder ? 1 : -1;
    }
    return 0;
  }

  const handleSort = (value) => {
   
    if(value === 'none') {
      setProductsData(...products)
    } else {
      let toType, toAscending;
      switch(value){
        case 'ascending' : toType = true; toAscending = true; break;
        case 'descending' : toType = true; toAscending = false; break;
        case 'high' : toType = false; toAscending = true; break;
        case 'low' : toType = false; toAscending = false; break;
      }
      let currentSort = [...products];
      currentSort.sort((a, b) => toType ? compare(a.productName, b.productName, toAscending) 
                                        : compare(a.price, b.price, toAscending) )
        
      setProductsData([...currentSort])
        

        // setProductsData(sortProduct)
    }
  }

   //handle Search product
   const handleSearch = (e) => {
    // const searchValue = e.target.value;
    const { value } = e.target;

    const searchProduct = products.filter(item => {
      return(
        item.productName.toLowerCase().includes(value.toLowerCase())
      )
    })

    setProductsData(searchProduct)
  }


  return (
    <div>
      <CommonSecsion />

      <section className='shop__cate'>
        <Row gutter={[32, 32]} >

          <Col>
            <div className="filter__widget">
              <label htmlFor="filter" style={{marginRight: '10px'}}>Filter by:</label>
              <select id='filter' onChange={handleFilter}>
                <option >Filter By Category</option>
                <option value="jacket">Jacket</option>
                <option value="bags">Bags</option>
                <option value="trousers">Trousers</option>
                <option value="watch">Watch</option>
              </select>     
            </div>
          </Col>

          <Col>
            <div className="sort__widget">
              <label htmlFor="sort" style={{marginRight: '10px'}}>Sorted by:</label>
              <select name="sort" id="sort" onChange={(e) => handleSort(e.target.value)}>
                <option value="none">Default </option> 
                <option value="ascending">Alphabetically, A-Z</option>
                <option value="descending">Alphabetically, Z-A</option>
                <option value="high">Price: Ascending</option>
                <option value="low">Price: Descending</option>    
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
              {/* check have product */}
                {productsData.length === 0 ? <h1 className='product__err'> No product are found</h1>
                  : (
                    <ProductList data={productsData}/>
                  )
                }
              </Col>


          </Row>
      </section>
    </div>
  )
}

export default Shop