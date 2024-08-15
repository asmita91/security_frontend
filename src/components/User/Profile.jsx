


import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userService";
import { MySnackbar } from "../reusbles/snackbar";
import { PasswordOutlined, UploadRounded } from "@mui/icons-material";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
import sound from "../../assets/sound.wav";
import { FaUser } from "react-icons/fa6";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null);
  const [snack, setSnack] = useState({ type: "", message: "" });
  const [openSnack, setOpenSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    userServices
      .getUser()
      .then((res) => setUser(res.data))
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleCloseSnack = () => setOpenSnack(false);

  const play = () => new Audio(sound).play();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      play();
      setSnack({
        type: "error",
        message: "Please upload a valid image file (PNG, JPEG, or JPG).",
      });
      setOpenSnack(true);
    }
  };

  const handleUpload = () => {
    if (!file) {
      play();
      setSnack({
        type: "error",
        message: "Please, select a file",
      });
      setOpenSnack(true);
      return;
    }
    setOpenDialog(true); // Open custom dialog
  };

  const confirmUpload = () => {
    userServices
      .uploadProfileImage(file)
      .then((res) => {
        setUser({ ...user, picture: res.data.filename });
        play();
        setSnack({
          type: "success",
          message: "Profile picture changed successfully",
        });
        setOpenSnack(true);
        setFile(null);
      })
      .catch((err) => {
        play();
        setSnack({
          type: "error",
          message: "Failed to upload image. Only support jpg, jpeg, png format.",
        });
        setOpenSnack(true);
      });
    setOpenDialog(false);
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    if (!newName) {
      play();
      setSnack({
        type: "error",
        message: "Please, enter a valid name",
      });
      setOpenSnack(true);
      return;
    }

    userServices
      .changeName({ fullName: newName })
      .then(() => {
        setUser({ ...user, fullName: newName });
        play();
        setSnack({
          type: "success",
          message: "Name changed successfully",
        });
        setOpenSnack(true);
        setNewName("");
      })
      .catch((err) => {
        play();
        setSnack({
          type: "error",
          message: err.response.data.error,
        });
        setOpenSnack(true);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <ResponsiveAppBarHomepage />
      <div className="flex flex-col items-center md:flex-row md:justify-around mt-10">
        <div className="avatar m-4 md:m-0">
          <div className="w-72 h-72 rounded-full border-2 border-gray-200">
            <img
              src={`https://localhost:3005/profile/${user.picture}`}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start mt-6 md:mt-0 md:ml-6 w-full max-w-lg">
          <hr className="my-4 w-full border-gray-400" />
          <div className="mb-4 text-center md:text-left">
            <h3 className="text-2xl mb-2">
              <span className="semi-bold">Name: </span>
              {user.fullName}
            </h3>
            <h3 className="text-2xl">
              <span className="semi-bold">Email: </span>
              {user.email}
            </h3>
          </div>
          <form className="flex flex-col space-y-4 w-full">
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="block mb-2"
            />
            <Button
              variant="contained"
              onClick={handleUpload}
              startIcon={<UploadRounded />}
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Upload Picture
            </Button>
            <Button
              variant="contained"
              onClick={() => document.getElementById("name_modal").showModal()}
              startIcon={<FaUser />}
              sx={{
                backgroundColor: "#000000",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Change full name
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/changePassword")}
              startIcon={<PasswordOutlined />}
              sx={{
                backgroundColor: "#000000",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Change password
            </Button>
          </form>
        </div>
      </div>

      {/* Paw Prints */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          fontSize: "3rem",
          color: "blue",
          transform: "rotate(-20deg)",
        }}
      >
        🐾
      </div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          fontSize: "2.5rem",
          color: "blue",
          transform: "rotate(15deg)",
        }}
      >
        🐾
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "15%",
          fontSize: "2.8rem",
          color: "blue",
          transform: "rotate(-10deg)",
        }}
      >
        🐾
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "20%",
          fontSize: "3.2rem",
          color: "blue",
          transform: "rotate(5deg)",
        }}
      >
        🐾
      </div>

      <MySnackbar
        open={openSnack}
        handleClose={handleCloseSnack}
        type={snack.type}
        message={snack.message}
      />

      {/* Custom Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Upload"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change your profile picture?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button
            onClick={confirmUpload}
            color="primary"
            autoFocus
            sx={{ color: "red" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
