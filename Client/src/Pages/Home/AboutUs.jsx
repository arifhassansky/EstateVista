import React from "react";
import profile from "../../assets/surela.jpg";
import shelfmate from '../../assets/shelf.png'
import estatevista from '../../assets/estatevista.png'
import athleon from '../../assets/ATH.png'
import {
  FaUserShield,
  FaRegHeart,
  FaSearchLocation,
  FaTags,
  FaHandshake,
  FaShieldAlt,
  FaMoneyCheckAlt,
  FaBullhorn,
} from "react-icons/fa";

// Sample project data
const projects = [
  {
    image: estatevista, 
    name: "EstateVista",
    description:
      "A real estate platform that enables users to browse properties, make offers, and complete secure transactions.",
  },
  {
    image: shelfmate, 
    name: "Shelfmate",
    description:
      "A smart book management system for businesses to track, organize, and analyze stock efficiently.",
  },
  {
    image: athleon, 
    name: "Athleon",
    description:
      "It is a responsive e-commerce platform that allows customers to browse, purchase, and review various sports accessories.",
  },
];

// Key Features Data
const keyFeatures = [
  {
    icon: <FaUserShield size={32} className="text-primary" />,
    title: "User Roles & Authentication",
    description:
      "Three distinct roles: User, Agent, and Admin, ensuring seamless and secure access.",
  },
  {
    icon: <FaSearchLocation size={32} className="text-primary" />,
    title: "Property Listings & Search",
    description:
      "Advanced search and filters based on location, price range, and property type.",
  },
  {
    icon: <FaRegHeart size={32} className="text-primary" />,
    title: "Wishlist & Reviews",
    description:
      "Users can save favorite properties and leave detailed reviews for better decision-making.",
  },
  {
    icon: <FaHandshake size={32} className="text-primary" />,
    title: "Make an Offer",
    description:
      "Users can place property offers within the agent-specified price range for transparency.",
  },
  {
    icon: <FaShieldAlt size={32} className="text-primary" />,
    title: "Offer Management for Agents",
    description:
      "Agents can accept or reject offers and manage property transactions easily.",
  },
  {
    icon: <FaMoneyCheckAlt size={32} className="text-primary" />,
    title: "Secure Payments",
    description:
      "Stripe-powered transactions ensure smooth and safe property purchases.",
  },
  {
    icon: <FaTags size={32} className="text-primary" />,
    title: "Admin Dashboard",
    description:
      "Admins can verify properties, manage users, and oversee platform activities.",
  },
  {
    icon: <FaBullhorn size={32} className="text-primary" />,
    title: "Advertisement Feature",
    description:
      "Highlighted property promotions for better visibility and faster sales.",
  },
];

const AboutUs = () => {
  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <div>
          <img
            src={profile}
            alt="Ayesha Ferdous"
            className="w-60 rounded-full shadow-lg"
          />
        </div>
        <div className="text-center md:text-left md:w-3/5">
          <h2 className="text-3xl font-bold text-primary">Ayesha Ferdous</h2>
          <p className="font-semibold text-xl">Frontend Web Developer</p>
          <p className="mt-3">
            📱 WhatsApp: <span className="font-medium">+8801305095882</span>
          </p>

          <p className="mt-2">
            🔗 LinkedIn:
            <a
              href="https://www.linkedin.com/in/ayesha-ferdous/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.linkedin.com/in/ayesha-ferdous/
            </a>
          </p>

          <p className="mt-2">
            💻 GitHub:
            <a
              href="https://github.com/Ayesha-Ferdous"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-medium hover:text-gray-600 hover:underline"
            >
              github.com/Ayesha-Ferdous
            </a>
          </p>
        </div>
      </div>

      {/* About & Project Description */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-primary">About Me</h2>
        <p className="mt-4 text-lg leading-relaxed">
          I am Ayesha Ferdous, a passionate Frontend Web Developer with
          expertise in building modern, responsive, and user-friendly web
          applications. I specialize in creating seamless UI/UX experiences
          using React.js, Tailwind CSS, and JavaScript, ensuring efficiency and
          scalability. With a strong foundation in the MERN stack, I integrate
          front-end applications with powerful backend solutions, making web
          applications interactive and dynamic.
        </p>
      </div>

      {/* EstateVista Project Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-primary">
          EstateVista - Real Estate Platform
        </h2>
        <p className="mt-4 text-lg leading-relaxed">
          EstateVista is a feature-rich real estate platform designed to
          streamline property transactions between users, agents, and admins. It
          enables users to explore properties, make offers, and complete secure
          transactions, while agents can manage listings, and admins oversee
          platform activities.
        </p>

        {/* Key Features Section */}
        <h3 className="text-4xl font-bold text-primary text-center mt-6">
          Key Features of EstateVista
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {keyFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white shadow-md border border-gray-200 p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-primary text-center">
          My Projects
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 p-6 rounded-2xl text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <img
                src={project.image}
                alt={project.name}
                className="rounded-lg mb-4 w-full h-56 object-cover"
              />
              <h4 className="text-2xl font-semibold text-gray-800">
                {project.name}
              </h4>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;