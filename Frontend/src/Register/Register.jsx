import React, { useState, useEffect } from "react";
import { api, sessionApi } from "../common/common";
import Profile from "./Profile";

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // NEW
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    dateofbirth: "",
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(sessionApi.checkSession.url, {
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setCheckingSession(false); // Always end check
      }
    };

    checkSession();
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(api.login.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.msg || "Login failed");
      }

      setUser(data.user);
      setSuccess("Login successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(api.create.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.msg || "Registration failed");
      }

      setSuccess("Registration successful! Please login.");
      setIsLogin(true);
      setRegisterData({
        username: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        address: "",
        dateofbirth: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(sessionApi.logout.url, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      setUser(null);
      setLoginData({ email: "", password: "" });
      setRegisterData({
        username: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        address: "",
        dateofbirth: "",
      });
      setSuccess("Logout successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (checkingSession) {
    return <p style={{ textAlign: "center" }}>Checking session...</p>;
  }

  return (
    <div className="registration-container">
      {user ? (
        <>
          <Profile user={user} />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handleLogout} className="submit-btn">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={() => setIsLogin(true)}
              disabled={isLogin}
              className="submit-btn"
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              disabled={!isLogin}
              className="submit-btn"
              style={{ marginLeft: "10px" }}
            >
              Register
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="form">
              <h2 className="title">Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                disabled={loading}
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="form">
              <h2 className="title">Register</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <select
                name="gender"
                className="select"
                value={registerData.gender}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input"
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <textarea
                name="address"
                placeholder="Address"
                className="textarea"
                value={registerData.address}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <input
                type="date"
                name="dateofbirth"
                className="input"
                value={registerData.dateofbirth}
                onChange={handleRegisterChange}
                required
                disabled={loading}
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Register;
