import { FileDown  } from "lucide-react";
import { Link } from "react-router-dom";
import Toastify from "../utils/Toastify";

const DownloadButton = ({ name, url }) => {
  return (
    <Link to={url} target="_blank" className="flex items-center justify-center">
      <button onClick={() => Toastify("info", "Resume Downloaded")} className="cursor-pointer inline-flex items-center px-4 py-2 my-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-red-600 to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:transition-all transform hover:scale-104">
        <FileDown  className="h-6 w-6 mr-2 text-red-500 bg-white rounded-full p-1" />
        <span className="text-[18px]">{name}</span>
      </button>
    </Link>
  );
};

export default DownloadButton;
