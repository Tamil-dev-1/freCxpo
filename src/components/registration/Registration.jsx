import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registration.css";

const data = [
  {
    title: "Paper Presentation",
    points: [
      "Submit research in:",
      "Blockchain",
      "Renewable Energy",
      "EV & Charging",
      "Includes evaluation + presentation slot",
    ],
  },
  {
    title: "Startup Idea Submission",
    points: [
      "Pitch your idea",
      "Get expert feedback",
      "Funding opportunities",
    ],
  },
  {
    title: "General Attendee",
    points: [
      "Access panel discussions",
      "Expo entry",
      "Networking",
    ],
  },
];

export default function RegistrationCards() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {data.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="custom-card">

              {/* Top Content */}
              <div className="card-content">
                <h5 className="fw-bold">{item.title}</h5>

                <ul>
                  {item.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Curved Gradient Shape */}
              <div className="card-curve"></div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}