import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import UserActions from './CRUD/userAction';
import './app.css';
import Navbar from './Navbar/Navbar';
import ShowProducts from './products/ShowProducts';
import CreateProducts from './products/createProducts';
import Register from './Register/Register';

function App() {
  return (
    <div className="app-container">
      <Router>
        {/* Header */}
        

        {/* Optional Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/userAction" element={<UserActions />} />
            <Route path="/" element={<ShowProducts />} />
            <Route path="/create"  element={<CreateProducts />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;