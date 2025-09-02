import React, { useEffect, useState, useContext } from 'react';
import LeaveService from '../service/LeaveService';
import { AuthContext } from '../context/AuthContext';

function VerifyLeave() {
  const { user } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const service = LeaveService();
  useEffect(() => {
  if (!user?.username) return; 
  service.getPendingLeaves(user.username) 
    .then(res => {
      console.log("Pending leaves:", res.data);
      setLeaves(res.data);
    })
    .catch(err => console.error("Error fetching leaves:", err));
}, [user]);
  const handleVerify = (id, status, existingRemarks) => {
    let remarks = existingRemarks || "";
    if (status === "REJECTED" && !remarks) {
      remarks = prompt("Enter remarks (required if rejected):");
      if (!remarks) return alert("Remarks required for rejection");
    }

    service.verifyLeave(id, status, remarks)
      .then(() => {
        alert("Leave updated!");
        setLeaves(leaves.filter(l => l.id !== id));
      })
      .catch(err => alert("Error updating leave: " + err.message));
  };

  const handleRemarksChange = (id, value) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, remarks: value } : l));
  };

  return (
    <div>
      <h2>Verify Leave Requests</h2>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.employee.empId}</td>
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.leaveType}</td>
              <td>{l.leaveStatus}</td>
              <td>
                <input
                  type="text"
                  value={l.remarks || ""}
                  placeholder="Enter remarks"
                  onChange={(e) => handleRemarksChange(l.id, e.target.value)}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <button
                  style={{ backgroundColor: "#28a745", color: "white", marginRight: "5px" }}
                  onClick={() => handleVerify(l.id, "APPROVED", l.remarks)}
                >
                  Approve
                </button>
                <button
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                  onClick={() => handleVerify(l.id, "REJECTED", l.remarks)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerifyLeave;
