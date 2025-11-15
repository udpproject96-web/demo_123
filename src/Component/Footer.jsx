import { FaWhatsapp,FaLinkedin,FaGithub   } from "react-icons/fa";
import { Link } from 'react-router-dom'
import '../assets/css/footer.css'

const Footer = () => {
  return (
    <>
        <div className='footer bg-dark w-100 p-0 mt-5'>
            <div className="row mx-0 p-5 align-items-center">
                <div className="col p-0 m-0">
                    <p className='text-light text-capitalize m-0'>developed by <Link to="" className='text-light text-decoration-none'>@mihir vaghela</Link></p>
                </div>
                <div className="col">
                    <ul className='d-flex list-unstyled gap-5 justify-content-end m-0'>
                        <li className="mx-3"><Link to="https://wa.me/1245789630" target='_blank' className="text-light"><FaWhatsapp /></Link></li>
                        <li className="mx-3"><Link to="https://www.linkedin.com/in/mihir-vaghela-6a24a8242/" target='_blank' className="text-light"><FaLinkedin /></Link></li>
                        <li className="mx-3"><Link to="https://www.github.com/mihir183" target='_blank' className="text-light"><FaGithub /></Link></li>
                    </ul>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Footer
