import React from 'react'
import GigForm from '../components/GigForm/GigForm'
import GigList from '../components/GigList/GigList'
import '../styles/EventStyles.css'


const Events = () => {
  return (
    <>
    <div className='event-container'>
    <div className='gig-list'>
      <GigList/>
    </div>
    </div>
    </>
  )
}

export default Events
