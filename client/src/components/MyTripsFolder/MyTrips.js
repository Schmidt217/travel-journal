import './StyleMyTrips.css'
import { Link } from 'react-router-dom'
import MyTripsCard from './MyTripsCard'

const MyTrips = ({ user }) => {

  const renderTrips = user.trips.map(trip => {
    return(
      <MyTripsCard key={trip.id} userTrip={trip}/>
    )
  })

  return (
    <div className='page-container'>
      <div className="display-my-trips-cards">
        <h1>{user.name}'s Trips</h1>
        <Link to='/'>
          <span className='add-new-trip-link'>Add New Trip</span>
        </Link>
        <div className="myTrips-page">
          {renderTrips}
        </div>
      </div>
    </div>
  )
}

export default MyTrips