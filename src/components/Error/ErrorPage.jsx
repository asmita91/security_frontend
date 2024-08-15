
import React from "react";
import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <main
      style={{
        backgroundColor: "#b2d5f5",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-white text-4xl font-semibold sm:text-5xl">
            Oops! This Page Got Lost
          </h3>
          <p className="text-black">
            It seems like the page you are looking for has wandered off. But don’t worry, let’s get you back on track!
          </p>
          <NavLink
            to={"/home"}
            className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
          >
            Return Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </NavLink>
        </div>
      </div>

      {/* Paw prints using Unicode characters */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          fontSize: "3rem",
          color: "rgba(255, 255, 255, 0.5)",
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
          color: "rgba(255, 255, 255, 0.5)",
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
          color: "rgba(255, 255, 255, 0.5)",
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
          color: "rgba(255, 255, 255, 0.5)",
          transform: "rotate(5deg)",
        }}
      >
        🐾
      </div>
    </main>
  );
};
