import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({ user }) => {
  return (
    <div className='page-container'>
      <div className="profile">
        <h1>Welcome {user.name}!</h1>
        <img className='profile-img' src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000" alt="profile-pic" />
        <h2>Bio</h2>
        <p>{user.bio}</p>
        <p>{user.username}</p>
        <button className='btn edit-profile'>Edit Profile</button>
        <Link to="/myTrips">
          <button className='btn view-myTrips'>View My Trips</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Profile