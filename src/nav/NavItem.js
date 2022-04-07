import React, { useState } from "react";
import Dropdownmenu from "./Dropdownmenu";
import { NavLink } from "./NavbarElements";

export default function NavItem(props) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };
  if (props.prop) {
    return (
      <li className="nav-item">
        <a
          href="/medical-services"
          className="icon-button"
          data-tooltip={props.name}
        >
          {props.icon}
        </a>

        {open && <Dropdownmenu closeMenu={closeMenu}></Dropdownmenu>}
      </li>
    );
  }

  return (
    <li className="nav-item">
      <a
        href="/#"
        className="icon-button"
        data-tooltip={props.name}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {props.icon}
      </a>

      {open && <Dropdownmenu closeMenu={closeMenu}></Dropdownmenu>}
    </li>
  );
}

export const Logo = () => {
  return (
    <div className="logo">
      <NavLink to="/">
        <h1 style={{ color: "#3fbbc0" }}>Smart Health</h1>
      </NavLink>
    </div>
  );
};
