import React from 'react'
import MyActivityCard from './MyActivityCard'

const MyTripsCard = ({ userTrip }) => {

    const renderActivities = userTrip.activities.map(act =>{
        return(
            //activity is nested again so to get to individual activity, need act.activity
            <MyActivityCard key={act.id} activity={act.activity}/>
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

    </div>
  )
}

export default MyTripsCard