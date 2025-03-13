import React from "react";
import { useInView } from "react-intersection-observer"; 

const properties = [
  {
    title: "Luxury Villa in Beverly Hills",
    description: "A stunning 5-bedroom villa with a private pool and modern amenities in a prime location.",
    price: "$2,500,000",
    image: "https://i.ibb.co.com/spzXf474/pexels-pixabay-261101.jpg",
  },
  {
    title: "Modern Apartment in New York",
    description: "A stylish 2-bedroom apartment with a city skyline view and premium facilities.",
    price: "$850,000",
    image: "https://i.ibb.co.com/nqwb5Zmc/pexels-thanhhoa-tran-640546-1488291.jpg",
  },
  {
    title: "Cozy Cottage in the Countryside",
    description: "A peaceful retreat surrounded by nature, featuring 3 bedrooms and a large garden.",
    price: "$450,000",
    image: "https://i.ibb.co.com/zVdSL5xd/pexels-pixabay-53610.jpg",
  },
  {
    title: "Beachfront Penthouse in Miami",
    description: "A breathtaking penthouse with ocean views, private beach access, and high-end interiors.",
    price: "$3,200,000",
    image: "https://i.ibb.co.com/Jjcm4k2d/pexels-abid-ali-150086727-10647324.jpg",
  },
];

const Premium = () => {

    const { ref, inView } = useInView({
        triggerOnce: true});
    
  return (
    <section className="bg-gray-50 py-16 my-10">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Premium Properties</h2>
          <p className="text-lg text-gray-600 mt-4">
            Explore our exclusive collection of premium properties.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
           <div
           ref={ref}
           className={`bg-white rounded-xl shadow-lg relative overflow-hidden transform transition-all duration-700${
            inView ? "scale-100 opacity-100" : "scale-75 opacity-0"
           }`}
           style={{ transitionDuration: "0.8s", transitionDelay: `${index * 0.2}s` }}
         >
           <div className="relative">
             <img
               className="w-full h-48 object-cover rounded-tl-xl rounded-tr-xl"
               src={property.image}
               alt={property.title}
             />
             {/* Premium Badge */}
             <span className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-sm font-semibold shadow-md rounded-tr-lg rounded-bl-lg">
               PREMIUM
             </span>
           </div>
           <div className="p-5">
             <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">{property.title}</h3>
             <p className="text-gray-600 mb-4 text-sm">{property.description}</p>
             <p className="text-lg font-bold text-green-700">{property.price}</p>
           </div>
         </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;