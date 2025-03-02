import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    setError(null); // Clear previous errors
    try {
      const url = `${import.meta.env.VITE_API}/login`;
      const response = await axios.post(url, { email, password }); // Await the axios call
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", JSON.stringify(response.data.result.name));
      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Show server error message
      } else {
        setError("An unexpected error occurred. Please try again."); // Generic error
      }
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Welcome Back!
        </h1>
        <h2 className="text-lg text-gray-700 text-center mb-6">
          Login to your account
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
