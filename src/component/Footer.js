import React from "react";
import logof from "../image/logof.png";
import {  FaFacebookSquare, FaYoutubeSquare, FaInstagramSquare} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logof} alt="Boutique Logo" className="h-30" />
          </div>

          {/* Categories & Information */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>Roundneck Tshirt</li>
                <li>Polo Tshirt</li>
                <li>Oversized Tshirt</li>
                <li>Hoodies</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-sm">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Shipping Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          
          <p className="text-sm">
            <strong>Address 1:</strong> 17, 1st Floor, Vasudev Plaza, Nr. Bhopal Gram Panchayat, Bhopal
          </p>
          <p className="text-sm mt-2">
            <strong>Mobile:</strong> +91 9638949088
          </p>
          <p className="text-sm  mt-2">
            <strong>Address 2:</strong> 24/7 Pam Boutique, Opp Pooja Party Plot,
            Keshavbaug, Ahmedabad, India
          </p>
        </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">Pam Boutique © 2025</p>
          {/* Social Icons */}
          <div className="flex space-x-6 text-gray-500">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebookSquare className="text-lg text-[#1877F2] hover:opacity-80" />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <FaYoutubeSquare className="text-lg text-[#FF0000] hover:opacity-80" />
            </a>
            <a href="#" className="hover:text-pink-600 transition">
              <FaInstagramSquare className="text-lg text-[#E4405F] hover:opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
