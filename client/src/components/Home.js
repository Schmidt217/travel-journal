import { useState } from 'react'
import Logo from '../ImageFolder/LogoImages/logo.png'
import AddTripFormModal from './FormModals/AddTripFormModal'


const Home = ({ user }) => {
  const [openAddTripModal, setOpenAddTripModal] = useState(false)

    //open/close modal for add trip
    const handleOpenAddTripModal = () => setOpenAddTripModal(true);
    const handleCloseAddTripModal = () => setOpenAddTripModal(false);
  return (
    <div className='home-page'>
      <div className="home-info-container">
       <img src={Logo} alt="Sum Trip Logo" className='home-logo' />
        <p>Keep track of your travels with Sum Trip! With the option to make a trip public, you can share your epic adventures and activities. Explore trips shared by other users and get more ideas for your next adventure!</p>
        {/* <Link to="/trips/add"> */}
          <button onClick={handleOpenAddTripModal}>Add a Trip!</button>
        {/* </Link> */}
      </div>
      <div className="home-img"></div>
      <AddTripFormModal user={user} openAddTripModal={openAddTripModal} handleCloseAddTripModal={handleCloseAddTripModal}/>
    </div>
  )
}

export default Home