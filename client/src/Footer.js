import "./Footer.css";
// import PriceComparer from "./PriceComparer";
// import Profile from "./Profile";
// import RecipeGenerator from "./RecipeGenerator";
// import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// function Home() {
//   return (
//     <a href="/home">
//       <button>
//         Home
//       </button>
//     </a>
//   )
// }

// function ContactUs() {
// return (
//     <a href="/contactus">
//     <button>
//       Contact Us
//     </button>
//     </a>
//     );
// }

// function About() {
// return (
//     <Link to="/about">
//     <button>
//       About Us
//     </button>
//     </Link>
//     );
// }

function Footer() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const API = "https://whattocook2-4e261a72626f.herokuapp.com";
    try {
      await Axios.post(
        `${API}/users/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      Cookies.remove("userToken");

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="footer">
      <div className="footer-section3">
        <label className="foot-title">WhatToCook</label>
        <p>
          Experience the joy of cooking effortlessly and economically with
          WhatToCook! Effortlessly organize your refrigerator contents, explore
          delightful recipes personalized to your ingredients, and generate
          shopping lists with estimated costs—all within a single, user-friendly
          app.
        </p>
      </div>
      <div className="footer-section1">
        <label>Quick Links</label>
        <div className="q-buttons">
          <button className="ql-buttons" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="ql-buttons" onClick={() => navigate("/contactus")}>
            Contact Us
          </button>
          <button className="ql-buttons" onClick={() => navigate("/about")}>
            About
          </button>
        </div>
      </div>
      <div className="footer-section2">
        <label>Account</label>
        <button className="ql-buttons" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Footer;
