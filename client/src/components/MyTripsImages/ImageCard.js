import React from 'react'

const ImageCard = ({ imageInfo }) => {

  return (

    <div className='img-card'>
        <img className="single-trip-img"src={imageInfo.url} alt="trip" id={imageInfo.id}/>
        <button className='delete-img'>X</button>
    </div>
    
  )
}

export default ImageCard