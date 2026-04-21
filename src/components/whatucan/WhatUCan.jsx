import { useState, useRef, useEffect } from "react";

const CARDS = [
  {
    id: 1,
    emoji: "🎓",
    tag: "ACADEMIC",
    title: "Paper Presentation",
    subtitle: "Present your research to industry experts",
    accent: "#4ade80",
    accentDim: "rgba(74,222,128,0.12)",
    border: "rgba(74,222,128,0.3)",
    domains: [
      { icon: "⛓️", label: "Blockchain & Web3" },
      { icon: "🌱", label: "Renewable Energy" },
      { icon: "🔋", label: "EV & Charging Systems" },
    ],
    cta: "Submit Paper →",
    bg: "linear-gradient(160deg,#071a0e 0%,#0d2b15 60%,#040e08 100%)",
  },
  {
    id: 2,
    emoji: "🚀",
    tag: "STARTUP",
    title: "Startup Pitch",
    subtitle: "Present your idea on a global stage",
    accent: "#ff3db0",
    accentDim: "rgba(255,61,176,0.12)",
    border: "rgba(255,61,176,0.3)",
    domains: [
      { icon: "💡", label: "Present Startup Idea" },
      { icon: "👁️", label: "Get Investor Visibility" },
      { icon: "🏦", label: "Funding & Incubation" },
    ],
    cta: "Pitch Now →",
    bg: "linear-gradient(160deg,#2a0018 0%,#4a0030 60%,#150010 100%)",
  },
  {
    id: 3,
    emoji: "🎤",
    tag: "PANELS",
    title: "Panel Discussions",
    subtitle: "Engage with thought leaders & innovators",
    accent: "#c084fc",
    accentDim: "rgba(192,132,252,0.12)",
    border: "rgba(192,132,252,0.3)",
    domains: [
      { icon: "⚡", label: "Future of Energy" },
      { icon: "🚗", label: "EV Ecosystem Growth" },
      { icon: "🌐", label: "Web3 Innovation" },
      { icon: "♻️", label: "Sustainable Business" },
    ],
    cta: "Join Panel →",
    bg: "linear-gradient(160deg,#1a0a2e 0%,#2d1550 60%,#0d0518 100%)",
  },
];

export default function WhatUCan() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const timerRef = useRef(null);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setActive((p) => (p + dir + CARDS.length) % CARDS.length);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % CARDS.length), 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % CARDS.length), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  // Which cards are visible: active-1, active, active+1 (3 at a time on desktop)
  const visible = CARDS.map((_, i) => {
    const rel = ((i - active) + CARDS.length) % CARDS.length;
    // rel: 0=center, 1=right, 2=left (hidden or peek)
    if (rel === 0) return "center";
    if (rel === 1) return "right";
    if (rel === CARDS.length - 1) return "left";
    return "hidden";
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        .wycd-section {
          background: radial-gradient(ellipse at 70% 20%, #2a003a 0%, #0d0014 50%, #000008 100%);
          min-height: 100vh;
          padding: 80px 0 60px;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
          position: relative;
        }
        .wycd-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,61,176,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,61,176,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* TOP HEADER */
        .wycd-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 6vw 52px;
          gap: 40px;
          flex-wrap: wrap;
        }
        .wycd-heading {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(1.8rem, 4vw, 3.4rem);
          color: #fff;
          line-height: 1.12;
          max-width: 480px;
          text-shadow: 0 0 60px rgba(255,61,176,0.2);
        }
        .wycd-heading span {
          background: linear-gradient(135deg, #ff3db0, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .wycd-right {
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 8px;
        }
        .wycd-subtext {
          color: rgba(255,255,255,0.55);
          font-size: 0.98rem;
          line-height: 1.7;
          font-weight: 500;
        }
        .wycd-subtext strong { color: #ff80d0; }

        /* CARDS ROW */
        .wycd-stage {
          position: relative;
          padding: 0 6vw;
          display: flex;
          align-items: stretch;
          gap: 24px;
        }

        /* CARD */
        .wycd-card {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        /* Desktop: 3 cards visible, center bigger */
        @media (min-width: 900px) {
          .wycd-card.pos-center {
            width: calc(38% - 16px);
            transform: scale(1);
            opacity: 1;
            z-index: 10;
            border-color: rgba(255,61,176,0.3);
            box-shadow: 0 24px 80px rgba(255,61,176,0.25), 0 0 0 1px rgba(255,61,176,0.2);
          }
          .wycd-card.pos-left,
          .wycd-card.pos-right {
            width: calc(31% - 16px);
            transform: scale(0.97);
            opacity: 0.75;
            z-index: 5;
            filter: brightness(0.65) saturate(0.7);
          }
          .wycd-card.pos-hidden {
            width: 0;
            opacity: 0;
            overflow: hidden;
            border: none;
            padding: 0;
          }
        }

        /* Mobile: full width stack */
        @media (max-width: 899px) {
          .wycd-stage { flex-direction: column; gap: 20px; }
          .wycd-card { width: 100% !important; opacity: 1 !important; filter: none !important; transform: scale(1) !important; }
          .wycd-card.pos-hidden { display: none; }
        }

        .card-inner {
          padding: 36px 32px 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(10,0,20,0.6);
          backdrop-filter: blur(12px);
          position: relative;
          z-index: 2;
        }

        /* Gradient top bar */
        .card-topbar {
          height: 3px;
          width: 100%;
          border-radius: 2px;
          margin-bottom: 28px;
          transition: width 0.3s;
        }

        .card-tag {
          font-family: 'Orbitron', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .card-emoji {
          font-size: 2.6rem;
          line-height: 1;
          margin-bottom: 14px;
          display: block;
          filter: drop-shadow(0 0 16px currentColor);
        }

        .card-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 1.25rem;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .card-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          font-weight: 500;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        /* Domain chips */
        .card-domains {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 28px;
          flex: 1;
        }
        .domain-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: all 0.2s;
        }
        .wycd-card:hover .domain-chip {
          background: rgba(255,255,255,0.07);
        }
        .chip-icon { font-size: 1rem; }

        /* CTA */
        .card-cta {
          display: inline-block;
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 11px 22px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
          width: 100%;
        }

        /* BOTTOM ROW */
        .wycd-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 6vw 0;
          flex-wrap: wrap;
          gap: 20px;
        }
        .wycd-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wycd-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }
        .wycd-dot.active {
          background: #ff3db0;
          box-shadow: 0 0 10px #ff3db0;
          width: 26px;
          border-radius: 4px;
        }
        .wycd-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wycd-nav-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,61,176,0.4);
          background: rgba(255,61,176,0.08);
          color: #ff80d0;
          font-size: 1.15rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s;
          font-family: 'Orbitron', monospace;
        }
        .wycd-nav-btn:hover {
          background: rgba(255,61,176,0.25);
          border-color: #ff3db0;
          color: #fff;
          box-shadow: 0 0 20px rgba(255,61,176,0.3);
          transform: scale(1.08);
        }
        .wycd-nav-btn.active-arrow {
          background: linear-gradient(135deg, #ff3db0, #c000ff);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 0 24px rgba(255,61,176,0.5);
        }

        .wycd-counter {
          font-family: 'Orbitron', monospace;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 2px;
        }
        .wycd-counter span { color: #ff80d0; }
      `}</style>

      <section className="wycd-section">
        {/* HEADER */}
        <div className="wycd-header">
          <h2 className="wycd-heading">
            What You Can <span>Do Here</span>
          </h2>
          <div className="wycd-right">
            <p className="wycd-subtext">
              Discover the most impactful ways to engage at{" "}
              <strong>FreCxPo 2026</strong> — from presenting research to
              pitching your startup to the world's innovators and investors.
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="wycd-stage">
          {CARDS.map((card, idx) => {
            const pos = visible[idx];
            return (
              <div
                key={card.id}
                className={`wycd-card pos-${pos}`}
                style={{ background: card.bg }}
                onClick={() => {
                  if (pos === "left") go(-1);
                  else if (pos === "right") go(1);
                }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="card-topbar"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
                />
                <div className="card-inner">
                  <div className="card-tag" style={{ color: card.accent }}>
                    {card.tag}
                  </div>
                  <span className="card-emoji">{card.emoji}</span>
                  <div className="card-title">{card.title}</div>
                  <div className="card-subtitle">{card.subtitle}</div>
                  <div className="card-domains">
                    {card.domains.map((d) => (
                      <div
                        key={d.label}
                        className="domain-chip"
                        style={{
                          borderColor: hovered === idx ? card.border : "rgba(255,255,255,0.07)",
                          background: hovered === idx ? card.accentDim : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <span className="chip-icon">{d.icon}</span>
                        <span>{d.label}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="card-cta"
                    style={{
                      background: pos === "center"
                        ? `linear-gradient(135deg, ${card.accent}99, ${card.accent}44)`
                        : "rgba(255,255,255,0.05)",
                      color: card.accent,
                      border: `1.5px solid ${card.border}`,
                    }}
                  >
                    {card.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="wycd-footer">
          <div className="wycd-dots">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`wycd-dot ${i === active ? "active" : ""}`}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setActive(i);
                  timerRef.current = setInterval(() => setActive((p) => (p + 1) % CARDS.length), 4500);
                }}
              />
            ))}
          </div>

          <div className="wycd-counter">
            <span>{String(active + 1).padStart(2, "0")}</span>
            {" / "}
            {String(CARDS.length).padStart(2, "0")}
          </div>

          <div className="wycd-nav">
            <button className="wycd-nav-btn" onClick={() => go(-1)}>‹</button>
            <button className="wycd-nav-btn active-arrow" onClick={() => go(1)}>›</button>
          </div>
        </div>
      </section>
    </>
  );
}