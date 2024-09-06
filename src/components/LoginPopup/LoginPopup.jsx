import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import {APIURL} from "../../constants/APIConstant";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import {toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
 const {token, setToken} = useContext(StoreContext)
  const [data, setData] = useState({
    name : '',
    email :'',
    password : ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }

const onLogin = async(event) =>{
  event.preventDefault();
  let newUrl = APIURL.url;
  if(currentState === 'Login') {
    newUrl = newUrl+"/api/user/login"
  } else {
    newUrl = newUrl+"/api/user/register"
  }

  const response = await axios.post(newUrl,data);
  if(response?.data?.success) {
    setToken(response?.data?.token)
    localStorage.setItem("token",response?.data?.token) 
    toast.success("Login successful")
    setShowLogin(false)
  } else {
    toast.error(response?.data?.message)
  }
}

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your name" required name="name" value={data.name} onChange={onChangeHandler} />
          )}
          <input type="text" placeholder="Your email" required name="email" value={data.email} onChange={onChangeHandler} />
          <input type="password" placeholder="Password" required  name="password" value={data.password} onChange={onChangeHandler} />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
