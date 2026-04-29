import { useEffect, useRef, useState } from "react";
import './hero.css'
import banner from '../../assets/images/hero/banner.png'
import { FaMapMarkerAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

export default function FreCxPo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body, html { height: 100%; overflow-x: hidden; }

        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          background:
          
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        /* Ambient blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: blobPulse 6s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,0,150,0.25) 0%, transparent 70%);
          top: -100px; right: -80px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200,0,255,0.15) 0%, transparent 70%);
          bottom: -80px; left: -60px;
          animation-delay: -3s;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,100,200,0.18) 0%, transparent 70%);
          top: 40%; left: 55%;
          animation-delay: -1.5s;
        }

        @keyframes blobPulse {
          from { transform: scale(1) translateY(0); opacity: 0.7; }
          to   { transform: scale(1.15) translateY(-20px); opacity: 1; }
        }

        /* Navbar */
        .navbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 60px;
          z-index: 10;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent);
        }
        .logo {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 1.6rem;
          color: #fff;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        .logo span { color: #ff3db0; }

        /* Hero content */
        .content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 60px;
          z-index: 10;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,61,176,0.12);
          border: 1px solid rgba(255,61,176,0.4);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          // color: #ff80d0;
          color: #fff;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.2s forwards;
        }

        .headline {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(2.5rem, 5.5vw, 5rem);
          line-height: 1.05;
          color: #fff;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s 0.4s forwards;
          max-width: 700px;
        }

        .highlight {
          background: linear-gradient(135deg, #1ABAF9, #c000ff );
          -webkit-background-clip: text;
          color: transparent;
        }

        .tagline {
          margin-top: 18px;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 2px;
          // color: #ff80d0;
          color: #fff;
          opacity: 0;
          animation: fadeUp 0.7s 0.6s forwards;
        }

        .meta {
          margin-top: 20px;
          color: #fff;
          font-Weight: 700;
          font-size:1.7rem;

           /* Glow effect */
         text-shadow:
         0 0 6px rgba(255, 255, 255, 0.6),
         0 0 12px rgba(255, 61, 176, 0.6),
         0 0 20px rgba(192, 0, 255, 0.6);
        }

        .buttons {
          margin-top: 60px;
          display: flex;
          gap: 15px;
        }

        .btn-primary {
          font-size:1.3rem;
          font-weight: 600;
          padding: 14px 32px;
          background: linear-gradient(135deg, #1ABAF9, #c000ff);
          border: none;
          color: white;
        }

        .btn-secondary {
          font-size:1.3rem;
          font-weight: 600;
          padding: 14px 32px;
          background: transparent;
          border: 1px solid #fff;
          color: #fff;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hero"
      style={{backgroundImage:`url(${banner})`}}>

        {/* Ambient blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Fre<span>C</span>xPo</div>
        </nav>

        {/* Content */}
        <div className="content">
          <div className="badge"><span style={{color:"red"}}>✦</span> Innovation Summit 2026</div>

          <h1 className="headline">
            FreCxPo 2026
          </h1>

          <p className="tagline">Where Innovation Meets Opportunity</p>

          <div className="meta">
            <FaMapMarkerAlt /> Coimbatore | <SlCalender className="mx-1" />  5 & 6 September 2026
          </div>

          <div className="buttons">
            <button className="btn-primary">Register Now</button>
            <button className="btn-secondary">Submit Idea / Paper</button>
          </div>
        </div>
        
      </div>
    </>
  );
}