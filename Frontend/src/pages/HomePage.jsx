import React from 'react'
import '../styles/HomePageStyles.css'
import HomePageFeatures from '../components/HomePage/HomePageFeatures'
import HomePagePhoto from '../components/HomePage/HomePagePhoto'
import Testimonies from '../components/HomePage/Testimonies'


const HomePage = () => {
  return (
    <div className='HomePage'>
      <div className='homepage-content'>
        <div className='homepage-photo'>
          <HomePagePhoto/>
        </div>
        <HomePageFeatures/>
      </div>
      <div className='testimonial componentBox'>
        <Testimonies/>
      </div>
    </div>
  )
}

export default HomePage
