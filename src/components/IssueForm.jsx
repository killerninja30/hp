import React, { useState, useEffect } from "react";
import "../css/SupportForm.css";

function IssueForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    requesterName: "",
    onBehalfOf: "",
    title: "",
    description: "",
    criticality: "Low",
    priority: "Low",
    location: "Line 1",
    department: "Select Department",
  });

  // 🔒 Lock body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Log all form data
    console.log("Form Submitted Data:", form);

    // Pass data to parent
    onSubmit({ type: "Issue", status: "Open", ...form });
  };

  const handleClear = () => {
    setForm({
      requesterName: "",
      onBehalfOf: "",
      title: "",
      description: "",
      criticality: "Low",
      priority: "Low",
      location: "Line 1",
      department: "Select Department",
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">Log New Incident</h2>
          <button className="close-button" onClick={onCancel}>
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-container compact">
          <div className="form-grid">
            {/* Requester Name */}
            <div className="form-group">
              <label className="form-label">Requester Name</label>
              <input
                name="requesterName"
                className="form-input"
                value={form.requesterName}
                onChange={handleChange}
                required
              />
            </div>

            {/* On Behalf Of */}
            <div className="form-group">
              <label className="form-label">On Behalf Of</label>
              <input
                name="onBehalfOf"
                className="form-input"
                value={form.onBehalfOf}
                onChange={handleChange}
              />
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-input"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Criticality */}
            <div className="form-group">
              <label className="form-label">Criticality</label>
              <select
                name="criticality"
                className="form-select"
                value={form.criticality}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">Location</label>
              <select
                name="location"
                className="form-select"
                value={form.location}
                onChange={handleChange}
              >
                <option value="Line 1">Line 1</option>
                <option value="Line 2">Line 2</option>
              </select>
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">Responsible Department</label>
              <select
                name="department"
                className="form-select"
                value={form.department}
                onChange={handleChange}
              >
                <option value="Select Department"></option>
                <option value="QC">QC</option>
                <option value="Mani">Mani</option>
              </select>
            </div>
          </div>

          {/* Description full width */}
          <div className="form-group full-width">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="clear-button" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;
