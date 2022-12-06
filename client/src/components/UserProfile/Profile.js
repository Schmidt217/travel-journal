import './StyleProfile.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComponent from '../ModalComponent'
import AddProfileImgModal from '../FormModals/AddProfileImgModal'
import PlaceholderImg from '../../ImageFolder/placeholder-image2.png'

const Profile = ({ user, setUser }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditImageModal, setOpenEditImageModal] = useState(false)
  // const[userProfileImg, setUserProfileImg] = useState('')

  let navigate = useNavigate()

  //delete a user
  function handleDelete(){
    fetch(`/users/${user.id}`, {
      method: 'DELETE',
    })
    .then(setUser(null)).then(navigate('/'))
  }
    //open/close modal for delete profile
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    //open/close modal for add/edit single profile image
    const handleOpenImgEditModal = () => setOpenEditImageModal(true);
    const handleCloseEditImgModal = () => setOpenEditImageModal(false);

  return (
    <div className='page-container'>
      <div className="profile">
        <h1>Welcome {user.name}!</h1>
        <img className='profile-img' src={user.avatar_format?.url ? user.avatar_format.url : PlaceholderImg} alt="profile-pic" />
        <div className="profileImg-container">

            <button title="add/edit image" className='edit-profile-img-btn' onClick={handleOpenImgEditModal}>✎</button>
         
        </div>

        <h2>Bio</h2>
        <p>{user.bio}</p>
        <p>{user.username}</p>

        <Link to="/user/trips">
          <button className='view-myTrips-btn'>View My Trips</button>
        </Link>

        <div className="profile-btn-container">
          <Link to={`/user/${user.id}/profile/edit`}>
          <button className='edit-profile-btn'>Edit Profile</button>
          </Link>
          <button className='delete-profile-btn' onClick={handleOpen}>Delete Profile</button>
        </div>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>

        <AddProfileImgModal userId={user.id} openEditImageModal={openEditImageModal} handleCloseEditImgModal={handleCloseEditImgModal}/>

      </div>
    </div>
  )
}

export default Profile