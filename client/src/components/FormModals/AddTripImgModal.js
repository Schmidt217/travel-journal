import { useContext, useState } from 'react'
import { TripContext } from '../../Context/state'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"


const AddTripImgModal = ({ openEditImageModal, handleCloseEditImgModal, userTrip } ) => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [imageArr, setImageArr] = useState([])

    const tripCtx = useContext(TripContext)

    //upload images
    const handleImageUpload = (e) =>{
        setImageArr([])
        //returns an object of objects
        let imageList = e.target.files
        //turns object of objects into arr of objects
        for(let el of imageList){
        setImageArr(imageArr => {
            return[
            ...imageArr,
            el
            ]
        })
        }
        return imageArr
    }

    //update a trip w/ new images
    const handleSubmit = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        const entireFormData = new FormData();

    //add each element of images array to form data
        for(let i=0; i< imageArr.length; i++){
        entireFormData.append(`images[]`, imageArr[i])
        }

        fetch(`/trips/${userTrip.id}`,  {
            method: "PATCH",
            headers: {
            accept: "application/json",
            },
            body: entireFormData
        })
        .then((res) => {
            setIsLoading(false)
        if (res.ok) {
            res.json().then((userData) => {
                setImageArr([])
                tripCtx.refreshFunction()
                handleCloseEditImgModal()
            });
        } else {
            res.json().then((err) => setErrors(err.errors))
        }
        })

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
        sx={{backgroundColor: "var(--blue-see-through)",
          backdropFilter: "blur(10px)",
          color: "white",
					display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
					padding: "1rem",
					margin: "10vh auto",
					width: "70%",
          maxWidth: "400px",
					borderRadius: "10px",
					boxShadow: 10,
					alignItems: "center",
          fontSize: "25px",
          }}>

    <>
    <div className='add-images-form-page'>
        <h3> Add Images to {userTrip.name}</h3>

             <form className="add-images-form" autoComplete='off' onSubmit={handleSubmit} >
                <label htmlFor="images"></label>
                <input
                    id="file-upload"
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageUpload}
                />
                    <button className='submit-btn' type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
             </form>

             <ul>{formErrorMsg}</ul>

    </div>
            <button className='form-cancel-btn' onClick={handleCloseEditImgModal}>Cancel</button>

        <ul>{formErrorMsg}</ul>
    </>

  </Box>
</Modal>
  )
}

export default AddTripImgModal