import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

const Logout = () => {
    const {currentUser, handleUpdateUser} = useUserContext();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        handleUpdateUser({});
        window.location.reload();
        navigate('/login');
    };
    if(!currentUser.email){
        return null;
    }

  return (
    <NavLink to='/logout' onClick={handleLogout}>
      Log Out
    </NavLink>
  )
}

export default Logout