import { useState, useRef, useEffect } from "react";
import Solar from '../../assets/images/about/solar.jpg'
import EV from '../../assets/images/about/ev.jpg'
import Blockchain from '../../assets/images/about/blockchain.jpg'
const FOCUS_AREAS = [
  {
    id: 1,
    tag: "GREEN ENERGY",
    title: "Solar & Clean Power",
    subtitle: "Green Energy",
    price: "Future Ready",
    desc: "Solar Panels · Water Heaters · Pumps",
    icon: "☀️",
    gradient: "linear-gradient(160deg, #0b4a1a 0%, #1a7a30 40%, #0d2e10 100%)",
    accent: "#4ade80",
    img: Solar,
  },
  {
    id: 2,
    tag: "ELECTRIC MOBILITY",
    title: "EV & Charging Infrastructure",
    subtitle: "Electric Mobility",
    price: "Drive Change",
    desc: "EVs · Charging Stations · Smart Grid",
    icon: "⚡",
    gradient: "linear-gradient(160deg, #0a1a4a 0%, #1a3aaa 40%, #07102e 100%)",
    accent: "#60a5fa",
    img: EV,
  },
  {
    id: 3,
    tag: "WEB2 & WEB3",
    title: "Blockchain & DApps",
    subtitle: "Web Technologies",
    price: "Decentralized",
    desc: "Blockchain · DApps · Web3 · AI",
    icon: "🔗",
    gradient: "linear-gradient(160deg, #2a0a4a 0%, #7a1aaa 40%, #1a0730 100%)",
    accent: "#c084fc",
    img: Blockchain,
  },
];

const TOTAL = FOCUS_AREAS.length;

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function About() {


  const [active, setActive] = useState(1); // 0-based index of center card
  const [animDir, setAnimDir] = useState(null);
  const intervalRef = useRef(null);

  const go = (dir) => {
    setAnimDir(dir);
    setActive((prev) => mod(prev + dir, TOTAL));
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => go(1), 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetInterval = (dir) => {
    clearInterval(intervalRef.current);
    go(dir);
    intervalRef.current = setInterval(() => go(1), 4000);
  };

  // positions: left=prev, center=active, right=next
  const getPos = (idx) => {
    if (idx === active) return "center";
    if (idx === mod(active - 1, TOTAL)) return "left";
    if (idx === mod(active + 1, TOTAL)) return "right";
    return "hidden";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        .about-section {
          background: radial-gradient(ellipse at 70% 20%, #2a003a 0%, #0d0014 50%, #000008 100%);
          min-height: 100vh;
          padding: 80px 0 60px;
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Grid lines */
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,61,176,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,61,176,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ---- TOP ROW ---- */
        .about-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          padding: 0 6vw 48px;
          flex-wrap: wrap;
        }
        .about-heading {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          color: #fff;
          line-height: 1.1;
          max-width: 480px;
          text-shadow: 0 0 50px rgba(255,61,176,0.25);
        }
        .about-heading span {
          background: linear-gradient(135deg, #ff3db0, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .about-right {
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-desc {
          color: rgba(255,255,255,0.6);
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 500;
        }
        .about-desc strong { color: #ff80d0; font-weight: 700; }

        .search-bar {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255,61,176,0.4);
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .search-bar input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255,255,255,0.7);
          padding: 11px 16px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }
        .search-bar input::placeholder { color: rgba(255,255,255,0.3); }
        .search-btn {
          background: linear-gradient(135deg, #ff3db0, #c000ff);
          border: none;
          color: #fff;
          padding: 11px 22px;
          font-family: 'Orbitron', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .search-btn:hover { opacity: 0.85; }

        /* ---- CAROUSEL LABEL ---- */
        .carousel-label {
          padding: 0 6vw;
          margin-bottom: 28px;
        }
        .carousel-label h3 {
          font-family: 'Orbitron', monospace;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: rgba(255,255,255,0.15);
          font-weight: 900;
          letter-spacing: 2px;
        }

        /* ---- 3D CAROUSEL ---- */
        .carousel-stage {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .card-wrap {
          position: absolute;
          transition: all 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .card-wrap.center {
          transform: translateX(0) translateZ(0) rotateY(0deg) scale(1);
          z-index: 10;
          width: 260px;
        }
        .card-wrap.left {
          transform: translateX(-300px) translateZ(-180px) rotateY(18deg) scale(0.82);
          z-index: 5;
          width: 220px;
          filter: brightness(0.6);
        }
        .card-wrap.right {
          transform: translateX(300px) translateZ(-180px) rotateY(-18deg) scale(0.82);
          z-index: 5;
          width: 220px;
          filter: brightness(0.6);
        }
        .card-wrap.hidden {
          transform: translateX(0) translateZ(-400px) scale(0.5);
          opacity: 0;
          z-index: 0;
        }

        .focus-card {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          height: 360px;
        }
        .card-wrap.center .focus-card {
          box-shadow: 0 30px 80px rgba(255,61,176,0.35), 0 0 0 1px rgba(255,61,176,0.25);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }

        .card-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 6px;
          font-family: 'Orbitron', monospace;
        }
        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 4px;
          font-family: 'Orbitron', monospace;
        }
        .card-price {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 10px;
          opacity: 0.85;
        }
        .card-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .card-read {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.3s;
          font-family: 'Orbitron', monospace;
        }
        .card-wrap.center .card-read {
          opacity: 1;
          transform: translateY(0);
        }
        .card-read::after { content: ' →'; }

        /* big bg text */
        .card-bg-text {
          position: absolute;
          bottom: 8px;
          left: 14px;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 2.8rem;
          color: rgba(255,255,255,0.07);
          letter-spacing: 4px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* ---- PAGINATION ---- */
        .carousel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 6vw 0;
        }
        .pagination {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
        .pagination .cur { color: #ff80d0; font-weight: 700; }
        .pag-dots {
          display: flex;
          gap: 8px;
        }
        .pag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s;
          cursor: pointer;
        }
        .pag-dot.active {
          background: #ff3db0;
          box-shadow: 0 0 10px #ff3db0;
          width: 20px;
          border-radius: 3px;
        }

        .nav-btns {
          display: flex;
          gap: 12px;
        }
        .nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,61,176,0.4);
          background: rgba(255,61,176,0.08);
          color: #ff80d0;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover {
          background: rgba(255,61,176,0.25);
          border-color: #ff3db0;
          color: #fff;
          transform: scale(1.08);
        }

        /* ---- CLOSING LINE ---- */
        .closing-line {
          text-align: center;
          margin-top: 52px;
          padding: 0 6vw;
          font-size: clamp(0.85rem, 1.5vw, 1.05rem);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.5px;
          line-height: 1.7;
        }
        .closing-line strong { color: #ff80d0; }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 768px) {
          .about-top { flex-direction: column; }
          .card-wrap.left  { transform: translateX(-160px) translateZ(-200px) rotateY(18deg) scale(0.75); }
          .card-wrap.right { transform: translateX(160px)  translateZ(-200px) rotateY(-18deg) scale(0.75); }
          .card-wrap.center { width: 220px; }
          .carousel-stage { height: 370px; }
        }
        @media (max-width: 480px) {
          .card-wrap.left, .card-wrap.right { opacity: 0.4; }
          .card-wrap.left  { transform: translateX(-120px) translateZ(-250px) scale(0.65); }
          .card-wrap.right { transform: translateX(120px)  translateZ(-250px) scale(0.65); }
        }
      `}</style>

      <section className="about-section">
        {/* TOP ROW */}
        <div className="about-top">
          <h2 className="about-heading">
            About the <span>Expo</span>
          </h2>
          <div className="about-right">
            <p className="about-desc">
              <strong>FreCxPo 2026</strong> is the flagship proprietary expo of{" "}
              <strong>TGPS Global</strong> — an open platform that connects
              students, startups, industry leaders, and innovators to
              collaborate, present, and grow.
            </p>
            <div className="search-bar">
              <input type="text" placeholder="Search focus areas, sessions, etc." />
              <button className="search-btn">⊕ Explore</button>
            </div>
          </div>
        </div>

        {/* LABEL */}
        <div className="carousel-label">
          <h3>Focus Areas 2026</h3>
        </div>

        {/* 3D CAROUSEL */}
        <div className="carousel-stage">
          {FOCUS_AREAS.map((area, idx) => {
            const pos = getPos(idx);
            return (
              <div
                key={area.id}
                className={`card-wrap ${pos}`}
                onClick={() => { if (pos !== "center") resetInterval(pos === "left" ? -1 : 1); }}
              >
                <div className="focus-card">
                  <img src={area.img} alt={area.title} className="card-img" />
                  <div className="card-overlay">
                    <div className="card-tag" style={{ color: area.accent }}>
                      {area.tag}
                    </div>
                    <div className="card-title">{area.title}</div>
                    <div className="card-price" style={{ color: area.accent }}>
                      {area.price}
                    </div>
                    <div className="card-desc">{area.desc}</div>
                    <div className="card-read" style={{ color: area.accent }}>
                      Learn more
                    </div>
                  </div>
                  <div className="card-bg-text">{area.icon}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="carousel-footer">
          <div className="pagination">
            <span className="cur">‹ {String(active + 1).padStart(2, "0")}</span>
            <span>/ {String(TOTAL).padStart(2, "0")} ›</span>
            <div className="pag-dots">
              {FOCUS_AREAS.map((_, i) => (
                <div
                  key={i}
                  className={`pag-dot ${i === active ? "active" : ""}`}
                  onClick={() => resetInterval(i > active ? 1 : -1)}
                />
              ))}
            </div>
          </div>

          <div className="nav-btns">
            <button className="nav-btn" onClick={() => resetInterval(-1)}>‹</button>
            <button className="nav-btn" onClick={() => resetInterval(1)}>›</button>
          </div>
        </div>

        {/* CLOSING LINE */}
        <p className="closing-line">
          Connects <strong>students</strong>, <strong>startups</strong>,{" "}
          <strong>industry leaders</strong>, and <strong>innovators</strong> to
          collaborate, present, and grow.
        </p>
      </section>
    </>
  );
}