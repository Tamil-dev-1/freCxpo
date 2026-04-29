import HighlightImg from '../../assets/images/hero/highlight.png';


export default function HighlightsMarquee() {
  const items = [
    { text: "Technical Sessions", dot: true },
    { text: "Student Paper Presentations", dot: true },
    { text: "Startup & Funding Opportunities", dot: true },
    { text: "Industry Networking", dot: true },
    { text: "Live Demos & Expo Stalls", dot: true },
  ];

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap');

        .marquee-section {
          width: 100%;
          background:
             center / cover no-repeat;
          overflow: hidden;
          padding: 28px 0;
          border-top: 1px solid rgba(124,58,237,0.2);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          position: relative;
        }

        /* Edge fade masks */
        .marquee-section::before,
        .marquee-section::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-section::before {
          left: 0;
          background: linear-gradient(90deg, rgba(13,0,20,0.95) 0%, transparent 100%);
        }
        .marquee-section::after {
          right: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(13,0,20,0.95) 100%);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marqueeScroll 32s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          white-space: nowrap;
          padding: 0 12px;
        }

        .marquee-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 600;
          color: #e2d9f3;
          letter-spacing: -0.3px;
          line-height: 1;
        }

        .marquee-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a78bfa;
          flex-shrink: 0;
          opacity: 0.55;
        }

        .marquee-heading-wrap {
          width: 100%;
          background:
            linear-gradient(135deg, rgba(13,0,20,0.82) 0%, rgba(42,0,58,0.72) 40%, rgba(0,0,8,0.85) 100%),
            url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=80') center / cover no-repeat;
          text-align: center;
          padding: 52px 24px 20px;
        }

        .marquee-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 14px;
        }

        .marquee-eyebrow::before,
        .marquee-eyebrow::after {
          content: '';
          width: 28px;
          height: 1px;
          background: rgba(124,58,237,0.4);
        }

        .marquee-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 45px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1;
          margin: 0 0 8px;
          padding-bottom: 10px;
          // background: linear-gradient(135deg, #ff3db0, #c084fc);
          color: #fff;
          -webkit-background-clip: text;
          background-clip: text;
          
        }

        .marquee-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(196,181,253,0.6);
          letter-spacing: 0.2px;
          margin: 0 0 36px;
        }

        @media (max-width: 576px) {
          .marquee-section::before,
          .marquee-section::after {
            width: 60px;
          }
          .marquee-track {
            animation-duration: 22s;
          }
          .marquee-heading-wrap {
            padding: 40px 16px 16px;
          }
        }
      `}</style>

      <div style={{backgroundImage:`url(${HighlightImg})`}}>
        <div className="marquee-heading-wrap" >
        <div className="marquee-eyebrow">Why Attend</div>
        <h5 className="marquee-heading">Highlights</h5>
        <p className="marquee-subtext">Everything packed into two power-filled days</p>
      </div>

      <section className="marquee-section" aria-label="Conference highlights">
        <div className="marquee-track">
          {repeated.map((item, i) => (
            <span className="marquee-item" key={i}>
              <span className="marquee-text">{item.text}</span>
              {item.dot && <span className="marquee-dot" aria-hidden="true" />}
            </span>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}