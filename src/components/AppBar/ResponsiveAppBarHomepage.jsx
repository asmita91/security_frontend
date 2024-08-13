

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userServices from "../../services/userService";
import { useUser } from "../../utils/userContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import { Logout } from "@mui/icons-material";

export const ResponsiveAppBarHomepage = () => {
  const user = useUser();
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    userServices.getUser()
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
    <div className="navbar bg-base-100 rounded-lg shadow-lg">
      <div className="flex-1">
        <NavLink to={"/home"}>
          <img className="app-img" src="/images/logo.png" alt="App logo" />
        </NavLink>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {user.user.role === "user" && (
            <>
              {/* Cart Icon */}
              <button className="btn btn-ghost btn-circle" onClick={() => navigate("/purchaseCart")}>
                <ShoppingCartIcon />
              </button>

              {/* Purchase History Icon */}
              <button className="btn btn-ghost btn-circle" onClick={() => navigate("/purchaseHistory")}>
                <HistoryIcon />
              </button>
            </>
          )}
        </div>
        <a className="btn btn-ghost normal-case text-l">
          Hello user: {loginUser.fullName}
        </a>
        <div className="dropdown dropdown-end">
          {/* Redirect to profile when image is clicked */}
          <NavLink to="/profile" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={`https://localhost:3005/profile/${loginUser.picture}`}
                alt="Profile"
              />
            </div>
          </NavLink>
          {/* Logout Icon */}
          <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
            <Logout />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user.user.role === "user" && (
              <li>
                <NavLink to={"/home"}>Dashboard</NavLink>
              </li>
            )}
            {user.user.role === "admin" && (
              <li>
                <NavLink to={"/addProduct"}>Add Product</NavLink>
              </li>
            )}
            {user.user.role === "admin" && (
              <li>
                <NavLink to={"/viewAllProducts"}>View All Products</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
