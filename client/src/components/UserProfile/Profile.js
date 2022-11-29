import './StyleProfile.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComponent from '../ModalComponent'

const Profile = ({ user, setUser }) => {
  const [openModal, setOpenModal] = useState(false)

  let navigate = useNavigate()

  //delete a user
  function handleDelete(){
    fetch(`/users/${user.id}`, {
      method: 'DELETE',
    })
    .then(setUser(null)).then(navigate('/'))
  }
    //open/close modal for delete trip
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

  return (
    <div className='page-container'>
      <div className="profile">
        <h1>Welcome {user.name}!</h1>
        <img className='profile-img' src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=2000" alt="profile-pic" />
        <h2>Bio</h2>
        <p>{user.bio}</p>
        <p>{user.username}</p>
        
        <Link to="/myTrips">
          <button className='view-myTrips-btn'>View My Trips</button>
        </Link>

        <div className="btn-container">
          <Link to={`/editProfile/${user.id}`}>
          <button className='edit-profile-btn'>Edit Profile</button>
          </Link>
          <button className='delete-profile-btn' onClick={handleOpen}>Delete Profile</button>
        </div>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>
        
        
      </div>
    </div>
  )
}

export default Profile