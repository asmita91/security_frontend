import axios from "axios";
import React, { useRef, useState } from "react";
import { Puff } from "react-loader-spinner";
import { toast } from "react-toastify";

const PasswordResetRequest = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  // export const forgetpasswordApi = (data) =>
  //   Api.post(`/api/user/forgot-password`, data);

  // export const getAllUsersApi = () =>
  //   Api.get("/api/user/all_users");

  // export const resetPasswordApi = (data, token) =>
  //   Api.put(`/api/user/password/reset/${token}`, data);

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
    setErrors(""); // Clear errors on input change
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setErrors("Email is required");
      emailRef.current.focus();
      return;
    }

    if (!validateEmail(forgotPasswordEmail)) {
      setErrors("Please enter a valid email address");
      emailRef.current.focus();
      return;
    }

    const data = { email: forgotPasswordEmail };

    setLoading(true);

    axios
      .post("https://localhost:3005/users/forgot-password", data)
      .then((res) => {
        if (res.data.success) {
          setErrors("");
          setForgotPasswordEmail("");
          toast.success(res.data.message);
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.response?.data?.message || "Internal server error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const styles = {
    diagnoseBtn: {
      padding: "7px 17px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontFamily: "merriweather",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "transform 0.2s ease",
      textDecoration: "none",
      textTransform: "none", // Ensure the text is not transformed to uppercase
      position: "relative", // Ensure the position is set to relative for the zoom effect
    },
    diagnoseBtnHover: {
      backgroundColor: "#0056b3",
      animation: "zoom 0.6s infinite", // Add this line to apply the zoom animation on hover
    },
    loaderContainer: {
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "flex-start", // Align to the top
      height: "100vh", // Full viewport height
      paddingTop: "20vh", // Add some padding from the top to position it nicely
    },
  };
  // Add the keyframes for the zoom animation
  const zoomKeyframes = `
  @keyframes zoom {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  `;

  // Append the keyframes to the document's stylesheet
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(zoomKeyframes, styleSheet.cssRules.length);

  return (
    <div className="wave-section">
      <div
        className="form-container d-flex justify-content-center align-items-center border rounded"
        style={{ minHeight: "30vh", backgroundColor: "#ffffff" }}
      >
        <div
          className="border rounded p-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2
            className="text-center mb-3"
            style={{ color: "#3586ff", fontSize: "1.5rem" }}
          >
            Forgot Password?
          </h2>
          <p className="text-center" style={{ fontSize: "0.9rem" }}>
            Don’t worry, happens to all of us. Enter your email below to recover
            your password.
          </p>
          <form onSubmit={forgotPassword}>
            <div className="mb-3">
              <label htmlFor="email" style={{ fontSize: "0.9rem" }}>
                Email
              </label>
              <input
                ref={emailRef}
                onChange={handleForgotPasswordEmail}
                className="form-control"
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                aria-label="Enter your email to reset password"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                }}
              />
              {errors && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {errors}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="custom-button border rounded btn w-100"
              style={{
                backgroundColor: "#3586ff",
                color: "#ffffff",
                padding: "0.5rem",
                fontSize: "1rem",
                transition: "transform 0.2s",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  styles.diagnoseBtnHover.backgroundColor;
                e.currentTarget.style.animation =
                  styles.diagnoseBtnHover.animation;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  styles.diagnoseBtn.backgroundColor;
                e.currentTarget.style.animation = "none"; // Remove the animation
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center">
                  <Puff
                    height="20"
                    width="20"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="loading"
                  />
                  <span style={{ marginLeft: "10px", fontSize: "0.9rem" }}>
                    Generating reset password link...
                  </span>
                </div>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
