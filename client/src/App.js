import './App.css'
import { useState, useEffect, useContext } from "react"
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import LoginContainer from './components/LoginFolder/LoginContainer'
import Login from './components/LoginFolder/Login'
import Signup from './components/LoginFolder/Signup'
import Home from './components/Home'
import Profile from './components/UserProfile/Profile'
import MyTrips from './components/MyTripsFolder/MyTrips'
import Explore from './components/ExploreFolder/Explore'
import EditTrip from './components/TripForms/EditTrip'
import EditProfile from './components/UserProfile/EditProfile'
import ViewTrip from './components/MyTripsFolder/ViewTrip'
import TripImageFullPage from './components/MyTripsImages/TripImageFullPage'
import ActivityForm from './components/MyActivities/ActivityForm'
import { TripContext } from './Context/state'

function App() {
  const [user, setUser] = useState("")
  const[publicTrips, setPublicTrips] = useState([])
  const [search, setSearch] = useState("")

  const tripCtx = useContext(TripContext)

  // auto-login if user_id in session from previous login
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData)
          fetchPublicTrips()
        });
      }
    });

  }, [tripCtx.refreshPage]);

  
  

  // //get all public trip posts to display on explore page
  function fetchPublicTrips () {
    fetch("/trips").then((res) => {
      if (res.ok) {
        res.json().then((tripData) => {
          setPublicTrips(tripData)
        });
      }
    });
  }

  if(!user) return <LoginContainer setUser={setUser}/>

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element ={ <Home user={user} /> } />
        {/* <Route path="login" element ={ <Login /> } />
        <Route path="signup" element ={ <Signup /> } /> */}
        <Route path="user/profile" element ={ <Profile user={user} setUser={setUser}/> } />
        <Route path="user/trips" element ={ <MyTrips user={user} search={search} setSearch={setSearch}/>} />
        <Route path="trips/publicTrips" element ={ <Explore user={user} publicTrips={publicTrips} search={search} setSearch={setSearch}/> } />
        <Route path="trips/:id" element ={ <ViewTrip user={user} /> } />
        <Route path="trips/:id/images" element ={ <TripImageFullPage user={user} /> } />
        <Route path="trips/:id/edit" element ={ <EditTrip /> } />
        <Route path="user/:id/profile/edit" element ={ <EditProfile user={user}/> } />
       <Route path="trip/:tripId/add-activity" element ={ <ActivityForm /> } />

        <Route path="activities/:activityId/edit" element ={ <ActivityForm /> } />

      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
