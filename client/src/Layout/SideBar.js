import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the custom CSS file for Sidebar styling

export default function Sidebar() {
  return (
    <div className="sidebar-container d-flex bg-black flex-column flex-shrink-0 p-3 vh-100">
      <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-2 sidebar-brand">Options</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/mqtt-get-data" className="nav-link" activeClassName="active">
         Show Mqtt data
          </NavLink>
          <NavLink to="/mqtt-publish-data" className="nav-link" activeClassName="active">
         send Mqtt data
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
