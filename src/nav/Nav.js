import NavItem, { Logo } from "./NavItem";
import { NavBtnLink } from "./NavbarElements";
import { NavBtn } from "./NavbarElements";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as Appointment } from "../images/appoinment.svg";
import { ReactComponent as Caret } from "../icons/caret.svg";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useState } from "react";

export default function Nav() {
  const { currentUser, userRole } = useAuth();
  const [path, setPath] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("/room")) {
      setPath(true);
    }
  }, [window.location.pathname]);

  return (
    !path && (
      <>
        <nav className="navbar">
          <Logo></Logo>

          {!currentUser && (
            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
              <NavBtnLink to="/signup">Sign Up</NavBtnLink>
            </NavBtn>
          )}

          {currentUser && (
            <ul className="navbar-nav">
              {userRole === "user" && (
                <span className="find-doctor-btn">
                  <Link to="/find-doctor"></Link>
                </span>
              )}

              <NavItem
                icon={<Appointment />}
                name="Appointment Schedule"
                prop="book"
              ></NavItem>

              <NavItem icon={<Caret></Caret>} name="Settings"></NavItem>
            </ul>
          )}
        </nav>
        <Sidebar></Sidebar>
      </>
    )
  );
}
