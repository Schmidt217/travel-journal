import './LoginFormStyle.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'


const LoginContainer = ({ setUser }) => {
    const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="login-container">
         {showLogin ? (
                <div className="login">
                    <Login setUser={setUser}/>
                    <p>Need an account?</p>
                    <Link to='signup'>
                        <button className='login-btn2' onClick={() => setShowLogin(false)}>Sign Up!</button>
                    </Link>
                </div>

        ) : (
                <div className="login">
                    <Signup setUser={setUser} />
                    <p>Have an account?</p>
                    <Link to='login'>
                        <button onClick={() => setShowLogin(true)}>Login!</button>
                    </Link>
                </div>

        )}
    </div>
  )
}

export default LoginContainer