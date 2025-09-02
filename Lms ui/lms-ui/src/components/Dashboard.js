import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddEmployee from "./AddEmployee";
import ViewEmployees from "./ViewEmployees";
import HolidayPage from "./HolidayPage"; 
import VerifyLeave from "./VerifyLeave";
import EmployeeLeaves from "./EmployeeLeaves";
import ApplyLeave from "./ApplyLeave";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("");

  const menuStyle = {
    width: "220px",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRight: "1px solid #ddd",
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };
  const baseButtonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  };
  const contentStyle = {
    marginLeft: "240px",
    padding: "20px",
    flex: 1,
  };
  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  };
  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No user logged in
      </h2>
    );
  }
  const role = user.role?.toLowerCase();
  return (
    <div style={{ display: "flex" }}>
      <div style={menuStyle}>
        <h3 style={{ marginBottom: "30px" }}>Menu</h3>
        {role === "manager" ? (
          <>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#007bff" }}
              onClick={() => setView("addEmployee")}
            >
              Add Employee
            </button>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#28a745" }}
              onClick={() => setView("viewEmployees")}
            >
              View Employees
            </button>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#ffc107" }}
              onClick={() => setView("holidayPage")}
            >
              Holiday Management
            </button>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#dc3545" }}
              onClick={() => setView("verifyLeave")}
            >
              Verify Leave
            </button>
          </>
        ) : (
          <>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#007bff" }}
              onClick={() => setView("applyLeave")}
            >
              Apply Leave
            </button>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#28a745" }}
              onClick={() => setView("employeeLeaves")}
            >
              My Leaves
            </button>
            <button
              style={{ ...baseButtonStyle, backgroundColor: "#17a2b8" }}
              onClick={() => setView("holidayPage")}
            >
              Holiday Management
            </button>
          </>
        )}
      </div>

      <div style={contentStyle}>
        <h3 style={headingStyle}>
          {role === "manager" ? "Manager Dashboard" : "Employee Dashboard"}
        </h3>

        <hr />

        {view === "addEmployee" && <AddEmployee />}
        {view === "viewEmployees" && <ViewEmployees />}
        {view === "holidayPage" && <HolidayPage />}
        {view === "verifyLeave" && <VerifyLeave />}
        {view === "employeeLeaves" && <EmployeeLeaves />}
        {view === "applyLeave" && <ApplyLeave />}
      </div>
    </div>
  );
}

export default Dashboard;
