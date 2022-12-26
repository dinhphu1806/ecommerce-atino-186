// phần này làm sau khi finish useAuth 
import React from 'react';
import useAuth from '../custom-hooks/useAuth'; // import useAuth 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  
    const { currentUser } = useAuth()

    return currentUser ? children : <Navigate to='/login'/>
   // sang router.js import  Protec
}

export default ProtectedRoute;


// xong sang router import protect
// bọc thằng checkout bằng protec