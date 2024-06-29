import React, { useState } from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; 
import "./SignUpForm.css";
import axios from "../Service/axios";


const { Option } = Select;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(name,value)
  };

 const handleRoleChange = (value) => {
   console.log("Selected role:", value);
   setUserData({
     ...userData,
     role: value,
   });
 };

  
    
  
  const handleSubmit = async (e) => {
     console.log("here 51");
  
    console.log("Submitting form...");
    console.log("UserData:", userData); // Check if userData contains the expected data

    setLoading(true);
    try {
      console.log("here 51")
      const response = await axios.post(
        "/user/register",
        userData
      );
      if (response.status === 201) {
        console.log("User registered successfully!");
        navigate("/");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">
          <AiOutlineUser /> Sign Up
        </h1>
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          {/* First Name */}
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input
              name="firstName"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* Last Name */}
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input
              name="lastName"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* Email */}
          <Form.Item
            rules={[{ required: true, message: "Please input your Email!" }]}
            name="email"
          >
            <Input
              name="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* Role */}
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select your Role!" }]}
          >
            <Select
              name="role"
              placeholder="Select Role"
              onChange={handleRoleChange}
              value={userData.role}
            >
              <Option value="customer">Customer</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <div
              style={{ color: "blue", margin: "0.5em" }}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              signin
            </div>
          </Form.Item>
        </Form>
        {loading && (
          <div className="loader">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
