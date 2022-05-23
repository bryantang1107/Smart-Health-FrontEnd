import React, { useState } from "react";
import Dropdownmenu from "./Dropdownmenu";
import { NavLink } from "./NavbarElements";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function NavItem(props) {
  const [open, setOpen] = useState(false);
  const { userRole } = useAuth();
  if (props.prop) {
    return (
      <li className="nav-item">
        <Link
          to={userRole === "doctor" ? "/schedule" : "/schedule-user"}
          className="icon-button"
          data-tooltip={props.name}
        >
          {props.icon}
        </Link>
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
