import React from "react";
import gallery1 from '../../assets/gallery1.jpg'
import gallery2 from '../../assets/gallery2.jpg'
import gallery3 from '../../assets/gallery3.jpg'
import gallery4 from '../../assets/gallery4.jpg'
import gallery5 from '../../assets/gallery5.jpg'
import gallery6 from '../../assets/gallery6.jpg'
import gallery7 from '../../assets/gallery7.jpg'
import gallery8 from '../../assets/gallery8.jpg'
import gallery9 from '../../assets/gallery9.jpg'
const GridLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto my-10">
      {/* Apartment - col-span-2 */}
      <div className="col-span-2 relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery1}
          alt="Apartment"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Apartment</h2>
          <p className="text-white text-sm mt-1">7 Properties</p>
        </div>
      </div>

      {/* Villa */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery2}
          alt="Villa"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Villa</h2>
          <p className="text-white text-sm mt-1">10 Properties</p>
        </div>
      </div>

      {/* Single-Family Home */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery3}
          alt="Single-Family Home"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase text-center">
            Single-Family Home
          </h2>
          <p className="text-white text-sm mt-1">5 Properties</p>
        </div>
      </div>

      {/* Studio */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery4}
          alt="Studio"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Studio</h2>
          <p className="text-white text-sm mt-1">3 Properties</p>
        </div>
      </div>

      {/* Shop */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery5}
          alt="Shop"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Shop</h2>
          <p className="text-white text-sm mt-1">6 Properties</p>
        </div>
      </div>

      {/* Office - col-span-2 */}
      <div className="col-span-2 relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery6}
          alt="Office"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Office</h2>
          <p className="text-white text-sm mt-1">8 Properties</p>
        </div>
      </div>

      {/* Condo - col-span-2 */}
      <div className="col-span-2 relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery7}
          alt="Condo"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Condo</h2>
          <p className="text-white text-sm mt-1">4 Properties</p>
        </div>
      </div>

      {/* Lot */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery8}
          alt="Lot"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase">Lot</h2>
          <p className="text-white text-sm mt-1">1 Property</p>
        </div>
      </div>

      {/* Multi-Family Home */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={gallery9}
          alt="Multi-Family Home"
          className="w-full h-40 object-cover brightness-50 group-hover:brightness-100 transition duration-100"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-lg font-bold uppercase text-center">
            Multi-Family Home
          </h2>
          <p className="text-white text-sm mt-1">9 Properties</p>
        </div>
      </div>
    </div>
  );
};

export default GridLayout;