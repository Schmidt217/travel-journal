import LogoPic from '../ImageFolder/LogoImages/logo-picture.png'

const Footer = () => {
  return (
    <div className='footer'>
        <span>SUM</span>
        <img src={LogoPic} alt='Sum Trip Logo'/>
        <span>TRIP</span>
    </div>
  )
}

export default Footer