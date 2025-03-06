import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='PageNotFound componentBox'>
        <h1>404: Page Not Found</h1>
        <p>What were you looking for? Maybe try going back? <Link to='/'>Home</Link> will help you find it</p>
        <button onClick={()=> navigate(-1)}>Go Back</button>
        <a href="/">Go Back Home</a>
    </div>
  )
}

export default PageNotFound