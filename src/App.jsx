import { useState } from "react";
import "./App.css";

const reports = [
  {
    key: "tnc",
    button: "T&C",
    title1: "Terms & Conditions",
    title2: "Compliance Overview",
    url: import.meta.env.VITE_TNC
  },
  {
    key: "dos",
    button: "DOS",
    title1: "Daily Operations Summary",
    title2: "Operational Metrics",
    url: import.meta.env.VITE_DOS
  },
  {
    key: "prod",
    button: "PRODUCT",
    title1: "Production Dashboard",
    title2: "Output & Efficiency",
    url: import.meta.env.VITE_PROD
  },
  {
    key: "event",
    button: "EVENT",
    title1: "Event Analytics",
    title2: "Engagement & Performance",
    url: import.meta.env.VITE_EVENT
  },
  {
    key: "support",
    button: "SUPPORT",
    title1: "Support Metrics",
    title2: "Tickets & Resolution",
    url: import.meta.env.VITE_SUPPORT
  }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReport = reports[activeIndex];

return (
  <div className="page">
    {/* HEADER */}
    <div className="header">
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

    {/* REPORT */}
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
