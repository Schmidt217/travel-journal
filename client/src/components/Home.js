import TripForm from './TripForms/TripForm'


const Home = ({ user }) => {

  return (
    <div className='page-container'>
      <h1>Sum Trip</h1>
      <div className="trip-form-page">
        <h3>Add a new Trip!</h3>
        <TripForm userId={user.id} />
      </div>
    </div>
  )
}

export default Home