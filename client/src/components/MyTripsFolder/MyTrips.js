import './StyleMyTrips.css'
import React from 'react'
import MyTripsCard from './MyTripsCard'

const MyTrips = ({ user }) => {

  const renderTrips = user.trips.map(trip => {
    // console.log(trip)
    
    return(
      <MyTripsCard key={trip.id} userTrip={trip}/>
    )
  })
  return (
    <div className='page-container'>
       <h1>{user.name}'s Trips</h1>
      <div className="myTrips-page">
        {renderTrips}
      </div>
    </div>
  )
}

export default MyTrips