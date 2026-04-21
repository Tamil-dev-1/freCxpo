import { useEffect, useRef, useState } from "react";
import './hero.css'
const PARTICLE_COUNT = 120;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function initParticles(w, h) {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: randomBetween(1.5, 5),
    dx: randomBetween(-0.5, 0.5),
    dy: randomBetween(-0.5, 0.5),
    alpha: randomBetween(0.3, 0.9),
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: randomBetween(0.01, 0.03),
  }));
}

export default function FreCxPo() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", () => {
      mouseRef.current = { x: -9999, y: -9999 };
    });

    const CONNECT_DIST = 130;
    const REPEL_DIST = 80;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 80, 180, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw & move particles
      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const pulsedR = p.r + Math.sin(p.pulse) * 0.8;

        // Mouse repel
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < REPEL_DIST) {
          const force = (REPEL_DIST - mdist) / REPEL_DIST;
          p.x += (mdx / mdist) * force * 2.5;
          p.y += (mdy / mdist) * force * 2.5;
        }

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedR * 3);
        grad.addColorStop(0, `rgba(255, 100, 200, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(200, 50, 160, ${p.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(180, 0, 120, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedR * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 230, ${p.alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

//   const isMobile = window.innerWidth < 768;
// const CONNECT_DIST = isMobile ? 90 : 130;
// const REPEL_DIST = isMobile ? 60 : 80;

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
          background: radial-gradient(ellipse at 70% 20%, #2a003a 0%, #0d0014 50%, #000008 100%);
          overflow: hidden;
          font-family: 'Rajdhani', sans-serif;
        }

        canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: crosshair;
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
          font-size: 1.3rem;
          color: #fff;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        .logo span { color: #ff3db0; }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.25s;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 2px;
          background: #ff3db0;
          transform: scaleX(0);
          transition: transform 0.25s;
        }
        .nav-links a:hover { color: #ff3db0; }
        .nav-links a:hover::after { transform: scaleX(1); }
        .nav-links a.active { color: #ff3db0; }
        .nav-links a.active::after { transform: scaleX(1); }

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
          color: #ff80d0;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.2s forwards;
        }
        .badge::before {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #ff3db0;
          box-shadow: 0 0 8px #ff3db0;
          animation: blink 1.2s ease infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.2; }
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
          text-shadow: 0 0 60px rgba(255,61,176,0.3);
        }
        .headline .highlight {
          color: transparent;
          background: linear-gradient(135deg, #ff3db0, #ff80d0, #c000ff);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .tagline {
          margin-top: 18px;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: #ff80d0;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.6s forwards;
        }

        .meta {
          margin-top: 22px;
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s 0.75s forwards;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          letter-spacing: 1px;
        }
        .meta-item .icon { font-size: 1rem; }

        .subtitle {
          margin-top: 16px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 0.7s 0.9s forwards;
          transform: translateY(15px);
          font-style: italic;
        }

        .buttons {
          margin-top: 36px;
          display: flex;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s 1.05s forwards;
        }
        .btn-primary {
          padding: 14px 36px;
          background: linear-gradient(135deg, #ff3db0, #c000ff);
          border: none;
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 30px rgba(255,61,176,0.4);
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.45s;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(255,61,176,0.6);
        }

        .btn-secondary {
          padding: 14px 36px;
          background: transparent;
          border: 1.5px solid rgba(255,61,176,0.6);
          border-radius: 4px;
          color: #ff80d0;
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-secondary:hover {
          background: rgba(255,61,176,0.12);
          border-color: #ff3db0;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Floating accent squares */
        .accent-sq {
          position: absolute;
          pointer-events: none;
          animation: floatSq 4s ease-in-out infinite alternate;
          z-index: 5;
        }
        .accent-sq.s1 { width:12px;height:12px;background:#ff3db0;top:18%;right:28%;animation-delay:0s; }
        .accent-sq.s2 { width:8px;height:8px;background:#c000ff;top:62%;right:18%;animation-delay:-1.5s; }
        .accent-sq.s3 { width:6px;height:6px;background:#ff80d0;top:35%;right:8%;animation-delay:-0.7s; }
        .accent-sq.s4 { width:10px;height:10px;background:#ff3db0;bottom:22%;left:48%;animation-delay:-2s; }

        @keyframes floatSq {
          from { transform: translateY(0) rotate(0deg); }
          to   { transform: translateY(-18px) rotate(90deg); }
        }

        /* Scan line */
        .scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.04) 2px,
            rgba(0,0,0,0.04) 4px
          );
          pointer-events: none;
          z-index: 20;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hero">
        <canvas ref={canvasRef} />

        {/* Ambient blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Scanline overlay */}
        <div className="scanline" />

        {/* Floating accent squares */}
        {/* <div className="accent-sq s1" /> */}
        <div className="accent-sq s2" />
        <div className="accent-sq s3" />
        <div className="accent-sq s4" />

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">Fre<span>C</span>xPo</div>
          {/* <ul className="nav-links">
            {["Profile","Our Product","Service","Catalog","Order"].map((l,i)=>(
              <li key={l}><a href="#" className={i===2?"active":""}>{l}</a></li>
            ))}
          </ul> */}
        </nav>

        {/* Main content */}
        <div className="content">
          <div className="badge">✦ Innovation Summit 2026</div>

          <h1 className="headline">
            FreCxPo <span className="highlight">2026</span>
          </h1>

          <p className="tagline">Where Innovation Meets Opportunity</p>

          <div className="meta">
            <div className="meta-item">
              <span className="icon">📍</span>
              <span>Coimbatore</span>
            </div>
            <div className="meta-item">
              <span className="icon">📅</span>
              <span>5 &amp; 6 September 2026</span>
            </div>
          </div>

          <p className="subtitle">The Future of Business, Energy &amp; Technology – All in One Expo</p>

          <div className="buttons">
            <button className="btn-primary">Register Now</button>
            <button className="btn-secondary">Submit Idea / Paper</button>
          </div>
        </div>
      </div>
    </>
  );
}