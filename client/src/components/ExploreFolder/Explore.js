import './StylePublicTrips.css'
import { useState } from 'react'
import PublicTripCard from './PublicTripCard'

const Explore = ({ publicTrips }) => {

  const renderPublicTrips = publicTrips.map(trip => {
    return (
      <PublicTripCard key={trip.id} trip={trip}/>
    )
  })

  console.log(renderPublicTrips)
  
  return (
    <div className='public-trips-page'>
      <h1>Explore Adventures</h1>
      {renderPublicTrips}
    
    </div>
  )
}

export default Explore