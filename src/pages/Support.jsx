import React, { useState } from "react";
import IssueForm from "../components/IssueForm";
import data from "../data/supportData.json";
import styles from "../css/Support.module.css";

export default function SupportPage() {
  const [records, setRecords] = useState(data);
  const [activeForm, setActiveForm] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);

  // filters
  const [statusFilter, setStatusFilter] = useState("Open"); // default Open
  const [typeFilter, setTypeFilter] = useState("All"); // default All

  const addRecord = (record) => {
    setRecords([...records, { id: records.length + 1, ...record }]);
    setActiveForm(null);
  };

  // apply filters
  const filteredRecords = records.filter((r) => {
  const statusMatch = statusFilter === "All" || r.status === statusFilter;
  const typeMatch =
    typeFilter === "All" || r.type.toLowerCase() === typeFilter.toLowerCase();
  return statusMatch && typeMatch;
  });

  return (
    <div className={styles.supportContainer}>
      {/* Button */}
    <div className={styles.topSection}>
      <div className={styles.formButtons}>
        <button
          type="button"
          className={`${styles.formButton} ${styles.issueButton}`}
          onClick={() => setActiveForm("issue")}
        >
          Log Incident
        </button>
      </div>

      {/* Incident Form */}
      {activeForm === "issue" && (
        <IssueForm onSubmit={addRecord} onCancel={() => setActiveForm(null)} />
      )}

      {/* Filters */}
      <div className={styles.filters}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.dropdown}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
          <option value="All">All Status</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={styles.dropdown}
        >
          <option value="All">All Incidents</option>
          <option value="issue">Issue</option>
          <option value="request">Request</option>
        </select>
      </div>
    </div>
      {/* Records Table */}
      <div className={styles.recordsTable}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((r) => (
                <tr className={styles.tableRow} key={r.id}>
                  <td className={`${styles.tableCell} ${styles.idCell}`}>
                    {r.id}
                  </td>
                  <td className={styles.tableCell}>{r.type}</td>
                  <td className={`${styles.tableCell} ${styles.titleCell}`}>
                    {r.title || r.material}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusCell} ${
                        r.status === "Open"
                          ? styles.statusOpen
                          : r.status === "In Progress"
                          ? styles.statusInprogress
                          : styles.statusClosed
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() => setViewRecord(r)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.emptyState}>
                  <i className="fas fa-inbox"></i>
                  <p>No matching incidents found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
     {viewRecord && (
  <div className={styles.viewModal}>
    <div className={styles.viewModalContent}>
      <button
        type="button"
        className={styles.closeIcon}
        onClick={() => setViewRecord(null)}
      >
        ×
      </button>

      <h3>{viewRecord.type} Details</h3>

      <div className={styles.viewDetails}>
        <p><strong>ID:</strong> {viewRecord.id}</p>
        <p><strong>Type:</strong> {viewRecord.type}</p>
        <p><strong>Title:</strong> {viewRecord.title || viewRecord.material}</p>
        <p><strong>Description:</strong> {viewRecord.description}</p>
        <p><strong>Status:</strong> {viewRecord.status}</p>
        <p><strong>Requested By:</strong> {viewRecord.requestedBy || "N/A"}</p>
        <p><strong>Issue Started At:</strong> {viewRecord.issueStartedAt || "N/A"}</p>
        <p><strong>Date Created:</strong> {viewRecord.date}</p>
        <p><strong>Comments:</strong> {viewRecord.comments || "No comments"}</p>
        <p><strong>Modified On:</strong> {viewRecord.modifiedOn || "Not modified"}</p>
        {viewRecord.attachment && (
          <p>
            <strong>Attachment:</strong>{" "}
            <a href={viewRecord.attachment} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
