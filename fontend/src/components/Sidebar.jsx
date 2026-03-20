import { Link } from "react-router-dom";
import { FaUsers, FaCalendar, FaEnvelope, FaTh } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">RS-TECH</h2>

      <ul>
        <li className="non-active">
            <FaTh /> Dashboard
        </li>

        <li className="active">
          <Link to="/">
            <FaUsers /> Employee
          </Link>
        </li>

        <li>
          <FaCalendar /> Calendar
        </li>

        <li>
          <FaEnvelope /> Messages
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;