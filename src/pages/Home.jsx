import React, {useEffect, useState} from "react";
import '../sass/home.scss';
import products from "../assets/data/Product";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import ProductList from "../components/UI/ProductList";


const Home = () => {
//   const year = new Date().getFullYear();

  // const [ data, setData ] = useState(products)
  
  const [ trendingProducts, setTrendingProducts ] = useState([])
  const [ sofaProducts, setSofaProducts ] = useState([])
  const [ wacthProducts, SetWacthProducts ] = useState([])

  useEffect(() => {

    const filterTrendingProducts = products.filter(item => {
      return(
        item.category === 'chair'
      )
    })

    const filterSofaProducts = products.filter(item => {
      return(
        item.category === 'sofa'
      )
    })

    const filterWatchProducts = products.filter(item => {
      return(
        item.category === 'watch'
      )
    })

    setTrendingProducts(filterTrendingProducts)
    setSofaProducts(filterSofaProducts)
    SetWacthProducts(filterWatchProducts)
  } , [])

  const styleHeading = {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold'
  }
  // một thời đã xa
  return (
    <>
      <Hero />

      <Services />

      <section>
        <h3 style={styleHeading}>Trending Armchair Product</h3>
        <ProductList data={trendingProducts}/>
      </section>
      
      <section>
        <h3 style={styleHeading}>Sofa Product</h3>
        <ProductList data={sofaProducts}/>
      </section>
    
      <section>
        <h3 style={styleHeading}>Watch Product</h3>
        <ProductList data={wacthProducts}/>
      </section>
      
     
    </>
    
  );
};

export default Home;
