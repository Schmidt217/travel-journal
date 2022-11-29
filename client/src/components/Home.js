import {useState} from 'react'
import TripForm from './TripForms/TripForm'


const Home = ({ user, setRefreshPage }) => {
  //this piece of state controls whether a POST or PATCH req. is sent. 

  return (
    <div className='pate-contianer'>
      <h1>Travel Journal</h1>
      <div className="trip-form-page">
        <h3>Add a new Trip!</h3>
        <TripForm userId={user.id} setRefreshPage={setRefreshPage}/>
      </div>
    </div>
  )
}

export default Home