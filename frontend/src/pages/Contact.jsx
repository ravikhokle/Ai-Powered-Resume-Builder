import { Mail } from "lucide-react";
import MyTypeAnimation from "../utils/TypeAnimation";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-start">
        Connect with{" "}
        <span className="text-blue-500">
          <MyTypeAnimation
            text1="Our Support Team"
            text2="Experts Ready to Assist"
            text3="Your Queries Matter"
            text4="24/7 Assistance"
          />
        </span>
      </h1>

      {/* Contact Information */}
      <div className="mt-12">
        <h2 className="text-2xl text-center sm:text-3xl font-bold text-gray-500">
          Contact Information
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          Have questions or need help? Feel free to reach out to us. Our team is
          here to assist you with any inquiries.
        </p>
        <ul className="mt-8 text-lg text-gray-700 text-center space-y-4">
          <li>📞 Phone: +91 7218014410</li>
          <li>
            ✉️ Email:{" "}
            <a
              href="mailto:ravikhokle1@gmail.com"
              className="text-blue-500 hover:underline inline-flex items-center"
            >
              <Mail className="mr-2" size={20} />
              ravikhokle1@gmail.com
            </a>
          </li>
          <li>📍 Address: Parbhani, India - 431401</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold my-2 py-2">
          Need Help? Get in Touch Now!
        </h2>
        <a
          href="mailto:ravikhokle1@gmail.com"
          className="inline-flex items-center px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-bold transition duration-300"
        >
          <Mail className="mr-2" size={20} />
          Email Us
        </a>
      </div>
    </div>
  );
};

export default Contact;
  