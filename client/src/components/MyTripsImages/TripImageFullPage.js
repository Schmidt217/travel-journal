import './StyleTripsImages.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ImageCard from './ImageCard';

const TripImageFullPage = ( setRefreshPage, refreshPage ) => {
     const [errors, setErrors] = useState([]);
    const [userTrip, setUserTrip] = useState('')
    // const [openModal, setOpenModal] = useState(false)

    let navigate = useNavigate()
    let params = useParams()
    const tripId = parseInt(params.id)

    //get all Trip Details
    useEffect(() => {
        fetch(`/trips/${tripId}`)
        .then((res) => {
            if (res.ok) {
              res.json().then((tripData) => {
                setUserTrip(tripData)
                console.log(tripData)
                
              });
            } else {
              res.json().then((err) => setErrors(err.errors))
            }
          })
    }, [tripId, refreshPage])

      //map over and display images if any images exist
      const renderImages = userTrip.images_format?.map((img, index) => {
        return(
          <ImageCard imageInfo={img} key={img.id}/>
        )
      })

  return (
    <div className='page-container'>
      <div className="trip-images-page">
      {renderImages && renderImages.length > 0 ? 
                        ( <>
                             {renderImages}
                          </>
                 ) : (
                          <h2>Add trip photos!</h2>
              )}

        <button className='add-trip-img-btn'>Add Photos</button>
      </div>
    </div>
  )
}

export default TripImageFullPage