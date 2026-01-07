import React from "react";
import { useState, useContext ,useEffect} from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

 
const Login = () => {
  const { token, setToken, backend_url } = useContext(AppContext);

  const navigate = useNavigate()
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ((state == "signup")) {
        const { data } = await axios.post(`${backend_url}/api/user/register`, {
          name,
          password, 
          email,
        });
        if (data.success) {
          localStorage.setItem("token", JSON.stringify(data.token));
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backend_url}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", JSON.stringify(data.token));
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/ ')
    }
  },[token])

  return (
    <div>
      <form
        className="min-h-[80vh] flex item-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-90 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "signup" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "signup" ? "create account" : "login"} to book the
            Appointment
          </p>
          {state === "signup" && (
            <div className="w-full">
              <p>Full name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-md text-base"
          >
            {state === "signup" ? " Create Account" : "Login"}
          </button>
          {state === "signup" ? (
            <p>
              Already have a account,
              <span
                onClick={() => setState("login")}
                className="text-blue-500 underline cursor-pointer"
              >
                login here
              </span>
            </p>
          ) : (
            <p>
              Create a account,
              <span
                onClick={() => setState("signup")}
                className="text-blue-500 underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
