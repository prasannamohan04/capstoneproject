import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LeaveService from "../service/LeaveService";

function EmployeeLeaves() {
  const { user } = useContext(AuthContext);
  const service = LeaveService();
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    if (user?.username) {
      loadLeaves();
    }
  }, [user]);
  const loadLeaves = async () => {
    try {
      const res = await service.getLeaveHistory(user.username);
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leave history", err);
    }
  };
  const handleCancel = async (leaveId) => {
    try {
      await service.verifyLeave(leaveId, "CANCELLED", "Cancelled by employee");
      loadLeaves();
    } catch (err) {
      console.error("Error cancelling leave", err);
    }
  };

  const handleWithdraw = async (leaveId) => {
    try {
      await service.verifyLeave(leaveId, "WITHDRAWN", "Withdrawn by employee");
      loadLeaves();
    } catch (err) {
      console.error("Error withdrawing leave", err);
    }
  };
  return (
    <div>
      <h2>My Leaves</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Days</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No leaves found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.numberOfDays}</td>
                <td>{leave.leaveStatus}</td>
                <td>{leave.remarks}</td>
                <td>
                  {leave.leaveStatus === "APPLIED" && (
                    <button
                      style={{ backgroundColor: "orange", color: "white" }}
                      onClick={() => handleCancel(leave.id)}
                    >
                      Cancel
                    </button>
                  )}
                  {leave.leaveStatus === "APPROVED" && (
                    <button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleWithdraw(leave.id)}
                    >
                      Withdraw
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeLeaves;
