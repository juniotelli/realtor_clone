import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email:auth.currentUser.email
  })

  const { name, email } = formData;

  const onLoggedOut = () => {
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section className="max-w-6xl  mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">Profile</h1>
        <div className="w-full md:w-[50%] px-3 mt-6">
          <form>
            <input type="text" id="name" value={name} disabled className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6" />

            <input type="email" id="name" value={email} disabled className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6" />

            <div className="flex justify-between whitespace-nowrap text-sm !font-bold sm:text-lg  mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span className="text-red-600 ease-in-out hover:text-red-700 transition duration-200 ml-1 cursor-pointer">Edit</span>
              </p>
              <p onClick={onLoggedOut} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
