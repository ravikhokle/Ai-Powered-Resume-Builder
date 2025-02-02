import { FileHeart  } from "lucide-react";
import { Link } from "react-router-dom";

const DownloadButton = ({name, url}) => {
  return (
    <button className="inline-flex items-center px-4 py-2 my-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-red-600 to-pink-600 focus:outline-none focus:ring-4 focus:transition-all transform hover:scale-104">
  <Link to={url} target="_blank" className="flex items-center">
    <FileHeart className="h-5 w-5 mr-3 text-white" />
    {name}
  </Link>
</button>

  
  );
};

export default DownloadButton;
