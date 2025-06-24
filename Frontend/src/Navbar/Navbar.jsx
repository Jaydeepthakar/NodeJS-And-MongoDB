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
    navigate("/login"); // Make sure this route exists
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">MyApp</Link>
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
                <Link to="/products">Show Products</Link> {/* Make sure this route exists */}
              </li>
            </ul>
          </li>

          <li>
            <Link to="/cart">Cart</Link>
          </li>

          {user?.isAdmin && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}

          {user ? (
            <li className="dropdown">
              <span className="dropdown-toggle">{user.username || user.email || "User"}</span>
              <ul className="dropdown-menu">
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </li>
          ) : (
            <li>
              <Link className="Register-Login" to="/register">Register</Link>
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
