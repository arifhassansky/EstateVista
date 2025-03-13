const skills = [
  {
    image: "https://i.ibb.co.com/WVVnXqv/web.jpg",
    title: "Web Development",
    desc: "Expertise in HTML, CSS, JavaScript, React, and Node.js.",
  },
  {
    image: "https://i.ibb.co.com/rfz3yQ9/ui.jpg",
    title: "UI/UX Design",
    desc: "Designing seamless interfaces and user experiences.",
  },
  {
    image: "https://i.ibb.co.com/PrTC4Jy/problem.jpg",
    title: "Problem Solving",
    desc: "Turning complex challenges into elegant solutions.",
  },
  {
    image: "https://i.ibb.co.com/PCfN0nG/freelancing.webp",
    title: "Timing Excellence",
    desc: "Delivering timely and professional results for clients worldwide.",
  },
];

const Skills = () => {
  return (
    <div className="w-11/12 mx-auto my-24">
      <h1 className="text-4xl font-extrabold tracking-wide mb-12 text-center">
        Skills
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <img className="h-36 w-full rounded-lg mb-4" src={skill.image} />
            <h3 className="text-2xl font-semibold mb-2">{skill.title}</h3>
            <p>{skill.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
