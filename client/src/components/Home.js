import { Link } from 'react-router-dom'
import Logo from '../ImageFolder/LogoImages/logo.png'


const Home = ({ user }) => {

  return (
    <div className='page-container'>
       <img src={Logo} alt="Sum Trip Logo" className='home-logo' />
      <div className="home-info-container">
        <p>Keep track of all your adventures with Sum Trip! With the option to make a trip public, you can share your epic travels and activities. Explore and get ideas for your next adventures!</p>
        <Link to="/trips/add">
          <button>Add a New Trip!</button>
        </Link>
      </div>
      <div className="footer-img"></div>
    </div>
  )
}

export default Home