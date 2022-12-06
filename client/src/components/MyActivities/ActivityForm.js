import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const initialState ={
    title: "",
    category: "",
    description: "",
    trip_id: "",
  }

const ActivityForm = () => {
      
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
                setIsSending(false)
                navigate(`/trips/${activityData.trip.id}`)
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
                setIsSending(false)
                navigate(`/trips/${params.tripId}`)
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })
      }
    }

          //display message if any errors
          const formErrorMsg = errors?.map((err) => (
            <li key={err}>{err}</li>
          ))

          //render title edit vs add activity based on params activityId(edit) vs tripId(add new activity)

          const formTitle = params.activityId? 'Edit Activity' : 'Add New Activity'


  return (
    <div className='activity-form-page'>
      <div className="activity-form-layer"></div>
      <h2> {formTitle}</h2>
        <form className="add-activity-form" autoComplete='off' onSubmit={handleSubmit} >
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
                
        
                <button className='add-activity-btn' type="submit">{isSending ? 'SUBMITTING...' : 'SUBMIT'}</button>
                
            </form>
            <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default ActivityForm
