import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TripContext } from '../../Context/state'
import ModalComponent from '../ModalComponent'

const MyActivityCard = ({ activity }) => {
  const [openModal, setOpenModal] = useState(false)

  const tripCtx = useContext(TripContext)
  console.log(activity)

  //delete an activity
  function handleDelete(){
    fetch(`/activities/${activity.id}`, {
      method: 'DELETE',
    })
    .then(tripCtx.refreshFunction())
    .then(setOpenModal(false))
  
  }
  
  
    //open/close modal for delete activity
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
  
  return (
    <div className='myActivity-card'>
        <h4>{activity.title}</h4>
        <p>Category: {activity.category}</p>
        <p>{activity.description}</p>

        <Link to={`/activities/${activity.id}/edit`}>
                <button className='edit-activity'>✎</button>
        </Link>

        <button className='delete-activity' onClick={handleOpen}>Ｘ</button>


        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>

    </div>
  )
}

export default MyActivityCard