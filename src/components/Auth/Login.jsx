import MailLockIcon from "@mui/icons-material/MailLock";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import recaptchKeys from "../../services/recaptcha";
import userServices from "../../services/userService";
import { useAuth } from "../../utils/authContext";
import { useUser } from "../../utils/userContext";
import { isEmail } from "../../validations/input-validation";
import { ResponsiveAppBarLandingPage } from "../AppBar/ResponsiveAppBarLandingPage";

function Login() {
  const auth = useAuth();
  const user = useUser();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [counter, setCounter] = useState(0);
  const [userVerified, setUserVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState("");
  const [formWarning, setFormWarning] = useState("");

  const handleEmailError = () => {
    if (!credentials.email || !isEmail(credentials.email)) {
      setEmailError(true);
      setFormError("Enter a valid email address.");
      return;
    }
    setEmailError(false);
    setFormError("");
  };

  const handlePasswordError = () => {
    if (!credentials.password) {
      setPasswordError(true);
      setFormError("Enter a valid password.");
      return;
    }
    setPasswordError(false);
    setFormError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setFormError("");
    setFormWarning("");

    if (credentials.email === "" || credentials.password === "") {
      setFormError("Enter all the fields.");
      return;
    }

    if (credentials.email !== "" && credentials.password !== "") {
      userServices
        .login(credentials)
        .then((res) => {
          auth.setEmail(credentials.email);
          window.localStorage.setItem("token", res.data.token);
          user.setUser(res.data.user);
          setUserVerified(false);

          userServices
            .passwordNeedChange()
            .then((responseFromServer) => {
              if (responseFromServer.data.message) {
                if (responseFromServer.data.message === true) {
                  navigate("/changePassword");
                }
              }
            })
            .catch((err) => window.alert(err.response.data.error));

          if (res.data.user.role === "user") {
            navigate("/home");
          } else if (res.data.user.role === "admin") {
            navigate("/viewAllProducts");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          setFormError(err.response.data.error);
          if (err.response.data.error === "Invalid email or password.") {
            setCounter(counter + 1);
          }

          if (counter >= 5) {
            setFormWarning(
              "Your account will be locked after 5 failed attempts."
            );
          }

          if (
            err.response.data.error ===
            "Your account is locked at the moment! Sorry."
          ) {
            setFormWarning(
              "Your account is locked at the moment! Try after 5 minutes."
            );
          }
        });
    }
  };

  function onChange(value) {
    if (value) {
      setUserVerified(true);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ResponsiveAppBarLandingPage />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-[400px] mx-auto" align="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
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
                  <div className="text-3xl font-bold">
                    Login to your account
                  </div>
                  <div className="mt-4">
                    <div className="mt-2 mb-2" align="left">
                      Email:
                    </div>
                    <OutlinedInput
                      type="email"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter Your Email ..."
                      onBlur={handleEmailError}
                      className={`input input-bordered w-full`}
                      error={emailError}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailLockIcon />
                        </InputAdornment>
                      }
                    />
                    {emailError && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        Enter a valid email address.
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mt-2 mb-1" align="left">
                      Password:
                    </div>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter Your Password ..."
                      onBlur={handlePasswordError}
                      className={`input input-bordered w-full`}
                      error={passwordError}
                      startAdornment={
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {passwordError && (
                      <div className="text-sm mt-1" style={{ color: "red" }}>
                        Enter a valid password.
                      </div>
                    )}
                  </div>
                  <br />

                  {formError !== "" && (
                    <div className="text-sm mb-2 " style={{ color: "red" }}>
                      {formError}
                    </div>
                  )}

                  {formWarning !== "" && (
                    <div
                      className="alert alert-warning mt-1"
                      style={{ color: "red" }}
                    >
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>{formWarning}</span>
                    </div>
                  )}

                  <ReCAPTCHA
                    sitekey={recaptchKeys.siteKey}
                    onChange={onChange}
                  />

                  <div className="mt-3 mb-1">
                    <button
                      onClick={handleLogin}
                      style={{
                        backgroundColor: "#000000",
                        color: "white",
                        border: "none", // Remove the default border
                        marginLeft: "3rem",
                        marginRight: "3rem",
                      }}
                      className="btn font-bold"
                      disabled={!userVerified}
                    >
                      Login
                    </button>
                  </div>

                  <div className="p-1">
                    <label htmlFor="">
                      Don't have an account?
                      <span
                        onClick={() => navigate("/signup")}
                        style={{
                          cursor: "pointer",
                          color: "#b2d5f5",
                          textDecoration: "underline",
                          marginLeft: "5px",
                        }}
                      >
                        Sign up
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Login;
