import { SiHiveBlockchain } from "react-icons/si";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { SiCompilerexplorer } from "react-icons/si";

import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdBatteryChargingFull } from "react-icons/md";


import { useState } from "react";

const cards = [
  {
    step: "01",
    icon: <SiHiveBlockchain />,
    title: "Paper\nPresentation",
    subtitle: "Present Research",
    gradient: ["#a855f7", "#ec4899", "#f43f5e"],
    accentFrom: "#a855f7",
    accentTo: "#f43f5e",
    triangleFrom: "#c026d3",
    triangleTo: "#f43f5e",
    items: [
      { icon: "⛓️", text: "Blockchain & Web3" },
      { icon: <BsFillLightningChargeFill />, text: "Renewable Energy" },
      { icon: <MdBatteryChargingFull />, text: "EV & Charging Systems" },
    ],
    label: "DOMAINS",
  },
  {
    step: "02",
    icon: <SiCompilerexplorer />,
    title: "Startup\nPitch",
    subtitle: "Present Startup Idea",
    gradient: ["#f97316", "#eab308", "#facc15"],
    accentFrom: "#f97316",
    accentTo: "#eab308",
    triangleFrom: "#f97316",
    triangleTo: "#facc15",
    items: [
      { icon: "👁️", text: "Get Investor Visibility" },
      { icon: "💡", text: "Explore Funding" },
      { icon: "🏗️", text: "Incubation Support" },
    ],
    label: "BENEFITS",
  },
  {
    step: "03",
    icon: <VscCommentDiscussionSparkle />,
    title: "Panel\nDiscussions",
    subtitle: "Expert-Led Sessions",
    gradient: ["#3b82f6", "#6366f1", "#8b5cf6"],
    accentFrom: "#3b82f6",
    accentTo: "#8b5cf6",
    triangleFrom: "#3b82f6",
    triangleTo: "#7c3aed",
    items: [
      { icon: "⚡", text: "Future of Energy" },
      { icon: "🚗", text: "EV Ecosystem Growth" },
      { icon: "🌐", text: "Web3 Innovation" },
      { icon: "🌱", text: "Sustainable Business" },
    ],
    label: "TOPICS",
  },
];

export default function WhatYouCanDo() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

        .wycd-section {
          background: #f0f2f7;
          padding: 80px 16px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .wycd-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 15% 80%, rgba(168,85,247,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 20%, rgba(59,130,246,0.07) 0%, transparent 70%);
        }

        .wycd-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #94a3b8;
          text-align: center;
          margin-bottom: 10px;
        }

        .wycd-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 700;
          text-align: center;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .wycd-heading em {
          font-style: italic;
          background: linear-gradient(90deg, #a855f7, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wycd-desc {
          text-align: center;
          color: #64748b;
          font-size: 15px;
          font-weight: 300;
          max-width: 480px;
          margin: 0 auto 64px;
          line-height: 1.7;
        }

        /* Progress dots row (like screenshot) */
        .wycd-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 40px;
        }
        .prog-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .prog-line {
          flex: 1;
          max-width: 160px;
          height: 2px;
          border-radius: 2px;
        }

        /* Cards row */
        .wycd-cards {
          display: flex;
          gap: 24px;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
        }

        /* Individual card — matches screenshot proportions (tall, portrait) */
        .wycd-card {
          position: relative;
          width: 300px;
          min-height: 460px;
          border-radius: 24px;
          background: #fff;
          box-shadow:
            0 2px 8px rgba(0,0,0,0.06),
            0 12px 48px rgba(0,0,0,0.10),
            0 0 0 1px rgba(255,255,255,0.9) inset;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .wycd-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.08),
            0 24px 72px rgba(0,0,0,0.18),
            0 0 0 1px rgba(255,255,255,0.9) inset;
        }

        /* Diagonal gradient triangle — top-right, like screenshot */
        .card-triangle {
          position: absolute;
          top: 0; right: 0;
          width: 180px; height: 180px;
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        /* Icon circle */
        .card-icon-wrap {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 2;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          border: 2px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        /* Bottom-left small triangle (like screenshot) */
        .card-tri-sm {
          position: absolute;
          bottom: 0; left: 0;
          width: 80px; height: 80px;
          clip-path: polygon(0 100%, 0 0, 100% 100%);
          z-index: 1;
          opacity: 0.15;
        }

        /* Card content */
        .card-body {
          position: relative;
          z-index: 3;
          padding: 44px 28px 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          white-space: pre-line;
          margin-bottom: 6px;
          margin-top: 80px;
        }

        .card-subtitle {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        /* Three dots like screenshot */
        .card-dots {
          display: flex;
          gap: 5px;
          margin-bottom: 16px;
        }
        .card-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          opacity: 0.4;
        }

        .card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .card-items {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }

        .card-items li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 400;
          color: #475569;
          padding: 7px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          line-height: 1.4;
        }

        .card-items li:last-child {
          border-bottom: none;
        }

        .item-icon {
          font-size: 15px;
          flex-shrink: 0;
          width: 24px;
          text-align: center;
        }

        /* Step label at bottom */
        .card-step {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(0,0,0,0.07);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .step-line {
          height: 2px;
          width: 32px;
          border-radius: 2px;
        }

        .step-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 0.25em;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .wycd-card { width: 100%; max-width: 340px; }
          .wycd-cards { gap: 20px; }
          .wycd-section { padding: 60px 16px 80px; }
        }
      `}</style>

      <section className="wycd-section">
        <div className="container-fluid">

          {/* Header */}
          <p className="wycd-eyebrow">FreCxPo 2026 · TGPS Global</p>
          <h2 className="wycd-heading">What You Can <em>Do</em></h2>
          <p className="wycd-desc">
            Three powerful ways to engage, present, and grow at India's most anticipated proprietary expo.
          </p>

          {/* Progress dots row — like screenshot */}
          <div className="wycd-progress">
            {cards.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="prog-dot"
                  style={{ background: `linear-gradient(135deg, ${c.accentFrom}, ${c.accentTo})` }}
                />
                {i < cards.length - 1 && (
                  <div
                    className="prog-line"
                    style={{
                      background: `linear-gradient(90deg, ${c.accentTo}, ${cards[i+1].accentFrom})`,
                      opacity: 0.35,
                      width: "clamp(60px, 10vw, 160px)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="wycd-cards">
            {cards.map((card, i) => (
              <div
                key={i}
                className="wycd-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {/* Diagonal gradient triangle top-right */}
                <div
                  className="card-triangle"
                  style={{
                    background: `linear-gradient(135deg, ${card.triangleFrom}, ${card.triangleTo})`,
                  }}
                />

                {/* Small triangle bottom-left */}
                <div
                  className="card-tri-sm"
                  style={{
                    background: `linear-gradient(135deg, ${card.triangleFrom}, ${card.triangleTo})`,
                  }}
                />

                {/* Icon circle */}
                <div
                  className="card-icon-wrap"
                  style={{
                    background: `linear-gradient(135deg, ${card.accentFrom}99, ${card.accentTo}99)`, color:"#fff",
                  }}
                >
                  {card.icon}
                </div>

                {/* Body */}
                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-subtitle">{card.subtitle}</p>

                  {/* Dots decoration */}
                  <div className="card-dots">
                    {[0.5, 0.7, 1].map((op, di) => (
                      <div
                        key={di}
                        className="card-dot"
                        style={{
                          background: card.accentFrom,
                          opacity: op * 0.6,
                        }}
                      />
                    ))}
                  </div>

                  <p className="card-label" style={{ color: card.accentFrom }}>{card.label}</p>

                  <ul className="card-items">
                    {card.items.map((item, j) => (
                      <li key={j}>
                        <span className="item-icon">{item.icon}</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Step footer */}
                  <div className="card-step">
                    <div
                      className="step-line"
                      style={{
                        background: `linear-gradient(90deg, ${card.accentFrom}, ${card.accentTo})`,
                      }}
                    />
                    <span className="step-text">STEP {card.step}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}