import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddTripImages = ({ user, setRefreshPage }) => {
    const [errors, setErrors] = useState([]);
    const [imageArr, setImageArr] = useState([])

    let navigate = useNavigate();
    let params = useParams();
    const tripId = parseInt(params.id)

    //get more info from the user data fro the selected trip id
    const selectedTrip = user.trips.find(trip => {
        if(trip.id === tripId){
            return trip
        } else return false
    })

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

    //update a trip w/ new images
    const handleSubmit = (e) =>{
        e.preventDefault()
        const entireFormData = new FormData();

    //add each element of images array to form data
        for(let i=0; i< imageArr.length; i++){
        entireFormData.append(`images[]`, imageArr[i])
        }

        fetch(`/trips/${tripId}`,  {
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
                setRefreshPage(userData)
                navigate(`/viewTrip/${tripId}`)
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
    <div className='add-images-form-page'>
        <h2> Add Images to {selectedTrip.name}</h2>

             <form className="add-images-form" autoComplete='off' onSubmit={handleSubmit} >
                <label htmlFor="images"></label>
                <input
                    id="file-upload-trip-form"
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageUpload}
                />
                <div className="btn-container">
                    <button className='submit-btn' type="submit">SUBMIT</button>
                    <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>
                </div>
             </form>

             <ul>{formErrorMsg}</ul>

    </div>
  )
}

export default AddTripImages