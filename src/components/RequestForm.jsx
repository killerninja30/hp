import React, { useState, useEffect } from "react";
import "../css/SupportForm.css"; // reuse your existing CSS

function RequestForm({ onSubmit, onCancel }) {
  const initialFormState = {
    requesterName: "",
    onBehalfOf: "",
    title: "",
    description: "",
    materialType: "Denester",
    materialName: "",
    uom: "",
    unit: "",
    urgencyLevel: "Low",
    location: "Line 1",
    expectedDeliveryTime: "",
    department: "Select Department",
  };

  const [form, setForm] = useState(initialFormState);

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
    console.log("Request Form Submitted Data:", form);

    // Pass data to parent
    onSubmit({ type: "Request", status: "Open", ...form });
  };

  const handleClear = () => setForm(initialFormState);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">Log New Request</h2>
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

            {/* Material Type */}
            <div className="form-group">
              <label className="form-label">Material Type</label>
              <select
                name="materialType"
                className="form-select"
                value={form.materialType}
                onChange={handleChange}
              >
                <option value="Denester">Denester</option>
                <option value="Lid Printer">Lid Printer</option>
                <option value="Pallet Mag">Pallet Mag</option>
              </select>
            </div>

            {/* Material Name */}
            <div className="form-group">
              <label className="form-label">Material Name</label>
              <input
                name="materialName"
                className="form-input"
                value={form.materialName}
                onChange={handleChange}
              />
            </div>

            {/* UOM */}
            <div className="form-group">
              <label className="form-label">UOM</label>
              <input
                name="uom"
                className="form-input"
                value={form.uom}
                onChange={handleChange}
              />
            </div>

            {/* Unit */}
            <div className="form-group">
              <label className="form-label">Unit</label>
              <input
                name="unit"
                className="form-input"
                value={form.unit}
                onChange={handleChange}
              />
            </div>

            {/* Urgency Level */}
            <div className="form-group">
              <label className="form-label">Urgency Level</label>
              <select
                name="urgencyLevel"
                className="form-select"
                value={form.urgencyLevel}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
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

            {/* Expected Delivery Time */}
            <div className="form-group">
              <label className="form-label">Expected Delivery Time</label>
              <input
                type="date"
                name="expectedDeliveryTime"
                className="form-input"
                value={form.expectedDeliveryTime}
                onChange={handleChange}
              />
            </div>

            {/* Responsible Department */}
            <div className="form-group">
              <label className="form-label">Responsible Department</label>
              <select
                name="department"
                className="form-select"
                value={form.department}
                onChange={handleChange}
              >
                <option value="Select Department" disabled>
                  Select Department
                </option>
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

export default RequestForm;
