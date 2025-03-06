import React from 'react'
import homepagephoto from '../../assets/homepagephoto.png'
import '../../styles/HomePageStyles.css'
import { NavLink } from 'react-router-dom'

const HomePageFeatures = () => {
  return (
    <div className='HomePageFeatures componentBox'>
      <div class="card">
                <div class="card-body">
                    <h3 class="card-title">GigFinder Features:</h3>
                    <div class="card-content">
                    <p>Starting out as a DIY artist can be challenging, especially when you're unsure where to find:</p>
                        <ul>
                            <li>Local and touring venues to perform at.</li>
                            <li>Opportunities to collaborate with other artists.</li>
                            <li>Promoters seeking artists for their events.</li>
                        </ul>
                    <p>
                        GigFinder is a platform designed for artists, venues, promoters, and music industry professionals 
                        to connect, schedule, <br/>and book shows—without the need for record labels or touring agents.
                    </p>
                        <p><strong>Sign up now and take control of your music career!</strong></p>
                    </div>
                        <div class="card-image">
                            <img src={homepagephoto} alt="Event Planning"/>
                        </div>
                    </div>

                    <a href="#" class="button"><NavLink to='/signup'>Sign Up Now!</NavLink></a>
                </div>
            </div>
  )
}

export default HomePageFeatures
