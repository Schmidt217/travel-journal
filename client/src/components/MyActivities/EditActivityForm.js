import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditActivityForm = ({ setRefreshPage }) => {

  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState([]);
  const [activityFormData, setActivityFormData] = useState('')

  let navigate = useNavigate();
  let params = useParams();
  const activityId = parseInt(params.id)

  //get original activity info to fill in form
  useEffect(() => {
    fetch(`/activities/${activityId}`)
    .then((res)=> {
        if(res.ok){
            res.json().then((actData) => {
                setActivityFormData({
                    title: actData.title,
                    category: actData.category,
                    description: actData.description,
                    trip_id: actData.trip.id,
                  })
            })
        }else{
            res.json().then((err) => {
                console.log(err)
                setErrors(err.error)
            })
        }
    })
  }, [params])


    //get user input from changes to form
    const handleUserTextInput = (e) => {
      const { name, value } = e.target
      setActivityFormData(activityFormData => {
          return{
              ...activityFormData,
              [name]:value, 
          }
      })
    }

    //submit activity edit form
    const handleSubmit = (e) => {
      e.preventDefault()
      setIsSending(true)
      console.log(activityFormData)
          fetch(`/activities/${activityId}`,  {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityFormData)
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((activityData) => {
                console.log(activityData)
                setActivityFormData('')
                setRefreshPage(activityData)
                setIsSending(false)
                navigate(`/viewTrip/${activityData.trip.id}`)
            });
          } else {
            res.json().then((err) => {
                console.log(err)
                setErrors(err.errors)
            })
          }
        })
    }

  return (
    <div className='trip-form-container'>
      <h2>Edit Activity</h2>
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

            <ul>{errors}</ul>
    </div>
  )
}

export default EditActivityForm