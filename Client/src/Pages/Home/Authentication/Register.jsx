import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../../../Firebase/firebase.config";
import { saveUser } from "../../../api/Utils";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Update profile with the display name and photo URL
      await updateProfile(user, { displayName, photoURL });

      await saveUser({ email: user.email, displayName, photoURL });

      toast.success("Account Created Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed!");
      setEmail("");
      setPassword("");
      setDisplayName("");
      setPhotoURL("");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await saveUser({ email: user.email, displayName: user.displayName, photoURL: user.photoURL });

      toast.success("Google registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Google registration Error:", error);
      toast.error("Google registration Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-secondary px-4 py-10">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>
        <p className="text-center text-gray-200 mb-6">Register to get started</p>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1">Display Name</label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 font-medium mb-1">Photo URL (optional)</label>
            <input
              type="text"
              placeholder="Enter photo URL"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-primary transition duration-200">
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-300">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2 bg-white/20 text-white border border-white/30 rounded-lg hover:bg-white/30 transition duration-200"
        >
          <FaGoogle className="text-2xl" />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center font-semibold text-gray-300">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
