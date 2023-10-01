import React from "react";
import { styled } from "styled-components";
import { routes } from "../../constants/NavbarStaticData";
import { Link } from "react-router-dom";
import ExpandMenu from './ExpandMenu';

const Drawer = ({ isopen, toggleDrawer }) => {
  return (
    <>
      {isopen && <Backdrop onClick={toggleDrawer} />}
      <SDrawer isopen={isopen}>
      
        <RightNav>
        <SNavbarBrand>Dnaoo Admin</SNavbarBrand>
          <NavRoutes>
            {routes.map((r, i) => {
                if(r.subRoutes){
                  return <ExpandMenu route={r} key={r.name}/>
                }
                return (
                  <NavRoute onClick={toggleDrawer} to={r.link} key={r.name}>
                    {r.name}
                  </NavRoute>
                );
              })}
          </NavRoutes>
        </RightNav>
      </SDrawer>
    </>
  );
};

export default Drawer;

const SNavbarBrand = styled.div`
  font-size: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 600;
  color: #6200EE;
`;

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.3s ease;
`;
const SDrawer = styled.div`
  z-index: 1050;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 60%;
  background-color: white;
  transition: all 0.3s ease-in-out;
  transform: translateX(${(props) => (props.isopen ? "0" : "-100%")});
`;

const RightNav = styled.div`
  display: flex;
  flex-direction:column;
  gap:2rem;
  padding:1rem;
`;

const NavRoutes = styled.div``;
const NavRoute = styled(Link)`
      display:flex;
      text-decoration:none;
      color:black;
      font-size:2.5rem;
      padding:0.5rem
`;


