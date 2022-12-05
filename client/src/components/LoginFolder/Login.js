import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../ImageFolder/LogoImages/logo.png'

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();
  
    //submit login form
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true)
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
            res.json().then((userData) => {
            setUser(userData)
            navigate('/')
          })
        }else{
          res.json().then((err) => setErrors(err.errors))
        }
      });
    }

    const formErrorMsg = errors.map((err) => (
      <li key={err}>{err}</li>
    ))
  return (

    <div className='user-profile-form-page login-page' >
      <div className="layer"></div>
      <img src={Logo} alt="Sum Trip Logo" className='logo' />
            <form className='user-profile-form signup-form' onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder='Username'
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='submit-btn login-btn' type="submit">{isLoading ? "Loading..." : "Login"}</button>
            </form>

            <ul>{formErrorMsg}</ul>
     
    </div>

  )
}

export default Login