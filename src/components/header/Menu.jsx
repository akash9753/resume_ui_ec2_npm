import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
const Menu = ({ route }) => {
  return (
    <SMenu>
      <MenuButton>{route.name}</MenuButton>
      <SubRoutesContainer>
        {route.subRoutes.map((subRoute) => {
          return (
            <SubRoute to={subRoute.link} key={subRoute.name}>
              {subRoute.name}
            </SubRoute>
          );
        })}
      </SubRoutesContainer>
    </SMenu>
  );
};

export default Menu;

const MenuButton = styled.div`
  text-decoration: none;
  color: white;
  padding: 0.4rem 2rem;
  transition: 0.5s ease;

  &:hover {
    transition: 0.5s ease;
    color: black;
    background-color: white;
    cursor: pointer;
    padding: 0.4rem 2rem;
    border-radius: 2rem;
    /* box-shadow: 0px 0px 10px white; */
  }
`;
const SubRoutesContainer = styled.div`
/* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  position: absolute;
  top:5rem;
  /* background: red; */
  min-width: 28rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  left: -1rem;
  visibility: hidden;
  opacity: 0;
  border-radius: 1rem;
  transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background:#D1C4E9;
  z-index:1000;
`;
const SMenu = styled.div`
  /* border: 1px solid green; */
  position: relative;
  /* display: inline-block; */
  &:hover ${SubRoutesContainer} {
    visibility: visible;
    opacity: 1;
    cursor: pointer;
  }
`;
const SubRoute = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: 0.3s ease-in;
  &:hover {
    transition: 0.3s ease-in;
    color: #6f07f6;
    background-color: #d0a7fc;
  }
`;
