import React from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImg from '../../ImageFolder/TripCardPlaceholder.jpeg'


const MyTripsCard = ({ userTrip }) => {

  //if images exist in a user's trip, find the first one to display on trip card
  const renderCardImg = userTrip.images_format?.find((img, index) => {
    if (index === 0){
      return img
    } 
    return false
  })
  
  return (
    <div className='myTrip-card'>
        <h2>{userTrip.name}</h2>
        <img className="myTrip-card-img" src={renderCardImg ? renderCardImg.url : PlaceholderImg} alt="trip" />
        <h3>{userTrip.location}</h3>
        <p>{userTrip.date}</p>

        <Link to={`/viewTrip/${userTrip.id}`}>
             <button className='view-single-trip'>View Trip</button>
        </Link>

    </div>
  )
}

export default MyTripsCard