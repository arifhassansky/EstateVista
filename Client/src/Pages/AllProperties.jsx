import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import Card from "../Components/Card";


const AllProperties = () => {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { data : properties , isLoading, refetch } = useQuery({
    queryKey: ["allProperties", search, sort],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_URL}/allProperties?status=accepted&search=${search}&sort=${sort}`);
      return data;
    },
  });
  
  const handleReset = ()=>{
    setSearch('');
    setSort('');
  }
  
  return (
    <div className="w-11/12 mx-auto mt-10 mb-10">

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-5">
      <div className="flex  p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-primary focus-within:ring-primary ">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={e=> setSearch(e.target.value)}
            value={search}
            placeholder="Enter Property Location"
            aria-label="Enter Book Name"
          />

          <button className="group relative overflow-hidden rounded bg-primary/80 px-6 py-2 text-white transition-all duration-300  hover:bg-primary/60 ">
            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
            <span className="relative">Search</span>
          </button>
        </div>
        <div>
            <select
              name='minPrice'
              id='minPrice'
              onChange={e=> setSort(e.target.value)}
              value={sort}
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Minimum Price</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className="group relative overflow-hidden rounded bg-secondary/80 px-6 py-2 text-white transition-all duration-300  hover:bg-secondary/60 ">
            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
            <span className="relative">Reset</span>
          </button>
      </div>
        {properties && properties.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
          {properties.map(property => (
            <Card key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center italic font-medium">No Data Available</p>
      )}
    </div>
  )
};

export default AllProperties;
