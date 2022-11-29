import React from 'react'
import { Link } from 'react-router-dom'


const MyTripsCard = ({ userTrip }) => {

  return (
    <div className='myTrip-card'>
        <h2>{userTrip.name}</h2>
        <h3>{userTrip.location}</h3>
        <p>Date - {userTrip.date}</p>
        {/* <p>Trip ID: {userTrip.id}</p> */}

        <Link to={`/viewTrip/${userTrip.id}`}>
             <button className='edit-trip'>View Trip</button>
        </Link>

    </div>
  )
}

export default MyTripsCard