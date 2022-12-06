import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TripContext } from '../../Context/state'


const EditProfile = ({ user }) => {
    const initFormData = {
        name: user.name,
        username: user.username,
        bio: user.bio,
    }

    const [formData, setFormData] = useState(initFormData)
    // const [avatarFile, setAvatarFile] = useState(false)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const tripCtx = useContext(TripContext)

    let navigate = useNavigate()
    let params = useParams()
    const userId = parseInt(params.id)

    //handle form data from user input
    const handleOnChange = (e) => {
        const { name, value } = e.target

        //set form data based on user input + prefill bio so user can complete after creating an account
        setFormData(formData => {
            return{
                ...formData,
                [name]:value
            }
        })
    }

    //handle file upload
    // const handleAvatarUpload = (e) => {
    //   setAvatarFile(e.target.files[0])
    // }

    //submit signup form
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true)

      //utilize this FormData method in JS to get all data from the form
      //only works if adding 1 image, not multiplle images (will need state and to append for multiple images)
      const entireFormData = new FormData(e.target);

      //do not want to send a content-type b/c will not be json w/ file attached, also do not want to send JSON.stringify

      fetch(`/users/${userId}`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },
        body: entireFormData,
      }).then((res) => {
        if (res.ok) {
            res.json().then((userData) => {
              setIsLoading(false)
              tripCtx.refreshFunction()
              console.log('patch changes submitted', userData)
              navigate('/user/profile')
          })
        }else{
          setIsLoading(false)
          res.json().then((err) => setErrors(err.errors))
        }
      });
    }

    //Error message if errors exist
    const formErrorMsg = errors?.map((err) => (
      <li key={err}>{err}</li>
    ))

  return (
    <div className='user-profile-form-page profile-page'>
            <form className='edit-full-profile-form' onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                />

                <label htmlFor="avatar">Profile Image</label>
                <input
                    id='file-upload'
                    type="file"
                    name="avatar"
                />

                <label htmlFor="bio">Bio</label>
                <textarea
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleOnChange}
                />

                <button type="submit">{isLoading ? "Loading..." : "Submit Changes"}</button>
            </form>
            <button className='form-cancel-btn' onClick={()=> navigate(-1)}>Cancel</button>

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default EditProfile

//add a ref to controll image upload file form 