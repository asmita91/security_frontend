// // import React, { useEffect, useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import userServices from "../../services/userService";
// // import { useUser } from "../../utils/userContext";

// // export const AdminAppBar = ({ purchaseProductLength }) => {
// //   // used for navigating to different pages according to user role
// //   const user = useUser();

// //   // used for fetching current user data
// //   const [loginUser, setLoginUser] = useState({});
// //   const navigate = useNavigate();
// //   const [loggedUser, setLoggedUser] = useState({
// //     id: "",
// //     role: "",
// //   });
// //   const [isPasswordNeedToBeChange, setIsPasswordNeedToBeChange] =
// //     useState(false);

// //   useEffect(() => {
// //     userServices
// //       .getUser()
// //       .then((res) => {
// //         console.log(`Response from server: ${res.data}`);
// //         setLoginUser(res.data);
// //         console.log(`User full Name: ${res.data.fullName}`);
// //       })
// //       .catch((err) => window.alert(err.response.data.error));
// //   }, []);

// //   const handleLogout = () => {
// //     // remove token from local storage
// //     window.localStorage.removeItem("token");

// //     // clear user data from state
// //     setLoginUser({});

// //     // clear purchase data from context api

// //     // redirect to home page
// //     navigate("/");
// //   };
// //   return (
// //     <div>
// //       <div className="navbar bg-base-100 rounded-lg shadow-lg">
// //         <NavLink to={"/"}>
// //           <img className="app-img" src="/images/logo.png" alt="App logo" />
// //         </NavLink>
// //         <div className="flex-1"></div>
// //         <div className="flex-none">
// //           <a className="btn btn-ghost normal-case text-xl">
// //             Hello admin:, {loginUser.fullName}
// //           </a>
// //           <div className="dropdown dropdown-end">
// //             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
// //               <div className="w-10 rounded-full">
// //                 {/* <img src={`https://localhost:3005/profile/${loginUser.picture}`} /> */}
// //                 <img
// //                   src={`https://localhost:3005/profile/${loginUser.picture}`}
// //                 />
// //               </div>
// //             </label>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import userServices from "../../services/userService";
// import { useUser } from "../../utils/userContext";
// import { Logout } from "@mui/icons-material";

// export const AdminAppBar = () => {
//   const user = useUser();
//   const [loginUser, setLoginUser] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     userServices
//       .getUser()
//       .then((res) => {
//         setLoginUser(res.data);
//       })
//       .catch((err) => window.alert(err.response.data.error));
//   }, []);

//   const handleLogout = () => {
//     window.localStorage.removeItem("token");
//     setLoginUser({});
//     navigate("/");
//   };

//   return (
//     <div>
//       <div className="navbar bg-base-100 rounded-lg shadow-lg">
//         <NavLink to={"/"}>
//           <img className="app-img" src="/images/logo.png" alt="App logo" />
//         </NavLink>
//         <div className="flex-1">
//         <NavLink to="/logs"  style={{marginLeft:"300px"}} className="btn btn-ghost normal-case text-l  ">
//             All logs
//           </NavLink>
//           <NavLink to="/viewAllProducts"  style={{marginLeft:"300px"}} className="btn btn-ghost normal-case text-l  ">
//             View Products
//           </NavLink>

//         </div>
//         <div className="flex-none">
//           <a className="btn btn-ghost normal-case text-l">
//             Hello admin: {loginUser.fullName}
//           </a>
//           <div className="dropdown dropdown-end">
//             {/* Redirect to profile when image is clicked */}
//             <NavLink to="/profile" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img
//                   src={`https://localhost:3005/profile/${loginUser.picture}`}
//                   alt="Profile"
//                 />
//               </div>
//             </NavLink>
//             {/* Logout Button */}
//             <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
//               <Logout />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
