import React,{useState} from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

const ExpandMenu = ({ route }) => {

  const [ismenuopen, setismenuopen] = useState(true);
  const toggleMenu = () =>{
    setismenuopen(!ismenuopen)
  }

  console.log(route);
  return (
    <SMenu>
      <MenuButton onClick={toggleMenu}>{route.name} {ismenuopen === true ? <CaretDownOutlined /> : <CaretRightOutlined />}</MenuButton>
      <SubRoutesContainer ismenuopen={ismenuopen}>
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

export default ExpandMenu;

const MenuButton = styled.div`
   /* border: 1px solid red; */
   cursor:pointer;
   display: flex;
   align-items:center;
   justify-content:space-between;
`;
const SubRoutesContainer = styled.div`
      /* background:red; */
      
      display:${(props) => (props.ismenuopen ? "flex" : "none")};
      flex-direction: column;
      padding: 0.5rem;
`;
const SMenu = styled.div`
    font-size:2.5rem;
    padding:0.5rem;
    color:black;
`;
const SubRoute = styled(Link)`
  text-decoration:none;
  color:black;
  padding:0.5rem;
  font-size:2rem;
  font-weight:600;
`;
