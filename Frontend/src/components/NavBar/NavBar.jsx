import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import Logout from '../Logout/Logout';

const NavBar = () => {
  const { currentUser } = useUserContext(); 
  
  return (
    <nav className='NavBar'>
      <ul>
      {!currentUser.email && <li><NavLink to='/'>Home</NavLink></li>}

        {!currentUser.email && <li><NavLink to='/signup'>Sign Up</NavLink></li>} {/* Hide Sign Up when logged in */}

        {!currentUser.email ? ( 
          <li><NavLink to='/login'>Log In</NavLink></li>
        ) : (
          <>
            <li><NavLink to='/dash'>Dashboard</NavLink></li> 
            <li><NavLink to='/events'>Events</NavLink></li>      
            <li><Logout/></li>
          </>
        )}
      </ul>     
    </nav>
  );
}

export default NavBar;