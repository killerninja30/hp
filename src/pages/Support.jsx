import React, { useState } from "react";
import IssueForm from "../components/IssueForm";
import RequestForm from "../components/RequestForm";
import data from "../data/supportData.json";
import styles from "../css/Support.module.css";

export default function SupportPage() {
  const [records, setRecords] = useState(data);
  const [activeForm, setActiveForm] = useState(null);
  const [viewRecord, setViewRecord] = useState(null); // new state for viewing

  const addRecord = (record) => {
    setRecords([...records, { id: records.length + 1, ...record }]);
    setActiveForm(null);
  };

  return (
    <div className={styles.supportContainer}>
      <div className={styles.formButtons}>
        <button
          type="button"
          className={`${styles.formButton} ${styles.issueButton}`}
          onClick={() => setActiveForm("issue")}
        >
          Log Incident
        </button>
        <button
          type="button"
          className={`${styles.formButton} ${styles.requestButton}`}
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

      <div className={styles.recordsTable}>
        <table>
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
            {records.length > 0 ? (
              records.map((r) => (
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
                  <p>No issues or requests yet.</p>
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
            <h3>{viewRecord.type} Details</h3>
            <p>
              <strong>ID:</strong> {viewRecord.id}
            </p>
            {viewRecord.title && (
              <p>
                <strong>Title:</strong> {viewRecord.title}
              </p>
            )}
            {viewRecord.material && (
              <p>
                <strong>Material:</strong> {viewRecord.material}
              </p>
            )}
            {viewRecord.description && (
              <p>
                <strong>Description:</strong> {viewRecord.description}
              </p>
            )}
            <p>
              <strong>Status:</strong> {viewRecord.status}
            </p>
            <p>
              <strong>Date:</strong> {viewRecord.date}
            </p>
            <button
              type="button"
              className={styles.closeButton}
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
