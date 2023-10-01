import React from 'react'
import { useSelector } from 'react-redux'
import Signin from './../pages/signin/Signin';


const PrivateRoute = ({children}) => {
  const {user} = useSelector((state) => ({...state.auth}))
  return user ? children : <Signin/>
}

export default PrivateRoute;