import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditTrip = ({ setRefreshPage }) => {
    const [errors, setErrors] = useState([]);
    const [tripFormData, setTripFormData] = useState('')
    const [userId, setUserId] = useState('')
    const [imageArr, setImageArr] = useState([])
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
    const entireFormData = new FormData();
    //must append each form area separately and not w/ e.target (this only works w/ single image, not array of images)
    entireFormData.append("name", tripFormData.name)
    entireFormData.append("location", tripFormData.location)
    entireFormData.append("date", tripFormData.date)
    entireFormData.append("details", tripFormData.details)
    entireFormData.append("private", isPrivate)
    entireFormData.append('user_id', userId)
  //trying to append each element of images arr to form data
    for(let i=0; i< imageArr.length; i++){
      entireFormData.append(`images[]`, imageArr[i])
    }

    fetch(`/trips/${params.id}`,  {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },
        body: entireFormData
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
            console.log(userData)
            setImageArr([])
            // setTripFormData({})
            setRefreshPage(userData)
            navigate(`/viewTrip/${tripId}`)
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
  <h2>Edit Trip</h2>
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
 
            <button className='submit-btn' type="submit">SUBMIT</button>
        </form>
        <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>

        <ul>{formErrorMsg}</ul>
</div>
)
}

export default EditTrip