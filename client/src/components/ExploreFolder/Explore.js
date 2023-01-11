import './StylePublicTrips.css'

import { useEffect } from 'react'
import PublicTripCard from './PublicTripCard'
import SearchBar from '../SearchBar'

const Explore = ({ publicTrips, user, search, setSearch}) => {
  
  //Clear searchbar upon mount of this component
  useEffect(() => {
    setSearch("")
  }, [])

  //filter trips w/ searchbar input
    //searchBar filter of all user's trips
    const filterTrips = publicTrips.filter((trip, index)=> {
      //change trip name, location and user search input to lowercase
      //then check if search input is included in any existing trip name, location, date, details, name or username of user who posted
      if(trip.name.toLowerCase().includes(search.toLowerCase())){
        return true
      }else if (trip.location.toLowerCase().includes(search.toLowerCase())){
        return true
      } else if (trip.date.toLowerCase().includes(search.toLowerCase())){
        return true
      } else if (trip.details.toLowerCase().includes(search.toLowerCase())){
        return true
      } else if (trip.user.name.toLowerCase().includes(search.toLowerCase())){
        return true
      } else if (trip.user.username.toLowerCase().includes(search.toLowerCase())){
        return true
      }else return false
    })

  //map over and display trips (potentially filtered trips from searchbar input) to page via trip cards
  const renderPublicTrips = filterTrips.map(trip => {
    return (
      <PublicTripCard key={trip.id} trip={trip} user={user}/>
    )
  })

  return (
    <div className='public-trips-page'>
      <div className="titleWrapper">
        <div className="explore-layer"></div>
        <h1>Explore Adventures</h1>
        <SearchBar search={search} setSearch={setSearch}/>
      </div>
      <div className="public-trips-list">
        {renderPublicTrips}
      </div>

    </div>
  )
}

export default Explore