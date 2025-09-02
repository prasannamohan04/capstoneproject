import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [login, setLogin] = useState({ username: '', password: '' });
  const authService = AuthService();
  const navigate = useNavigate();
  const { login: setAuthUser } = useContext(AuthContext);

  const onInputChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!login.username || !login.password) {
      alert("Username and password are required");
      return;
    }
    try {
      const response = await authService.loginValidate(login);
      setAuthUser(response.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid username/password");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      marginTop: '-50px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        width: '300px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <form>
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <label style={{ display: 'block', marginLeft: '5px' }}>Username:</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={onInputChange}
              style={{
                width: '100%',
                marginBottom: '15px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ display: 'block', marginLeft: '5px' }}>Password:</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={onInputChange}
              style={{
                width: '100%',
                marginBottom: '20px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#1877f2',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
