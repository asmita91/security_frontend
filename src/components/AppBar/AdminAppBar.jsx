
import { Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userServices from "../../services/userService";
import { useUser } from "../../utils/userContext";

export const AdminAppBar = () => {
  const user = useUser();
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    userServices
      .getUser()
      .then((res) => {
        setLoginUser(res.data);
      })
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setLoginUser({});
    navigate("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100 rounded-lg shadow-lg">
        <NavLink to={"/"}>
          <img className="app-img" src="/images/logo.png" alt="App logo" />
        </NavLink>
        <div className="flex-1 flex justify-center">
          <NavLink to="/logs" className="btn btn-ghost normal-case text-l mx-4">
            All Logs
          </NavLink>
          <NavLink
            to="/viewAllProducts"
            className="btn btn-ghost normal-case text-l mx-4"
          >
            View Products
          </NavLink>
        </div>
        <div className="flex-none">
          <a className="btn btn-ghost normal-case text-l">
            Hello admin: {loginUser.fullName}
          </a>
          <div className="dropdown dropdown-end">
            <NavLink to="/profile" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://localhost:3005/profile/${loginUser.picture}`}
                  alt="Profile"
                />
              </div>
            </NavLink>
            <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
              <Logout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
