import { TypeAnimation } from "react-type-animation";

const MyTypeAnimation = ({text1, text2, text3, text4, text5}) => {
  return (
        <TypeAnimation
        sequence={[
          `${text1}`,
          1000,
          text2 && `${text2}`,
          1000,
          text3 && `${text3}`,
          1000,
          text4 && `${text4}`,
          1000,
          text5 && `${text5}`,
          1000,
        ]}
        speed={50}
        repeat={Infinity}
      />
  )
}

export default MyTypeAnimation