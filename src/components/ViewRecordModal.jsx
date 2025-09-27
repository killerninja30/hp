import React from "react";
import styles from "../css/RecordModal.module.css";

export default function ViewRecordModal({ record, onClose }) {
  return (
    <div className={styles.viewModal}>
      <div className={styles.viewModalContent}>
        <div className={styles.title}>
          <h3>Incident Details</h3>
          <button type="button" className={styles.closebutton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Box 1 */}
        <div className={styles.viewBox}>
          {record.status && <p><strong>Status:</strong> {record.status}</p>}
          {(record.requestedBy || record.requesterName) && (
            <p><strong>Requested By:</strong> {record.requestedBy || record.requesterName}</p>
          )}
          {record.date && <p><strong>Date Created:</strong> {record.date}</p>}
          {record.modifiedOn && <p><strong>Last Update / Modified On:</strong> {record.modifiedOn}</p>}
          {record.comments && <p><strong>Comments:</strong> {record.comments}</p>}
        </div>

        {/* Box 2 */}
        <div className={styles.viewBox}>
          {record.id && <p><strong>ID:</strong> {record.id}</p>}
          {record.type && <p><strong>Type:</strong> {record.type}</p>}
          {record.title && <p><strong>Title:</strong> {record.title}</p>}
          {record.description && <p><strong>Description:</strong> {record.description}</p>}
          {record.onBehalfOf && <p><strong>On Behalf Of:</strong> {record.onBehalfOf}</p>}
          {record.department && <p><strong>Department:</strong> {record.department}</p>}
          {record.location && <p><strong>Location:</strong> {record.location}</p>}

          {/* Issue-specific */}
          {record.type === "Issue" && (
            <>
              {record.criticality && <p><strong>Criticality:</strong> {record.criticality}</p>}
              {record.priority && <p><strong>Priority:</strong> {record.priority}</p>}
            </>
          )}

          {/* Request-specific */}
          {record.type === "Request" && (
            <>
              {record.material && <p><strong>Material Type:</strong> {record.material}</p>}
              {record.materialName && <p><strong>Material Name:</strong> {record.materialName}</p>}
              {record.uom && <p><strong>UOM:</strong> {record.uom}</p>}
              {record.unit && <p><strong>Unit:</strong> {record.unit}</p>}
              {record.urgencyLevel && <p><strong>Urgency Level:</strong> {record.urgencyLevel}</p>}
              {record.expectedDeliveryTime && <p><strong>Expected Delivery Time:</strong> {record.expectedDeliveryTime}</p>}
            </>
          )}

          {/* Attachment preview */}
           {record.attachment && (
  <div className={styles.attachmentBox}>
    <strong>Attachment:</strong>
    <a href={record.attachment} target="_blank" rel="noopener noreferrer">
      <img
        src={record.attachment}
        alt="Attachment"
        className={styles.attachmentPreview}
      />
    </a>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
