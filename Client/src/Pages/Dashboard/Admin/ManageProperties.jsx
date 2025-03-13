import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const ManageProperties = () => {
  const axiosSecure = useAxiosSecure()


    const { data: properties = [], isLoading, error, refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: async()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_URL}/allProperties`)
            return data;
        },
      });
     console.log(properties)

     const updateVerify = async (propertyId) => {
        try {
          const { data } = await axiosSecure.patch(
            `${import.meta.env.VITE_URL}/verify-property/${propertyId}`
          );
          refetch()
        } catch (error) {
          console.error(`Error updating status to:`, error);
        }
      };


      const rejectVerify = async(propertyId)=>{
        try {
          const { data } = await axiosSecure.patch(
            `${import.meta.env.VITE_URL}/reject-property/${propertyId}`
          );
        
          refetch()
        } catch (error) {
          console.error(`Error updating status to:`, error);
        }
      }
    return (
        <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center my-8">Manage Properties</h2>
      <div className="overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto">
        <table className="table-auto w-full  border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Agent Name</th>
              <th className="border border-gray-300 px-4 py-2">Agent Email</th>
              <th className="border border-gray-300 px-4 py-2">Price Range</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{property.propertyTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{property.propertyLocation}</td>
                <td className="border border-gray-300 px-4 py-2">{property.agent.name}</td>
                <td className="border border-gray-300 px-4 py-2">{property.agent.email}</td>
                <td className="border border-gray-300 px-4 py-2">{`${property.priceRange.minRange} - ${property.priceRange.maxRange}`}</td>
                <td className={'border px-4 py-2 font-semibold'}>
                  {property.status }
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <div className='flex gap-4'>
                <AiFillCheckCircle onClick={()=>updateVerify(property._id)} className='text-2xl text-green-600'/>
                <AiFillCloseCircle onClick={()=>rejectVerify(property._id)} className='text-2xl text-red-600'/>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageProperties;