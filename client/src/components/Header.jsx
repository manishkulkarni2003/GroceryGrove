import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { removeSeller } from "../utils/sellerSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const owner = useSelector((store) => store.owner);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/users/logout", {
                method: "GET", // Normally, logout is a GET request to clear the session
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                dispatch(removeUser());
                dispatch(removeSeller()); // Clear the user data from Redux
                navigate("/"); // Redirect to home page or login page
            } else {
                console.log("Logout failed");
            }
        } catch (err) {
            console.log(err.message, "An error occurred while logging out");
        }
    };

    return (
        <div className="flex w-full bg-gray-300 border-b items-center justify-between p-3 m-auto top-0">
            <img className="w-20 rounded-lg" src="/images/Logo.jpeg" alt="Logo" />
            <ul className="flex space-x-6">
                <li className="p-2 hover:font-bold">Newsletter</li>
                <li className="p-2 hover:font-bold">
                    <Link to="/seller">Become a Seller</Link>
                </li>
                <li className="p-2 hover:font-bold">Contact us</li>
                {(user || owner) && (
                    <>
                        <li className="p-2 hover:font-bold">
                            {`Welcome, ${user?.fullname || owner?.fullname}`}
                        </li>
                        <li className="p-2 hover:font-bold">
                            <Link to="/cart">Cart</Link>
                            
                        </li>
                        <li className="p-2 hover:font-bold" onClick={handleLogout}>
                            Logout
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Header;
