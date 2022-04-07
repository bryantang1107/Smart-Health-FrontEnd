import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;
  letter-spacing: 0.1em;
  &:hover {
    background: #dcdcdc;

    border-left: 4px solid;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: transparent;
  height: 60px;
  padding-left: 3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  letter-spacing: 0.1em;
  font-size: 18px;
  &:hover {
    background: #dcdcdc;

    cursor: pointer;
  }
`;

const SubMenu = ({ item, toggleSidebar, toggleOpen }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => {
    toggleOpen(item.id);
  };

  const toggle = () => {
    toggleSidebar();
  };

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav ? showSubnav : toggle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && item.open === true
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>

      {item.open &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index} onClick={toggle}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
