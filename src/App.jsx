import { useEffect, useRef, useState } from "react";
import "./App.css";

const reports = [
  {
    key: "Sales",
    button: "SALES",
    title1: "Sales and Inventory",
    title2: "Compliance Overview",
    url: import.meta.env.VITE_TNC
  },
  {
    key: "dos",
    button: "DOS",
    title1: "Daily Order Status",
    title2: "Operational Metrics",
    url: import.meta.env.VITE_DOS
  },
  {
    key: "prod",
    button: "PRODUCT",
    title1: "Production Performance Dashboard",
    title2: "Output & Efficiency",
    url: import.meta.env.VITE_PROD
  },
  {
    key: "event",
    button: "EVENT",
    title1: "Event Pre-Post Analysis",
    title2: "Engagement & Performance",
    url: import.meta.env.VITE_EVENT
  },
  {
    key: "support",
    button: "SUPPORT",
    title1: "Customer Support and Satisfaction",
    title2: "Tickets & Resolution",
    url: import.meta.env.VITE_SUPPORT
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewCount, setViewCount] = useState(null);
  const countedRef = useRef(false);

  const activeReport = reports[activeIndex];

  useEffect(() => {
    if (countedRef.current) return;
    countedRef.current = true;

    fetch("/api/view", { method: "POST" })
      .then(res => res.json())
      .then(data => setViewCount(data.views))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="header">
        <div className="view-counter">
          👁 Views: {viewCount ?? "—"}
        </div>

        <h1 className="title">{activeReport.title1}</h1>
        <h2 className="subtitle">{activeReport.title2}</h2>

        <div className="nav">
          {reports.map((r, i) => (
            <button
              key={r.key}
              className={`nav-btn ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              {r.button}
            </button>
          ))}
        </div>
      </div>

      <div className="report-area">
        <iframe
          title={activeReport.title1}
          src={activeReport.url}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default App;
