

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./ResponsiveAppBarLandingPage.css";

export const ResponsiveAppBarLandingPage = () => {
  return (
    <div>
      <div className="navbar custom-navbar bg-white">
        <div className="navbar-start">
          <NavLink to={"/"}>
            <img className="app-img" src="/images/logo.png" alt="App logo" />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
          
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink to={"/login"} className="btn btn-outline m-2">
            Login
          </NavLink>
          <NavLink to={"/signup"} className="btn btn-outline m-2">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};
