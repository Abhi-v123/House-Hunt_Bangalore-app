import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Select,
  InputNumber,
  Button,
  Segmented,
  Typography,
  Spin,
  Collapse,
  Slider,
  Divider,
  ConfigProvider,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  DollarOutlined,
  ControlOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { api } from "../../api/api";

const { Title, Text } = Typography;
const { Option } = Select;

export default function MainSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("buy");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    category: "",
    priceMin: "",
    priceMax: "",
    beds: "",
    baths: "",
    areaRange: [0, 5000],
    status: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/properties");
      setProperties(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  // Memoized unique lists for filters
  const locations = useMemo(
    () => [...new Set(properties.map((p) => p.plocation))].filter(Boolean),
    [properties],
  );
  const categories = useMemo(
    () => [...new Set(properties.map((p) => p.ptype))].filter(Boolean),
    [properties],
  );
  const statuses = useMemo(
    () => [...new Set(properties.map((p) => p.pstatus))].filter(Boolean),
    [properties],
  );

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value)
        params.append(key, Array.isArray(value) ? value.join(",") : value);
    });
    params.append("buyOrRent", selected);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
        },
      }}
    >
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          backgroundColor: "#0b0f14",
          backgroundImage: `linear-gradient(rgba(11, 21, 35, 0.8), rgba(11, 21, 35, 0.8)), url(${import.meta.env.BASE_URL}logo.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 1000,
            borderRadius: 32,
            background: "rgba(255, 255, 255, 0.98)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
          bodyStyle={{ padding: "48px 40px" }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Title
              level={1}
              style={{
                margin: 0,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#1e293b",
              }}
            >
              <span style={{ color: "#035589" }}>House </span>
              <span style={{ color: "#f97316" }}>Hunt </span>
              <span style={{ color: "#3e3c3d" }}>Bengaluru</span>
            </Title>
            <Text
              style={{
                fontSize: 18,
                color: "#64748b",
                marginTop: 8,
                display: "block",
              }}
            >
              Find your dream home in India's Silicon Valley
            </Text>
          </div>

          {/* Buy/Rent Toggle */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Segmented
              size="large"
              value={selected}
              onChange={setSelected}
              options={[
                { label: "Buy a Property", value: "buy" },
                { label: "Rent a Property", value: "rent" },
              ]}
              className="custom-segmented"
            />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Spin size="large" tip="Loading properties..." />
            </div>
          ) : (
            <>
              {/* Primary Search Row */}
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <Text
                    strong
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#475569",
                    }}
                  >
                    Location
                  </Text>
                  <Select
                    prefix={
                      <EnvironmentOutlined style={{ color: "#94a3b8" }} />
                    }
                    placeholder="Search areas (Indiranagar, HSR...)"
                    size="large"
                    style={{ width: "100%" }}
                    value={filters.location || undefined}
                    onChange={(v) => handleChange("location", v)}
                    allowClear
                    showSearch
                  >
                    {locations.map((loc) => (
                      <Option key={loc} value={loc}>
                        {loc}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={24} md={8}>
                  <Text
                    strong
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#475569",
                    }}
                  >
                    Property Type
                  </Text>
                  <Select
                    prefix={<HomeOutlined style={{ color: "#94a3b8" }} />}
                    placeholder="Villa, Apartment, Plot..."
                    size="large"
                    style={{ width: "100%" }}
                    value={filters.category || undefined}
                    onChange={(v) => handleChange("category", v)}
                    allowClear
                  >
                    {categories.map((cat) => (
                      <Option key={cat} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={24} md={8}>
                  <Text
                    strong
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#475569",
                    }}
                  >
                    Budget Range
                  </Text>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <InputNumber
                      prefix={<DollarOutlined style={{ color: "#94a3b8" }} />}
                      placeholder="Min"
                      size="large"
                      style={{ flex: 1 }}
                      value={filters.priceMin || null}
                      onChange={(v) => handleChange("priceMin", v)}
                      min={0}
                    />
                    <InputNumber
                      placeholder="Max"
                      size="large"
                      style={{ flex: 1 }}
                      value={filters.priceMax || null}
                      onChange={(v) => handleChange("priceMax", v)}
                      min={0}
                    />
                  </div>
                </Col>
              </Row>

              {/* Advanced Filters */}
              <Collapse
                ghost
                expandIcon={({ isActive }) => (
                  <ControlOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{
                  marginTop: 24,
                  background: "#f8fafc",
                  borderRadius: 16,
                }}
              >
                <Collapse.Panel
                  header={<Text strong>Advanced Search Criteria</Text>}
                  key="1"
                >
                  <Row gutter={[24, 24]} style={{ padding: "10px 0" }}>
                    <Col xs={24} sm={8}>
                      <Text type="secondary" small>
                        Status
                      </Text>
                      <Select
                        placeholder="Project Status"
                        style={{ width: "100%", marginTop: 4 }}
                        value={filters.status || undefined}
                        onChange={(v) => handleChange("status", v)}
                        allowClear
                      >
                        {statuses.map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Text type="secondary">Bedrooms</Text>
                      <Select
                        placeholder="Beds"
                        style={{ width: "100%", marginTop: 4 }}
                        value={filters.beds || undefined}
                        onChange={(v) => handleChange("beds", v)}
                        allowClear
                      >
                        {[1, 2, 3, 4, 5].map((b) => (
                          <Option key={b} value={b}>
                            {b}+ BHK
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Text type="secondary">Area (Sq Ft)</Text>
                      <Slider
                        range
                        min={0}
                        max={5000}
                        value={filters.areaRange}
                        onChange={(v) => handleChange("areaRange", v)}
                        style={{ marginTop: 12 }}
                      />
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>

              {/* Submit Action */}
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<SearchOutlined />}
                  onClick={handleSubmit}
                  style={{
                    height: 45,
                    padding: "0 20px",
                    fontSize: 16,
                    fontWeight: 500,
                    borderRadius: 16,
                    background:
                      "linear-gradient(135deg, #048ce0 5%, #f47f2c 100%)",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(22, 119, 255, 0.3)",
                  }}
                  className="search-btn"
                >
                  Search Properties
                </Button>
              </div>
            </>
          )}

          <style>
            {`
              .custom-segmented {
                background: #f1f5f9 !important;
                padding: 6px !important;
                border-radius: 14px !important;
              }
              .custom-segmented .ant-segmented-item-selected {
                background: #ffffff !important;
                color: #1677ff !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
                font-weight: 700 !important;
              }
              .search-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(249, 115, 22, 0.4) !important;
                opacity: 0.9;
              }
              .ant-select-selector, .ant-input-number {
                border-color: #e2e8f0 !important;
              }
              .ant-select-focused .ant-select-selector {
                border-color: #1677ff !important;
                box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1) !important;
              }
            `}
          </style>
        </Card>
      </div>
    </ConfigProvider>
  );
}
