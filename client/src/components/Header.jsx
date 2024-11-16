import { Link } from "react-router-dom";
const Header=()=>{


    return(
        
<div className="flex w-full bg-gray-300 border-b items-center justify-between p-3 m-auto top-0">
<img className="w-20  rounded-lg" src="/images/Logo.jpeg" alt="Logo" />

        <ul className="flex space-x-6">
    <li className="p-2 hover:font-bold">Login</li>
    <li className="p-2 hover:font-bold"><Link to="/seller">Become a Seller</Link></li>
    <li className="p-2 hover:font-bold">Contact us</li>
        </ul>
    </div>

    )
}

export default Header;