import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useUserContext } from '../../context/UserContext'
import Logout from '../Logout/Logout'

const NavBar = () => {
  const {currentUser} = useUserContext(); 
  return (
    <nav className='NavBar'>
        <ul>
            <li><NavLink to ='/'>Home</NavLink></li>
            <li><NavLink to ='/signup'>Sign Up</NavLink></li>            
            {
              !currentUser.email? ( 
              <li><NavLink to ='/login'>Log In</NavLink></li>
            ) :( <>
              <li><NavLink to ='/dash'>Dashboard</NavLink></li> 
              <li><NavLink to='/events'>Events</NavLink></li>      
              <li><Logout/></li>
              </>
            )
            }
        </ul>     
    </nav>
  )
}

export default NavBar