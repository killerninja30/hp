import React, { useState } from "react";
import IssueForm from "../components/IssueForm";
import RequestForm from "../components/RequestForm";
import data from "../data/supportData.json";
import "../css/Support.css";

export default function SupportPage() {
  const [records, setRecords] = useState(data);
  const [activeForm, setActiveForm] = useState(null);
  const [viewRecord, setViewRecord] = useState(null); // new state for viewing

  const addRecord = (record) => {
    setRecords([...records, { id: records.length + 1, ...record }]);
    setActiveForm(null);
  };

  return (
    <div className="support-container">
      <div className="form-buttons">
        <button
          type="button"
          className="form-button issue-button"
          onClick={() => setActiveForm("issue")}
        >
          Log Incident
        </button>
        <button
          type="button"
          className="form-button request-button"
          onClick={() => setActiveForm("request")}
        >
          Request Material
        </button>
      </div>

      {activeForm === "issue" && (
        <IssueForm onSubmit={addRecord} onCancel={() => setActiveForm(null)} />
      )}
      {activeForm === "request" && (
        <RequestForm onSubmit={addRecord} onCancel={() => setActiveForm(null)} />
      )}

      <div className="records-table">
        <table>
          <thead className="table-header">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col">Title / Material</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr className="table-row" key={r.id}>
                  <td className="table-cell id-cell">{r.id}</td>
                  <td className="table-cell">{r.type}</td>
                  <td className="table-cell title-cell">
                    {r.title || r.material}
                  </td>
                  <td className="table-cell">
                    <span
                      className={`status-cell ${
                        r.status === "Open"
                          ? "status-open"
                          : r.status === "In Progress"
                          ? "status-inprogress"
                          : "status-closed"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <button
                      type="button"
                      className="view-button"
                      onClick={() => setViewRecord(r)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <p>No issues or requests yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewRecord && (
        <div className="view-modal">
          <div className="view-modal-content">
            <h3>{viewRecord.type} Details</h3>
            <p><strong>ID:</strong> {viewRecord.id}</p>
            {viewRecord.title && <p><strong>Title:</strong> {viewRecord.title}</p>}
            {viewRecord.material && (
              <p><strong>Material:</strong> {viewRecord.material}</p>
            )}
            {viewRecord.description && (
              <p><strong>Description:</strong> {viewRecord.description}</p>
            )}
            <p><strong>Status:</strong> {viewRecord.status}</p>
            <p><strong>Date:</strong> {viewRecord.date}</p>
            <button
              type="button"
              className="close-button"
              onClick={() => setViewRecord(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
