import { useState, useEffect } from "react";
import './App.css'
import AddApplication from "./component/AddApplication";
import Footer from "./component/Footer";
// import Card from "./component/Card";
import logo from "./assets/logo.jpg"
function App() {

  const [applications, setApplications] = useState(() => {
    const savedJobs = localStorage.getItem("applications");
    if (savedJobs) {
      return JSON.parse(savedJobs);
    } else {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const [activeTab, setActiveTab] = useState("all");

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications))
  }, [applications]);

  const handleDelete = (id) => {
    const updated = applications.filter((job) => job.id !== id);
    setApplications(updated);
    showToast("Job Deleted Successfully 🗑️", "error");
  }

  const filteredJobs = activeTab === "all" ? applications : applications.filter(job => job.status === activeTab);

  return (
    <>
      {toast && (
        <div className={`toast-popup ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* header */}
      <div className="header-container">
        <img src={logo} alt="logo" className="logo" />
        <h1>Job Application Tracker</h1>
      
        <i className="fa-regular fa-address-card fa-jello" style={{color: "black"}}></i>
      <i className="fa-solid fa-thumbs-up fa-float" style={{color: "black"}}></i>
      <i className="fa-solid fa-skull fa-swing" style={{color: "black"}}    ></i>
      </div>
      
      
            <AddApplication setApplications={setApplications} applications={applications} showToast={showToast} />

      <div className="filter-tabs">
        <button className={`filter-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All Jobs ({applications.length})</button>
        <button className={`filter-btn ${activeTab === "applied" ? "active" : ""}`} onClick={() => setActiveTab("applied")}>Applied</button>
        <button className={`filter-btn ${activeTab === "interview" ? "active" : ""}`} onClick={() => setActiveTab("interview")}>Interview</button>
        <button className={`filter-btn ${activeTab === "offer" ? "active" : ""}`} onClick={() => setActiveTab("offer")}>Offer</button>
        <button className={`filter-btn ${activeTab === "rejected" ? "active" : ""}`} onClick={() => setActiveTab("rejected")}>Rejected</button>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length === 0 ? (
          <h3 className="no-jobs-msg">No jobs found in this category.</h3>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="card">
              <h3>Company: {job.companyName}</h3>
              {/* <Card /> */}
              <p>Title: {job.jobTitle}</p>
              <p className="notes-text">Notes : {job.notes}</p>
              <p className="status-text">Status: {job.status}</p>

              <select name="status" value={job.status} onChange={(e) => {
                const updated = applications.map((j) => {
                  if (j.id === job.id) {
                    return { ...j, status: e.target.value }
                  }
                  return j;
                })
                setApplications(updated);
              }}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>

              <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete Job</button>
            </div>
          ))
        )}
      </div>


      <Footer />
    </>
  )
}

export default App;