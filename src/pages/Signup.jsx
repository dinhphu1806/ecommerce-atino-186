import React, { useState } from "react";
import { Row, Col, Form, Button } from "antd";
import { Link } from "react-router-dom";
import "../sass/login.scss";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // xuoonsg import storage avf toast 1
import { setDoc, doc } from "firebase/firestore"; // xong xuong import db 3

import { auth } from "../firebase.config";

import { storage } from "../firebase.config";
import { toast } from "react-toastify"; // xong len import setDoc 2

import { db } from "../firebase.config";  //4 => xong xuoong toast.error
// import { async } from "@firebase/util";

import { useNavigate } from "react-router-dom";


const Signup = () => {
  // xong layout
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  

  const onFinish = async (e) => {
    // e.preventDefault(); 
    setLoading(!loading);

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await get user credential
      const user = await userCredential.user;

      const storageRef = ref(storage, `images/${ Date.now() + username}`) //2
      // download leen store
      const uploadTask = uploadBytesResumable(storageRef, file) // 2
       
      // uploadTask(() => {}, () => {})  // upload error 
      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          // update user profile have name and photo user
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          // store user data in firestore database
          await setDoc(doc(db,'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        })
      })
       
      setLoading(false) // run loading sau 3s
      toast.success('Account create succesfully') // toast succes
      navigate('/login') // navigate page login

      // console.log(user); // xong xuống chỗ Form onSubmit
    } catch (error) {
      setLoading(false) // run loading after 3s
      toast.error('something went wrong') //1 baos error create account 
    }
  };

  return (
    <section>
      <Row className="form__login">
        {
          loading ? <Col lg={24} className=''>
            <h6>Loading ....</h6>
          </Col>
          :  <Col sm={24} md={24}>
          <h3 className="form__heading">Sign Up</h3>

          <Form onFinish={onFinish} initialValues={{ remember: true }}>
            <Form.Item 
              className="form__group"
            >
              <i class="fa-solid fa-user"></i>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              className="form__group"
            >
              <i class="fa-solid fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              className="form__group"
            >
              <i class="fa-solid fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item className="form__group">
              <input 
                type="file" 
                id="file"  
                onChange={(e) => setFile(e.target.files[0])} />
            </Form.Item>
            
            <Form.Item 
              className="btn"
            >
              <Button
                type="primary"
                htmlType="submit"
                className="buy__btn auth__btn"
              >
                Sign up
              </Button>
            </Form.Item>
            <p>
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        }
       
      </Row>
    </section>
  );
};

export default Signup;
