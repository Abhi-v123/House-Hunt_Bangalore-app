import React, { useEffect, useRef, useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaParking,
} from "react-icons/fa";
import {
  Spin,
  message as antdMessage,
  Empty,
  Modal,
  Button,
  Tag,
  Typography,
  ConfigProvider,
  Row,
  Col,
  Divider,
  Image,
} from "antd";
import { api } from "../../api/api";

const { Title, Text, Paragraph } = Typography;

export default function PropertiesCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollRef = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  // Responsive modal helper (fix for window.innerWidth usage)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  // Auto horizontal scroll loop
  useEffect(() => {
    const container = scrollRef.current;
    let frameId;

    const scroll = () => {
      if (isPlaying && container && properties.length) {
        container.scrollLeft += 0.8;

        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, properties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/properties");
      setProperties(res.data || []);
    } catch {
      antdMessage.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && loggedInUser !== "null") {
      antdMessage.success("Agent notified. We will contact you shortly.");
      setSelectedProperty(null);
    } else {
      antdMessage.warning("Please login to proceed.");
    }
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    setIsWatched((prev) => !prev);
    antdMessage.info(
      !isWatched ? "Added to Watchlist" : "Removed from Watchlist",
    );
  };

  // Styles (design preserved, only spacing fixes)
  const styles = {
    section: {
      minHeight: "calc(100vh - 72px)",
      padding: "40px 24px",
      background: "linear-gradient(180deg,#fafafa 0%, #f1f5f9 100%)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    header: {
      textAlign: "center",
      marginBottom: 48,
    },

    // IMPORTANT: allow hover lift visibility
    carouselWrapper: {
      overflow: "visible",
      position: "relative",
    },

    // Added top/bottom space so hover does not clip
    cardsContainer: {
      display: "flex",
      gap: 28,
      overflowX: "hidden",
      paddingTop: 16,
      paddingBottom: 20,
    },

    card: {
      minWidth: 320,
      maxWidth: 320,
      background: "#fff",
      borderRadius: 24,
      overflow: "hidden",
      cursor: "pointer",
      border: "1px solid #eef2f7",
      transition: "all .35s ease",
      boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
    },

    imageWrap: {
      position: "relative",
      height: 210,
      overflow: "hidden",
    },

    priceTag: {
      position: "absolute",
      bottom: 14,
      right: 14,
      background: "linear-gradient(135deg,#1677ff,#f97316)",
      color: "#fff",
      padding: "6px 14px",
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 13,
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    },

    badge: {
      position: "absolute",
      top: 14,
      left: 14,
      background: "rgba(255,255,255,0.95)",
      padding: "5px 12px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      color: "#1677ff",
    },

    content: {
      padding: "22px 22px 20px",
    },

    specs: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 16,
      paddingTop: 14,
      borderTop: "1px solid #f1f5f9",
      color: "#64748b",
      fontSize: 13,
    },
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
      <section style={styles.section}>
        {/* Header */}
        <div style={styles.header}>
          <Tag color="orange" style={{ fontWeight: 700, borderRadius: 6 }}>
            BENGALURU SPECIALS
          </Tag>
          <Title level={2} style={{ marginTop: 12, fontWeight: 800 }}>
            Premium <span style={{ color: "#f97316" }}>Collections</span>
          </Title>
        </div>

        {/* Loading / Empty / Carousel */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <Spin size="large" />
          </div>
        ) : properties.length === 0 ? (
          <Empty description="No properties listed yet" />
        ) : (
          <div
            style={styles.carouselWrapper}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <div style={styles.cardsContainer} ref={scrollRef}>
              {properties.map((p) => (
                <div
                  key={p.id || p.pid}
                  className="premium-card"
                  style={styles.card}
                  onClick={() => setSelectedProperty(p)}
                >
                  <div style={styles.imageWrap}>
                    <Image
                      src={p.pimage}
                      alt={p.pname}
                      preview={false}
                      placeholder
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .6s ease",
                      }}
                      className="property-img"
                    />

                    <div style={styles.badge}>{p.ptype}</div>
                    <div style={styles.priceTag}>
                      ₹{Number(p.p_price).toLocaleString()}
                    </div>
                  </div>

                  <div style={styles.content}>
                    <Title level={5} style={{ margin: 0 }}>
                      {p.pname}
                    </Title>

                    <Text type="secondary" style={{ fontSize: 13 }}>
                      <FaMapMarkerAlt
                        style={{ color: "#f97316", marginRight: 6 }}
                      />
                      {p.plocation}
                    </Text>

                    <div style={styles.specs}>
                      <span>
                        <FaBed /> {p.pbeds} BHK
                      </span>
                      <span>
                        <FaBath /> {p.pbaths}
                      </span>
                      <span>
                        <FaRulerCombined /> {p.parea}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal — DESIGN UNCHANGED */}
        <Modal
          open={!!selectedProperty}
          onCancel={() => setSelectedProperty(null)}
          footer={null}
          width={850}
          centered
          className="luxury-modal"
          bodyStyle={{ padding: 0 }}
        >
          {selectedProperty && (
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                minHeight: 500,
              }}
            >
              {/* Image Side */}
              <div style={{ flex: 1.1, position: "relative", minHeight: 350 }}>
                <Image
                  src={selectedProperty.pimage}
                  alt={selectedProperty.pname}
                  preview={true}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="modal-img-overlay">
                  <Tag
                    color="blue"
                    style={{ borderRadius: 4, fontWeight: 600 }}
                  >
                    FEATURED
                  </Tag>
                  <div className="rating-tag">
                    <FaStar style={{ color: "#fbbf24" }} /> 4.9
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div
                style={{
                  flex: 1,
                  padding: "36px 40px",
                  background: "#fff",
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    strong
                    style={{
                      color: "#1677ff",
                      fontSize: 12,
                      letterSpacing: 1.2,
                    }}
                  >
                    {selectedProperty.ptype.toUpperCase()}
                  </Text>

                  <div
                    className={`watchlist-btn ${isWatched ? "active" : ""}`}
                    onClick={toggleWatchlist}
                    title="Add to Watchlist"
                  >
                    {isWatched ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
                  </div>
                </div>

                <Title
                  level={3}
                  style={{ marginTop: 8, marginBottom: 4, fontWeight: 800 }}
                >
                  {selectedProperty.pname}
                </Title>

                <Text type="secondary">
                  <FaMapMarkerAlt style={{ color: "#f97316" }} />{" "}
                  {selectedProperty.plocation}
                </Text>

                <div
                  style={{
                    marginTop: 24,
                    padding: "16px 20px",
                    background: "#f8fafc",
                    borderRadius: 16,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Market Valuation
                  </Text>
                  <Title
                    level={2}
                    style={{ color: "#0f172a", margin: 0, fontWeight: 800 }}
                  >
                    ₹ {Number(selectedProperty.p_price).toLocaleString()}
                  </Title>
                </div>

                <Divider style={{ margin: "24px 0" }} />

                <Row gutter={[16, 20]} style={{ marginBottom: 24 }}>
                  <Col span={8} style={{ textAlign: "center" }}>
                    <div className="spec-icon">
                      <FaBed />
                    </div>
                    <Text strong style={{ fontSize: 13 }}>
                      {selectedProperty.pbeds} BHK
                    </Text>
                  </Col>

                  <Col span={8} style={{ textAlign: "center" }}>
                    <div className="spec-icon">
                      <FaBath />
                    </div>
                    <Text strong style={{ fontSize: 13 }}>
                      {selectedProperty.pbaths} Baths
                    </Text>
                  </Col>

                  <Col span={8} style={{ textAlign: "center" }}>
                    <div className="spec-icon">
                      <FaRulerCombined />
                    </div>
                    <Text strong style={{ fontSize: 13 }}>
                      {selectedProperty.parea} ft²
                    </Text>
                  </Col>
                </Row>

                <div style={{ display: "flex", gap: 12, marginBottom: 30 }}>
                  <Tag icon={<FaShieldAlt />} color="success">
                    Verified
                  </Tag>
                  <Tag icon={<FaParking />} color="default">
                    Parking Incl.
                  </Tag>
                </div>

                <Paragraph
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                    lineHeight: "1.6",
                    marginBottom: 32,
                  }}
                >
                  {selectedProperty.pdescription ||
                    "This premium property offers a unique blend of modern luxury and serene living, featuring state-of-the-art amenities in the heart of Bengaluru."}
                </Paragraph>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleBook}
                  className="confirm-interest-btn"
                >
                  Schedule Site Visit
                </Button>
              </div>
            </div>
          )}
        </Modal>

        <style>{`
          .premium-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 60px rgba(2,6,23,0.15) !important;
            border-color: #1677ff !important;
          }

          .premium-card:hover img {
            transform: scale(1.08);
          }

          .luxury-modal .ant-modal-content {
            border-radius: 20px;
            overflow: hidden;
          }

          .modal-img-overlay {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .rating-tag {
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            color: white;
            padding: 4px 10px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .watchlist-btn {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: #64748b;
          }

          .watchlist-btn:hover {
            background: #fee2e2;
            color: #ef4444;
            transform: scale(1.1);
          }

          .watchlist-btn.active {
            background: #fee2e2;
            color: #ef4444;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
          }

          .spec-icon {
            background: #eff6ff;
            color: #1677ff;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            margin: 0 auto 8px;
          }

          .confirm-interest-btn {
            height: 56px !important;
            font-weight: 700 !important;
            border-radius: 16px !important;
            background: linear-gradient(135deg,#1677ff 0%,#f97316 100%) !important;
            border: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 10px 25px rgba(22, 119, 255, 0.25) !important;
          }

          .confirm-interest-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(249, 115, 22, 0.35) !important;
            filter: brightness(1.1);
          }
        `}</style>
      </section>
    </ConfigProvider>
  );
}
