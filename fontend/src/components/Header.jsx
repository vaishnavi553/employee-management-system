import "./Header.css";
import { FaBell, FaCog } from "react-icons/fa";

function Header() {
  return (
    <div className="header">

      <div className="headerRight">

        <div className="iconBox">
          <FaCog />
        </div>

        <div className="iconBox">
          <FaBell />
        </div>

        <img
          className="profileImage"
          src="http://localhost:5000/uploads/billie.jpg"
          alt="profile"
        />

      </div>

    </div>
  );
}

export default Header;