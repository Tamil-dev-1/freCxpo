import { useState, useEffect, useRef } from "react";

const speakers = [
  { id: 1, name: "Dr. Arjun Mehta", role: "AI Research Lead", org: "TechCorp India", avatar: "AM", color: "#1BBBFA" },
  { id: 2, name: "Priya Sharma", role: "Product Strategist", org: "StartupHub", avatar: "PS", color: "#EB2E71" },
  { id: 3, name: "Rahul Nair", role: "Cloud Architect", org: "Infosys", avatar: "RN", color: "#FAAE06" },
  { id: 4, name: "Sneha Iyer", role: "ML Engineer", org: "Zoho Labs", avatar: "SI", color: "#1BBBFA" },
  { id: 5, name: "Vikram Das", role: "Startup Founder", org: "NextGen AI", avatar: "VD", color: "#EB2E71" },
  { id: 6, name: "Ananya Roy", role: "Data Scientist", org: "IIT Madras", avatar: "AR", color: "#FAAE06" },
];

const schedule = {
  1: {
    date: "September 5, 2026",
    label: "FULL DAY",
    sessions: [
      { id: "s1", time: "09:00 – 10:00", period: "MORNING",        title: "Session 1: Emerging Tech Horizons",        desc: "Grand opening ceremony featuring distinguished guests, keynote address on the future of technology, and official inauguration of the conference with lighting of the lamp.", type: "keynote", speakers: [speakers[0], speakers[1]], location: "Main Auditorium" },
      { id: "s2", time: "10:00 – 11:00", period: "MORNING",        title: "Session 2: Emerging Tech Horizons",        desc: "Deep dive into breakthrough technologies shaping the future — from quantum computing to neuromorphic chips, exploring real-world applications and transformative potential.", type: "session", speakers: [speakers[2], speakers[3]], location: "Hall A" },
      { id: "s3", time: "14:00 – 15:00", period: "AFTERNOON",      title: "Session 3: AI & Machine Learning Frontiers",desc: "Cutting-edge research in artificial intelligence and machine learning — large language models, vision systems, reinforcement learning breakthroughs and ethical considerations.", type: "session", speakers: [speakers[4], speakers[0]], location: "Hall B" },
      { id: "s4", time: "15:00 – 16:00", period: "AFTERNOON",      title: "Session 4: Startup Innovation Lab",        desc: "Live startup pitches from early-stage ventures revolutionizing industries — health tech, fintech, edtech and sustainable technology startups compete for top honors.", type: "startup", speakers: [speakers[1], speakers[5]], location: "Innovation Hub" },
      { id: "s5", time: "11:00 – 13:00", period: "PARALLEL TRACKS",title: "Paper Presentations Track",               desc: "Selected research papers presented by authors covering topics in distributed systems, cybersecurity, IoT architectures, and next-generation networking protocols.", type: "paper",   speakers: [speakers[3], speakers[2]], location: "Conference Room 1" },
      { id: "s6", time: "11:00 – 13:00", period: "PARALLEL TRACKS",title: "Startup Pitches Showcase",                desc: "Entrepreneurial teams present their minimum viable products, business models and growth strategies to a panel of seasoned investors and industry veterans.", type: "startup", speakers: [speakers[5], speakers[4]], location: "Conference Room 2" },
    ],
  },
  2: {
    date: "September 6, 2026",
    label: "HALF DAY",
    sessions: [
      { id: "s7",  time: "09:00 – 10:00", period: "MORNING",   title: "Final Technical Sessions",        desc: "Concluding technical presentations featuring the most impactful research findings and innovations from participants across all domains of computer science and engineering.", type: "session", speakers: [speakers[0], speakers[3]], location: "Main Auditorium" },
      { id: "s8",  time: "10:00 – 11:00", period: "MORNING",   title: "Panel Discussion: Future of Tech",desc: "Industry luminaries and academic experts engage in an open panel on the trajectory of digital transformation, workforce evolution, and the societal impact of emerging technologies.", type: "panel",   speakers: [speakers[1], speakers[2], speakers[4]], location: "Main Auditorium" },
      { id: "s9",  time: "11:00 – 12:00", period: "MORNING",   title: "Startup Showcase Finals",         desc: "Top 5 startups from Day 1 present their refined pitches in the grand finals, with live Q&A from investors and audience voting for the People's Choice Award.", type: "startup", speakers: [speakers[5], speakers[1]], location: "Innovation Hub" },
      { id: "s10", time: "14:00 – 15:30", period: "AFTERNOON", title: "🏆 Prize Distribution & Awards",  desc: "Grand awards ceremony honoring excellence in research and innovation — Best Paper Awards, Best Startup Awards, and special recognition for outstanding contributions to the conference.", type: "award",   speakers: [speakers[0], speakers[2]], location: "Main Auditorium" },
      { id: "s11", time: "15:30 – 16:00", period: "AFTERNOON", title: "Closing Ceremony",                desc: "Official closing of the conference with vote of thanks, memento distribution to dignitaries and speakers, group photograph, and announcement of the next conference edition.", type: "closing", speakers: [speakers[1], speakers[3]], location: "Main Auditorium" },
    ],
  },
};

const typeColors = {
  keynote: { bg: "rgba(27,187,250,0.10)",  border: "#1BBBFA", badge: "#1BBBFA", label: "SESSION",  timeBg: "rgba(27,187,250,0.05)"  },
  session: { bg: "rgba(27,187,250,0.07)",  border: "#1BBBFA", badge: "#1BBBFA", label: "SESSION",  timeBg: "rgba(27,187,250,0.04)"  },
  startup: { bg: "rgba(235,46,113,0.08)",  border: "#EB2E71", badge: "#EB2E71", label: "STARTUP",  timeBg: "rgba(235,46,113,0.04)"  },
  paper:   { bg: "rgba(250,174,6,0.08)",   border: "#FAAE06", badge: "#FAAE06", label: "PAPER",    timeBg: "rgba(250,174,6,0.04)"   },
  panel:   { bg: "rgba(27,187,250,0.07)",  border: "#1BBBFA", badge: "#1BBBFA", label: "PANEL",    timeBg: "rgba(27,187,250,0.04)"  },
  award:   { bg: "rgba(250,174,6,0.10)",   border: "#FAAE06", badge: "#FAAE06", label: "AWARDS",   timeBg: "rgba(250,174,6,0.05)"   },
  closing: { bg: "rgba(235,46,113,0.08)",  border: "#EB2E71", badge: "#EB2E71", label: "CLOSING",  timeBg: "rgba(235,46,113,0.04)"  },
};

const periodOrder = ["MORNING", "AFTERNOON", "PARALLEL TRACKS"];

function groupByPeriod(sessions) {
  const groups = {};
  for (const s of sessions) {
    if (!groups[s.period]) groups[s.period] = [];
    groups[s.period].push(s);
  }
  return groups;
}

/* ── Intersection-observer reveal wrapper ── */
function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedSession, setExpandedSession] = useState(null);
  const [speakerPopup, setSpeakerPopup] = useState(null);

  const dayData = schedule[activeDay];
  const grouped = groupByPeriod(dayData.sessions);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body, #root {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Inter', sans-serif;
          color: #111;
        }

        .event-wrap {
          min-height: 100vh;
          padding: 40px 20px 80px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .event-header { text-align: center; margin-bottom: 48px; }

        .event-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; color: #1BBBFA; margin-bottom: 16px;
        }
        .event-eyebrow::before, .event-eyebrow::after {
          content: ''; width: 24px; height: 1px;
        }
        .event-eyebrow::before { background: linear-gradient(90deg, transparent, #1BBBFA); }
        .event-eyebrow::after  { background: linear-gradient(90deg, #1BBBFA, transparent); }

        .event-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          color: #111;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .event-title span { color: #EB2E71; }

        .event-subtitle { font-size: 14px; color: #999; letter-spacing: 1px; }

        /* ── Day Tabs ── */
        .day-tabs {
          display: flex; gap: 12px; margin-bottom: 40px;
          background: #f5f5f7;
          border: 1.5px solid #e8e8ee;
          border-radius: 16px; padding: 8px;
        }
        .day-tab {
          flex: 1; padding: 16px 20px; border-radius: 12px; cursor: pointer;
          border: 1.5px solid transparent; background: transparent;
          transition: all 0.3s ease; text-align: left; position: relative; overflow: hidden;
        }
        .day-tab.active {
          background: #fff;
          border-color: #1BBBFA55;
          box-shadow: 0 4px 20px rgba(27,187,250,0.15);
        }
        .day-tab:not(.active):hover { background: rgba(255,255,255,0.6); }

        .day-tab-date {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #bbb; margin-bottom: 4px;
        }
        .day-tab.active .day-tab-date { color: #1BBBFA; }

        .day-tab-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 800; color: #ccc; line-height: 1;
        }
        .day-tab.active .day-tab-label { color: #111; }

        .day-tab-badge {
          position: absolute; top: 10px; right: 10px;
          font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
          padding: 3px 8px; border-radius: 20px;
          background: #f0f0f5; color: #bbb; border: 1px solid #e8e8ee;
        }
        .day-tab.active .day-tab-badge {
          background: rgba(27,187,250,0.1);
          color: #1BBBFA;
          border-color: rgba(27,187,250,0.3);
        }

        /* ── Period Label ── */
        .period-group { margin-bottom: 36px; }
        .period-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .period-label-text {
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #EB2E71; white-space: nowrap;
        }
        .period-label-line {
          flex: 1; height: 1.5px;
          background: linear-gradient(90deg, rgba(235,46,113,0.35), transparent);
        }

        /* ── Session Card ── */
        .session-card {
          background: #fff;
          border: 1.5px solid #eee;
          border-radius: 16px; margin-bottom: 12px;
          overflow: hidden; transition: all 0.3s ease; cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .session-card:hover {
          border-color: rgba(27,187,250,0.4);
          box-shadow: 0 8px 32px rgba(27,187,250,0.12), 0 0 0 1px rgba(27,187,250,0.15);
          transform: translateY(-2px);
        }
        .session-card-inner { display: flex; gap: 0; }

        /* ── Time Block ── */
        .session-time-block {
          min-width: 160px; padding: 24px 20px;
          display: flex; flex-direction: column; justify-content: center;
          border-right: 1.5px solid #eee; flex-shrink: 0;
          transition: background 0.3s;
          background: #fafafa;
        }
        .session-time-label {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #bbb; margin-bottom: 6px;
        }
        .session-time-value {
          font-family: 'Inter', sans-serif;
          font-size: 17px; font-weight: 700; color: #111; line-height: 1.2; margin-bottom: 14px;
        }
        .session-location-label {
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #bbb; margin-bottom: 4px;
        }
        .session-location-value { font-size: 12px; font-weight: 500; color: #555; line-height: 1.3; }

        /* ── Content Block ── */
        .session-content-block { flex: 1; padding: 22px 24px; min-width: 0; }

        .session-header-row {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px; margin-bottom: 10px;
        }
        .session-type-badge {
          display: inline-flex; align-items: center;
          font-size: 9px; font-weight: 700; letter-spacing: 2px;
          padding: 3px 10px; border-radius: 20px;
          flex-shrink: 0; margin-bottom: 8px;
        }
        .session-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 2vw, 17px); font-weight: 700; color: #111;
          letter-spacing: 0.3px; line-height: 1.3; text-transform: uppercase; flex: 1;
        }
        .expand-btn {
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid rgba(27,187,250,0.35);
          background: rgba(27,187,250,0.08);
          color: #1BBBFA; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; transition: all 0.2s; flex-shrink: 0; line-height: 1;
        }
        .expand-btn:hover {
          background: rgba(27,187,250,0.18);
          border-color: #1BBBFA;
        }

        /* animated desc */
        .session-desc {
          font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px;
          overflow: hidden; max-height: 0; opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease;
        }
        .session-desc.visible { max-height: 300px; opacity: 1; }

        /* ── Speakers ── */
        .speakers-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .speaker-avatar-btn {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.8);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #fff;
          transition: all 0.2s; margin-right: -10px; position: relative; z-index: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .speaker-avatar-btn:hover {
          transform: scale(1.15) translateY(-2px);
          border-color: #FAAE06;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .speakers-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #bbb; margin-left: 18px;
        }

        /* ── Speaker Popup ── */
        .popup-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .speaker-popup {
          background: #fff;
          border: 1.5px solid rgba(27,187,250,0.3);
          border-radius: 24px; padding: 36px; max-width: 380px; width: 100%;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(27,187,250,0.1);
          animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .popup-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          background: #f5f5f7; border: 1px solid #eee; color: #888;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 16px; transition: all 0.2s;
        }
        .popup-close:hover { background: rgba(235,46,113,0.08); color: #EB2E71; border-color: rgba(235,46,113,0.3); }

        .popup-avatar-wrap { display: flex; justify-content: center; margin-bottom: 20px; }
        .popup-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 26px; font-weight: 800; color: #fff;
          border: 3px solid rgba(250,174,6,0.5);
          box-shadow: 0 0 24px rgba(250,174,6,0.2), 0 0 0 6px rgba(250,174,6,0.07);
        }
        .popup-name { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 800; color: #111; text-align: center; margin-bottom: 6px; }
        .popup-role { font-size: 13px; font-weight: 500; color: #1BBBFA; text-align: center; margin-bottom: 4px; }
        .popup-org { font-size: 12px; color: #aaa; text-align: center; margin-bottom: 24px; }
        .popup-divider { height: 1.5px; background: linear-gradient(90deg, transparent, rgba(27,187,250,0.35), transparent); margin-bottom: 20px; }

        .popup-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
        .popup-tag {
          font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
          padding: 5px 12px; border-radius: 20px;
          background: rgba(27,187,250,0.08);
          border: 1px solid rgba(27,187,250,0.25);
          color: #1BBBFA; text-transform: uppercase;
        }
        .popup-social { display: flex; justify-content: center; gap: 12px; }
        .popup-social-btn {
          padding: 8px 20px; border-radius: 10px;
          border: 1.5px solid rgba(235,46,113,0.3);
          background: rgba(235,46,113,0.06);
          color: #EB2E71; font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px;
        }
        .popup-social-btn:hover { background: rgba(235,46,113,0.14); border-color: #EB2E71; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .session-card-inner { flex-direction: column; }
          .session-time-block {
            min-width: unset; border-right: none;
            border-bottom: 1.5px solid #eee;
            flex-direction: row; justify-content: space-between;
            align-items: center; padding: 16px 18px;
          }
          .session-time-value { margin-bottom: 0; font-size: 15px; }
          .session-location-value { font-size: 11px; }
          .session-content-block { padding: 16px 18px; }
          .day-tabs { flex-direction: column; }
          .day-tab-badge { position: static; margin-top: 4px; display: inline-block; }
        }
      `}</style>

      <div className="event-wrap">
        <div className="container">

          {/* Header */}
          <RevealCard delay={0}>
            <div className="event-header">
              <div className="event-eyebrow">Complete Event Agenda</div>
              <div className="event-title">Conference <span>Schedule 2026</span></div>
              <div className="event-subtitle">Las Vegas Convention Center · September 5–6, 2026</div>
            </div>
          </RevealCard>

          {/* Day Tabs */}
          <RevealCard delay={80}>
            <div className="day-tabs">
              {[1, 2].map((day) => (
                <button
                  key={day}
                  className={`day-tab${activeDay === day ? " active" : ""}`}
                  onClick={() => { setActiveDay(day); setExpandedSession(null); }}
                >
                  <div className="day-tab-date">{schedule[day].date}</div>
                  <div className="day-tab-label">DAY {day}</div>
                  <span className="day-tab-badge">{schedule[day].label}</span>
                </button>
              ))}
            </div>
          </RevealCard>

          {/* Sessions */}
          {periodOrder.map((period) => {
            const sessions = grouped[period];
            if (!sessions) return null;
            return (
              <div className="period-group" key={period}>
                <RevealCard delay={100}>
                  <div className="period-label">
                    <span className="period-label-text">{period}</span>
                    <div className="period-label-line" />
                  </div>
                </RevealCard>

                {sessions.map((session, i) => {
                  const tc = typeColors[session.type] || typeColors.session;
                  const isExpanded = expandedSession === session.id;
                  return (
                    <RevealCard key={session.id} delay={160 + i * 80}>
                      <div
                        className="session-card"
                        style={{ borderColor: isExpanded ? tc.border + "66" : undefined }}
                        onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                      >
                        <div className="session-card-inner">

                          {/* Time block */}
                          <div
                            className="session-time-block"
                            style={{ background: isExpanded ? tc.timeBg : "#fafafa" }}
                          >
                            <div>
                              <div className="session-time-label">Session Time</div>
                              <div className="session-time-value">{session.time}</div>
                            </div>
                            <div>
                              <div className="session-location-label">Location</div>
                              <div className="session-location-value">{session.location}</div>
                            </div>
                          </div>

                          {/* Content block */}
                          <div className="session-content-block">
                            <span
                              className="session-type-badge"
                              style={{
                                background: tc.bg,
                                border: `1px solid ${tc.border}55`,
                                color: tc.badge,
                              }}
                            >
                              {tc.label}
                            </span>
                            <div className="session-header-row">
                              <div className="session-title">{session.title}</div>
                              <button
                                className="expand-btn"
                                onClick={(e) => { e.stopPropagation(); setExpandedSession(isExpanded ? null : session.id); }}
                              >
                                {isExpanded ? "−" : "+"}
                              </button>
                            </div>
                            <div className={`session-desc${isExpanded ? " visible" : ""}`}>
                              {session.desc}
                            </div>
                            <div className="speakers-row">
                              {session.speakers.map((sp) => (
                                <button
                                  key={sp.id}
                                  className="speaker-avatar-btn"
                                  style={{ background: sp.color }}
                                  title={sp.name}
                                  onClick={(e) => { e.stopPropagation(); setSpeakerPopup(sp); }}
                                >
                                  {sp.avatar}
                                </button>
                              ))}
                              <span className="speakers-label">Skilled Speakers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealCard>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Speaker Popup */}
        {speakerPopup && (
          <div className="popup-overlay" onClick={() => setSpeakerPopup(null)}>
            <div className="speaker-popup" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={() => setSpeakerPopup(null)}>✕</button>
              <div className="popup-avatar-wrap">
                <div className="popup-avatar" style={{ background: speakerPopup.color }}>
                  {speakerPopup.avatar}
                </div>
              </div>
              <div className="popup-name">{speakerPopup.name}</div>
              <div className="popup-role">{speakerPopup.role}</div>
              <div className="popup-org">{speakerPopup.org}</div>
              <div className="popup-divider" />
              <div className="popup-tags">
                <span className="popup-tag">Keynote</span>
                <span className="popup-tag">Speaker</span>
                <span className="popup-tag">Expert</span>
              </div>
              <div className="popup-social">
                <button className="popup-social-btn">LinkedIn</button>
                <button className="popup-social-btn">View Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}