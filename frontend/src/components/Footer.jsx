import { Github, Linkedin, Instagram, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-5">
      <div className="flex justify-center px-4 py-4 sm:py-6">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            AI Resume Builder
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mb-5 sm:px-6 lg:px-8 sm:flex items-center justify-between">
        <div className="flex justify-center  space-x-3 py-2 sm:py-0">
          <a
            href="https://www.linkedin.com/in/ravikhokle/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/ravikhokle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/ravikhokle5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="mailto:ravikhokle1@gmail.com"
            className="text-gray-600 hover:text-blue-600"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start space-x-4 py-2 sm:py-0">
          <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Powered Resume Builder • All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
