import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import UserActions from './CRUD/userAction';
import './app.css';
import Navbar from './Navbar/Navbar';
import CreateProducts from './products/createProducts';
import Register from './Register/Register';
import Profile from './Register/Profile';
import ShowProduct from './products/showProduct';

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userAction" element={<UserActions />} />
            <Route path="/create"  element={<CreateProducts />} />
            <Route path="/products" element={<ShowProduct   />} />
            

            {/* Add more routes as needed */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;