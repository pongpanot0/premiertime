import React from 'react'
import { useAuth } from './auth'
import { Navigate, useLocation } from 'react-router-dom'
export const RequireAuth = ({children}) => {
    const location = useLocation()
    const auth = useAuth()
    const items = localStorage.getItem("logged_in_status");
  
    if(items === null){
        return <Navigate to='/' state={{path:location.pathname}} />
    }
/*   if(items !== null){
        return <Navigate to='/report' state={{path:location.pathname}} />
    }  */
  return (
    children
  )
}
