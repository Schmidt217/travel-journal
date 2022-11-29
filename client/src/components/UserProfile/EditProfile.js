import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditProfile = ({ user, setRefreshPage }) => {
    console.log(user.bio)
    
    const initFormData = {
        name: user.name,
        username: user.username,
        bio: user.bio,
        password: ''
    }

    const [formData, setFormData] = useState(initFormData)
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

    //submit signup form
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true)
      fetch(`/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
            res.json().then((userData) => {
                setRefreshPage(userData)
            navigate('/profile')
          })
        }else{
          res.json().then((err) => setErrors(err.errors))
        }
      });
    }
    //Error message if errors exist
    const formErrorMsg = errors.map((err) => (
      <li key={err}>{err}</li>
    ))
  return (
    <div className='user-profile-form-page profile-page'>
            <form className='user-profile-form profile-form' onSubmit={handleSubmit}>
                <h1>Edit Your Profile</h1>

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

//edit User by id