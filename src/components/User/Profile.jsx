// // import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// // import MailLockIcon from "@mui/icons-material/MailLock";
// // import PasswordIcon from "@mui/icons-material/Password";
// // import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// // import Button from "@mui/material/Button";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import sound from "../../assets/sound.wav";
// // import { allLetter } from "../../lib/input-validation";
// // import userServices from "../../services/userService";
// // import { usePurchase } from "../../utils/purchaseContext";
// // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
// // import { MySnackbar } from "../MySnackbar";

// // export const Profile = () => {
// //   const purchase = usePurchase();
// //   const navigate = useNavigate();

// //   const [user, setUser] = useState({});
// //   const [newName, setNewName] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [snack, setSnack] = useState({
// //     type: "",
// //     message: "",
// //   });
// //   // for open and close snackbar
// //   const [open, setOpen] = React.useState(false);

// //   // for closing snackbar
// //   const handleClose = (event, reason) => {
// //     if (reason === "clickaway") {
// //       return;
// //     }
// //     setOpen(false);
// //   };
// //   const play = () => new Audio(sound).play();

// //   useEffect(() => {
// //     userServices
// //       .getUser()
// //       .then((res) => setUser(res.data))
// //       .catch((err) => window.alert(err.response.data.error));
// //   }, []);

// //   const handleUpload = (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       play();
// //       setSnack({
// //         type: "error",
// //         message: "Please, select a file",
// //       });
// //       setOpen(true);
// //       return;
// //     }

// //     const confirmation = window.confirm(
// //       "Are you sure you want to change your profile picture?"
// //     );
// //     if (confirmation) {
// //       console.log(`File: ${file}`);
// //       userServices
// //         .uploadProfileImage(file)
// //         .then((res) => {
// //           // update user picture
// //           setUser({ ...user, picture: res.data.filename });

// //           play();
// //           setSnack({
// //             type: "success",
// //             message: "Profile picture changed successfully",
// //           });
// //           setOpen(true);

// //           setFile(null);
// //         })
// //         .catch((err) => {
// //           play();
// //           setSnack({
// //             type: "error",
// //             message:
// //               "Failed to upload images. Only support jpg, jpeg, png format.",
// //           });
// //           setOpen(true);
// //         });
// //     }
// //   };

// //   const handleChangeName = (e) => {
// //     e.preventDefault();
// //     if (!allLetter(newName)) {
// //       play();
// //       setSnack({
// //         type: "error",
// //         message: "Please, enter a valid name",
// //       });
// //       setOpen(true);
// //       return;
// //     }

// //     const confirmation = window.confirm(
// //       "Are you sure you want to change your name?"
// //     );
// //     if (confirmation) {
// //       userServices
// //         .changeName({ fullName: newName })
// //         .then((res) => {
// //           // update user name in the state
// //           setUser({ ...user, fullName: newName });

// //           console.log(
// //             `Response from server while changing name : ${res.data.fullName}`
// //           );

// //           play();
// //           setSnack({
// //             type: "success",
// //             message: "Name changed successfully",
// //           });
// //           setOpen(true);

// //           // reset the input
// //           setNewName("");

// //           // close the modal
// //           window.name_modal.close();
// //         })
// //         .catch((err) => {
// //           play();
// //           setSnack({
// //             type: "error",
// //             message: err.response.data.error,
// //           });
// //           setOpen(true);
// //         });
// //     }
// //   };

// //   const handleDeleteAccount = (e) => {
// //     e.preventDefault();

// //     const confirmation = window.confirm(
// //       "Are you sure you want to delete your account?"
// //     );
// //     if (confirmation) {
// //       userServices
// //         .deleteAccount()
// //         .then((res) => {
// //           play();
// //           setSnack({
// //             type: "success",
// //             message: "Account deleted successfully",
// //           });
// //           setOpen(true);

// //           navigate("/login");
// //         })
// //         .catch((err) => {
// //           play();
// //           setSnack({
// //             type: "error",
// //             message: err.response.data.error,
// //           });
// //           setOpen(true);
// //         });
// //     }
// //   };
// //   return (
// //     <div
// //     style={{
// //       backgroundColor: "#b2d5f5",
// //       color: "black",
// //       minHeight: "100vh",
// //       padding: "20px",
// //     }}
// //   >
// //       <ResponsiveAppBarHomepage
// //         purchaseProductLength={purchase.purchase.length}
// //       />
// //       <div className="avatar">
// //         <div className="w-60 rounded m-10">
// //           {/* <img src={`https://localhost:3005/profile/${user.picture}`} /> */}
// //           <img src={`https://localhost:3005/profile/${user.picture}`} />
// //         </div>
// //       </div>
// //       <div className="">
// //         <form>
// //           <input
// //             type="file"
// //             onChange={(e) => setFile(e.target.files[0])}
// //             required
// //           />

// //           <Button
// //             variant="contained"
// //             onClick={handleUpload}
// //             startIcon={<CloudUploadIcon />}
// //             className="btn btn-secondary"
// //           >
// //             Upload Picture Pic
// //           </Button>
// //         </form>
// //       </div>
// //       <div className="user-details-section m-4">
// //         <h3 className="text-2xl font-bold m-2">Full Name: {user.fullName}</h3>
// //         <h3 className="text-2xl font-bold m-2">Email: {user.email}</h3>
// //       </div>
// //       <div className="change-info-section m-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// //         <Button
// //           variant="contained"
// //           onClick={() => document.getElementById("name_modal").showModal()}
// //           startIcon={<MailLockIcon />}
// //           className="btn mb-4"
// //         >
// //           Change full name
// //         </Button>

// //         <Button
// //           variant="contained"
// //           onClick={() => navigate("/changePassword")}
// //           startIcon={<PasswordIcon />}
// //           className="btn btn-secondary"
// //         >
// //           Change password
// //         </Button>
// //         <Button
// //           variant="contained"
// //           onClick={handleDeleteAccount}
// //           startIcon={<PersonRemoveIcon />}
// //           className="btn btn-secondary"
// //         >
// //           Delete Account
// //         </Button>
// //       </div>
// //       <MySnackbar
// //         open={open}
// //         handleClose={handleClose}
// //         type={snack.type}
// //         message={snack.message}
// //       />
// //       \
// //       {/* <button className="btn" onClick={() => document.getElementById('name_modal').showModal()}>open modal</button> */}
// //       <dialog id="name_modal" className="modal">
// //         <div className="modal-box">
// //           <form method="dialog">
// //             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
// //               ✕
// //             </button>
// //           </form>
// //           <h3 className="font-bold text-lg m-2" align="left">
// //             New full name:
// //           </h3>
// //           <form action="" onSubmit={handleChangeName}>
// //             <input
// //               type="text"
// //               className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
// //               onChange={(e) => setNewName(e.target.value)}
// //               value={newName}
// //               required
// //             />

// //             <input
// //               type="submit"
// //               value="Change name"
// //               className="btn btn-primary w-wide"
// //             />
// //           </form>
// //         </div>
// //       </dialog>
// //     </div>
// //   );
// // };

// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import MailLockIcon from "@mui/icons-material/MailLock";
// import PasswordIcon from "@mui/icons-material/Password";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import Button from "@mui/material/Button";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import sound from "../../assets/sound.wav";
// import { allLetter } from "../../lib/input-validation";
// import userServices from "../../services/userService";
// import { usePurchase } from "../../utils/purchaseContext";
// import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
// import { MySnackbar } from "../MySnackbar";

// export const Profile = () => {
//   const purchase = usePurchase();
//   const navigate = useNavigate();

//   const [user, setUser] = useState({});
//   const [newName, setNewName] = useState("");
//   const [file, setFile] = useState(null);
//   const [snack, setSnack] = useState({
//     type: "",
//     message: "",
//   });
//   // for open and close snackbar
//   const [open, setOpen] = React.useState(false);

//   // for closing snackbar
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };
//   const play = () => new Audio(sound).play();

//   useEffect(() => {
//     userServices
//       .getUser()
//       .then((res) => setUser(res.data))
//       .catch((err) => window.alert(err.response.data.error));
//   }, []);

//   const handleUpload = (e) => {
//     e.preventDefault();

//     if (!file) {
//       play();
//       setSnack({
//         type: "error",
//         message: "Please, select a file",
//       });
//       setOpen(true);
//       return;
//     }

//     const confirmation = window.confirm(
//       "Are you sure you want to change your profile picture?"
//     );
//     if (confirmation) {
//       console.log(`File: ${file}`);
//       userServices
//         .uploadProfileImage(file)
//         .then((res) => {
//           // update user picture
//           setUser({ ...user, picture: res.data.filename });

//           play();
//           setSnack({
//             type: "success",
//             message: "Profile picture changed successfully",
//           });
//           setOpen(true);

//           setFile(null);
//         })
//         .catch((err) => {
//           play();
//           setSnack({
//             type: "error",
//             message:
//               "Failed to upload images. Only support jpg, jpeg, png format.",
//           });
//           setOpen(true);
//         });
//     }
//   };

//   const handleChangeName = (e) => {
//     e.preventDefault();
//     if (!allLetter(newName)) {
//       play();
//       setSnack({
//         type: "error",
//         message: "Please, enter a valid name",
//       });
//       setOpen(true);
//       return;
//     }

//     const confirmation = window.confirm(
//       "Are you sure you want to change your name?"
//     );
//     if (confirmation) {
//       userServices
//         .changeName({ fullName: newName })
//         .then((res) => {
//           // update user name in the state
//           setUser({ ...user, fullName: newName });

//           console.log(
//             `Response from server while changing name : ${res.data.fullName}`
//           );

//           play();
//           setSnack({
//             type: "success",
//             message: "Name changed successfully",
//           });
//           setOpen(true);

//           // reset the input
//           setNewName("");

//           // close the modal
//           window.name_modal.close();
//         })
//         .catch((err) => {
//           play();
//           setSnack({
//             type: "error",
//             message: err.response.data.error,
//           });
//           setOpen(true);
//         });
//     }
//   };

//   const handleDeleteAccount = (e) => {
//     e.preventDefault();

//     const confirmation = window.confirm(
//       "Are you sure you want to delete your account?"
//     );
//     if (confirmation) {
//       userServices
//         .deleteAccount()
//         .then((res) => {
//           play();
//           setSnack({
//             type: "success",
//             message: "Account deleted successfully",
//           });
//           setOpen(true);

//           navigate("/login");
//         })
//         .catch((err) => {
//           play();
//           setSnack({
//             type: "error",
//             message: err.response.data.error,
//           });
//           setOpen(true);
//         });
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#b2d5f5",
//         color: "black",
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <ResponsiveAppBarHomepage
//         purchaseProductLength={purchase.purchase.length}
//       />
//       <div className="flex flex-wrap justify-center">
//         <div className="w-full md:w-1/3 text-center md:text-left">
//           <div className="avatar m-10">
//             <div className="w-60 rounded">
//               {/* <img src={`https://localhost:3005/profile/${user.picture}`} /> */}
//               <img src={`https://localhost:3005/profile/${user.picture}`} />
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:items-start">
//           <div className="w-full">
//             <form className="mb-4">
//               <input
//                 type="file"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 required
//                 className="block mb-4"
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleUpload}
//                 startIcon={<CloudUploadIcon />}
//                 className="btn btn-secondary"
//               >
//                 Upload Picture
//               </Button>
//             </form>
//           </div>
//           <div className="user-details-section m-4">
//             <h3 className="text-2xl font-bold m-2">Full Name: {user.fullName}</h3>
//             <h3 className="text-2xl font-bold m-2">Email: {user.email}</h3>
//           </div>
//         </div>
//       </div>
//       <div className="change-info-section m-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Button
//           variant="contained"
//           onClick={() => document.getElementById("name_modal").showModal()}
//           startIcon={<MailLockIcon />}
//           className="btn mb-4"
//         >
//           Change full name
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => navigate("/changePassword")}
//           startIcon={<PasswordIcon />}
//           className="btn mb-4"
//         >
//           Change password
//         </Button>

//         <Button
//           variant="contained"
//           onClick={handleDeleteAccount}
//           startIcon={<PersonRemoveIcon />}
//           className="btn mb-4"
//         >
//           Delete Account
//         </Button>
//       </div>
//       <MySnackbar
//         open={open}
//         handleClose={handleClose}
//         type={snack.type}
//         message={snack.message}
//       />

//       <dialog id="name_modal" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>
//           <h3 className="font-bold text-lg m-2" align="left">
//             New full name:
//           </h3>
//           <form action="" onSubmit={handleChangeName}>
//             <input
//               type="text"
//               className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
//               onChange={(e) => setNewName(e.target.value)}
//               value={newName}
//               required
//             />

//             <input
//               type="submit"
//               value="Change name"
//               className="btn btn-primary w-full"
//             />
//           </form>
//         </div>
//       </dialog>
//     </div>
//   );
// };

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MailLockIcon from "@mui/icons-material/MailLock";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/sound.wav";
import userServices from "../../services/userService";
import { usePurchase } from "../../utils/purchaseContext";
import { allLetter } from "../../validations/input-validation";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
import { MySnackbar } from "../reusbles/snackbar";

export const Profile = () => {
  const purchase = usePurchase();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null);
  const [snack, setSnack] = useState({
    type: "",
    message: "",
  });
  // for open and close snackbar
  const [open, setOpen] = React.useState(false);

  // for closing snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const play = () => new Audio(sound).play();

  useEffect(() => {
    userServices
      .getUser()
      .then((res) => setUser(res.data))
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      play();
      setSnack({
        type: "error",
        message: "Please, select a file",
      });
      setOpen(true);
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to change your profile picture?"
    );
    if (confirmation) {
      console.log(`File: ${file}`);
      userServices
        .uploadProfileImage(file)
        .then((res) => {
          // update user picture
          setUser({ ...user, picture: res.data.filename });

          play();
          setSnack({
            type: "success",
            message: "Profile picture changed successfully",
          });
          setOpen(true);

          setFile(null);
        })
        .catch((err) => {
          play();
          setSnack({
            type: "error",
            message:
              "Failed to upload images. Only support jpg, jpeg, png format.",
          });
          setOpen(true);
        });
    }
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    if (!allLetter(newName)) {
      play();
      setSnack({
        type: "error",
        message: "Please, enter a valid name",
      });
      setOpen(true);
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to change your name?"
    );
    if (confirmation) {
      userServices
        .changeName({ fullName: newName })
        .then((res) => {
          // update user name in the state
          setUser({ ...user, fullName: newName });

          console.log(
            `Response from server while changing name : ${res.data.fullName}`
          );

          play();
          setSnack({
            type: "success",
            message: "Name changed successfully",
          });
          setOpen(true);

          // reset the input
          setNewName("");

          // close the modal
          window.name_modal.close();
        })
        .catch((err) => {
          play();
          setSnack({
            type: "error",
            message: err.response.data.error,
          });
          setOpen(true);
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ResponsiveAppBarHomepage
        purchaseProductLength={purchase.purchase.length}
      />
      <div className="flex flex-col items-center md:flex-row md:justify-around mt-10">
        <div className="avatar m-10">
          <div className="w-60 rounded-full border-2 border-gray-200">
            <img
              src={`https://localhost:3005/profile/${user.picture}`}
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4 text-center md:text-left">
            <h3 className="text-2xl">
              <span className="font-bold">Name: </span>
              {user.fullName}
            </h3>
            <h3 className="text-2xl">
              <span className="font-bold">Email: </span>
              {user.email}
            </h3>
          </div>
          <form className="flex flex-col">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="block mb-4"
            />
            <Button
              variant="contained"
              onClick={handleUpload}
              startIcon={<CloudUploadIcon />}
              className="mb-4"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Upload Picture
            </Button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 mt-10">
        <Button
          variant="contained"
          onClick={() => document.getElementById("name_modal").showModal()}
          startIcon={<MailLockIcon />}
          className="btn mb-4"
          sx={{
            backgroundColor: "#003366",
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          }}
        >
          Change full name
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/changePassword")}
          startIcon={<PasswordIcon />}
          className="btn mb-4"
          sx={{
            backgroundColor: "#003366",
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          }}
        >
          Change password
        </Button>
      </div>
      <MySnackbar
        open={open}
        handleClose={handleClose}
        type={snack.type}
        message={snack.message}
      />

      <dialog id="name_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg m-2" align="left">
            New full name:
          </h3>
          <form action="" onSubmit={handleChangeName}>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              required
            />

            <input
              type="submit"
              value="Change name"
              className="btn btn-primary w-full"
            />
          </form>
        </div>
      </dialog>
    </div>
  );
};
