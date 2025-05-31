import React, { useState } from "react";
import { api } from "../common/common"; 
import "./register.css"; 

function Register() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    dateofbirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(api.create.url, {
        method: api.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="registration-container">
      <h2 className="title">User Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="select"
          value={formData.gender}
          onChange={handleChange}
          required
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
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          className="textarea"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="date"
          name="dateofbirth"
          className="input"
          value={formData.dateofbirth}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;