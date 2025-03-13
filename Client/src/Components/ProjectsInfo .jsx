import { Link } from "react-router-dom";

const Projects = [
  {
    image: "https://i.ibb.co.com/Zd3JY6B/Screenshot-2025-01-20-024558.png",
    url: "https://roomifysky.netlify.app",
    title: "Rooomify",
    desc: "Roomify Platform is a hotel booking app that lets users browse, book, and manage rooms with secure authentication and a responsive interface.",
  },
  {
    image: " https://i.ibb.co.com/0FZDQXC/Screenshot-2025-01-20-024505.png",
    url: "https://visa-navigator.netlify.app",
    title: "Visa Nevigator",
    desc: "Visa Navigator Portal simplifies visa applications by offering easy access to requirements, online applications, and real-time tracking.",
  },
  {
    image: "https://i.ibb.co.com/XzRH3ZV/Screenshot-2025-01-20-024744.png",
    url: "https://lingo-bingo.netlify.app",
    title: "Lingo Bingo",
    desc: "Lingo Bingo is an interactive app that helps users expand their vocabulary with fun lessons, audio pronunciations, and tutorials.",
  },
  {
    image: "https://i.ibb.co.com/8X2tx8k/gadget-heaven.jpg",
    url: "https://gadget-heaven-sky.netlify.app",
    title: "Gadget Heaven",
    desc: "GadgetHaven is a gadget store with a cart, wishlist, filtering, sorting, and smooth local storage-based functionality.",
  },
];

const ProjectsInfo = () => {
  return (
    <div className="w-11/12 mx-auto my-24">
      <h1 className="text-4xl font-extrabold tracking-wide mb-12 text-center">
        Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Projects.map((skill, index) => (
          <Link
            to={skill?.url}
            key={index}
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img className="h-36 w-full rounded-lg mb-4" src={skill.image} />
            <h3 className="text-2xl font-semibold mb-2">{skill.title}</h3>
            <p>{skill.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsInfo;
