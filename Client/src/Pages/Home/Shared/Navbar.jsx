import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/eLogo.png'
import logo2 from '../../../assets/eLogo2.png'
import { AuthContext } from "../../../AuthProvider/AuthProvider";
const Navbar = () => {
    
  const { user, logOut } = useContext(AuthContext);
  const { pathname } = useLocation();

   const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

   
    window.addEventListener("scroll", handleScroll);

    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const navLinks = (
    <>
     <NavLink
  to="/"
  className={({ isActive }) => {
    return isActive
      ? isScrolled
        ? "text-primary font-bold"
        : "text-secondary font-bold"
      : isScrolled
      ? "text-secondary font-bold"
      : "text-primary hover:text-secondary font-bold";
  }}
>
  Home
</NavLink>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) => {
            return isActive
              ? isScrolled
                ? "text-primary font-bold"
                : "text-secondary font-bold"
              : isScrolled
              ? "text-secondary font-bold"
              : "text-primary hover:text-secondary font-bold";
          }}
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => {
            return isActive
              ? isScrolled
                ? "text-primary font-bold"
                : "text-secondary font-bold"
              : isScrolled
              ? "text-secondary font-bold"
              : "text-primary hover:text-secondary font-bold";
          }}
        >
          Dashboard
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => {
            return isActive
              ? isScrolled
                ? "text-primary font-bold"
                : "text-secondary font-bold"
              : isScrolled
              ? "text-secondary font-bold"
              : "text-primary hover:text-secondary font-bold";
          }}
        >
          Contact
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => {
            return isActive
              ? isScrolled
                ? "text-primary font-bold"
                : "text-secondary font-bold"
              : isScrolled
              ? "text-secondary font-bold"
              : "text-primary hover:text-secondary font-bold";
          }}
        >
          About Us
        </NavLink>
      </li>
     {!user && <>
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) => {
            return isActive
              ? isScrolled
                ? "text-primary font-bold"
                : "text-secondary font-bold"
              : isScrolled
              ? "text-secondary font-bold"
              : "text-primary hover:text-secondary font-bold";
          }}
        >
          Login
        </NavLink>
      </li>
     </> }
    </>
  );
  return (
    <div  className={
        isScrolled
          ? "fixed z-[1000] w-full top-0 backdrop-blur-md bg-opacity-70"
          : "fixed z-[1000] w-full top-0"
      }>
      <div className="navbar gap-5 px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
            <img src={pathname === '/' && !isScrolled ? logo : logo2} alt="" className="w-52"/>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>
        <div className="navbar-end">
        {user && user?.email ? (
            <div className="group relative inline-block">
              <img
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                src={user.photoURL}
                referrerPolicy="no-referrer"
                alt="Profile"
              />
              <div className="absolute z-[1000] right-0 mt-2 hidden w-48 bg-white shadow-lg rounded-lg group-hover:block">
                <div className="p-4">
                  <p className="text-sm text-black font-medium">
                    {user.displayName}
                  </p>
                </div>
                <hr />
                <div className="p-2">
                  <button
                    className="w-full px-4 py-2 text-sm text-white bg-[#5bb4e6] rounded hover:bg-[#5bb4e6]"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
