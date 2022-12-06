import { useContext, useState } from 'react'
import { TripContext } from '../../Context/state'
import ModalComponent from '../ModalComponent'


const ImageCard = ({ tripId, imageInfo }) => {
  const [openModal, setOpenModal] = useState(false)

  const tripCtx = useContext(TripContext)


  const handleDelete = () => {
    fetch(`/deleteImage/${tripId}/${imageInfo.id}`,{
      method: 'DELETE',
    })
    .then(() => {
      tripCtx.refreshFunction()
      handleClose();
    })
  }
  
   //open/close modal for delete image
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setOpenModal(false);

  return (

    <div className='img-card'>
        <img className="single-trip-img"src={imageInfo.url} alt="trip" id={imageInfo.id}/>
        <button className='delete-img' onClick={handleOpen}>X</button>

        <ModalComponent openModal={openModal} handleDelete={handleDelete} handleClose={handleClose}/>
    </div>
    
  )
}

export default ImageCard