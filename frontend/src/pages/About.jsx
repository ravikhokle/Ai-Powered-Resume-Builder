
import NormalButton from "../components/NormalButton";
import MyTypeAnimation from "../utils/TypeAnimation";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-start">
        About Our{" "}
        <span className="text-blue-500">
          <MyTypeAnimation
            text1="AI-Powered Resume Builder"
            text2="Innovative Features"
            text3="User-Centric Design"
            text4="Commitment to Excellence"
          />
        </span>
      </h1>

      {/* About Content */}
      <div className="mt-12">
        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-500">
          Our Mission
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          At the heart of our project lies a passion for empowering individuals
          to create professional resumes effortlessly. By combining cutting-edge
          AI technology with user-friendly design, we aim to simplify the job
          application process for everyone.
        </p>

        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-500 mt-16">
          Why Choose Us?
        </h2>
        <ul className="mt-4 text-lg text-gray-700 text-center space-y-3">
          <li>🚀 Fast and Easy Resume Creation</li>
          <li>🤖 AI-Powered Grammar Checker</li>
          <li>📄 ATS-Friendly Resume Templates</li>
          <li>💾 Cloud-Based Media Storage</li>
          <li>🔒 Secure and Reliable Services</li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold my-2 py-2">
          Ready to Create Your Resume?
        </h2>
        <NormalButton url="/simple-resume" name="Get Started" />
      </div>
    </div>
  );
};

export default About;
