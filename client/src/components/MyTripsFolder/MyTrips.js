import './StyleMyTrips.css'
import { useEffect, useState } from 'react'
import MyTripsCard from './MyTripsCard'
import SearchBar from '../SearchBar'
import AddTripFormModal from '../FormModals/AddTripFormModal'

const MyTrips = ({ user, search, setSearch }) => {
  const [openAddTripModal, setOpenAddTripModal] = useState(false)

  //Clear searchbar upon mount of this component
  useEffect(() => {
    setSearch("")
  }, [])

  //searchBar filter of all user's trips
  const filterTrips = user.trips.filter((trip, index)=> {
    //change trip name, location and user search input to lowercase
    //then check if search input is included in any existing trip name, location, date, details
    if(trip.name.toLowerCase().includes(search.toLowerCase())){
      return true
    }else if (trip.location.toLowerCase().includes(search.toLowerCase())){
      return true
    } else if (trip.date.toLowerCase().includes(search.toLowerCase())){
      return true
    } else if (trip.details.toLowerCase().includes(search.toLowerCase())){
      return true
    }else return false
  })

   //open/close modal for add trip
   const handleOpenAddTripModal = () => setOpenAddTripModal(true);
   const handleCloseAddTripModal = () => setOpenAddTripModal(false);

    //map over and display trips (potentially filtered trips from searchbar input) to page via trip cards
    const renderTrips = filterTrips.map(trip => {
      return(
        <MyTripsCard key={trip.id} userTrip={trip}/>
      )
    })

  return (
    <div className='page-container my-trips-container'>
      <div className="myTrips-layer"></div>
      <div className="display-my-trips-cards">
        <h1>{user.name}'s Trips</h1>
        <SearchBar search={search} setSearch={setSearch}/>

          <button className='add-new-trip-link' onClick={handleOpenAddTripModal}>Add New Trip</button>
  
        <div className="myTrips-page">
          {renderTrips}
        </div>
      </div>

      <AddTripFormModal user={user} openAddTripModal={openAddTripModal} handleCloseAddTripModal={handleCloseAddTripModal}/>
    </div>
  )
}

export default MyTrips