import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useRef } from "react";


const SellerLogin = () => {

    const navigate =useNavigate();

    const nameRef =useRef(null)
    const emailRef =useRef(null)
    const numberRef =useRef(null)
    const passwordRef =useRef(null)

    const handleSubmit=async(e)=>{
        e.preventDefault();


        const sellerData ={
            fullname:nameRef.current.value ,
            email:emailRef.current.value ,
            contact:numberRef.current.value ,
            password:passwordRef.current.value 
        };
        try{
            const response =await axios.post("http://localhost:8080/owner/register",sellerData);
            console.log("response:",response.data)
            alert("Registered");
            navigate("/dashboard")
        }
        catch(err){
            console.log(err.message)
        }
    
}
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-yellow-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Become a seller</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                fullname
            </label>
            <input  ref={nameRef}
            id="fullname"
            name="fullname"
            type="text" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Enter Your Fullname"/>
            
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                email
            </label>
            <input ref={emailRef}
            type="text"
            id="email"
            name="email"

            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter your email" />
            
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                contact number
            </label>
            <input ref={numberRef}
            type="tel"
            id="number"
            name="number"

            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter your phone number" />
            
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input ref={passwordRef}
            type="password"
            id="password"
            name="password"

             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="enter your password"/>
            
        </div>
        <button type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >

            
            Sign Up

        </button>

        </form>
      </div>
    </div>
  )
}

export default SellerLogin
