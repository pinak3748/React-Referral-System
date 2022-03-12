import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Register() {
  const [alert, setAlert] = useState({show: false, data: " "});
  const { Id } = useParams();
  const referral = Id ? Id : "";
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    referral: referral,
  });
  let name, value;
  let navigate = useNavigate();

  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/register", user)
      .then(function (response) {
        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/home");
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        callAlert(error.response.data.msg);
        console.log(
          error.response.data,
          "-----------------------error------------------------"
        );
      });
  };
  function callAlert (data) {
    setAlert({show: true, data: data});
    setTimeout(() => {setAlert(false)}, 3000)
  }
  return (
    <>
      <div
        className="bg-secondary_bg w-full lg:max-w-full md:mx-auto h-screen px-6 pt-5 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full  md:w-1/2 xl:w-1/3 h-100">
          {alert.show && <div
            class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  class="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p class="font-bold">{alert.data}</p>
              </div>
            </div>
          </div>}
          <h1 className="text-xl md:text-2xl text-ghost font-bold leading-tight mt-12">
            Create a New Account
          </h1>

          <form className="mt-6" action="#">
            <div>
              <label className="block text-secondary_text">Username</label>
              <input
                type="username"
                name="username"
                value={user.username}
                onChange={handleInputs}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
                autoFocus
                autoComplete="on"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-secondary_text">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your password"
                value={user.email}
                onChange={handleInputs}
                minLength="6"
                autoComplete="on"
                className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-secondary_text">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputs}
                autoComplete="on"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-secondary_text">referral</label>
              <input
                type="text"
                name="referral"
                placeholder="Enter your referral"
                value={user.referral}
                onChange={handleInputs}
                autoComplete="on"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg text-primary_text bg-section_bg mt-2 focus:ring focus:ring-section_bg focus:outline-none"
                required
              />
            </div>

            <button
              type="button"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              id="login"
              name="login"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>

          <div className="flex items-center my-6">
            <div
              className="border-t border-gray-300 flex-grow mr-3"
              aria-hidden="true"
            ></div>
            <div className="text-gray-600 italic">Or</div>
            <div
              className="border-t border-gray-300 flex-grow ml-3"
              aria-hidden="true"
            ></div>
          </div>

          <p className="mt-8 text-secondary_text text-center">
            <Link to="/">Have an Account</Link>
          </p>
        </div>
      </div>
    </>
  );
}
