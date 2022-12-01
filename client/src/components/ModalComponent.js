import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"


const ModalComponent = ({openModal, handleClose, handleDelete}) => {

  return (
  <Modal
  open={openModal}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box 
        sx={{backgroundColor: "var(--dark-blue)",
          color: "white",
					display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
					padding: "3rem",
					margin: "45vh auto",
					width: "30%",
					borderRadius: "7px",
					boxShadow: 10,
					alignItems: "center",
          fontSize: "25px",
          }}>

  <>
      <div >
        Are you sure you want to delete? This cannot be undone. 
      </div>
      <button className='submit-btn confirm-delete-btn' onClick={() => handleDelete()} >Confirm Delete</button>
    </>
  </Box>
</Modal>
  )
}

export default ModalComponent