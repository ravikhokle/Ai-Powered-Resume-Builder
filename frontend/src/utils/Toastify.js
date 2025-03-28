import { toast } from "react-toastify";

const Toastify = (type , msg) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    theme: "light"
  };

  switch (type) {
    case "success":
      toast.success(msg, options);
      break;
    case "error":
      toast.error(msg, options);
      break;
    case "info":
      toast.info(msg, options);
      break;
    case "warning":
      toast.warn(msg, options);
      break;
    default:
      console.error("Invalid toast type:", type);
  }
  
};

export default Toastify;