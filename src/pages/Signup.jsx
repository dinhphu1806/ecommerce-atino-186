import React, { useState } from "react";
import { Row, Col, Form, Button, Input } from "antd";
import { Link } from "react-router-dom";

import "../sass/login.scss";

// use firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // xuoonsg import storage avf toast 1
import { setDoc, doc } from "firebase/firestore"; // xong xuong import db 3

// import auth và storage từ file firebase.config đã export
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";

import { toast } from "react-toastify"; // xong len import setDoc 2
import { db } from "../firebase.config"; //4 => xong xuoong toast.error

import { useNavigate } from "react-router-dom";

const Signup = () => {
  // xong layout
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  // loading
  const [loading, setLoading] = useState(false);
  // navigate to page login khi create user success
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (e) => {
    // e.preventDefault();
    setLoading(true); // open loading

    try {
      // create user credential
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await get user credential thông tin xác thực
      const user = await userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`); //2
      // download storageRef and file leen store
      const uploadTask = uploadBytesResumable(storageRef, file); // 2

      // uploadTask(() => {er}, () => {})  // upload error
      uploadTask.on(
        (error) => {
          toast.error(error.message); // upload err
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            
            // update user profile have name and photo user
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false); // run loading sau 3s
      toast.success("Account create succesfully"); // toast succes
      navigate("/login"); // navigate page login

      // console.log(user); // xong down form onFinish/onSubmit
      // handle error
    } catch (error) {
      setLoading(false); // run loading after 3s
      toast.error("something went wrong"); //1 baos error create account
    }
  };

  return (
    <section>
      <Row className="form__login">
        {/* when click button signup succesfully is loading 3s navigate page login  */}
        {loading ? (
          <Col lg={24} className="">
            <h6>Loading ....</h6>
          </Col>
        ) : (
          <Col sm={24} md={24}>
            <h3 className="form__heading">Sign Up</h3>

            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{ remember: true }}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete="off"
              // validateMessages={validateMessages}
            >
              {/* username */}
              <Form.Item
                // className="form__group"
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                {/* <i class="fa-solid fa-user"></i> */}
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              {/* email */}
              <Form.Item
                // className="form__group"
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid email!",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                {/* <i class="fa-solid fa-envelope"></i> */}
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              {/* password */}
              <Form.Item
                // className="form__group"
                name="password"
                label="Password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              {/* confirm password */}
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  // check confirm password
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  id="password"
                  placeholder="Confirm your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              {/* file select */}
              <Form.Item className="form__group">
                <input
                  type="file"
                  id="file"
                  // only get the first file
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Item>

              <Form.Item className="btn">
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
        )}
      </Row>
    </section>
  );
};

export default Signup;
