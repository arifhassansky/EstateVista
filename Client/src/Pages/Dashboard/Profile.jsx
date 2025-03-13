import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import coverImg from '../../assets/login.jpg';
import useRole from '../../hooks/useRole';
import LoadingSpinner from '../../Components/LoadingSpinner';

const Profile = () => {
  const [role, isLoading] = useRole();

  const { user, loading } = useContext(AuthContext);

  console.log(role)
  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl">
        {/* Cover Image */}
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full h-40 md:h-56 object-cover rounded-t-2xl"
        />
        
        <div className="flex flex-col items-center -mt-12 md:-mt-16 p-4">
          {/* Profile Image */}
          <img
            alt="profile"
            src={user?.photoURL }
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
          />
          
          {/* Role Badge */}
          <p className="mt-2 px-4 py-1 text-xs md:text-sm text-white bg-primary rounded-full">
            {role}
          </p>
          
          {/* User Info */}
          <p className="mt-2 text-lg md:text-xl font-medium text-gray-800">
            User ID: {user?.uid || 'N/A'}
          </p>
          
          <div className="w-full mt-4 p-4 text-center bg-gray-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
              <p className="flex flex-col">
                <span className="text-gray-500">Name</span>
                <span className="font-semibold">{user?.displayName || 'N/A'}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold">{user?.email || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
