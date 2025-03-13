import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const agents = [
  {
    id: 1,
    name: "Wade Warren",
    role: "Salesperson",
    image: "https://i.ibb.co/HDJ9twR8/Arif-s.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Leslie Alexander",
    role: "Commercial Broker",
    image: "https://i.ibb.co.com/5cJ53b9/emily-carter.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Darlene Robertson",
    role: "Realtor",
    image: "https://i.ibb.co.com/J2WJqCX/john-smith.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
];

const CallToAgent = () => {
  return (
    <section className="w-11/12 mx-auto py-20 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Meet the Agents</h2>
        <p className="text-lg text-gray-600 mt-2">
          Connect with our top real estate professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 px-6">
        {agents.map((agent) => (
          <div key={agent.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden group">
          
            <div className="relative">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute top-0 right-0 h-[255px] w-12 p-2 bg-secondary flex flex-col items-center justify-center gap-6 
                translate-x-full opacity-80 group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                <a href={agent.social.facebook} className="text-white text-lg hover:scale-110 transition">
                  <FaFacebookF />
                </a>
                <a href={agent.social.twitter} className="text-white text-lg hover:scale-110 transition">
                  <FaTwitter />
                </a>
                <a href={agent.social.linkedin} className="text-white text-lg hover:scale-110 transition">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

           
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold">{agent.name}</h3>
              <p className="text-gray-500">{agent.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CallToAgent;
