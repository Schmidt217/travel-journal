import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TripContext } from '../../Context/state'

const EditProfileImage = () => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const tripCtx = useContext(TripContext)

    let navigate = useNavigate()
    let params = useParams()
    const userId = parseInt(params.id)

      //submit signup form
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)

        //utilize this FormData method in JS to handle single image added
        //if more than one image attached, need to use piece of state and map to append each image to form data
        const newProfileImg = new FormData(e.target);
  
        fetch(`/users/${userId}`, {
          method: "PATCH",
          headers: {
            accept: "application/json",
          },
          body: newProfileImg,
        }).then((res) => {
          if (res.ok) {
              res.json().then(() => {
                setIsLoading(false)
                tripCtx.refreshFunction()
                navigate('/user/profile')
            })
          }else{
            res.json().then((err) => setErrors(err.errors))
          }
        });
      }
  
      //Error message if errors exist
      const formErrorMsg = errors?.map((err) => (
        <li key={err}>{err}</li>
      ))
  
  

  return (
    <div>
        <form className='user-profile-form profile-form' onSubmit={handleSubmit}>
        <label htmlFor="avatar">Change Profile Image</label>
                <input
                    id='file-upload'
                    type="file"
                    name="avatar"
                />

        <button type="submit">{isLoading ? "Loading..." : "Submit Changes"}</button>
        </form>
        <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>
        <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default EditProfileImage