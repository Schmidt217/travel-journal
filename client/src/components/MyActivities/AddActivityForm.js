import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const AddActivityForm = ({ setRefreshPage }) => {
  const initialState ={
    title: "",
    category: "",
    description: "",
    trip_id: "",
  }
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState([]);
  const [activityFormData, setActivityFormData] = useState(initialState)

  let navigate = useNavigate();
  let params = useParams();
  const tripId = parseInt(params.id)
  console.log(tripId)

      //get user input from changes to text input areas
    const handleUserTextInput = (e) => {
      const { name, value } = e.target
      setActivityFormData(activityFormData => {
          return{
              ...activityFormData,
              [name]:value, 
              trip_id: tripId,
          }
      })
    }

    //submit activity form
    const handleSubmit = (e) => {
      e.preventDefault()
      setIsSending(true)
      console.log(activityFormData)
     
          fetch('/activities',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityFormData)
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((activityData) => {
                console.log(activityData)
                setActivityFormData(initialState)
                setRefreshPage(activityData)
                setIsSending(false)
                navigate(`/viewTrip/${tripId}`)
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })

    }

    // Error Handling - message to user in browser
    const formErrorMsg = errors?.map((err) => (
      <li key={err}>{err}</li>
    ))

  return (
    <div className='trip-form-container'>
      <h2>Add a New Activity</h2>
        <form className="trip-form" autoComplete='off' onSubmit={handleSubmit} >
                <label>Activity Name </label>
                <input type='text'id="title" name="title" value={activityFormData.title} onChange={handleUserTextInput} required />

                <label>Category</label>
                  <select id="category" name="category" value={activityFormData.category} onChange={handleUserTextInput} required>
                    <option value="" disabled selected>Select an option</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>

                <label>Description</label>
                <textarea type='text'id="description" name="description" value={activityFormData.description} onChange={handleUserTextInput} required/>
                
        
                <button className='submit-btn' type="submit">{isSending ? 'SUBMITTING...' : 'SUBMIT'}</button>
            </form>

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default AddActivityForm