import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { NavOpen, storeNav } from "../actions/actionCreator";
import "./sidebar.css";

const Nav = styled.div`
  background: #3fbbc0;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  transition: 500ms;
  z-index: 30;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  margin-right: 1rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #3fbbc0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 500ms;
  z-index: 40;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const { currentUser } = useAuth();

  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    dispatch(storeNav({ SidebarData }));
  }, []);

  const toggleOpen = (id) => {
    dispatch(NavOpen(id));
  };

  const data = useSelector((state) => state.navReducer);

  return (
    <>
      {currentUser && (
        <IconContext.Provider value={{ color: "#fff" }}>
          {!sidebar && (
            <Nav sidebar={sidebar}>
              <NavIcon to="#">
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
            </Nav>
          )}
          <SidebarNav sidebar={sidebar} className="sidebar-slider">
            <SidebarWrap>
              <h1
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.8em",
                  color: "#fff",
                  textAlign: "center",
                  backgroundImage:
                    "linear-gradient(80deg, rgb(63, 187, 192), rgb(114, 192, 175))",
                  padding: "1em",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Menu
              </h1>
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {data.map((item, index) => {
                return (
                  <SubMenu
                    item={item}
                    key={index}
                    toggleSidebar={showSidebar}
                    toggleOpen={toggleOpen}
                  />
                );
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      )}
    </>
  );
};

export default Sidebar;
