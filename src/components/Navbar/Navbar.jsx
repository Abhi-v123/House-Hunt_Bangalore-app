import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Space,
  Typography,
  Grid,
  Image,
} from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Navbar({ user, openLogin, handleLogout }) {
  const [open, setOpen] = useState(false);
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <a href="#home">Home</a>,
    },
    {
      key: "property",
      icon: <AppstoreOutlined />,
      label: <a href="#property">Property</a>,
    },
    {
      key: "agency",
      icon: <TeamOutlined />,
      label: <a href="#agency">Agency</a>,
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: <a href="#contact">Contact</a>,
    },
    {
      key: "about",
      icon: <InfoCircleOutlined />,
      label: <a href="#about">About Us</a>,
    },
  ];

  const RightActions = () => (
    <Space size="middle">
      {user ? (
        <>
          <span style={{ fontWeight: 500, fontSize: 15 }}>
            Hello, {user.username}
          </span>
          <Button
            type="primary"
            size="large"
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #ff9191 0%, #ff0000 100%)",
              border: "none",
              padding: 20,
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          type="primary"
          size="large"
          onClick={openLogin}
          style={{
            background: "linear-gradient(135deg, #f0c692 0%, #de640c 100%)",
            border: "none",
            padding: 20,
          }}
        >
          Login
        </Button>
      )}
    </Space>
  );

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          height: 72,
          lineHeight: "72px",
          background: "#ffffff",
          padding: "0 40px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space size="large" align="center">
          <Image
            src={`${import.meta.env.BASE_URL}logo.jpeg`}
            alt="House Hunt Bengaluru"
            preview={true}
            width={60}
            height={60}
            style={{
              objectFit: "contain",
              display: "block",
              marginTop: "10px",
            }}
          />

          <Title
            level={3}
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            <span style={{ color: "#035589" }}>House </span>
            <span style={{ color: "#f97316" }}>Hunt </span>
            <span style={{ color: "#3e3c3d" }}>Bengaluru</span>
          </Title>
        </Space>

        {screens.md ? (
          <Space size="large" align="center">
            <Menu
              mode="horizontal"
              items={menuItems}
              style={{
                borderBottom: "none",
                fontSize: 15,
                minWidth: 420,
              }}
            />
            <RightActions />
          </Space>
        ) : (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22 }} />}
            onClick={() => setOpen(true)}
          />
        )}
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        width={260}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu mode="vertical" items={menuItems} />
        <div style={{ marginTop: 24 }}>
          <RightActions />
        </div>
      </Drawer>
    </>
  );
}
