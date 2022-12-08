import './StyleTripForm.css'
import { useContext, useState } from 'react'
import { TripContext } from '../../Context/state'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"

const EditProfileModal = ({ user, openEditProfileModal, handleCloseEditProfile } ) => {
    
    const initFormData = {
        name: user.name,
        username: user.username,
        bio: user.bio,
    }
    
    const [formData, setFormData] = useState(initFormData)
    // const [avatarFile, setAvatarFile] = useState(false)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const tripCtx = useContext(TripContext)

      //handle form data from user input
      const handleOnChange = (e) => {
        const { name, value } = e.target

        //set form data based on user input + prefill bio so user can complete after creating an account
        setFormData(formData => {
            return{
                ...formData,
                [name]:value
            }
        })
    }

    //submit signup form
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
  
        //utilize this FormData method in JS to get all data from the form
        //only works if adding 1 image, not multiplle images (will need state and to append for multiple images)
        const entireFormData = new FormData(e.target);
  
        //do not want to send a content-type b/c will not be json w/ file attached, also do not want to send JSON.stringify
  
        fetch(`/users/${user.id}`, {
          method: "PATCH",
          headers: {
            accept: "application/json",
          },
          body: entireFormData,
        }).then((res) => {
          if (res.ok) {
              res.json().then((userData) => {
                setIsLoading(false)
                tripCtx.refreshFunction()
                handleCloseEditProfile()
            })
          }else{
            setIsLoading(false)
            res.json().then((err) => setErrors(err.errors))
          }
        });
      }

  
      //Error message if errors exist
      const formErrorMsg = errors?.map((err) => (
        <li key={err}>{err}</li>
      ))

  return (
  <Modal
  open={openEditProfileModal}
  onClose={handleCloseEditProfile}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box 
        sx={{backgroundColor: "var(--blue-see-through)",
          backdropFilter: "blur(10px)",
          color: "white",
					display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
					padding: "1rem",
					margin: "4vh auto",
					width: "40%",
					borderRadius: "10px",
					boxShadow: 10,
					alignItems: "center",
          fontSize: "25px",
          }}>

<div className='trip-form-container'>
            <form className='trip-form' onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                />

                <label htmlFor="avatar">Profile Image</label>
                <input
                    id='file-upload'
                    type="file"
                    name="avatar"
                />

                <label htmlFor="bio">Bio</label>
                <textarea
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleOnChange}
                />

                <button className='submit-form-btn' type="submit">{isLoading ? "Loading..." : "Submit Changes"}</button>
            </form>

        <button className='form-cancel-btn' onClick={handleCloseEditProfile}>Cancel</button>

        <ul>{formErrorMsg}</ul>
    </div>

  </Box>
</Modal>
  )
}

export default EditProfileModal