import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalComponent from '../ModalComponent'

const MyActivityCard = ({activity, refreshPage, setRefreshPage}) => {
  const [openModal, setOpenModal] = useState(false)

  //delete an activity
  function handleDelete(){
    fetch(`/activities/${activity.id}`, {
      method: 'DELETE',
    })
    .then(setRefreshPage(refreshPage => !refreshPage))
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
        <p>ID: {activity.id}</p>

        <Link to={`/editActivity/${activity.id}`}>
                <button className='edit-activity'>✎</button>
        </Link>

        <button className='delete-activity' onClick={handleOpen}>Ｘ</button>


        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>

    </div>
  )
}

export default MyActivityCard