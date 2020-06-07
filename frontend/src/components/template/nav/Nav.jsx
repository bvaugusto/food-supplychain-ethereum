import "./Nav.css";
import React from "react";
import NavItem from "./NavItem";

export default props => {

  return (
    <aside className="menu-area">
      <main className="menu">
        <NavItem />
      </main>
    </aside>
  )
}