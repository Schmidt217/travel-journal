import React from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImg from '../../ImageFolder/TripCardPlaceholder.jpeg'


const MyTripsCard = ({ userTrip }) => {
  console.log(userTrip.images_format)

  const renderCardImg = userTrip.images_format?.find((img, index) => {
    if (index === 0){
      return img
    } 
    return false
  })
  
  return (
    <div className='myTrip-card'>
        <h2>{userTrip.name}</h2>
        <img className="myTrip-card-img" src={renderCardImg ? renderCardImg.url : PlaceholderImg} alt="" />
        <h3>{userTrip.location}</h3>
        <p>Date - {userTrip.date}</p>
        {/* <p>Trip ID: {userTrip.id}</p> */}

        <Link to={`/viewTrip/${userTrip.id}`}>
             <button className='view-single-trip'>View Trip</button>
        </Link>

    </div>
  )
}

export default MyTripsCard