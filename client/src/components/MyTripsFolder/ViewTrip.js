import '../MyActivities/StyleMyActivities.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MyActivityCard from '../MyActivities/MyActivityCard'
import ModalComponent from '../ModalComponent'

const ViewTrip = ({ setRefreshPage, refreshPage }) => {
    const [errors, setErrors] = useState([]);
    const [userTrip, setUserTrip] = useState('')
    const [openModal, setOpenModal] = useState(false)

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

        //map over and display if any activities
        const renderActivities = userTrip.activities?.map(act =>{
            return(
                //activity is nested again so to get to individual activity, need act.activity
                <MyActivityCard key={act.activity.id} activity={act.activity} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
            )
        })

        //map over and display images if any images exist
        const renderImages = userTrip.images_format?.map((img, index) => {
          console.log(index)
          
          return(
            <img className='trip-img-profile-page' src={img.url} alt='trip' key={img.id}/>
          )
        })
        // console.log(renderImages?.length)


    //delete a trip
    function handleDelete(){
      fetch(`/trips/${tripId}`, {
        method: 'DELETE',
      })
      .then(setRefreshPage(refreshPage => !refreshPage))
      .then(navigate('/myTrips'))
    }
      //open/close modal for delete trip
      const handleOpen = () => setOpenModal(true);
      const handleClose = () => setOpenModal(false);

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
                <p>Date - {userTrip.date}</p>
                <p>Trip ID: {userTrip.id}</p>
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
                          ''
              )}
            </div>
            <Link to={`/viewTripImages/${tripId}`}>
              <button className='view-all-photos-link'>+</button>
            </Link>

            <button className='add-trip-img-btn'>Add Photos</button>
            
        </div>
        <div className="activities-container">
                <h3>Activities</h3>
                {renderActivities}
                <Link to={`/addActivity/${userTrip.id}`}>
                  <button className='submit-btn add-activity'>Add an Activity</button>
                </Link>
              
            </div>

        <Link to={`/editTrip/${userTrip.id}`}>
             <button className='edit-trip-btn'>Edit Trip</button>
        </Link>

        <button className="delete-trip-btn" onClick={handleOpen}>Delete Trip</button>
        <ul>{formErrorMsg}</ul>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>
    </div>
  )
}

export default ViewTrip