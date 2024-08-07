import React, { useState } from "react";
import "./MainLayout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { IconContext } from "react-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FiMapPin } from "react-icons/fi";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { Layout, Menu, Button } from "antd";
import { FaTruckFast } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const remove = () => {
  localStorage.removeItem("token");
};
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  // Fallback values for colorBgContainer and borderRadiusLG
  const colorBgContainer = "#ffffff"; // Replace with your default color
  const borderRadiusLG = "8px"; // Replace with your default border radius

  const token = localStorage.getItem("token");
  const handlesignout = () => {
    const toe = localStorage.removeItem("token");
    console.log("this is new ", toe);
    navigate("/");
  };

const user = JSON.parse(localStorage.getItem("user"));
console.log("user role", user.role);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {user.role === "user" && (
            <>
              <Menu.Item
                key="dashboard"
                icon={<RxDashboard />}
                onClick={() => navigate("/user")}
              >
                DashBoard
              </Menu.Item>

              <Menu.Item
                key="dataentry"
                icon={<RxDashboard />}
                onClick={() => navigate("/user/dataentry")}
              >
                DataEntry
              </Menu.Item>
              <Menu.Item
                key="userhistory"
                icon={<RxDashboard />}
                onClick={() => navigate("/user/userhistory")}
              >
                History
              </Menu.Item>
            </>
          )}
          {user.role === "admin" && (
            <>
              <Menu.Item
                key="admin"
                icon={<RxDashboard />}
                onClick={() => navigate("/user/admin")}
              >
                All User details
              </Menu.Item>
              <Menu.Item
                key="dataentry"
                icon={<RxDashboard />}
                onClick={() => navigate("/user/ledgerentry")}
              >
                Ledger Entry
              </Menu.Item>
            </>
          )}
          <Menu.Item
            key="/"
            icon={<RxDashboard />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Signout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between", // Align items horizontally
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <IconContext.Provider
              value={{
                color: "darkblue",
                className: "global-class-name",
                margin: "10px",
                fontSize: "24px", // Increase the font size
              }}
            >
              {" "}
              <h1 style={{ margin: "10px" }}>
                {" "}
                <HiMiniBuildingLibrary />
              </h1>
            </IconContext.Provider>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <h1>Sale & Purchase</h1>
              </span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
