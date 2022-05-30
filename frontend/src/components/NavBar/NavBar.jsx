import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";


const Navbar = () => {

  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="navBar"  >
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>MULO</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/reviewer-page" style={{ textDecoration: "none", color: "white" }}>
            <b>Reviewer</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/artist-page" style={{ textDecoration: "none", color: "white" }}>
            <b>Artist</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>{`Logout\n ${user.username}`}</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
