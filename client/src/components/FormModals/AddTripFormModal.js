import './StyleTripForm.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../../Context/state'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"

const initialFormState ={
    name: "",
    location: "",
    date: "",
    details: "",
  }

const AddTripFormModal = ({ openAddTripModal, handleCloseAddTripModal, user } ) => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userInputTextData, setUserInputTextData] = useState(initialFormState)
    const [isPrivate, setIsPrivate] = useState(false)
    const [imageArr, setImageArr] = useState([])

    const tripCtx = useContext(TripContext)
    let navigate = useNavigate();

     //get user input form text input areas
     const handleUserTextInput = (e) => {
        const { name, value } = e.target
        setUserInputTextData(userInputTextData => {
            return{
                ...userInputTextData,
                [name]:value,
            }
        })
    }

    //get user input from radio-button(true or false) (keep trip private or not)
    const handleIsPrivate = () => {
        setIsPrivate(isPrivate => !isPrivate)
    }

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

    const handleSubmit = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        const entireFormData = new FormData();
        //must append each form area separately and not w/ e.target (this only works w/ single image, not array of images)
        entireFormData.append("name", userInputTextData.name)
        entireFormData.append("location", userInputTextData.location)
        entireFormData.append("date", userInputTextData.date)
        entireFormData.append("details", userInputTextData.details)
        entireFormData.append("private", isPrivate)
  
        entireFormData.append('user_id', user.id)
      // append each element of images array to form data
        for(let i=0; i< imageArr.length; i++){
          entireFormData.append(`images[]`, imageArr[i])
        }

        fetch('/trips',  {
            method: "POST",
            headers: {
                accept: "application/json",
            },
            body: entireFormData,
        })
        .then((res) => {
          setIsLoading(false)
          if (res.ok) {
            res.json().then((userData) => {
                setImageArr([])
                setUserInputTextData(initialFormState)
                tripCtx.refreshFunction()
                handleCloseAddTripModal()
                navigate('/user/trips')
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
					width: "80%",
          maxWidth: "500px",
					borderRadius: "10px",
					boxShadow: 10,
					alignItems: "center",
          fontSize: "25px",
          }}>

<div className='trip-form-container'>
    <form className="trip-form" autoComplete='off' onSubmit={handleSubmit} >
            <h2>Add a New Trip</h2>
                <label>Trip Name </label>
                <input type='text'id="name" name="name" value={userInputTextData.name} onChange={handleUserTextInput} required />
               

                <label>Location</label>
                <input type='text'id="location" name="location" value={userInputTextData.location} onChange={handleUserTextInput} required/>
                

                <label>Date</label>
                <input type='text'id="date" name="date" value={userInputTextData.date} onChange={handleUserTextInput} required/>
                

                <label>Details</label>
                <textarea type='text' id="details" name="details" value={userInputTextData.details} onChange={handleUserTextInput} required/>
             

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

export default AddTripFormModal