import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";

export default function SignIn() {
 const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate("/")
      }
    } catch (error) {
      toast.error("Bad user credentials")
    }
  }



  return (
    <section className="text-3xl text-center mt-6 font-bold">
      <h1>Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc="
            alt="home"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white font-normal border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-md text-gray-700 bg-white font-normal border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />
              ) : (
                <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
                  Forgot password
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-sm font-medium uppercase rounded shadow-md px-7 py-3 hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
              Sign in
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4 text-[18px]">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
