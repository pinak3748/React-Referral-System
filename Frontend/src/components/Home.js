import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    id: "",
  });
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:4000/user", {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response)
        // handle success
        setUser({email: response.data.user.email, username: response.data.user.username, id: response.data.encode_id})
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  const link = `http://localhost:3000/register/` + user.id
  console.log()

  return (
    <div
      className="bg-secondary_bg w-full lg:max-w-full md:mx-auto h-screen px-6 pt-5 lg:px-16 xl:px-12
        flex items-center justify-center"
    >
      <div className="w-full  md:w-1/2 xl:w-1/3 h-100">
        <h1 className="text-xl md:text-2xl text-ghost font-bold leading-tight mt-12">
          Dashboard
        </h1>

        <div className="mt-10">
          <label className="block text-secondary_text">UserName</label>
          <input
            value={user.username}
            className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
            readonly
          />
        </div>

        <div className="mt-4">
          <label className="block text-secondary_text">Email</label>
          <input
            value={user.email}
            className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
            readonly
          />
        </div>

        <div className="mt-4">
          <label className="block text-secondary_text">referral Link</label>
          <input
            value={link}
            className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
            readonly
          />
        </div>

        <button
          type="button"
          className="w-full block bg-red-500 hover:bg-red-400 focus:bg-red-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          id="login"
          name="login"
          onClick={() => {}}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
