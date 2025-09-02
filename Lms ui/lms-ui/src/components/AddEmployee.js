import React, { useState } from 'react';
import EmployeeService from '../service/EmployeeService';

function AddEmployee() {
  const service = EmployeeService();
  const [employee, setEmployee] = useState({
    empId: '', firstName: '', lastName: '', job: '', mobile: '', email: '', managerId: ''
  });
  const changeData = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });
  const submitData = (e) => {
    e.preventDefault();
    service.addEmployee(employee).then(() => alert("Employee added!"));
  };
  return (
    <div>
      <h2>Add Employee</h2>
      <form>
        <label style={{ display: 'block', marginBottom: '6px' }}>Emp ID:</label>
        <input
          name="empId"
          value={employee.empId}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>First Name:</label>
        <input
          name="firstName"
          value={employee.firstName}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>Last Name:</label>
        <input
          name="lastName"
          value={employee.lastName}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>Job:</label>
        <input
          name="job"
          value={employee.job}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>Mobile:</label>
        <input
          name="mobile"
          value={employee.mobile}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>Email:</label>
        <input
          name="email"
          value={employee.email}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <label style={{ display: 'block', marginBottom: '6px' }}>Manager ID:</label>
        <input
          name="managerId"
          value={employee.managerId}
          onChange={changeData}
          style={{ padding: '6px', marginBottom: '8px', width: '100%', fontSize: '14px' }}
        />
        <button
          onClick={submitData}
          style={{
            padding: '8px 12px',
            backgroundColor: '#004080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
