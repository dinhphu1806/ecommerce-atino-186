import React , {useState} from 'react';
import { Row, Col, Form, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/login.scss';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';



const Login = () => {

  // xong layout
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate()

  const onFinish = async () => {
    // e.preventDefault()
    setLoading(!loading)  // true

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log(user)
      setLoading(false) 
      toast.success('Successfully logged in')
      navigate('/checkout')
     
    } catch(error) {
      setLoading(false) // setLoading err
      toast.error(error.message) // toast error
    }
  }

  return (
    <section>
      <Row className='form__login'>
      {
        loading ? <Col lg={24} className='loading'>
          Loading ...</Col> 
          : <Col sm={24} md={24}>
          <h3 className='form__heading'>Login</h3>

          <Form className='auth__form' onFinish={onFinish}>
              <Form.Item className='form__group'>
                  <i class="fa-solid fa-envelope" htmlType='email'></i>
                  <input 
                    type="email" 
                    id='email' 
                    placeholder='Enter your email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
              </Form.Item>
              <Form.Item className='form__group'>
                  <i class="fa-solid fa-lock" htmlType='password'></i>
                  <input 
                    type="password" 
                    id='password' 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
              </Form.Item>
              
              <Form.Item className="btn">
                <Button 
                  type='primary'
                  htmlType='submit' 
                  className='buy__btn auth__btn' 
                >Login</Button>
              </Form.Item>
              <p>Don't have an account ? <Link to='/signup'>Create an account</Link></p>
          </Form>
        </Col>
      }
      </Row>
    </section>
  )
}

export default Login