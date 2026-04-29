import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const pills = ["Present.", "Pitch.", "Participate."];

export default function CTAFinal() {
  const [sectionRef, inView] = useInView(0.1);
  const [btnHover, setBtnHover] = useState(false);
  const [activePill, setActivePill] = useState(0);

  // Cycle pill highlight
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActivePill(p => (p + 1) % 3), 1400);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, #root {
          min-height: 100vh;
          background: radial-gradient(ellipse at 70% 20%, #2a003a 0%, #0d0014 50%, #000008 100%);
          font-family: 'Inter', sans-serif;
        //   display: flex; align-items: center; justify-content: center;
        }

        /* ── Grid overlay ── */
        .cta-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── Orbs ── */
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none;
        }
        .orb-l {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(124,58,237,0.32) 0%, transparent 70%);
          top: -80px; left: -100px;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .orb-r {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%);
          bottom: -60px; right: -80px;
          animation: orbFloat 10s ease-in-out infinite reverse;
        }
        .orb-c {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          animation: orbFloat 6s ease-in-out infinite 2s;
        }

        @keyframes orbFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-24px) scale(1.06); }
        }

        /* ── Section ── */
        .cta-section {
          width: 100%; max-width: 860px;
          margin: 0 auto;
          padding: 80px 24px 90px;
          position: relative;
          text-align: center;
          overflow: hidden;
        }

        /* ── Eyebrow ── */
        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #a78bfa;
          margin-bottom: 24px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cta-eyebrow.visible { opacity: 1; transform: translateY(0); }
        .cta-eyebrow-line {
          width: 32px; height: 1px;
          background: linear-gradient(90deg, transparent, #7c3aed);
        }
        .cta-eyebrow-line.right {
          background: linear-gradient(90deg, #7c3aed, transparent);
        }

        /* ── Heading ── */
        .cta-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(22px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.08;
          color: #fff;
          margin-bottom: 6px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.2,0.64,1) 0.1s;
        }
        .cta-heading.visible { opacity: 1; transform: translateY(0); }
        .cta-heading span {
          background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Pill row ── */
        .cta-pills {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
          margin: 28px 0 44px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .cta-pills.visible { opacity: 1; transform: translateY(0); }

        .cta-pill {
          padding: 10px 24px;
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1.4vw, 15px);
          font-weight: 700;
          letter-spacing: 0.3px;
          border: 1.5px solid rgba(124,58,237,0.3);
          background: rgba(124,58,237,0.08);
          color: rgba(196,181,253,0.55);
          transition: all 0.4s cubic-bezier(0.34,1.3,0.64,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .cta-pill.active {
          background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(109,40,217,0.35));
          border-color: rgba(167,139,250,0.6);
          color: #fff;
          box-shadow: 0 0 24px rgba(124,58,237,0.45), 0 0 0 1px rgba(167,139,250,0.2);
          transform: scale(1.06) translateY(-2px);
        }

        .cta-pill-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(167,139,250,0.4);
          display: inline-block;
          flex-shrink: 0;
        }

        /* ── Button ── */
        .cta-btn-wrap {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .cta-btn-wrap.visible { opacity: 1; transform: translateY(0); }

        .cta-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 14px;
          padding: 13px 36px;
          border-radius: 60px;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          border: 1.5px solid rgba(167,139,250,0.4);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1.4vw, 14px);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 8px 40px rgba(124,58,237,0.5), 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 20px 60px rgba(124,58,237,0.7); }
        .cta-btn:hover::before { opacity: 1; }

        .cta-btn-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .cta-btn:hover .cta-btn-icon { transform: translateX(4px); }

        /* Ripple ring on button */
        .cta-btn-ring {
          position: absolute; inset: -6px;
          border-radius: 70px;
          border: 1.5px solid rgba(167,139,250,0.25);
          animation: ringExpand 2.5s ease-out infinite;
          pointer-events: none;
        }
        .cta-btn-ring-2 {
          animation-delay: 1.25s;
        }
        @keyframes ringExpand {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.18); opacity: 0; }
        }

        /* ── Fine print ── */
        .cta-fine {
          margin-top: 20px;
          font-size: 12px; color: rgba(167,139,250,0.35);
          letter-spacing: 0.3px;
          opacity: 0; transition: opacity 0.7s ease 0.6s;
        }
        .cta-fine.visible { opacity: 1; }

        /* ── Bottom decorative line ── */
        .cta-deco-line {
          position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent);
          transition: width 1.2s ease 0.8s;
        }
        .cta-deco-line.visible { width: 80%; }

        /* Responsive */
        @media (max-width: 576px) {
          .cta-section { padding: 60px 20px 70px; }
          .cta-pills { gap: 8px; }
          .cta-pill { padding: 8px 18px; }
          .cta-btn { padding: 11px 28px; gap: 8px; }
        }
      `}</style>

      <section className="cta-section" ref={sectionRef}>
        {/* Background effects */}
        <div className="cta-grid" />
        <div className="orb orb-l" />
        <div className="orb orb-r" />
        <div className="orb orb-c" />

        {/* Eyebrow */}
        <div className={`cta-eyebrow${inView ? " visible" : ""}`}>
          <span className="cta-eyebrow-line" />
          Call To Action
          <span className="cta-eyebrow-line right" />
        </div>

        {/* Main heading */}
        <h2 className={`cta-heading${inView ? " visible" : ""}`}>
          Ready to be part<br />
          of the <span>future?</span>
        </h2>

        {/* Animated pill row */}
        <div className={`cta-pills${inView ? " visible" : ""}`}>
          {pills.map((pill, i) => (
            <>
              <div
                key={pill}
                className={`cta-pill${activePill === i ? " active" : ""}`}
              >
                {pill}
              </div>
              {i < pills.length - 1 && (
                <div key={`dot-${i}`} className="cta-pill-dot" />
              )}
            </>
          ))}
        </div>

        {/* Button */}
        <div className={`cta-btn-wrap${inView ? " visible" : ""}`}>
          <button
            className="cta-btn"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            <span className="cta-btn-ring" />
            <span className="cta-btn-ring cta-btn-ring-2" />
            Register Now
            <span className="cta-btn-icon">→</span>
          </button>
        </div>

        {/* Fine print */}
        <p className={`cta-fine${inView ? " visible" : ""}`}>
          Early bird slots filling fast · September 5–6, 2025
        </p>

        {/* Bottom decorative line */}
        <div className={`cta-deco-line${inView ? " visible" : ""}`} />
      </section>
    </>
  );
}