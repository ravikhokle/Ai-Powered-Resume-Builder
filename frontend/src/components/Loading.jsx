import {PulseLoader} from "react-spinners";

const Loading = ({ show }) => {
  return (
    show && (
      <div>
        <PulseLoader color="#00ff1e" size={15} speedMultiplier={0.9} />
      </div>
    )
  );
};

export default Loading;
