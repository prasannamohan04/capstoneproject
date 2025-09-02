import React, { useEffect, useState } from 'react';
import LeaveService from '../service/LeaveService';

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const empId = sessionStorage.getItem("username");
  const service = LeaveService();

  useEffect(() => {
    service.leaveHistory(empId).then((res) => setLeaves(res.data));
  }, []);

  return (
    <div>
      <h2>Leave History</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emp ID</th>
            <th>Manager ID</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.empId}</td>
              <td>{l.managerId}</td>
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.leaveType}</td>
              <td>{l.leaveStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveHistory;
