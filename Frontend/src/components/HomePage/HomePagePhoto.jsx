import React from 'react'
import homepagephoto from '../../assets/homepage2.jpg'

const HomePagePhoto = () => {
  return (
    <div className='HomePageGif componentBox'>
      <img src={homepagephoto} alt="homepagephoto" style={{ width: "1000px", height: "640px" }} />
    </div>
  )
}

export default HomePagePhoto
