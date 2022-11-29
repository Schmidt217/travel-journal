import './StyleProfile.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComponent from '../ModalComponent'

const Profile = ({ user, setUser }) => {
  const [openModal, setOpenModal] = useState(false)
  const[userProfileImg, setUserProfileImg] = useState('')

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
        <img className='profile-img' src={user.avatar_format?.url ? user.avatar_format.url : "https://thenounproject.com/api/private/icons/396915/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23676767&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjhmpm7hjdq9KRo324pPytqcIJ7mCdHgPb-SEWWHyfpLMk3-ApZmnsu4G-IlzhPHEHOBHkBxCjMihqBDw9jgTS7z9HjA%3D%3D" } alt="profile-pic" />
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