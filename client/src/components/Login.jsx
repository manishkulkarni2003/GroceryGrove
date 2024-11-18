import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for handling form data and toggle
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [isSignInForm, setIsSignInForm] = useState(false); // Toggle state
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch(addUser(data)); // Store user in Redux
        alert('Registration successful!');
        navigate('/body');
      } else {
        setErrorMessage(data.message || 'Registration failed'); // Handle server-side errors
      }
    } catch (err) {
      console.log(err.message, "Error");
      setErrorMessage("An error occurred while registering"); // Handle client-side errors
    }
  };

  // Sign-in user
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch(addUser(data)); // Store user in Redux
        alert('Sign In successful!');
        navigate('/body');
      } else {
        setErrorMessage(data.message || 'Sign In failed'); // Handle server-side errors
      }
    } catch (error) {
      console.log(error.message, "Error");
      setErrorMessage("An error occurred while signing in"); // Handle client-side errors
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-yellow-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        
        {/* Conditionally render Sign Up or Sign In form */}
        <form onSubmit={isSignInForm ? handleSignIn : handleRegister}>
          {!isSignInForm && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="fullname"
                name="fullname"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Sign Up and Sign In */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignInForm(!isSignInForm)}
            className="text-blue-500 hover:underline"
          >
            {isSignInForm ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>

        {/* Display error message if any */}
        {errorMessage && (
          <div className="mt-4 text-center text-red-500">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
