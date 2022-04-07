import { ReactComponent as Profile } from "../icons/profile.svg";
import { ReactComponent as Chevron } from "../icons/chevron.svg";
import { ReactComponent as Arrow } from "../icons/arrow.svg";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Cog } from "../icons/cog.svg";
import { useAuth } from "../context/AuthContext";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
const Dropdownmenu = ({ closeMenu }) => {
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
      history.push("/signin");
    } catch {
      alert("Unable to log out");
    }
  };

  const drop = useRef();
  useClickOutside(drop, () => {
    closeMenu();
  });

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
            //props.goToMenu && setActiveMenu(props.goToMenu);
            closeMenu();
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </Link>
      );
    } else if (props.logout) {
      return (
        <a
          href="/#"
          className="menu-item"
          onClick={() => {
            //props.goToMenu && setActiveMenu(props.goToMenu);
            handleLogOut();
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    } else {
      return (
        <a
          href="/#"
          className="menu-item"
          onClick={(e) => {
            e.preventDefault();
            props.goToMenu && setActiveMenu(props.goToMenu);
          }}
        >
          <span className="icon-button-menu">{props.leftIcon}</span>
          <p>{props.children}</p>
          <span className="icon-right">{props.rightIcon}</span>
        </a>
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
            Settings
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
            Settings
          </Dropdownitem>
          <Dropdownitem leftIcon={<Cog></Cog>} linkTo="/settings">
            Settings
          </Dropdownitem>
          <Dropdownitem leftIcon={<Cog></Cog>} linkTo="/settings">
            Settings
          </Dropdownitem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdownmenu;
