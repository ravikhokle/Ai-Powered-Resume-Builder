import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(JSON.parse(localStorage.getItem("name")));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setName(JSON.parse(localStorage.getItem("name")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="text-center px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to Your Profile</h1>
      <div className="mt-6">
        <p className="text-lg">Name: {name}</p>
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
