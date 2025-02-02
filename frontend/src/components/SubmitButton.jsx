import { FileHeart } from "lucide-react";

const SubmitButton = ({ name = "Submit" }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="submit"
        className="cursor-pointer inline-flex items-center px-4 py-2 my-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-red-600 to-pink-600 focus:outline-none focus:ring-4 focus:transition-all transform hover:scale-104"
      >
        <FileHeart className="h-6 w-6 mr-2 text-red-500 bg-white rounded-full p-1" />
        <span className="text-[18px]">{name}</span>
      </button>
    </div>
  );
};

export default SubmitButton;
