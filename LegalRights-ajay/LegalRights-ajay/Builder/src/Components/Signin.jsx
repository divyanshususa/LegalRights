import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./SignInForm.css"; // Import CSS file for custom styling
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const SignIn = () => {
  const [loading, setLoading] = useState(false); // State for loader
  const [signindata, setsignindata] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsignindata({
      ...signindata,
      [name]: value,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("here1 ");
      const response = await fetch(
        "http://localhost:5000/login/auth",
        // baseURL: "https://legalrights-9glt.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signindata),
        }
      );
      console.log("here2  ", signindata);
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }
      const data = await response.json();
      console.log("here2 ");
      console.log(data.token, data.role, data.user);
      // Assuming the JWT token is in the response data
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Store token in localStorage
      // Navigate to /user on successful login
      if (data.role === "admin") {
        navigate("/user");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <h1 style={{ alignContent: "center", marginLeft: "4em" }}>
        <AiOutlineUser />
      </h1>
      <h2>Sign In</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={signindata.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={signindata.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
          <div
            style={{ color: "blue" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </div>
        </Form.Item>
      </Form>
      {loading && (
        <div className="loader">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default SignIn;
