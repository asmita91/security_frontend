// // // import React, { useEffect, useState } from "react";
// // // import { NavLink, useNavigate } from "react-router-dom";
// // // import userServices from "../../services/userService";
// // // import { useUser } from "../../utils/userContext";

// // // export const ResponsiveAppBarHomepage = ({ purchaseProductLength }) => {
// // //   // used for navigating to different pages according to user role
// // //   const user = useUser();

// // //   // used for fetching current user data
// // //   const [loginUser, setLoginUser] = useState({});
// // //   const navigate = useNavigate();
// // //   const [isPasswordNeedToBeChange, setIsPasswordNeedToBeChange] =
// // //     useState(false);

// // //   useEffect(() => {
// // //     console.log(
// // //       `Total purchase product length from appbar: ${purchaseProductLength}`
// // //     );
// // //     userServices
// // //       .getUser()
// // //       .then((res) => {
// // //         console.log(`Response from server: ${res.data}`);
// // //         setLoginUser(res.data);
// // //         console.log(`User full Name: ${res.data.fullName}`);
// // //       })
// // //       .catch((err) => window.alert(err.response.data.error));
// // //   }, []);

// // //   const handleViewCart = () => {
// // //     navigate("/purchaseCart");
// // //   };

// // //   const handleLogout = () => {
// // //     // remove token from local storage
// // //     window.localStorage.removeItem("token");

// // //     // clear user data from state
// // //     setLoginUser({});

// // //     // clear purchase data from context api

// // //     // redirect to home page
// // //     navigate("/");
// // //   };
// // //   return (
// // //     <div>
// // //     <div className="navbar bg-base-100 rounded-lg shadow-lg">
// // // <div className="flex-1">
// // //           <NavLink to={"/"}>
// // //             <img className="app-img" src="/images/logo.png" alt="App logo" />
// // //           </NavLink>

// // //         </div>
// // //         <div className="flex-none">
// // //           <div className="dropdown dropdown-end">
// // //             {user.user.role === "user" && (
// // //               <label className="btn btn-ghost btn-circle">
// // //                 <div className="indicator" onClick={handleViewCart}>
// // //                   <svg
// // //                     xmlns="https://www.w3.org/2000/svg"
// // //                     className="h-5 w-5"
// // //                     fill="none"
// // //                     viewBox="0 0 24 24"
// // //                     stroke="currentColor"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth="2"
// // //                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
// // //                     />
// // //                   </svg>
// // //                   <span className="badge badge-sm indicator-item">
// // //                     {purchaseProductLength}
// // //                   </span>
// // //                 </div>
// // //               </label>
// // //             )}
// // //           </div>
// // //           <a className="btn btn-ghost normal-case text-xl">
// // //             Hi, {loginUser.fullName}
// // //           </a>
// // //           <div className="dropdown dropdown-end">
// // //             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
// // //               <div className="w-10 rounded-full">
// // //                 {/* <img src={`https://localhost:3005/profile/${loginUser.picture}`} /> */}
// // //                 <img
// // //                   src={`https://localhost:3005/profile/${loginUser.picture}`}
// // //                 />
// // //               </div>
// // //             </label>
// // //             <ul
// // //               tabIndex={0}
// // //               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
// // //             >
// // //               {user.user.role === "user" && (
// // //                 <li>
// // //                   <NavLink to={"/home"}>Dashboard</NavLink>
// // //                 </li>
// // //               )}
// // //               {user.user.role === "admin" ? (
// // //                 <li>
// // //                   <NavLink to={"/addProduct"}>Add Product</NavLink>
// // //                 </li>
// // //               ) : (
// // //                 <></>
// // //               )}

// // //               <li>
// // //                 <NavLink to={"/profile"}>Profile</NavLink>
// // //               </li>
// // //               {user.user.role === "user" && (
// // //                 <li>
// // //                   <NavLink to={"/purchaseHistory"}>Purchase History</NavLink>
// // //                 </li>
// // //               )}
// // //               {user.user.role === "admin" && (
// // //                 <li>
// // //                   <NavLink to={"/viewAllProducts"}>View All Products</NavLink>
// // //                 </li>
// // //               )}

// // //               <li>
// // //                 <a onClick={handleLogout}>Logout</a>
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // import React, { useEffect, useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import userServices from "../../services/userService";
// // import { useUser } from "../../utils/userContext";

// // export const ResponsiveAppBarHomepage = () => {
// //   const user = useUser();
// //   const [loginUser, setLoginUser] = useState({});
// //   const navigate = useNavigate();
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

// //   const handleViewCart = () => {
// //     navigate("/purchaseCart");
// //   };

// //   const handleLogout = () => {
// //     window.localStorage.removeItem("token");
// //     setLoginUser({});
// //     navigate("/");
// //   };

// //   return (
// //     <div className="navbar bg-base-100 rounded-lg shadow-lg">
// //       <div className="flex-1">
// //         <NavLink to={"/"}>
// //           <img className="app-img" src="/images/logo.png" alt="App logo" />
// //         </NavLink>
// //       </div>
// //       <div className="flex-none">
// //         <div className="dropdown dropdown-end">
// //           {user.user.role === "user" && (
// //             <label className="btn btn-ghost btn-circle">
// //               <div className="indicator" onClick={handleViewCart}>
// //                 <svg
// //                   xmlns="https://www.w3.org/2000/svg"
// //                   className="h-5 w-5"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
// //                   />
// //                 </svg>
                
// //               </div>
// //             </label>
// //           )}
// //         </div>
// //         <a className="btn btn-ghost normal-case text-xl">
// //           Hi, {loginUser.fullName}
// //         </a>
// //         <div className="dropdown dropdown-end">
// //           <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
// //             <div className="w-10 rounded-full">
// //               <img
// //                 src={`https://localhost:3005/profile/${loginUser.picture}`}
// //                 alt="Profile"
// //               />
// //             </div>
// //           </label>
// //           <ul
// //             tabIndex={0}
// //             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
// //           >
// //             {user.user.role === "user" && (
// //               <li>
// //                 <NavLink to={"/home"}>Dashboard</NavLink>
// //               </li>
// //             )}
// //             {user.user.role === "admin" ? (
// //               <li>
// //                 <NavLink to={"/addProduct"}>Add Product</NavLink>
// //               </li>
// //             ) : (
// //               <></>
// //             )}
// //             <li>
// //               <NavLink to={"/profile"}>Profile</NavLink>
// //             </li>
// //             {user.user.role === "user" && (
// //               <li>
// //                 <NavLink to={"/purchaseHistory"}>Purchase History</NavLink>
// //               </li>
// //             )}
// //             {user.user.role === "admin" && (
// //               <li>
// //                 <NavLink to={"/viewAllProducts"}>View All Products</NavLink>
// //               </li>
// //             )}
// //             <li>
// //               <a onClick={handleLogout}>Logout</a>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import userServices from "../../services/userService";
// import { useUser } from "../../utils/userContext";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import HistoryIcon from '@mui/icons-material/History';
// import { Logout } from "@mui/icons-material";

// export const ResponsiveAppBarHomepage = () => {
//   const user = useUser();
//   const [loginUser, setLoginUser] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     userServices.getUser()
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
//     <div className="navbar bg-base-100 rounded-lg shadow-lg">
//       <div className="flex-1">
//         <NavLink to={"/"}>
//           <img className="app-img" src="/images/logo.png" alt="App logo" />
//         </NavLink>
//       </div>
//       <div className="flex-none">
//         <div className="dropdown dropdown-end">
//           {user.user.role === "user" && (
//             <>
//               {/* Cart Icon */}
//               <button className="btn btn-ghost btn-circle" onClick={() => navigate("/purchaseCart")}>
//                 <ShoppingCartIcon />
//               </button>

//               {/* Purchase History Icon */}
//               <button className="btn btn-ghost btn-circle" onClick={() => navigate("/purchaseHistory")}>
//                 <HistoryIcon />
//               </button>
//             </>
//           )}
//         </div>
//         <a className="btn btn-ghost normal-case text-xl">
//           Hi, {loginUser.fullName}
//         </a>
//         <div className="dropdown dropdown-end">
//           <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//             <div className="w-10 rounded-full">
//               <img
//                 src={`https://localhost:3005/profile/${loginUser.picture}`}
//                 alt="Profile"
//               />
//             </div>
//           </label>
//           {/* Cart Icon */}
//           <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
//                 <Logout />
//            </button>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             {user.user.role === "user" && (
//               <li>
//                 <NavLink to={"/home"}>Dashboard</NavLink>
//               </li>
//             )}
//             {user.user.role === "admin" && (
//               <li>
//                 <NavLink to={"/addProduct"}>Add Product</NavLink>
//               </li>
//             )}
           
//             {user.user.role === "admin" && (
//               <li>
//                 <NavLink to={"/viewAllProducts"}>View All Products</NavLink>
//               </li>
//             )}
          
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };



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
