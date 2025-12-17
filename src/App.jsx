import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

const reports = [
  {
    key: "sales",
    button: "SALES",
    title1: "Sales and Inventory",
    title2: "Evaluate stock levels, sales velocity, aging, and gross margins while comparing YOY trends in unit movement and revenue.",
    images: [
      "/assets/Sales-1.png",
      "/assets/Sales-2.png",
      "/assets/Sales-3.png"
    ]
  },
  {
    key: "dos",
    button: "DOS",
    title1: "Daily Order Status",
    title2: "Real-time order tracking plus warehouse and logistics efficiency insights—all in one view.",
    images: [
      "/assets/DOS-1.png",
      "/assets/DOS-2.png"
    ]
  },
  {
    key: "event",
    button: "EVENT",
    title1: "Event Pre-Post Analysis",
    title2: "Measure impact by comparing event performance before and after execution.",
    images: [
      "/assets/Event-1.png"
    ]
  },
  {
    key: "prod",
    button: "PRODUCT",
    title1: "Production Performance Dashboard",
    title2: "Track product performance with sales, stock, and pricing insights by age group and line.",
    images: [
      "/assets/Product-1.png",
      "/assets/Product-2.png"
    ]
  },
  {
    key: "support",
    button: "SUPPORT",
    title1: "Customer Support and Satisfaction",
    title2: "Track SLAs and ticket trends to measure customer support performance and satisfaction",
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

  useEffect(() => {
    setSlideIndex(0);
  }, [activeReportIndex]);

  // const prevSlide = () =>
  //   setSlideIndex(prev => (prev - 1 + slides.length) % slides.length);

  // const nextSlide = () =>
  //   setSlideIndex(prev => (prev + 1) % slides.length);

  const prevSlide = () => {
  if (slideIndex === 0) {
    // go to previous report
    const prevReportIndex =
      (activeReportIndex - 1 + reports.length) % reports.length;

    setActiveReportIndex(prevReportIndex);
    setSlideIndex(reports[prevReportIndex].images.length - 1);
  } else {
    setSlideIndex(prev => prev - 1);
  }
};

const nextSlide = () => {
  if (slideIndex === slides.length - 1) {
    // go to next report
    const nextReportIndex =
      (activeReportIndex + 1) % reports.length;

    setActiveReportIndex(nextReportIndex);
    setSlideIndex(0);
  } else {
    setSlideIndex(prev => prev + 1);
  }
};


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
