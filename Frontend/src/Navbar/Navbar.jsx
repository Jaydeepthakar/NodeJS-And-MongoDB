import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="logo">MyApp</Link>
      </div>

      <div className="navbar-center">
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li className="dropdown">
            <span className="dropdown-toggle">Products</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/create">Create Product</Link>
              </li>
              <li>
                <Link to="/products">Show Products</Link>
              </li>
            </ul>
            
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>

          {user && user.isAdmin && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
          {user ? (
            <li className="dropdown">
              <span className="dropdown-toggle">{user.name || "User"}</span>
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          ) : (
            <li>
              <Link className="Register-Login" to="/register">register</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
