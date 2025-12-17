import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

const reports = [
  {
    key: "sales",
    button: "SALES",
    title1: "Sales and Inventory",
    title2: "Compliance Overview",
    images: [
      "/assets/Sales-1.png",
      "/assets/Sales-2.png",
      "/assets/Sales-3.png"
    ]
  },
  {
    key: "event",
    button: "EVENT",
    title1: "Event Pre-Post Analysis",
    title2: "Engagement & Performance",
    images: [
      "/assets/Event-1.png",
      "/assets/Event-2.png"
    ]
  },
  {
    key: "prod",
    button: "PRODUCT",
    title1: "Production Performance Dashboard",
    title2: "Output & Efficiency",
    images: [
      "/assets/Product-1.png",
      "/assets/Product-2.png"
    ]
  },
  {
    key: "support",
    button: "SUPPORT",
    title1: "Customer Support and Satisfaction",
    title2: "Tickets & Resolution",
    images: [
      "/assets/Support-1.png",
      "/assets/Support-2.png"
    ]
  }
];

function App() {
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [views, setViews] = useState(null);

  const activeReport = reports[activeReportIndex];
  const slides = activeReport.images;

  /* -------- IMAGE AUTO SLIDE -------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

  /* -------- REPORT AUTO SWITCH -------- */
  useEffect(() => {
    const reportTimer = setInterval(() => {
      setActiveReportIndex(prev => (prev + 1) % reports.length);
    }, 5000);

    return () => clearInterval(reportTimer);
  }, []);

  /* -------- RESET SLIDE -------- */
  useEffect(() => {
    setSlideIndex(0);
  }, [activeReportIndex]);

  /* -------- NAV FUNCTIONS (FIXED) -------- */
  const prevSlide = () =>
    setSlideIndex(prev => (prev - 1 + slides.length) % slides.length);

  const nextSlide = () =>
    setSlideIndex(prev => (prev + 1) % slides.length);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page">
            <div className="header">
              <div className="view-counter">

              </div>

              <h1 className="title">{activeReport.title1}</h1>
              <h2 className="subtitle">{activeReport.title2}</h2>

              <div className="nav">
                {reports.map((r, i) => (
                  <button
                    key={r.key}
                    className={`nav-btn ${i === activeReportIndex ? "active" : ""}`}
                    onClick={() => setActiveReportIndex(i)}
                  >
                    {r.button}
                  </button>
                ))}
              </div>
            </div>

            <div className="carousel">
              <button className="arrow left" onClick={prevSlide}>‹</button>

              <img
                src={slides[slideIndex]}
                alt="carousel"
                className="carousel-image"
              />

              <button className="arrow right" onClick={nextSlide}>›</button>
            </div>
          </div>
        }
      />

    </Routes>
  );
}

export default App;
