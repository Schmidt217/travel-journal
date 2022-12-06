import { useContext, useState } from 'react'
import { TripContext } from '../../Context/state'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"


const AddProfileImgModal = ({ openEditImageModal, handleCloseEditImgModal, userId } ) => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const tripCtx = useContext(TripContext)

      //submit signup form
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)

        //utilize this FormData method in JS to handle single image added
        //if more than one image attached, need to use piece of state and map to append each image to form data
        const newProfileImg = new FormData(e.target);
  
        fetch(`/users/${userId}`, {
          method: "PATCH",
          headers: {
            accept: "application/json",
          },
          body: newProfileImg,
        }).then((res) => {
          if (res.ok) {
              res.json().then(() => {
                setIsLoading(false)
                tripCtx.refreshFunction()
                handleCloseEditImgModal();
            })
          }else{
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
  open={openEditImageModal}
  onClose={handleCloseEditImgModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box 
        sx={{backgroundColor: "var(--blue)",
          color: "white",
					display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
					padding: "2rem",
					margin: "10vh auto",
					width: "30%",
					borderRadius: "7px",
					boxShadow: 10,
					alignItems: "center",
          fontSize: "25px",
          }}>

    <>
        <form className='user-profile-form edit-profile-img-form' onSubmit={handleSubmit}>
            <h3>Edit Profile Image</h3>
            <label htmlFor="avatar">Change Profile Image</label>
                    <input
                        id='file-upload'
                        type="file"
                        name="avatar"
                    />

            <button id="submit-profile-img" type="submit">{isLoading ? "Loading..." : "Submit Changes"}</button>
        </form>
            
            <button className='form-cancel-btn' onClick={handleCloseEditImgModal}>Cancel</button>
        <ul>{formErrorMsg}</ul>
    </>

  </Box>
</Modal>
  )
}

export default AddProfileImgModal