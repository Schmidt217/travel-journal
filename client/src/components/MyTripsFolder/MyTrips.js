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
      <div className="myTrips-page">
        <h1>{user.name}'s Trips</h1>
        {renderTrips}
      </div>
    </div>
  )
}

export default MyTrips