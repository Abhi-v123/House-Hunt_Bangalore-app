import React, { useState } from "react";
import { Modal, Form, Input, Button, Alert, Typography } from "antd";

const { Title, Text } = Typography;

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [alert, setAlert] = useState(null);
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    const usersStr = localStorage.getItem("users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    const user = users.find((u) => u.email === values.email);

    if (!user) {
      setAlert({ type: "error", message: "No user found with this email" });
      return;
    }

    if (user.password !== values.password) {
      setAlert({ type: "error", message: "Incorrect password" });
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setAlert({ type: "success", message: `Welcome back, ${user.username}` });

    setTimeout(() => {
      setAlert(null);
      onAuthSuccess(user);
      onClose();
    }, 800);
  };

  const handleSignup = (values) => {
    if (values.password !== values.confirmPass) {
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }

    const usersStr = localStorage.getItem("users");
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.find((u) => u.email === values.email)) {
      setAlert({ type: "error", message: "Email already registered" });
      return;
    }

    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setAlert({
      type: "success",
      message: "Registration successful! Logging in...",
    });

    setTimeout(() => {
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      setAlert(null);
      onAuthSuccess(newUser);
      onClose();
    }, 1200);
  };

  const onFinish = (values) => {
    if (mode === "login") {
      handleLogin(values);
    } else {
      handleSignup(values);
    }
  };

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
    >
      <div style={{ padding: "10px 6px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 8 }}>
          {mode === "login" ? "Login" : "Sign Up"}
        </Title>

        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          {mode === "login"
            ? "Welcome back! Please login to continue"
            : "Create your account to get started"}
        </Text>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {mode === "signup" && (
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input size="large" placeholder="Enter username" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter valid email" },
            ]}
          >
            <Input size="large" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>

          {mode === "signup" && (
            <Form.Item
              name="confirmPass"
              label="Confirm Password"
              rules={[{ required: true, message: "Please confirm password" }]}
            >
              <Input.Password size="large" placeholder="Confirm password" />
            </Form.Item>
          )}

          <Form.Item style={{ marginTop: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                height: 48,
                fontWeight: 600,
                background: "linear-gradient(135deg, #1677ff 0%, #f97316 100%)",
                border: "none",
              }}
            >
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          {mode === "login" ? (
            <Text>
              New user?{" "}
              <Button
                type="link"
                onClick={() => {
                  setMode("signup");
                  setAlert(null);
                  form.resetFields();
                }}
              >
                Sign up here
              </Button>
            </Text>
          ) : (
            <Text>
              Already have an account?{" "}
              <Button
                type="link"
                onClick={() => {
                  setMode("login");
                  setAlert(null);
                  form.resetFields();
                }}
              >
                Login here
              </Button>
            </Text>
          )}
        </div>
      </div>
    </Modal>
  );
}
