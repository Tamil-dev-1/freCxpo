import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";

export default function PremiumRegisterUI() {
  const [type, setType] = useState("");

  return (
    <div className="main-wrapper d-flex align-items-center justify-content-center">
      <div className="card-container row g-0">

        {/* LEFT IMAGE */}
        <div className="col-md-5 left-panel d-none d-md-flex">
          <div className="overlay-box">
            <h2>Let’s Make<br />it Happen<br />Together!</h2>
            <p>Ping us for any inquiries!</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-7 right-panel">
          <div className="top-text">
            Already have an account? <span>Sign in here!</span>
          </div>

          <h2 className="title">Create An Account</h2>

          <form className="form-area">

            {/* COMMON FIELDS */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="floating-input">
                  <FaUser className="icon" />
                  <input required />
                  <label>Full Name</label>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="floating-input">
                  <FaEnvelope className="icon" />
                  <input required />
                  <label>Email</label>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="floating-input">
                  <FaUser className="icon" />
                  <input required />
                  <label>Phone Number</label>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="floating-input">
                  <FaBuilding className="icon" />
                  <input required />
                  <label>Organization</label>
                </div>
              </div>

              <div className="col-md-12 mb-4">
                <div className="floating-input">
                  <FaUser className="icon" />
                  <input required />
                  <label>City</label>
                </div>
              </div>
            </div>

            {/* TYPE */}
            <select
              className="form-select mb-4"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Register As</option>
              <option value="paper">Paper Presentation</option>
              <option value="startup">Startup</option>
              <option value="attendee">Attendee</option>
            </select>

            {/* CONDITIONAL */}
            {type === "paper" && (
              <div className="fade-in">
                <input className="form-control mb-3" placeholder="Paper Title" />
                <input type="file" className="form-control mb-3" />
                <input className="form-control mb-3" placeholder="Team Members" />
              </div>
            )}

            {type === "startup" && (
              <div className="fade-in">
                <input className="form-control mb-3" placeholder="Startup Name" />
                <textarea className="form-control mb-3" placeholder="Idea Description" />
                <input type="file" className="form-control mb-3" />
              </div>
            )}

            {type === "attendee" && (
              <div className="fade-in">
                <input className="form-control mb-3" placeholder="Areas of Interest" />
                <input className="form-control mb-3" placeholder="Sessions Interested" />
              </div>
            )}

            {/* CHECKBOX */}
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                Creating your account and accepting <span>Terms & Conditions</span>
              </label>
            </div>

            {/* BUTTON */}
            <button className="btn-submit w-100">Create Account</button>

            {/* SOCIAL */}
            <div className="social-row">
              <button className="social-btn">Facebook</button>
              <button className="social-btn">Twitter</button>
            </div>

          </form>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        .main-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff5f6d, #c850c0);
        }

        .card-container {
          width: 1100px;
          border-radius: 20px;
          overflow: hidden;
          background: white;
          animation: fadeUp 0.8s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }

        .left-panel {
          background: url('https://images.unsplash.com/photo-1556157382-97eda2d62296') center/cover;
          position: relative;
        }

        .overlay-box {
          position: absolute;
          bottom: 40px;
          left: 30px;
          background: rgba(30,30,60,0.8);
          padding: 25px;
          border-radius: 20px;
          color: white;
        }

        .overlay-box h2 {
          font-weight: 600;
        }

        .right-panel {
          padding: 50px;
          background: linear-gradient(135deg, #ff3db0, #c084fc);
          color: white;
        }

        .title {
          margin-bottom: 30px;
          font-weight: 600;
        }

        .floating-input {
          position: relative;
        }

        .floating-input input {
          width: 100%;
          padding: 12px 40px;
          border: none;
          border-radius: 6px;
        }

        .floating-input label {
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translateY(-50%);
          color: gray;
          transition: 0.3s;
          pointer-events: none;
        }

        .floating-input input:focus + label,
        .floating-input input:valid + label {
          top: -8px;
          font-size: 12px;
          color: white;
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          color: gray;
        }

        .btn-submit {
          background: #2b2e4a;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
        }

        .social-row {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .social-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: white;
          color: black;
          border-radius: 5px;
        }

        .fade-in {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }

        .top-text {
          text-align: right;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .top-text span {
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}