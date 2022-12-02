import React from 'react'
import './hero.scss';
import { motion } from 'framer-motion'; 

import { DataHero } from './DataHero';

// import hero1 from '../../assets/images/banner-1.jpg';
// import hero2 from '../../assets/images/banner-2.jpg';
// import hero3 from '../../assets/images/banner-3.jpg';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const NextArrow = (props) => {
    const { onClick } = props
    return(
      <div className="control-btn" >
          <motion.button whileTap={{scale: 1.3}} className='next' onClick={onClick}>
              <i class="fa-solid fa-arrow-right"></i>
          </motion.button>
      </div>
    )
  }

  // prev
  const PrevArrow = (props) => {
    const { onClick } = props
    return(
      <div className="control-btn" >
          <motion.button whileTap={{scale: 1.3}} className='prev' onClick={onClick}>
              <i class="fa-solid fa-arrow-left"></i>
          </motion.button>
      </div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,  // lướt nav đến hết
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplaySpeed: 2000,
    initialSlide: 0,
    // centerPadding: "60px",
    swipeToSlide: true,
    // centerMode: true,
    // afterChange: function(index) {
    //   console.log(
    //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //   );
    // },
    // appendDots: (dots) => {
    //   return <ul style={{margin: "0px"}}>{dots}</ul>
    // },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1, // hieen thi anh 
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1, // anh con 2
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,  // anh con 1
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false,
          // centerMode: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,  // anh con 1
          slidesToScroll: 1,
          // nextArrow: false,
          // prevArrow: false,
          // centerMode: true,
          initialSlide: 1,
          lazyLoad: true
        }
      }
    ]
   
  };



const Hero = () => {
  return (
    <div>
        <div className="hero">
        <Slider 
            className="owl-theme hero__container"
            {...settings}
        >
          {DataHero.map(item => {
            return(
              <div className="hero__item" key={item.id}>
                 <img src={item.img} alt="hero image" />
              </div>
            )
          })}
        </Slider>
    </div>
    </div>
  )
}

export default Hero