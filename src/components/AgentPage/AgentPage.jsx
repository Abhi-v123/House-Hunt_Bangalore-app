import React, { useEffect, useRef } from "react";
import "./AgentPage.css";



export default function AgentPage() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollPos = 0;

    const scrollStep = 1;
    const scrollInterval = 20;

    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    let direction = 1; // 1 = scroll right, -1 = scroll left

    const intervalId = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollStep * direction;
        scrollPos = scrollContainer.scrollLeft;

        if (scrollPos >= maxScrollLeft) direction = -1;
        else if (scrollPos <= 0) direction = 1;
      }
    }, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="agency" className="agent-page-section">
      <h2 className="agent-header">Meet Our Excellent Agents</h2>
      <div className="agent-carousel-container" ref={scrollRef}>
        {agents.map((agent) => (
          <div key={agent.name} className="agent-card">
            <img src={agent.image} alt={agent.name} className="agent-photo" />
            <div className="agent-info">
              <div className="agent-name">{agent.name}</div>
              <div className="agent-role">{agent.role}</div>
              <div className="agent-socials">
                <a href={agent.socials[0]} aria-label="Facebook" className="social-link">F</a>
                <a href={agent.socials[1]} aria-label="Twitter" className="social-link">T</a>
                <a href={agent.socials[2]} aria-label="Google Plus" className="social-link">G+</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}














const agents = [
  { name: "Carlos Mendez", role: "Lead Sales Agent", image: "https://randomuser.me/api/portraits/men/22.jpg", socials: ["#", "#", "#"] },
  { name: "Nina Patel", role: "Neighborhood Specialist", image: "https://randomuser.me/api/portraits/women/45.jpg", socials: ["#", "#", "#"] },
  { name: "Tyler Wong", role: "Business Properties", image: "https://randomuser.me/api/portraits/men/56.jpg", socials: ["#", "#", "#"] },
  { name: "Sophia Rivera", role: "High-End Specialist", image: "https://randomuser.me/api/portraits/women/72.jpg", socials: ["#", "#", "#"] },
  { name: "Aarav Jain", role: "Tenant Coordinator", image: "https://randomuser.me/api/portraits/men/63.jpg", socials: ["#", "#", "#"] },
  { name: "Elena Popova", role: "Senior Sales Agent", image: "https://randomuser.me/api/portraits/women/9.jpg", socials: ["#", "#", "#"] },
  { name: "Javier Martinez", role: "Home Consultant", image: "https://randomuser.me/api/portraits/men/87.jpg", socials: ["#", "#", "#"] },
  { name: "Anika Desai", role: "Office Space Expert", image: "https://randomuser.me/api/portraits/women/54.jpg", socials: ["#", "#", "#"] },
  { name: "Daniel Kim", role: "Rental Director", image: "https://randomuser.me/api/portraits/men/12.jpg", socials: ["#", "#", "#"] },
  { name: "Isabella Carter", role: "Luxury Advisor", image: "https://randomuser.me/api/portraits/women/81.jpg", socials: ["#", "#", "#"] }
];
