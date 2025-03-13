import React from "react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../../../assets/eLogo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="bg-primary text-gray-300 py-8">
        <div className="container mx-auto px-4">
          {/* Website Name and Description */}
          <div className="mb-6 text-center md:text-left">
            <img src={Logo} alt="" className="w-44" />

            <p className="text-sm mt-2">
              Empowering you with solutions that matter. Join us to create
              something extraordinary!
            </p>
          </div>
          {/* Divider */}
          <hr className="border-white-700 my-6" />
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 text-center md:text-left">
            {/* Contact Info */}
            <div className="mb-6 ">
              <h3 className="text-lg font-semibold text-white mb-2">
                Contact Us
              </h3>
              <p className="flex gap-3 mb-2">
                <FaEnvelope className="text-2xl"></FaEnvelope>
                <a
                  href="mailto:athleonsupport@yourwebsite.com"
                  className="text-[#2375cc] hover:underline"
                >
                  mdarifhassan374@gmail.com
                </a>
              </p>
              <p className="flex gap-3 mb-2">
                <FaPhoneAlt className="text-2xl"></FaPhoneAlt>
                <span>+8801960606195</span>{" "}
              </p>
              <p className="flex gap-3 mb-2">
                <FaMapMarkerAlt className="text-2xl"></FaMapMarkerAlt>
                <span>Dhaka, Bangladesh</span>{" "}
              </p>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Our Services
              </h3>
              <ul className="text-md">
                <li>
                  <Link to="/all-properties" className="hover:text-white">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/Home" className="hover:text-white">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            {/* Social Media Links */}
            <div className="mb-6 md:w-1/3">
              <h3 className="text-lg font-semibold text-white mb-2">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.facebook.com/ayesha.ferdous.94"
                  className="text-gray-300 hover:text-white"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>

                <a
                  href="https://www.instagram.com/ayeshaferdous31/"
                  className="text-gray-300 hover:text-white"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayesha-ferdous-682419317/"
                  className="text-gray-300 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-white-700 my-6" />
          {/* Copyright */}
          <div className="text-center py-2">
            <p className="text-sm">
              &copy; 2025 EstateVista. All rights reserved.
            </p>
            <p>Designed with ❤️ Md. Arif Hassan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
