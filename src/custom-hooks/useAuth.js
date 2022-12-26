// import React from 'react';
// phần này sau khi finish sign up login xong
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';  // change user avatar
import { auth } from '../firebase.config';

const useAuth = () => {

    const [ currentUser, setCurrentUser ] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user)
            } else{
                setCurrentUser(null)
            }
            
        })
    })

  return currentUser
}

export default useAuth