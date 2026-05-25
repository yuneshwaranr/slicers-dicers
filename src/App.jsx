import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const reports = [

  {
    key: "shipment",
    button: "SHIPMENT",
    title1: "Shipment Performance Report",
    title2: "Track shipment performance with insights on total orders, delivery status, delays, regional distribution, and on-time delivery trends.",
    images: ["/assets/Shipment_1.png"]
  },
  {
    key: "po",
    button: "PO",
    title1: "Purchase Orders Report",
    title2: "Analyze purchase order performance, vendor status, warehouse distribution, and spending trends across procurement operations.",
    images: ["/assets/PO_1.png"]
  },
  {
    key: "dos",
    button: "DOS",  
    title1: "Daily Order Status",
    title2: "Real-time order tracking plus warehouse and logistics efficiency insights—all in one view.",
    images: ["/assets/DOS-1.png"]
  },  
  {
    key: "support",
    button: "SUPPORT",
    title1: "Customer Support and Satisfaction",
    title2: "Track SLAs and ticket trends to measure customer support performance and satisfaction",
    images: ["/assets/Support-1.png", "/assets/Support-2.png"]
  }
  // {
  //   key: "sales",
  //   button: "SALES",
  //   title1: "Sales and Inventory",
  //   title2: "Evaluate stock levels, sales velocity, aging, and gross margins while comparing YOY trends in unit movement and revenue.",
  //   images: ["/assets/Sales-1.png", "/assets/Sales-2.png", "/assets/Sales-3.png"]
  // }
  // {
  //   key: "subscription",
  //   button: "SUBSCRIPTION",
  //   title1: "Subscription Intelligence",
  //   title2: "Track subscription trends, churn rates, and revenue growth over time.",
  //   images: ["/assets/Subscription-1.png", "/assets/Subscription-2.png", "/assets/Subscription-3.png"]
  // },
  
  // {
  //   key: "event",
  //   button: "EVENT",
  //   title1: "Event Pre-Post Analysis",
  //   title2: "Measure impact by comparing event performance before and after execution.",
  //   images: ["/assets/Event-1.png"]
  // },

  // {
  //   key: "prod",
  //   button: "PRODUCT",
  //   title1: "Production Performance Dashboard",
  //   title2: "Track product performance with sales, stock, and pricing insights by age group and line.",
  //   images: ["/assets/Product-1.png"]
  // }
];

function App() {
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fade, setFade] = useState(true);

  const activeReport = reports[activeReportIndex];
  const slides = activeReport.images;

  useEffect(() => {
    setSlideIndex(0);
  }, [activeReportIndex]);

  // autoplay
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex, activeReportIndex, isPlaying]);

  const triggerFade = (cb) => {
    setFade(false);
    setTimeout(() => {
      cb();
      setFade(true);
    }, 150);
  };

  const prevSlide = () => {
    triggerFade(() => {
      if (slideIndex === 0) {
        const prevReportIndex =
          (activeReportIndex - 1 + reports.length) % reports.length;

        setActiveReportIndex(prevReportIndex);
        setSlideIndex(reports[prevReportIndex].images.length - 1);
      } else {
        setSlideIndex((prev) => prev - 1);
      }
    });
  };

  const nextSlide = () => {
    triggerFade(() => {
      if (slideIndex === slides.length - 1) {
        const nextReportIndex = (activeReportIndex + 1) % reports.length;

        setActiveReportIndex(nextReportIndex);
        setSlideIndex(0);
      } else {
        setSlideIndex((prev) => prev + 1);
      }
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page">
            <div className="header">
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
                className={`carousel-image ${fade ? "fade-in" : "fade-out"}`}
              />

              <button className="arrow right" onClick={nextSlide}>›</button>

              {/* Controls */}
              <div className="controls">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <button onClick={() => setIsFullscreen(true)}>⛶</button>
              </div>

              {/* Progress bar */}
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((slideIndex + 1) / slides.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Fullscreen */}
            {isFullscreen && (
              <div className="fullscreen">
                <button className="close" onClick={() => setIsFullscreen(false)}>✕</button>

                <button className="arrow left" onClick={prevSlide}>‹</button>

                <img src={slides[slideIndex]} className="fullscreen-img" />

                <button className="arrow right" onClick={nextSlide}>›</button>
              </div>
            )}
          </div>
        }
      />
    </Routes>
  );
}

export default App;