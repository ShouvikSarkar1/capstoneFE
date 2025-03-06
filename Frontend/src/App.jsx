import { useState } from 'react'
import './App.css'
import { UserProvider } from './context/UserContext'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <UserProvider>
        <Header />  
        <NavBar /> 
        <div className='app-container'>   
          <AppRoutes />
        </div>
        <div className='footer-container'>
      <Footer/>
      </div>  
    </UserProvider>
  )
}

export default App

