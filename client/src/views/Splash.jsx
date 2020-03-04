import React from "react";
import { Link } from "react-router-dom";
import "../styles/splash.css";

const Splash = () => {
  return (
    <div className="splash-page">
      {/* <h1>Welcome to TamaMOODchi !</h1> */}
      <p>Never feel alone with</p>
      <img src="/images/logo.png" alt="logo"/>
      {/* <img className="splash-img" src="/images/emotions/09.png" alt="mood"/> */}
      {/* <img className="splash-img" src="/images/pet/egg_evolution.png" alt="egg"/> */}
      <Link to="/register"><button className="btn-splash btn-reg">Register</button></Link>
      <Link to="/login"><button className="btn-splash btn-login">Login</button></Link>
    </div>
  );
};

export default Splash;
