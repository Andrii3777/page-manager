/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = ({ rightButtons }) => {
  return (
    <header>
      <div>
        <Link to="/">Test Task</Link>
      </div>
      <div className="button-container">
        {rightButtons.map((button, index) => (
          <button key={index} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
