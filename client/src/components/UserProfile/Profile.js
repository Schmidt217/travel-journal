import './StyleProfile.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalComponent from '../ModalComponent'
import AddProfileImgModal from '../FormModals/AddProfileImgModal'
import EditProfileModal from '../FormModals/EditProfileModal'
import PlaceholderImg from '../../ImageFolder/placeholder-image2.png'

const Profile = ({ user, setUser }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditImageModal, setOpenEditImageModal] = useState(false)
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
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

    //open/close modal for add/edit single profile image
    const handleOpenEditProfile = () => setOpenEditProfileModal(true);
    const handleCloseEditProfile = () => setOpenEditProfileModal(false);

    console.log('user:',user)
    

  return (
    <div className='page-container'>
      <div className="profile">
        <h1>Welcome {user.name}!</h1>
        <div className="profileImg-container">
        <img className='profile-img' src={user.avatar_format?.url ? user.avatar_format.url : PlaceholderImg} alt="profile-pic" />

            <button title="add/edit image" className='edit-profile-img-btn' onClick={handleOpenImgEditModal}>✎</button>
         
        </div>
        <div className="profileInfo-container">
          <p><span>Username:</span> {user.username}</p>
          <p>{user.bio}</p>
        </div>

        <Link to="/user/trips">
          <button className='view-myTrips-btn'>View My Trips</button>
        </Link>

        <div className="profile-btn-container">
          <button className='edit-profile-btn' onClick={handleOpenEditProfile}>Edit Profile</button>
          <button className='delete-profile-btn' onClick={handleOpen}>Delete Profile</button>
        </div>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>

        <AddProfileImgModal userId={user.id} openEditImageModal={openEditImageModal} handleCloseEditImgModal={handleCloseEditImgModal}/>

        <EditProfileModal user={user} openEditProfileModal={openEditProfileModal}handleCloseEditProfile={handleCloseEditProfile}/>

      </div>
    </div>
  )
}

export default Profile