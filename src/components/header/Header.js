import {useState} from 'react'
import "./header.css"
import Navbar from './Navbar'
import Drawer from './Drawer';
const Header = () => {
    const [isopen,setisopen] = useState(false);
    const toggleDrawer = () =>{
        setisopen(!isopen)
    }
  return (
    <>
    <Drawer isopen={isopen} toggleDrawer={toggleDrawer}/>
    <Navbar toggleDrawer={toggleDrawer}/>
    </>
  )
}

export default Header