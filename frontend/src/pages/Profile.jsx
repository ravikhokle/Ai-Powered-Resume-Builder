import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedName = JSON.parse(localStorage.getItem("name"));
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      // Redirect to login if token is missing
      navigate("/login");
    } else {
      setUserName(storedName || "User");
      setToken(storedToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and navigate to login
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="text-center px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to Your Profile</h1>
      <div className="mt-6">
        <p className="text-lg">Name: {userName}</p>

      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
