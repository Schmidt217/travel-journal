import './StyleTripForm.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripContext } from '../../Context/state'

const initialFormState ={
    name: "",
    location: "",
    date: "",
    details: "",
  }

const TripForm = ({ user }) => {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userInputTextData, setUserInputTextData] = useState(initialFormState)
    const [isPrivate, setIsPrivate] = useState(false)
    const [imageArr, setImageArr] = useState([])

    const tripCtx = useContext(TripContext)

    let navigate = useNavigate();

    console.log(user)
    

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
      //trying to append each element of images arr to form data
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
                console.log(userData)
                setImageArr([])
                setUserInputTextData(initialFormState)
                tripCtx.refreshFunction()
                navigate('/user/trips')
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })
       
    }

    const formErrorMsg = errors?.map((err) => (
        <li key={err}>{err}</li>
      ))

  return (
    <div className='trip-form-container'>
        <form className="trip-form" autoComplete='off' onSubmit={handleSubmit} >
            <h1>Add a New Trip</h1>
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
            
                <button className='submit-btn' type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
            <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default TripForm