import '../MyActivities/StyleMyActivities.css'
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MyActivityCard from '../MyActivities/MyActivityCard'
import ModalComponent from '../ModalComponent'
import AddTripImgModal from '../FormModals/AddTripImgModal'
import PlaceholderImage from '../../ImageFolder/placeholder-image2.png'
import { TripContext } from '../../Context/state'

const ViewTrip = () => {
    const [errors, setErrors] = useState([]);
    const [userTrip, setUserTrip] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [openEditImageModal, setOpenEditImageModal] = useState(false)

    const tripCtx = useContext(TripContext)

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
                  });
                } else {
                  res.json().then((err) => setErrors(err.errors))
                }
              })
        }, [tripId, tripCtx.refreshPage])

        //map over and display any activities 
        const renderActivities = userTrip.activities?.map(act =>{
            return(
                //activity is nested again so to get to individual activity, need act.activity
                <MyActivityCard key={act.activity.id} activity={act.activity} />
            )
        })

        //map over and display any images
        const renderImages = userTrip.images_format?.map((img, index) => {
          
          return(
            <img className='trip-img-profile-page' src={img.url} alt='trip' key={img.id}/>
          )
        })

        //hidden class for if images exist yet
        const hiddenClassName = userTrip.images_format ? "view-images" : "view-images hidden"

    //delete a trip
    function handleDelete(){
      fetch(`/trips/${tripId}`, {
        method: 'DELETE',
      })
      .then(tripCtx.refreshFunction())
      .then(navigate('/user/trips'))
    }
      //open/close modal for delete trip
      const handleOpen = () => setOpenModal(true);
      const handleClose = () => setOpenModal(false);

       //open/close modal for add/edit trip images image
      const handleOpenImgEditModal = () => setOpenEditImageModal(true);
      const handleCloseEditImgModal = () => setOpenEditImageModal(false);

      //display message if any errors
      const formErrorMsg = errors?.map((err) => (
          <li key={err}>{err}</li>
        ))


    
  return (
    <div className='single-trip-page'>
        <div className="single-trip-container">
            <div className="single-trip-details">
                <h2>{userTrip.name}</h2>
                <h3>{userTrip.location}</h3>
                <p>{userTrip.date}</p>
                <p>{userTrip.details}</p>
            </div>

            <div className="single-trip-images">
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
           
              <button title="Add images" className='add-images-btn' onClick={handleOpenImgEditModal}>+</button>
            
            </div>

            <Link to={`/trips/${tripId}/images`}>
              <button className={hiddenClassName}>View Photos</button>
            </Link>
        </div>

        <div className="activities-container">
                <h3>Activities</h3>
                {renderActivities}
                <Link to={`/trip/${userTrip.id}/add-activity`}>
                  <button className='add-activity'>Add Activity</button>
                </Link>
              
        </div>

        <Link to={`/trips/${userTrip.id}/edit`}>
             <button className='edit-trip-btn'>Edit Trip</button>
        </Link>

        <button className="delete-trip-btn" onClick={handleOpen}>Delete Trip</button>
        <ul>{formErrorMsg}</ul>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>

        <AddTripImgModal userTrip={userTrip} openEditImageModal={openEditImageModal} handleCloseEditImgModal={handleCloseEditImgModal}/>
    </div>
  )
}

export default ViewTrip