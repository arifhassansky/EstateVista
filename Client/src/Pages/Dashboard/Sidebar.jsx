import React, { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";
import {
  MdOutlineReviews,
  MdRealEstateAgent,
  MdAddHomeWork,
  MdOutlineDomainAdd,
  MdAdminPanelSettings,
} from "react-icons/md";
import { TbGitPullRequest, TbHomeHand } from "react-icons/tb";
import { FaBuildingUser } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import useRole from "../../hooks/useRole";
import logo from "../../assets/eLogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Sidebar = () => {
  const [role, loading] = useRole();
  const [navLinks, setNavLinks] = useState([]);
  const { logOut } = useContext(AuthContext);

  
  useEffect(() => {
    if (!loading) {
      if (role === "customer") {
        setNavLinks([
          {
            name: "Profile",
            icon: <MdRealEstateAgent />,
            path: "/dashboard",
          },
          {
            name: "Wishlist",
            icon: <IoMdHeart />,
            path: "/dashboard/wishlist",
          },
          {
            name: "Property Bought",
            icon: <FaMapMarkedAlt />,
            path: "/dashboard/property-bought",
          },
          {
            name: "My Reviews",
            icon: <MdOutlineReviews />,
            path: "/dashboard/myReviews",
          },
        ]);
      } else if (role === "agent") {
        setNavLinks([
          {
            name: "Profile",
            icon: <MdRealEstateAgent />,
            path: "/dashboard",
          },
          
          {
            name: "Add Property",
            icon: <MdAddHomeWork />,
            path: "/dashboard/add-property",
          },
          {
            name: "My Added Properties",
            icon: <MdOutlineDomainAdd />,
            path: "/dashboard/my-added-properties",
          },
          {
            name: "Requested Properties",
            icon: <TbGitPullRequest />,
            path: "/dashboard/requested-properties",
          },
          {
            name: "My Sold Properties",
            icon: <TbHomeHand />,
            path: "/dashboard/my-sold-properties",
          },
        ]);
      } else if (role === "admin") {
        setNavLinks([
          {
            name: "Profile",
            icon: <MdRealEstateAgent/>,
            path: "/dashboard",
          },
          {
            name: "Manage Users",
            icon: <FaBuildingUser />,
            path: "/dashboard/manageUsers",
          },
          {
            name: "Manage Properties",
            icon: <BsBuildingsFill />,
            path: "/dashboard/manageProperties",
          },
          {
            name: "Manage Reviews",
            icon: <MdOutlineReviews />,
            path: "/dashboard/manageReviews",
          },
          {
            name: "Advertise",
            icon: <MdOutlineReviews />,
            path: "/dashboard/advertise",
          },
        ]);
      }
    }
  }, [role, loading]);

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary/80 text-gray-100 w-20 lg:w-52 transition-all duration-300 flex flex-col items-center lg:items-start py-6 shadow-md">
        <div className="flex items-center justify-center w-full lg:justify-start lg:px-4">
          <h1 className="text-xl font-bold text-center lg:text-left">
            <img src={logo} alt="Logo" className="hidden lg:block" />
            <span className="block lg:hidden">DB</span>
          </h1>
        </div>

        <nav className="flex flex-col w-full space-y-4 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center justify-center lg:justify-start l p-2 w-full hover:bg-primary rounded-md group"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="hidden lg:block ml-4">{link.name}</span>
            </Link>
          ))}
          <div className="divider text-secondary"></div>
          <div className="flex flex-col justify-center lg:justify-start">
            <Link
              to="/"
              className="flex gap-4 items-center justify-center lg:justify-start p-2 w-full hover:bg-primary rounded-md group"
            >
              <FaHome className="text-xl"></FaHome>
              <span className="hidden lg:block ml-4">Home</span>
            </Link>
            <button
              onClick={logOut}
              className="flex gap-4 items-center justify-center lg:justify-start p-2 w-full hover:bg-primary rounded-md group"
            >
              <MdAdminPanelSettings className="text-xl" />
              <span className="hidden lg:block ml-4">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
