import './App.css'
import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
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
import AddActivityForm from './components/MyActivities/AddActivityForm'
import EditActivityForm from './components/MyActivities/EditActivityForm'
import TripImageFullPage from './components/MyTripsImages/TripImageFullPage'

function App() {
  const [user, setUser] = useState("")
  const [errors, setErrors] = useState([])
  // const [addNewTrip, setAddNewTrip] = useState(true)
  const [refreshPage, setRefreshPage] = useState(false);

  // let navigate = useNavigate();

  // auto-login if user_id in session from previous login
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData)
          // navigate('profile')
        });
      }
    });

  }, [refreshPage]);
  

  if(!user) return <LoginContainer setUser={setUser}/>

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element ={ <Home user={user} setRefreshPage={setRefreshPage}/> } />
        {/* <Route path="login" element ={ <Login /> } />
        <Route path="signup" element ={ <Signup /> } /> */}
        <Route path="profile" element ={ <Profile user={user} setUser={setUser}/> } />
        <Route path="myTrips" element ={ <MyTrips user={user}/> } />
        <Route path="explore" element ={ <Explore /> } />
        <Route path="viewTrip/:id" element ={ <ViewTrip user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/> } />
        <Route path="viewTripImages/:id" element ={ <TripImageFullPage user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/> } />
        <Route path="editTrip/:id" element ={ <EditTrip setRefreshPage={setRefreshPage} /> } />
        <Route path="editProfile/:id" element ={ <EditProfile setRefreshPage={setRefreshPage} user={user}/> } />
        <Route path="addActivity/:id" element ={ <AddActivityForm setRefreshPage={setRefreshPage}/> } />
        <Route path="editActivity/:id" element ={ <EditActivityForm setRefreshPage={setRefreshPage}/> } />
      </Routes>
    </div>
  );
}
export default App;
