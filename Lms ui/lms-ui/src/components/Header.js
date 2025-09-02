import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>LMS Portal</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Hi, {user.username}</span>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#004080",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  user: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
export default Header;
