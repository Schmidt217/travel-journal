import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditTrip = ({ setRefreshPage }) => {
    const [errors, setErrors] = useState([]);
    const [tripFormData, setTripFormData] = useState('')
    const [userId, setUserId] = useState('')
    // const [userInputTextData, setUserInputTextData] = useState(tripFormData)
    const [isPrivate, setIsPrivate] = useState(true)

    let navigate = useNavigate();
    let params = useParams();

    const tripId = parseInt(params.id)

    //get specific trip info to prefill form 
    useEffect(() => {
        fetch(`/trips/${params.id}`)
        .then((res) => {
            if (res.ok) {
              res.json().then((tripData) => {
                  setUserId(tripData.user.id)
                  setTripFormData({
                    name: tripData.name,
                    location: tripData.location,
                    date: tripData.date,
                    details: tripData.details,
                  })
                  setRefreshPage(tripData)
              });
            } else {
              res.json().then((err) => setErrors(err.errors))
            }
          })
    }, [tripId])

    console.log(tripFormData)
    


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

//get user input from radio-button(true or false) (keep trip private or not)
const handleIsPrivate = () => {
    setIsPrivate(isPrivate => !isPrivate)
}

//update a trip w/ new info
const handleSubmit = (e) =>{
    e.preventDefault()

    fetch(`/trips/${params.id}`,  {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...tripFormData, private: isPrivate, user_id: userId})
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
            console.log(userData)
            setTripFormData({})
            setRefreshPage(userData)
            navigate('/myTrips')
        });
      } else {
        res.json().then((err) => setErrors(err.errors))
      }
    })

}

const formErrorMsg = errors.map((err) => (
    <li key={err}>{err}</li>
  ))

return (
<div className='trip-form-container'>
    <form className="trip-form" autoComplete='off' onSubmit={handleSubmit} >
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
    
            <button className='submit-btn' type="submit">SUBMIT</button>
        </form>

        <ul>{formErrorMsg}</ul>
</div>
)
}

export default EditTrip