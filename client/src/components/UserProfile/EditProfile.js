import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditProfile = ({ user, setRefreshPage }) => {
  console.log(user)
  
    const initFormData = {
        name: user.name,
        username: user.username,
        bio: user.bio,
    }

    const [formData, setFormData] = useState(initFormData)
    const [avatarFile, setAvatarFile] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
    const handleAvatarUpload = (e) => {
      setAvatarFile(e.target.files[0])
    }

    //submit signup form
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true)

      //utilize this FormData method in JS to get all data from the form 
      const entireFormData = new FormData(e.target);
      entireFormData.append('avatar', avatarFile)
      debugger
      
      //do not want to sent a content-type b/c will not be json w/ file attached, also do not want to send JSON.stringify

      fetch(`/users/${userId}`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },
        body: entireFormData,
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
            res.json().then((userData) => {
              console.log(userData)
              setRefreshPage(userData)
              navigate('/profile')
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
    <div className='user-profile-form-page profile-page'>
            <form className='user-profile-form profile-form' onSubmit={handleSubmit}>
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
                    onChange={handleAvatarUpload}
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

            <ul>{formErrorMsg}</ul>
    </div>
  )
}

export default EditProfile

//add a ref to controll image upload file form 