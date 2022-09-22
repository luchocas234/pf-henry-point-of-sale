import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavBar, Button, Time } from "../../theme/styled-componets";
import { Link } from "react-router-dom";
import "./navbar.css";
import { MainButton } from "../../theme/styled-componets.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBarApp() {
  const history = useHistory();
  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <NavBar>
      <Button onClick={() => history.push("/store")}>Ventas</Button>
      <Button onClick={() => history.push("/kitchen")}>Kitchen</Button>
      <Button onClick={() => history.push("/counter")}>Pedidos Ready</Button>
      <Button onClick={() => history.push("/adminProducts")}>Products</Button>
      <Button onClick={() => history.push("/historialPedidos")}>
        Historial
      </Button>
      <Button onClick={() => history.push("/cashFlow")}>Cash Flow</Button>
      <div className="user-menu">
        <Link to="/profile" className="profile">
          <img 
            id="avatar"
            style={{ width: "30px", height: "30px", marginBottom: "10px" }}
            src={user.avatar}
            alt=""
          />{" "}
          {user.name}
        </Link>

        <Link to="/" onClick={handleLogout} className="logout">
        <FontAwesomeIcon className="logout-icon"
                icon={faArrowRightFromBracket}
                style={{ width: 30, height: 30 }}
              />
          <div>Logout</div>
        </Link>
      </div>
      <Time>{time}</Time>
    </NavBar>
  );
}
