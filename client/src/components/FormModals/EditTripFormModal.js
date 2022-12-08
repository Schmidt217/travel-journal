import './StyleTripForm.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../../Context/state'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"

const EditTripFormModal = ({ openAddTripModal, handleCloseAddTripModal, userTrip } ) => {
    
    const initialFormData = {
        name: userTrip.name,
        location: userTrip.location,
        date: userTrip.date,
        details: userTrip.details,
    }
  
    //STATE
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [tripFormData, setTripFormData] = useState({})
    // const [userId, setUserId] = useState('')
    const [imageArr, setImageArr] = useState([])
    const [isPrivate, setIsPrivate] = useState(false)

    const tripCtx = useContext(TripContext)
    let navigate = useNavigate();

   useEffect(() => {
    setTripFormData(initialFormData)
    setIsPrivate(false)
   }, [userTrip])
    

    //get user input from changes to text input areas
    const handleUserTextInput = (e) => {
    const { name, value } = e.target
    setTripFormData(tripFormData => {
        return{
            ...tripFormData,
            [name]:value
        }
    })
    }

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

    //get user input from radio-button(true or false) (keep trip private or not)
    const handleIsPrivate = () => {
    setIsPrivate(isPrivate => !isPrivate)
    }

    //update a trip w/ new info
    const handleSubmit = (e) =>{
    e.preventDefault()
    setIsLoading(true)
    const entireFormData = new FormData();
    //must append each form area separately and not w/ e.target (this only works w/ single image, not array of images)
    entireFormData.append("name", tripFormData.name)
    entireFormData.append("location", tripFormData.location)
    entireFormData.append("date", tripFormData.date)
    entireFormData.append("details", tripFormData.details)
    entireFormData.append("private", isPrivate)
    entireFormData.append('user_id', userTrip.user.id)
    //trying to append each element of images arr to form data
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
    if (res.ok) {
        setIsLoading(false)
        res.json().then(() => {
            tripCtx.refreshFunction()
            setImageArr([])
            handleCloseAddTripModal()
            navigate(`/trips/${userTrip.id}`)
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
  open={openAddTripModal}
  onClose={handleCloseAddTripModal}
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
    <h2>Edit {userTrip.name} Trip</h2>
    <form className="trip-form edit-trip-form" autoComplete='off' onSubmit={handleSubmit} >
            <label>Trip Name </label>
            <input type='text'id="name" name="name" value={tripFormData.name} onChange={handleUserTextInput} required />

            <label>Location</label>
            <input type='text'id="location" name="location" value={tripFormData.location} onChange={handleUserTextInput} required/>

            <label>Date</label>
            <input type='text'id="date" name="date" value={tripFormData.date} onChange={handleUserTextInput} required/>

            <label>Details</label>
            <textarea type='text' id="details" name="details" value={tripFormData.details} onChange={handleUserTextInput} required/>

            <label>Keep this trip private</label>
                <input type="radio" id="private" name="private" checked={isPrivate ? "checked" : ''} value={isPrivate} onChange={handleIsPrivate}/>

            <label htmlFor="images">Add Trip Photos</label>
            <input
                id="file-upload-trip-form"
                type="file"
                name="images"
                multiple
                onChange={handleImageUpload}
            />

             <button className='submit-form-btn' type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>

        <button className='form-cancel-btn' onClick={handleCloseAddTripModal}>Cancel</button>

        <ul>{formErrorMsg}</ul>
    </div>

  </Box>
</Modal>
  )
}

export default EditTripFormModal