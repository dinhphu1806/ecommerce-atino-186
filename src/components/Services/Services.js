import React from 'react';
import './services.scss';
import serviceData from '../../assets/data/Services';
import { Row, Col} from 'antd';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <secsion
        className='services'
        avatar={{shape: "circle"}}
        title={{width: 200}}
        active 
        paragraph={{
          rows: 2,
          width: [200, 250]
        }}
        loading={false}
    >
        <Row gutter={[24, 24]} className="services__container">
          {serviceData.map((item, index) => {
                return(
                    <Col  sm={12} md={12} lg={6} key={index} >
                       <motion.div whileHover={{scale: 1.1}} className="services__item" style={{backgroundColor: `${item.bg}`}}>
                            <span className='services__icon'>
                                  {item.icon}
                            </span>
                            <div className="services__title">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                            </div>
                       </motion.div>
                    </Col>
                )
          })}
        </Row>
    </secsion>
  )
}

export default Services