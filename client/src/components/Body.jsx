import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {ProductList} from "./ProductList"
const Body = () => {
  const user =useSelector((store)=>store.user)
  const navigate =useNavigate("/")
  

  if(!user){
    navigate("/")
    return null
  }

  return (
    <>
    
    <div className="min-h-screen bg-gray-100">
      <ProductList/>
    </div>
    </>
  )
}

export default Body
