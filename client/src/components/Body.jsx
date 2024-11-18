import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const Body = () => {
  const user =useSelector((store)=>store.user)
  const navigate =useNavigate("/")

  if(!user){
    navigate("/")
    return null
  }

  return (
    <>
    
    <div>
      body
    </div>
    </>
  )
}

export default Body
