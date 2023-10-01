import React from "react";
import { routes } from "../../constants/NavbarStaticData";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import Menu from "./Menu";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/authSlice";
export const PURGE_STATE = "PURGE_STATE";
export const logOut = () => {
  return {
    type: PURGE_STATE,
  };
};
const Navbar = ({ toggleDrawer }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(logOut());
    navigate("/signin");
    toast.success("Loggout Successfully");
  };

  return (
    <SNavbar>
      <NavContainer>
        {token ? (
          <DrawerButton onClick={toggleDrawer}>
            <MenuOutlined />
          </DrawerButton>
        ) : null}

        <SNavbarBrand>
          <Link to="/home">▶️</Link>
        </SNavbarBrand>

        {token ? (
          <RightNav>
            <NavRoutes>
              {routes.map((r, i) => {
                if (r.subRoutes) {
                  return <Menu route={r} key={r.name} />;
                }
                return (
                  <NavRoute to={r.link} key={r.name}>
                    {r.name}
                  </NavRoute>
                );
              })}
            </NavRoutes>
            <AuthRoutes>
              <AuthRoute>
                Logged in as{" "}
                {` ${user?.result?.firstName} ${user?.result?.lastName}`}
              </AuthRoute>
            </AuthRoutes>

            <LoginButton onClick={handleLogout}>Logout</LoginButton>
          </RightNav>
        ) : (
          <AuthRoutes>
            <AuthRoute to="/signin">Signin</AuthRoute>
            <AuthRoute to="/signup">Signup</AuthRoute>
          </AuthRoutes>
        )}
      </NavContainer>
    </SNavbar>
  );
};

export default Navbar;

const SNavbar = styled.nav`
  background-color: #6f07f6;
`;
const NavContainer = styled.div`
  height: 6rem;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem;
`;
const SNavbarBrand = styled.h2`
  font-size: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const AuthRoutes = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
`;
const AuthRoute = styled(Link)`
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

const NavRoutes = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  @media (max-width: 816px) {
    display: none;
  }
`;
const NavRoute = styled(Link)`
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
const RightNav = styled.div`
  display: flex;
  gap: 2rem;
`;

const LoginButton = styled.button`
  padding: 0.4rem 2rem;
  background-color: #fff;
  border: none;
  color: black;
  border-radius: 2rem;
  &:hover {
    transition: 0.3s ease;
    /* border: 1px solid transparent; */
    background-color: yellow;
    cursor: pointer;
    color: black;
  }
`;
const DrawerButton = styled.button`
  all: unset;
  font-size: 3rem;
  display: grid;
  @media (min-width: 816px) {
    display: none;
  }
`;
