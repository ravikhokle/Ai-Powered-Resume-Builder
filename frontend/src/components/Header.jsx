import { FileText, CircleUser, House } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              AI Resume Builder
            </h1>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4 gap-2 sm:gap-3">
            <Link
              to="/"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <House className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </Link>
            <Link
              to="/login"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <CircleUser className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
