import { FileText, CircleUser, House } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            AI Resume Builder
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-4 gap-2 sm:gap-3">
          <Link
            to="/"
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
            aria-label="Home"
          >
            <House className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </Link>

          {isLoggedIn ? (
            /* Profile Icon */
            <Link
              to="/profile"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
              aria-label="Profile"
            >
              <CircleUser className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </Link>
          ) : (
            /* Login Icon */
            <Link
              to="/login"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
              aria-label="Login"
            >
              <CircleUser className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
