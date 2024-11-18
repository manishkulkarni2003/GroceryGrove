import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate=useNavigate
    const user = useSelector((state) => state.user?.user);

    if (!user) {
        // alert("You must log in to access this page!");
        return navigate("/")
    }

    return children;
};

export default ProtectedRoute;
