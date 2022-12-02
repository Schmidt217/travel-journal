import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

/**
 * Single Activity Form
 *  - create new activities
 *  - edit existing activities
 * 
 * In the activity form itself
 *  - form should start empty always
 *  - if an existing activity ID is present in params
 *    - fetch that activity
 *    - populate form values
 *    - allows user to edit
 * 
 *  <ActivityForm />
 * 
 * === Structuring URLS ===
 * some_entity/entity_id
 *  - /users -> all users
 *  - /users/123 -> user with id 123
 * some_entity/entity_id/sub_entity/sub_entity_id
 *  - /users/123/friends -> user with id 123, all friends
 *  - /users/123/friends/789 user with id 123, and that users friend with ID 789
 * 
 *  /add-activity/273 ???
 *  /trip/273/add-activity -> trip 273, add activity
 *
 * /activities/activity_id/edit-activity
 * /trip/:tripId/activities/:activityId/edit -> two URL params
 * 
 */

const initialState ={
    title: "",
    category: "",
    description: "",
    trip_id: "",
  }

const ActivityForm = ({ setRefreshPage }) => {
      
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState([]);
  const [activityFormData, setActivityFormData] = useState(initialState)

  let navigate = useNavigate();
  let params = useParams();
  
  useEffect(() => {
    //if params.activityId, fetch current activity info so user can edit it
    if(params.activityId){
        fetch(`/activities/${params.activityId}`)
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
                res.json().then((data) => {
                    console.log(data)
                    setErrors(data.error)
                })
            }
        })
    }
    if(params.tripId){
        setActivityFormData(initialState)
    }
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
      //if params.activityId exists, send updated form data on submit
      if(params.activityId){
        fetch(`/activities/${params.activityId}`,  {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityFormData)
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((activityData) => {
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
      if(params.tripId){
        fetch('/activities',  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...activityFormData, trip_id: params.tripId})
        })
        .then((res) => {
          if (res.ok) {
            res.json().then((activityData) => {
                console.log(activityData)
                setActivityFormData(initialState)
                setRefreshPage(activityData)
                setIsSending(false)
                navigate(`/viewTrip/${params.tripId}`)
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })
      }
    
    }

  return (
    <div className='trip-form-container'>
      <h2>New Activity Form</h2>
        <form className="trip-form add-activity-form" autoComplete='off' onSubmit={handleSubmit} >
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

export default ActivityForm
