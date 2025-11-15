import error from '../assets/images/error.png'

const Error = () => {
  return (
    <>
        <div className="col-lg-6 m-auto text-center shadow mt-5 rounded-2">
            <img src={error} alt="" className='' />
            <h1 className='text-capitalize fw-bolder pb-4'>page not found</h1>
        </div> 
    </>
  )
}

export default Error
