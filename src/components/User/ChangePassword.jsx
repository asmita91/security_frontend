

import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/sound.wav";
import userServices from "../../services/userService";
import sanitizeInput from "../../utils/sanitizationInput";
import { Loading } from "../reusbles/Loading";
import { MySnackbar } from "../reusbles/snackbar";

export const ChangePassword = () => {
  const [snack, setSnack] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const play = () => new Audio(sound).play();

  const validatePassword = (password) => {
    const isLengthValid = password.length >= 8;
    const isUppercaseValid = /[A-Z]/.test(password);
    const isLowercaseValid = /[a-z]/.test(password);
    const isNumberValid = /\d/.test(password);
    const isSpecialCharValid = /[!@#$%^&*()_+[\]{};':"<>?~]/.test(password);

    return (
      isLengthValid &&
      isUppercaseValid &&
      isLowercaseValid &&
      isNumberValid &&
      isSpecialCharValid
    );
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }

    if (value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (passwordError || confirmPasswordError) {
      play();
      setSnack({
        type: "error",
        message: "Please fix the errors before submitting.",
      });
      setOpen(true);
      return;
    }

    const sanitizedOldPassword = sanitizeInput(oldPassword);
    const sanitizedNewPassword = sanitizeInput(newPassword);

    const passwords = {
      oldPassword: sanitizedOldPassword,
      newPassword: sanitizedNewPassword,
    };

    setShowLoading(true);

    userServices
      .changePassword(passwords)
      .then((res) => {
        setShowLoading(false);
        play();
        setSnack({
          type: "success",
          message: "Password changed successfully",
        });
        setOpen(true);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        navigate("/login");
      })
      .catch((err) => {
        setShowLoading(false);
        play();
        setSnack({
          type: "error",
          message: `Error: ${err.response.data.error}`,
        });
        setOpen(true);
      });
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
      {showLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-[400px] mx-auto" align="center">
            <div className="mx-auto pt-10">
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  margin: "auto",
                }}
                className="rounded-lg mt-3 text-black p-5"
                align="center"
              >
                <div
                  className="text-3xl font-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  Change Password
                </div>
                <div className="mt-5">
                  <form onSubmit={handleChangePassword}>
                    <div className="mt-3 mb-2" align="left">
                      Old Password:
                    </div>
                    <OutlinedInput
                      placeholder="Enter old password here..."
                      className="input input-bordered w-full"
                      onChange={(e) => setOldPassword(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      type={isOldPasswordVisible ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsOldPasswordVisible(!isOldPasswordVisible)
                            }
                          >
                            {isOldPasswordVisible ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      variant="outlined"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                    <div className="mt-3 mb-2" align="left">
                      New Password:
                    </div>
                    <OutlinedInput
                      placeholder="Enter new password here..."
                      className="input input-bordered w-full"
                      onChange={handlePasswordChange}
                      value={newPassword}
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      type={isNewPasswordVisible ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsNewPasswordVisible(!isNewPasswordVisible)
                            }
                          >
                            {isNewPasswordVisible ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      variant="outlined"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                    {passwordError && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {passwordError}
                      </div>
                    )}
                    <div className="mt-3 mb-2" align="left">
                      Confirm Password:
                    </div>
                    <OutlinedInput
                      placeholder="Confirm new password here..."
                      className="input input-bordered w-full mb-2"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setIsConfirmPasswordVisible(
                                !isConfirmPasswordVisible
                              )
                            }
                          >
                            {isConfirmPasswordVisible ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      variant="outlined"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                    {confirmPasswordError && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        {confirmPasswordError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="font-bold mb-8"
                      style={{
                        backgroundColor: "#000000",
                        color: "white",
                        textTransform: "none",
                        marginTop: "20px",
                      }}
                    >
                      Change Password
                    </Button>
                  </form>
                  <MySnackbar
                    open={open}
                    handleClose={handleClose}
                    type={snack.type}
                    message={snack.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
