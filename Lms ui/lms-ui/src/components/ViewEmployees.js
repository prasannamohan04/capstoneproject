import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8084/viewEmployee')
      .then((res) => {
        const sorted = res.data.sort((a, b) => {
          if (a.empId < b.empId) return -1;
          if (a.empId > b.empId) return 1;
          return 0;
        });
        setEmployees(sorted);
      })
      .catch((err) => console.error('Error fetching employees:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Employees</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #999' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Emp ID</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>First Name</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Last Name</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Job</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Mobile</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Email</th>
            <th style={{ padding: '8px', border: '1px solid #999' }}>Manager ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.empId}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.firstName}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.lastName}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.job}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.mobile}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.email}</td>
              <td style={{ padding: '8px', border: '1px solid #999' }}>{emp.managerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployees;
