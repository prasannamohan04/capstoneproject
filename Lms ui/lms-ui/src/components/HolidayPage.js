import React, { useState, useEffect } from 'react';
import HolidayService from '../service/HolidayService';

function HolidayPage() {
  const [holiday, setHoliday] = useState({ holidaydate: '', holidayDetails: '' });
  const [holidays, setHolidays] = useState([]);
  const service = HolidayService();

  const changeData = (e) => {
    setHoliday({ ...holiday, [e.target.name]: e.target.value });
  };

  const submitData = (e) => {
    e.preventDefault();
    service.addHoliday(holiday).then(() => {
      alert('Holiday added!');
      setHoliday({ holidaydate: '', holidayDetails: '' });
      loadHolidays();
    });
  };

  const loadHolidays = () => {
    service.getHolidayList().then((res) => {
      const sorted = res.data.sort((a, b) => new Date(a.holidaydate) - new Date(b.holidaydate));
      setHolidays(sorted);
    });
  };

  useEffect(() => {
    loadHolidays();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Holiday Management</h2>

      <form onSubmit={submitData} style={{ marginBottom: '20px' }}>
        <label>Date: </label>
        <input
          type="date"
          name="holidaydate"
          value={holiday.holidaydate}
          onChange={changeData}
          required
        />
        <label style={{ marginLeft: '10px' }}>Holiday Details: </label>
        <input
          type="text"
          name="holidayDetails"
          value={holiday.holidayDetails}
          onChange={changeData}
          required
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add Holiday</button>
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {holidays.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No holidays found</td>
            </tr>
          ) : (
            holidays.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{formatDate(h.holidaydate)}</td>
                <td>{h.holidayDetails}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HolidayPage;
