import React from 'react'
import Logo from '../Logo/Logo'
import HeaderLogin from '../HeaderLogin/HeaderLogin'
import '../../App.css'

const Header = () => {
    return (  
      <header className='header'>
          <div className='logo-container'>
              <Logo />
          </div>
          <h2 className='header-title'>Find Your Stage Anywhere</h2>
          <div className='header-login'>
              <HeaderLogin />
          </div>
      </header>
    )
}

export default Header
