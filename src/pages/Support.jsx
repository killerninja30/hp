import React, { useState } from "react";
import IncidentForm from "../components/IssueForm"; // updated form
import ViewRecordModal from "../components/ViewRecordModal"; // new component
import data from "../data/supportData.json";
import styles from "../css/Support.module.css";

export default function SupportPage() {
  const [records, setRecords] = useState(data);
  const [activeForm, setActiveForm] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);

  // filters
  const [statusFilter, setStatusFilter] = useState("Open"); 
  const [typeFilter, setTypeFilter] = useState("All"); 

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
      {/* Top Section */}
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
          <IncidentForm onSubmit={addRecord} onCancel={() => setActiveForm(null)} />
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
            <option value="Issue">Issue</option>
            <option value="Request">Request</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className={styles.recordsTable}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((r) => (
                <tr className={styles.tableRow} key={r.id}>
                  <td className={`${styles.tableCell} ${styles.idCell}`}>{r.id}</td>
                  <td className={styles.tableCell}>{r.type}</td>
                  <td className={`${styles.tableCell} ${styles.titleCell}`}>
                    {r.title}
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
        <ViewRecordModal
          record={viewRecord}
          onClose={() => setViewRecord(null)}
        />
      )}
    </div>
  );
}
