import React, { useState} from "react";
import Dropdownmenu from "./Dropdownmenu";
import { NavLink } from "./NavbarElements";


export default function NavItem(props) {
  const [open, setOpen] = useState(false);

  

  if (props.prop) {
    return (
      <li className="nav-item">
        <a href="/schedule" className="icon-button" data-tooltip={props.name}>
          {props.icon}
        </a>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <span
        className="icon-button"
        data-tooltip={props.name}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {props.icon}
      </span>

      {open && <Dropdownmenu open={open} setOpen={setOpen}></Dropdownmenu>}
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
