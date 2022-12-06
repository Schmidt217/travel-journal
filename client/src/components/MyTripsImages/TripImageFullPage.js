import './StyleTripsImages.css'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TripContext } from '../../Context/state'
import ImageCard from './ImageCard';
import AddTripImgModal from '../FormModals/AddTripImgModal'

const TripImageFullPage = () => {
     const [errors, setErrors] = useState([]);
    const [userTrip, setUserTrip] = useState('')
    const [openEditImageModal, setOpenEditImageModal] = useState(false)
  
    let params = useParams()
    const tripId = parseInt(params.id)

    const tripCtx = useContext(TripContext)

    //get all Trip Details including the associated images
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
    }, [tripId, tripCtx.refreshPage])

      //map over and display images if any images exist
      const renderImages = userTrip.images_format?.map((img, index) => {
        return(
          <ImageCard tripId={tripId} imageInfo={img} key={img.id}/>
        )
      })

      //open/close modal for add/edit single profile image
      const handleOpenImgEditModal = () => setOpenEditImageModal(true);
      const handleCloseEditImgModal = () => setOpenEditImageModal(false);

        //display message if any errors
        const formErrorMsg = errors?.map((err) => (
        <li key={err}>{err}</li>
      ))

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
        {/* <Link to={`/trips/${tripId}/addImages`}> */}
          <button title="Add images" className='add-trip-img-btn' onClick={handleOpenImgEditModal}>+</button>
        {/* </Link> */}
      </div>
      
      <ul>{formErrorMsg}</ul>

      <AddTripImgModal userTrip={userTrip} openEditImageModal={openEditImageModal} handleCloseEditImgModal={handleCloseEditImgModal}/>

    </div>
  )
}

export default TripImageFullPage