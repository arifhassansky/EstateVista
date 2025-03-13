import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import auth from "../../../Firebase/firebase.config";
import { saveUser } from "../../../api/Utils";

const Login = () => {
  const { userLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await userLogin(email, password);
      setUser(result.user);
      toast.success("🦄 Successfully Logged In!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await saveUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      setUser(user);
      toast.success("Google login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login Error:", error);
      toast.error("Google login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-secondary px-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Welcome Back</h2>
        <p className="text-center text-gray-200 mb-6">Login to continue</p>

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
          <button
            type="submit"
            className="w-full py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-primary transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
          disabled={loading}
        >
          <FaGoogle className="text-2xl" />
          <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
        </button>

        <p className="text-center font-semibold text-gray-300">
          Don't have an account?{" "}
          <Link className="text-primary" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
