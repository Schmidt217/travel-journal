import React from 'react'
import { Link } from 'react-router-dom'

const MyActivityCard = ({activity}) => {
  console.log(activity)
  
  return (
    <div className='myActivity-card'>
        <h4>{activity.title}</h4>
        <p>Category: {activity.activity_type}</p>
        <p>{activity.description}</p>
        <p>ID: {activity.id}</p>

        <Link to={`/editActivity/${activity.id}`}>
                <button className='submit-btn edit-activity'>✎</button>
        </Link>

        <button className='submit-btn delete-activity'>Ｘ</button>

    </div>
  )
}

export default MyActivityCard