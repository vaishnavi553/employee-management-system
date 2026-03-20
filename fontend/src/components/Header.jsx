import "./Header.css";
import { FaBell, FaCog } from "react-icons/fa";
import profilePic from "../assets/billie.jpg";

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
          src={profilePic}
          alt="profile"
        />

      </div>

    </div>
  );
}

export default Header;