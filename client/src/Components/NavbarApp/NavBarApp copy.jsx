import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavBar, Button, Time } from "../../theme/styled-componets";

export default function NavBarApp() {
  const history = useHistory();
  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <NavBar>
      <Button onClick={() => history.push("/store")}>Store</Button>
      <Button onClick={() => history.push("/kitchen")}>Kitchen</Button>
      <Button onClick={() => history.push("/counter")}>Ready orders</Button>
      <Button onClick={() => history.push("/adminProducts")}>Products</Button>
      <Button onClick={() => history.push("/historialPedidos")}>
        Orders history
      </Button>
      {/* <Button onClick={() => history.push("/cashFlow")}>Cash Flow</Button> */}
      <Time>{time}</Time>
    </NavBar>
  );
}
