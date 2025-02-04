import { Plus } from "lucide-react";

const PlusButton = ({funName, displayName}) => {
  return (
    <button
    type="button"
    onClick={funName}
    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
  >
    <Plus className="h-4 w-4 mr-1.5" />
    {displayName}
  </button>
  )
}

export default PlusButton