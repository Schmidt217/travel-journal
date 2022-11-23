import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
    bio: "Complete my bio.",
}

const Signup = ({ setUser }) => {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate();

    //handle form data from user input
    const handleOnChange = (e) => {
        const { name, value } = e.target

        //set form data based on user input + prefill bio so user can complete after creating an account
        setFormData(formData => {
            return{
                ...formData,
                [name]:value,
                bio: 'Complete your bio'
            }
        })
    }

    //submit signup form
    function handleSubmit(e) {
      e.preventDefault();
    //   console.log(formData)
      setIsLoading(true)
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
            res.json().then((userData) => {
            setUser(userData)
            setFormData(initialState)
            navigate('/')
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

    <div className='login-page signup-page'>
            <form className='login-form signup-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>

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

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                />

                <label htmlFor="password">Confirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleOnChange}
                />

                <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            </form>

            <ul>{formErrorMsg}</ul>
    </div>

  )
}

export default Signup