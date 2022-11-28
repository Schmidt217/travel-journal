import '../MyActivities/StyleMyActivities.css'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MyActivityCard from '../MyActivities/MyActivityCard'

const ViewTrip = () => {
    const [errors, setErrors] = useState([]);
    const [userTrip, setUserTrip] = useState('')

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
        }, [tripId])

        //map over and display if any activities
        const renderActivities = userTrip.activities?.map(act =>{
                return(
                    
                    //activity is nested again so to get to individual activity, need act.activity
                    <MyActivityCard key={act.activity.id} activity={act.activity}/>
                )
        })
        

        //display Errors if any
        const formErrorMsg = errors.map((err) => (
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

            <div className="single-trip-images">Images Container
            </div>
        </div>
        <div className="activities-container">
                <h3>Activities</h3>
                {renderActivities}
                <Link to={`/addActivity/${userTrip.id}`}>
                  <button className='submit-btn add-activity'>Add an Activity</button>
                </Link>
              
            </div>

        <Link to={`/editTrip/${userTrip.id}`}>
             <button className='edit-trip'>Edit Trip</button>
        </Link>     
        <button className="delete-trip">Delete Trip</button>
        <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default ViewTrip