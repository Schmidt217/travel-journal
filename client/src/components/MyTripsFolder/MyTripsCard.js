import React from 'react'
import { Link } from 'react-router-dom'
import MyActivityCard from './MyActivityCard'

const MyTripsCard = ({ userTrip }) => {

    const renderActivities = userTrip.activities.map(act =>{
        return(
            //activity is nested again so to get to individual activity, need act.activity
            <MyActivityCard key={act.activity.id} activity={act.activity}/>
        )

    })
  return (
    <div className='myTrip-card'>
        <h2>{userTrip.name}</h2>
        <h3>{userTrip.location}</h3>
        <p>{userTrip.date}</p>
        <p>{userTrip.details}</p>

        <div className="activities-container">
            <h3>Activities</h3>
            {renderActivities}
        </div>
        <Link to={`/editTrip/${userTrip.id}`}>
             <button className='edit-trip'>Edit Trip</button>
        </Link>

    </div>
  )
}

export default MyTripsCard