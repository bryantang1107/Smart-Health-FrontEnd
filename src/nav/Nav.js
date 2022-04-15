import NavItem, { Logo } from "./NavItem";

import { NavBtnLink } from "./NavbarElements";
import { NavBtn } from "./NavbarElements";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as Appointment } from "../images/appoinment.svg";
import { ReactComponent as Caret } from "../icons/caret.svg";
import Sidebar from "../sidebar/Sidebar";

export default function Nav() {
  const { currentUser } = useAuth();

  return (
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
            <span className="find-doctor-btn">
              <a href="/find-doctor">.</a>
            </span>
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
  );
}
