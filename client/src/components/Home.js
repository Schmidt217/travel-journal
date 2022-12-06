import { Link } from 'react-router-dom'
import Logo from '../ImageFolder/LogoImages/logo.png'


const Home = ({ user }) => {

  return (
    <div className='home-page'>
      <div className="home-info-container">
       <img src={Logo} alt="Sum Trip Logo" className='home-logo' />
        <p>Keep track of your travels with Sum Trip! With the option to make a trip public, you can share your epic adventures and activities. Explore trips shared by other users and get more ideas for your next adventure!</p>
        <Link to="/trips/add">
          <button>Add a New Trip!</button>
        </Link>
      </div>
      <div className="home-img"></div>
    </div>
  )
}

export default Home