import { ReactComponent as Profile } from "../icons/profile.svg";
import { ReactComponent as Chevron } from "../icons/chevron.svg";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Cog } from "../icons/cog.svg";
import { useAuth } from "../context/AuthContext";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
const Dropdownmenu = ({ setOpen, dropRef }) => {
  const drop = useRef();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const { logout } = useAuth();
  useClickOutside(drop, () => {
    setOpen(false);
  });

  const handleLogOut = async () => {
    try {
      await logout();
      history.push("/signin");
    } catch {
      alert("Unable to log out");
    }
  };

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height * 1.2);
  };
  const Dropdownitem = (props) => {
    if (props.linkTo) {
      return (
        <Link
          to={props.linkTo}
          className="menu-item"
          onClick={() => {
            setOpen(false);
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p style={{ color: "#f6f6f6" }}>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </Link>
      );
    } else if (props.logout) {
      return (
        <span
          className="menu-item"
          onClick={() => {
            handleLogOut();
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p style={{ color: "#f6f6f6" }}>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </span>
      );
    } else {
      return (
        <span
          className="menu-item"
          onClick={(e) => {
            e.preventDefault();
            props.goToMenu && setActiveMenu(props.goToMenu);
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p style={{ color: "#f6f6f6" }}>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </span>
      );
    }
  };
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={drop}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <Dropdownitem leftIcon={<Profile></Profile>} linkTo="/profile">
            My Profile
          </Dropdownitem>
          <Dropdownitem
            leftIcon={<Cog></Cog>}
            rightIcon={<Chevron style={{ height: "30px" }}></Chevron>}
            goToMenu="settings"
          >
            Site Settings
          </Dropdownitem>
          <Dropdownitem
            leftIcon={<RiLogoutBoxLine></RiLogoutBoxLine>}
            logout="logout"
          >
            Log Out
          </Dropdownitem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <Dropdownitem
            leftIcon={<Arrow></Arrow>}
            goToMenu="main"
          ></Dropdownitem>
          <Dropdownitem leftIcon={<Cog></Cog>} linkTo="/settings">
            Feature coming soon !
          </Dropdownitem>
          <Dropdownitem leftIcon={<Cog></Cog>} linkTo="/settings">
            Feature coming soon !
          </Dropdownitem>
          <Dropdownitem leftIcon={<Cog></Cog>} linkTo="/settings">
            Feature coming soon !
          </Dropdownitem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdownmenu;
