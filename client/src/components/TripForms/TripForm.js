import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const initialFormState ={
    name: "",
    location: "",
    date: "",
    details: "",
  }

const TripForm = ({ userId, setRefreshPage }) => {

    const [errors, setErrors] = useState([]);
    const [userInputTextData, setUserInputTextData] = useState(initialFormState)
    const [isPrivate, setIsPrivate] = useState(false)

    let navigate = useNavigate();

    //get user input form text input areas
    const handleUserTextInput = (e) => {
        const { name, value } = e.target
        setUserInputTextData(userInputTextData => {
            return{
                ...userInputTextData,
                [name]:value
            }
        })
    }

    //get user input from radio-button(true or false) (keep trip private or not)
    const handleIsPrivate = () => {
        setIsPrivate(isPrivate => !isPrivate)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch('/trips',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...userInputTextData, private: isPrivate, user_id: userId})
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((userData) => {
                console.log(userData)
                setUserInputTextData(initialFormState)
                setRefreshPage(userData)
                navigate('/')
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })
        //data to send to backend for new trip 
        // console.log({...userInputTextData, private: isPrivate, user_id: userId})

    }

    const formErrorMsg = errors.map((err) => (
        <li key={err}>{err}</li>
      ))

  return (
    <div className='trip-form-container'>
        <form className="trip-form" autoComplete='off' onSubmit={handleSubmit} >
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
        
                <button className='submit-btn' type="submit">SUBMIT</button>
            </form>

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default TripForm