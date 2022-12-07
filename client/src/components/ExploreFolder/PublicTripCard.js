import { useEffect, useState } from 'react'
import PlaceholderImage from '../../ImageFolder/placeholder-image2.png'

const PublicTripCard = ({ trip, user }) => {

    const[isLiked, setIsLiked]=useState(false)
    const[likeCounter, setLikeCounter] = useState(0)

    //if current user id already exists for this trip, setIsLiked to true so they cannot re-like a post
    useEffect(() => {
        const tripAlreadyLiked = trip.likes?.find(like => {
            if(like.user_id === user.id){
                return true
            } else return false
        })
        //set state if a trip has already been liked
        setIsLiked(tripAlreadyLiked)
        //set like count state to initial amount of likes - display below and handle w/ like button clicking
        setLikeCounter(trip.likes?.length)

    }, [user.id, trip])


    //handle user clicking like button
  const handleLikeBtn = () => {
    //if user hasn't liked trip, create new like for this trip from the logged in user
    if(!isLiked){
        setIsLiked(true)
        setLikeCounter(likeCounter + 1)
        fetch(`/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: user.id, trip_id: trip.id})
        })
    }
    //if user has liked trip, delete like from db using the id for the like
    if(isLiked){
        setLikeCounter(likeCounter - 1)
        fetch(`/likes/${isLiked.id}`, {
            method: 'DELETE',
          })
          .then(setIsLiked(false))

    }
    
  }
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
            <img className='public-trip-card-avatar' src={trip.user.avatar_format?.url ? trip.user.avatar_format.url : PlaceholderImage} alt="profile pic" />
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
                        <img className='trip-img-profile-page' src={PlaceholderImage} alt="trip photos"/>
                        <p>Add trip photos!</p>
                        </div>
              )}
        </div>
        <button className='like-btn' onClick={handleLikeBtn}>{isLiked ? <i className="fa-solid fa-heart"/> : <i className="fa-regular fa-heart" />}</button>
        <span>{likeCounter}</span>
    </div>
  )
}

export default PublicTripCard