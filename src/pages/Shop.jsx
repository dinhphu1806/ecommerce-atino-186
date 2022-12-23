import React from 'react';
import { useState } from 'react';
import CommonSecsion from '../components/UI/CommonSecsion'
import { Row, Col, Space } from 'antd';
import { BiSearch } from 'react-icons/bi';
import '../sass/shop.scss';
// 3
import ProductList from '../components/UI/ProductList';

//2
import products from '../assets/data/Product';

import { Pagination } from 'antd';

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
      // console.log(...products)
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
    const searchValue = e.target.value;

    const searchProduct = products.filter(item => {
      return(
        item.productName.toLowerCase().includes(searchValue.toLowerCase())
      )
      
    })
    setProductsData(searchProduct)   // xuong input
  }


  const [ currentPage, setCurrentPage ] = useState(2)

  return (
    <div>
      <CommonSecsion />

      <section className='shop__cate'>
        <Row gutter={[32, 32]} >
          <Col>
            <div className="filter__widget">
              <label htmlFor="filter" style={{marginRight: '10px'}}>Filter by:</label>
              <select id='filter' onChange={handleFilter}>
                <option>Filter By Category</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
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
              {productsData.length === 0 ? <h1 className='product__err'>No product are found</h1>
                : <ProductList data={productsData}/>
              }
              </Col>

              
          </Row>
      </section>

      <div className="pagin">
        <Space size={8} direction="vertical">
          <Pagination total={20} pageSize={5} />
          <Pagination defaultCurrent={2} total={20} pageSize={5} />
          <Pagination defaultCurrent={2} total={200} pageSize={5} />
          <Pagination total={20} showSizeChanger />
          <Pagination total={20} showSizeChanger pageSizeOptions={[1, 7, 10, 30]} />
          <Pagination total={20} pageSize={5} showQuickJumper/>
          <Pagination simple total={20} pageSize={5} showQuickJumper />
          <Pagination total={20} pageSize={5} showQuickJumper itemRender={(page, type) => {
            if(type === 'next') {
              return <a>NEXT</a>
            } else  if(type === 'prev') {
              return <a>PREV</a>
            } else  if(type === 'page') {
              return <a> Page {page}</a>;
            }
          }} 
          current={currentPage}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
         
          }}
          />

          <div style={{color: 'red'}}>
            Showing content of page #{currentPage}
            {products.map(item => {
              return(
                <div key={item.id}>
                  <h1>{item.productName}</h1>
                </div>
              )
            })}
          </div>
         
        </Space>
        
      </div>
    </div>
  )
}

export default Shop