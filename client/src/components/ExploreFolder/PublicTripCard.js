import React from 'react'
import PlaceholderImage from '../../ImageFolder/placeholder-image2.png'

const PublicTripCard = ({ trip }) => {

   //if images exist in a user's trip, find the first one to display on trip card
  const renderImages = trip.images_format?.map((img, index) => {
    return(
        <img className='public-trip-card-img' src={img.url} alt='trip' key={img.id}/>
      )
  })

  return (
    <div className='public-trip-card'>
        <div className="public-trip-card-info">
            <h3>{trip.location}</h3>
            <img className='public-trip-card-avatar' src={trip.user.avatar_format?.url} alt="profile pic" />
            <p>Created by {trip.user.username}</p>
        </div>
        <div className="public-trip-card-image-container">
        {renderImages && renderImages.length > 0 ? 
                        ( <div>
                              {renderImages[0]}
                              {renderImages[1]}
                              {renderImages[2]}
                          </div> 

                 ) : (
                        <div>
                        <img className='trip-img-profile-page' src={PlaceholderImage} alt="trip"/>
                        <p>Add trip photos!</p>
                        </div>
              )}
        </div>
        <button className='like-btn'>♡</button>
    </div>
  )
}

export default PublicTripCard