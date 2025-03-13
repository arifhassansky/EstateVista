import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const Slider = () => {
  const slider = [
    {
      id: "1",
      title: "Find Your Dream Home",
      description:
        "Explore our extensive collection of properties tailored to meet your unique needs.",
      image: "https://i.ibb.co.com/8bDcMCX/slide2.jpg",
    },
    {
      id: "2",
      title: "Modern Apartments in Prime Locations",
      description:
        "Discover contemporary apartments located in the heart of bustling city centers.",
      image: "https://i.ibb.co.com/Dt0pKxF/slide3.jpg",
    },
    {
      id: "3",
      title: "Luxurious Villas for a Premium Lifestyle",
      description:
        "Step into luxury with our exclusive range of stunning villas.",
      image: "https://i.ibb.co.com/nsQZLPB/slide6.jpg",
    },
    {
      id: "4",
      title: "Invest in Real Estate with Confidence",
      description:
        "Your trusted partner in making informed property investment decisions.",
      image: "https://i.ibb.co.com/NsS4mLK/slide5.jpg",
    },
    {
      id: "5",
      title: "Comfortable and Affordable Homes",
      description:
        "Find a perfect balance of quality and affordability in our diverse listings.",
      image: "https://i.ibb.co.com/9c2LyJ1/pexels-marketingtuig-87223.jpg",
    },
  ];

  const cards = [
    {
      title: "Easy To Get Started",
      description:
        "Get ready to launch your realty site in minutes without any previous experience",
    },
    {
      title: "Highly customizable",
      description:
        "Customize the site to your expectations by using all of the theme features",
    },
    {
      title: "Drag-and-drop based",
      description:
        "design your page by simply dragging the features using Elementor page builder",
    },
  ];
  return (
    <div>
      <div
        className="h-full "
        style={{
          clipPath: "polygon(0 100%, 100% 90%, 100% 0, 0 0)",
        }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper "
        >
          {slider.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full bg-gradient-to-t from-primary to-transparent shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[550px] object-cover brightness-50 mix-blend-overlay transition-all duration-2000 ease-in-out transform zoom-blur-effect  "
                />
                <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-white md:p-6 rounded-lg max-w-xl text-center">
                  <h2 className="text-4xl font-bold mb-4 ">{slide.title}</h2>
                  <p className="text-lg font-bold mb-6 text-white ">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="bg-gradient-to-t from-primary to-primary/80 flex items-center px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-white px-6 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                className="h-72 p-8 bg-primary/10 flex flex-col justify-center items-center rounded-lg shadow-inner hover:scale-105 hover:shadow-lg transition-transform duration-200"
              >
                <h1 className="text-2xl font-bold mb-4">{card.title}</h1>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
