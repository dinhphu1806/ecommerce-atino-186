import React, {useEffect, useState} from "react";
import '../sass/home.scss';
import products from "../assets/data/Product";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import ProductList from "../components/UI/ProductList";

import { Link } from 'react-router-dom';

const Home = () => {
//   const year = new Date().getFullYear();

  // const [ data, setData ] = useState(products)
  
  const [ trendingProducts, setTrendingProducts ] = useState([])
  const [ jacketProducts, setJacketProducts ] = useState([])
  const [ wacthProducts, SetWacthProducts ] = useState([])

  useEffect(() => {

    const filterJacketProducts = products.filter(item => {
      return(
        item.category === 'jacket'
      )
    })

    const filterTrendingProducts = products.filter(item => {
      return(
        item.category === 'trousers'
      )
    })

    const filterWatchProducts = products.filter(item => {
      return(
        item.category === 'watch'
      )
    })

    setTrendingProducts(filterTrendingProducts)
    setJacketProducts(filterJacketProducts)
    SetWacthProducts(filterWatchProducts)
  } , [])

  const styleHeading = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto',
    fontSize: '36px',
    fontWeight: 'bold'
  }
  // một thời đã xa
  return (
    <>
      <Hero />

      <Services />

      <section>
        <div className="" style={styleHeading}>
          <h3 >Jacket Product</h3>
          <Link to="/shop" style={{fontSize:'17px', color:'#000'}}>All product</Link>
        </div>
        <ProductList data={jacketProducts}/>
      </section>

      <section>
        <h3 style={styleHeading}>Trending Armchair Product</h3>
        <ProductList data={trendingProducts}/>
        {console.log(trendingProducts)}
      </section>
    
      <section>
        <h3 style={styleHeading}>Watch Product</h3>
        <ProductList data={wacthProducts}/>
      </section>
      
    </>
    
  );
};

export default Home;
