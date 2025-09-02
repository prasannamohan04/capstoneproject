import React, { useState } from 'react';
import LeaveService from '../service/LeaveService';

function ApplyLeave() {
  const [leave, setLeave] = useState({
    empId: '', managerId: '', fromDate: '', toDate: '', leaveType: ''
  });
  const service = LeaveService();

  const changeData = (e) => setLeave({ ...leave, [e.target.name]: e.target.value });

  const submitData = (e) => {
    e.preventDefault();
    service.applyLeave(leave).then(() => alert('Leave applied!'));
  };

  return (
    <div>
      <h2>Apply Leave</h2>
      <form>
        <label>Employee ID:</label>
        <input name="empId" value={leave.empId} onChange={changeData} />
        <label>Manager ID:</label>
        <input name="managerId" value={leave.managerId} onChange={changeData} />
        <label>From Date:</label>
        <input type="date" name="fromDate" value={leave.fromDate} onChange={changeData} />
        <label>To Date:</label>
        <input type="date" name="toDate" value={leave.toDate} onChange={changeData} />
        <label>Leave Type:</label>
        <select name="leaveType" value={leave.leaveType} onChange={changeData}>
          <option value="">Select</option>
          <option value="CASUAL">CASUAL</option>
          <option value="MEDICAL">MEDICAL</option>
        </select>
        <button onClick={submitData}>Apply</button>
      </form>
    </div>
  );
}

export default ApplyLeave;
