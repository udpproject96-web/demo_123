import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams ,Link} from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";

const SingleProduct = () => {
    const {id} = useParams()
    const [single,setSingle] = useState({})

    async function SingleProduct() {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Products/${id}`)
        setSingle(res.data)
    }

    useEffect(()=>{
        SingleProduct()
    },[id])
  return (
    <>
      <div className="col-lg-6 m-auto mt-5 p-5 shadow rounded-2">
        <Link to='/'>
            <button className='btn position-absolte bg-transparent fs-5 m-0 p-3'>
                <IoArrowBack />
            </button>
        </Link>
        <div className="row">
            <div className="col-lg-4">
                <img src={single.image} alt="" width='100%' height={300} />
            </div>
            <div className="col-lg-8">
                <h2>name : {single.product_name}</h2>
                <p>category : {single.category} </p>
                <p>price : {single.price} </p>
                <p>total product : {single.total  } </p>
                <p>description : {single.description} </p>
                <button className='btn btn-outline-dark'>buy</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default SingleProduct
