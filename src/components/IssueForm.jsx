import React, { useState, useEffect } from "react";
import "../css/SupportForm.css";

function IncidentForm({ onSubmit, onCancel }) {
  const [formType, setFormType] = useState("Issue"); // default to Issue

  const initialIssueForm = {
    requesterName: "",
    onBehalfOf: "",
    title: "",
    description: "",
    attachment: null,
    criticality: "Low",
    priority: "Low",
    location: "Line 1",
    department: "Select Department",
  };

  const initialRequestForm = {
    requesterName: "",
    onBehalfOf: "",
    title: "",
    description: "",
    attachment: null,
    materialType: "Denester",
    materialName: "",
    uom: "",
    unit: "",
    urgencyLevel: "Low",
    location: "Line 1",
    expectedDeliveryTime: "",
    department: "Select Department",
  };

  const [form, setForm] = useState(initialIssueForm);

  // 🔒 Lock body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setFormType(type);
    setForm(type === "Issue" ? initialIssueForm : initialRequestForm);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setForm({ ...form, [name]: files[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      type: formType,
      status: "Open",
      name: "requested/issue",
      startedAt: new Date().toISOString(),
      ...form,
    };
    console.log("Form Submitted Data:", submissionData);
    onSubmit(submissionData);
  };

  const handleClear = () => {
    setForm(formType === "Issue" ? initialIssueForm : initialRequestForm);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">Log New {formType}</h2>
          <button className="close-button" onClick={onCancel}>
            ×
          </button>
        </div>

        {/* Form Type Selector */}
        <div className="form-group">
          <label className="form-label">Select Incident Type</label>
          <select
            className="form-select"
            value={formType}
            onChange={handleTypeChange}
          >
            <option value="Issue">Issue</option>
            <option value="Request">Request</option>
          </select>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-container compact">
          <div className="form-grid">
            {/* Shared Fields */}
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

            <div className="form-group">
              <label className="form-label">On Behalf Of</label>
              <input
                name="onBehalfOf"
                className="form-input"
                value={form.onBehalfOf}
                onChange={handleChange}
              />
            </div>

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

            {/* Description moved just after Title */}
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

            {/* Attachment field */}
            <div className="form-group full-width">
              <label className="form-label">Attachment (Photo)</label>
              <input
                type="file"
                name="attachment"
                accept="image/*"
                className="form-input"
                onChange={handleChange}
              />
            </div>

            {/* Issue-specific fields */}
            {formType === "Issue" && (
              <>
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
              </>
            )}

            {/* Request-specific fields */}
            {formType === "Request" && (
              <>
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

                <div className="form-group">
                  <label className="form-label">Material Name</label>
                  <input
                    name="materialName"
                    className="form-input"
                    value={form.materialName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">UOM</label>
                  <input
                    name="uom"
                    className="form-input"
                    value={form.uom}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input
                    name="unit"
                    className="form-input"
                    value={form.unit}
                    onChange={handleChange}
                  />
                </div>

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
              </>
            )}

            {/* Shared again */}
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

            <div className="form-group">
              <label className="form-label">Responsible Department</label>
              <select
                name="department"
                className="form-select"
                value={form.department}
                onChange={handleChange}
              >
                <option value="Select Department">Select Department</option>
                <option value="QC">QC</option>
                <option value="Mani">Mani</option>
              </select>
            </div>
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

export default IncidentForm;
