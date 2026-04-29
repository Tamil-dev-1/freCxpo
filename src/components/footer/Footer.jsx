import { useState, useEffect } from "react";

const Footer = () => {
  const [year] = useState(2026);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --blue: #3a8ef6;
          --magenta: #c42bcc;
          --orange: #f76b1c;
          --amber: #f9a825;
          --peach: #f4a58a;
          --black: #0a0a0a;
          --glass: rgba(255,255,255,0.07);
          --glass-border: rgba(255,255,255,0.15);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .footer-wrapper {
          position: relative;
          overflow: hidden;
          background: var(--black);
          font-family: 'Rajdhani', sans-serif;
        }

        /* ── gradient bg matching the reference image ── */
        .footer-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            #3a8ef6 0%,
            #9b2fc5 30%,
            #c42bcc 45%,
            #e03030 60%,
            #f76b1c 80%,
            #f9a825 100%
          );
          opacity: 0.92;
        }

        /* noise texture overlay */
        .footer-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.4;
          pointer-events: none;
        }

        /* top black bar */
        .footer-topbar {
          position: relative;
          background: var(--black);
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .footer-topbar-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--magenta), var(--orange));
          border-radius: 2px;
        }

        /* blob decorations */
        .blob {
          position: absolute;
          border-radius: 50% 40% 60% 50% / 50% 60% 40% 50%;
          filter: blur(1px);
          pointer-events: none;
        }
        .blob-left {
          width: 110px; height: 130px;
          left: -20px; top: 50%;
          transform: translateY(-30%);
          background: rgba(255,255,255,0.12);
        }
        .blob-right {
          width: 130px; height: 110px;
          right: -25px; top: 55%;
          transform: translateY(-30%);
          background: rgba(255,255,255,0.1);
        }

        /* peach orb */
        .orb {
          position: absolute;
          width: 80px; height: 80px;
          left: 90px; top: -18px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffd3be, #f4a58a 55%, #e07850);
          box-shadow: 0 8px 32px rgba(244,165,138,0.45), inset 0 -4px 12px rgba(0,0,0,0.15);
          z-index: 10;
        }

        /* main content */
        .footer-content {
          position: relative;
          z-index: 5;
          padding: 64px 40px 56px;
        }

        /* brand block */
        .brand-block {
          text-align: center;
          margin-bottom: 48px;
        }

        .brand-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .brand-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(52px, 8vw, 96px);
          line-height: 0.95;
          color: #fff;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 40px rgba(0,0,0,0.25);
          position: relative;
          display: inline-block;
        }

        .brand-title .year {
          font-family: 'Space Mono', monospace;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 700;
          vertical-align: super;
          margin-left: 8px;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-tagline {
          margin-top: 16px;
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(13px, 2vw, 18px);
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }

        /* divider */
        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(255,255,255,0.6), rgba(255,255,255,0.4), transparent);
          margin: 0 auto 40px;
          max-width: 700px;
        }

        /* glass card */
        .glass-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 32px 36px;
          max-width: 560px;
          margin: 0 auto 40px;
          text-align: center;
          box-shadow: 0 8px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .glass-card .org-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 8px;
        }

        .glass-card .org-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          text-shadow: 0 2px 16px rgba(0,0,0,0.2);
        }

        .glass-card .org-sub {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.65);
          margin-top: 6px;
          text-transform: uppercase;
        }

        /* badges row */
        .badges-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          padding: 7px 18px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          backdrop-filter: blur(6px);
          transition: all 0.3s ease;
          cursor: default;
        }

        .badge:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }

        /* bottom bar */
        .footer-bottombar {
          position: relative;
          z-index: 5;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255,255,255,0.12);
          padding: 18px 40px;
        }

        .bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .copyright {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
        }

        .copyright span {
          color: rgba(255,255,255,0.8);
        }

        .live-dot {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        .live-indicator {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.25);
          transition: box-shadow 0.5s ease;
        }

        .live-indicator.pulse {
          box-shadow: 0 0 0 6px rgba(74,222,128,0.1);
        }

        .tagline-right {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        @media (max-width: 576px) {
          .footer-content { padding: 48px 20px 40px; }
          .footer-bottombar { padding: 16px 20px; }
          .bottom-inner { justify-content: center; text-align: center; }
          .tagline-right { display: none; }
          .orb { width: 56px; height: 56px; left: 20px; top: -14px; }
        }
      `}</style>

      <footer className="footer-wrapper">
        {/* Top black bar */}
        <div className="footer-topbar">
          <div className="footer-topbar-line" />
        </div>

        {/* Gradient background */}
        <div className="footer-bg" />
        <div className="footer-noise" />

        {/* Decorative blobs */}
        <div className="blob blob-left" />
        <div className="blob blob-right" />
        <div className="orb" />

        {/* Main Content */}
        <div className="footer-content">
          <div className="container-fluid px-0">
            <div className="row justify-content-center">
              <div className="col-12">

                {/* Brand block */}
                <div className="brand-block">
                  <p className="brand-eyebrow">Official Proprietary Event</p>
                  <div className="brand-title">
                    FreCxPo
                    <span className="year">{year}</span>
                  </div>
                  <p className="brand-tagline">The Future of Global Innovation</p>
                </div>

                {/* Divider */}
                <div className="divider" />

                {/* Glass card */}
                <div className="glass-card">
                  <p className="org-label">Presented by</p>
                  <p className="org-name">TGPS Global</p>
                  <p className="org-sub">A Proprietary Expo</p>
                </div>

                {/* Badges */}
                <div className="badges-row">
                  {[
                    { label: "Innovation", color: "#3a8ef6" },
                    { label: "Excellence", color: "#c42bcc" },
                    { label: "Global Reach", color: "#f76b1c" },
                    { label: "2026 Edition", color: "#f9a825" },
                  ].map(b => (
                    <div className="badge" key={b.label}>
                      <span className="badge-dot" style={{ background: b.color }} />
                      {b.label}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottombar">
          <div className="bottom-inner">
            <p className="copyright">
              © {year} <span>TGPS Global</span>. All rights reserved.
            </p>
            <div className="live-dot">
              <span className={`live-indicator ${pulse ? "pulse" : ""}`} />
              Live Event
            </div>
            <p className="tagline-right">FreCxPo · Proprietary Expo</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;