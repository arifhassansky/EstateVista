import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { MdAddLocation, MdOutlineMailOutline } from "react-icons/md";
import Skills from "../../Components/Skills";
import ProjectsInfo from "../../Components/ProjectsInfo ";

const AboutUs = () => {
  return (
    <div>
      <div className="mt-20 py-20 bg-[#061A3A] text-gray-200">
        <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row justify-between items-center">
          <div>
            <div className="my-6">
              <h2 className="text-3xl font-bold text-primary">
                Md. Arif Hassan
              </h2>
              <p className="text-green-500 text-xl">Frontend Developer</p>
            </div>
            <div className="space-y-2">
              <h2 className="flex items-center gap-2">
                <MdOutlineMailOutline />
                <span className="font-bold ">Email:</span>{" "}
                mdarifhassan374@gmail.com
              </h2>
              <h2 className="flex items-center gap-2">
                <FaLinkedin />
                <span className="font-bold ">Linkedin:</span>{" "}
                <a
                  className="hover:underline text-green-300"
                  target="_blank"
                  href="https://www.linkedin.com/in/arif-hassan-8a4642317"
                >
                  arif-hassan-8a4642317
                </a>
              </h2>
              <h2 className="flex items-center -ml-3">
                <img
                  className="w-9 h-5 object-cover "
                  src="https://i.ibb.co.com/b15JzW4/github.png"
                />
                <span className="font-bold mr-2">Github:</span>
                <a
                  className="hover:underline text-green-300"
                  target="_blank"
                  href=" https://github.com/arifhassansky"
                >
                  arifhassansky
                </a>
              </h2>
            </div>

            <div className="my-4">
              <h2 className="flex items-center text:sm md:text-lg gap-2 mt-2">
                <MdAddLocation />
                <span className="font-bold">
                  Address: Mohammadpur, Dhaka,Bangladesh
                </span>
              </h2>
              <p className="flex items-center text-xl gap-2">
                <FaWhatsapp className="text-green-600" />
                <span className="font-bold">Whatsapp:</span> +8801960606195
              </p>
            </div>
          </div>
          <div>
            <figure className=" mt-8 md:mt-0">
              <img
                className="md:w-80 lg:w-[600px]"
                src="https://i.ibb.co.com/C2P21cg/Untitled-1.png"
              />
            </figure>
          </div>
        </div>
      </div>
      <Skills />
      <ProjectsInfo />
    </div>
  );
};

export default AboutUs;
