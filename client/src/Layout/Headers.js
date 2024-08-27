import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and useNavigate
import './Headers.css'; // Import the custom CSS file for Header styling
import { Axios } from '../Axios/Axios.js';
import Cookie from 'cookie-universal'
export default function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Initialize navigate for routing
const cook = Cookie()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await Axios.get('/getUser');
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  // Function to apply active class based on the link being active
  const getActiveClassName = ({ isActive }) => (isActive ? 'active' : '');

  // Function to handle logout
  const handleLogout = () => {
    // Clear any authentication tokens or session data
 // Example: Removing token from localStorage
 cook.remove('Iot_Project')
    // Redirect to login page
    window.location.pathname='/login';
  };

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <span className="fw-bold fs-4">Team 3la Allah</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${getActiveClassName({ isActive })}`}
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item" style={{ marginLeft: '15px' }}>
                <NavLink
                  className={({ isActive }) => `nav-link ${getActiveClassName({ isActive })}`}
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <div className="dropdown custom-dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu">
                 
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <li className="nav-item">
                {/* Additional nav items */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
