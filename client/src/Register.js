import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const carousel = document.querySelector(".carousel");
      const carouselItems = document.querySelectorAll(".carousel-item");
      const carouselButtons = document.querySelectorAll(".carousel_button");

      let currentIndex = 0;

      function showItem(index) {
        carouselItems.forEach((item, i) => {
          item.style.display = i === index ? "block" : "none";
        });
      }

      function updateCarousel() {
        carouselButtons.forEach((button, i) => {
          button.addEventListener("click", () => {
            currentIndex = i;
            showItem(currentIndex);
            updateButtonStyles();
          });
        });
      }

      function updateButtonStyles() {
        carouselButtons.forEach((button, i) => {
          button.classList.toggle(
            "carousel_button--selected",
            i === currentIndex
          );
        });
      }

      function startCarousel() {
        setInterval(() => {
          currentIndex = (currentIndex + 1) % carouselItems.length;
          showItem(currentIndex);
          updateButtonStyles();
        }, 3000); // Adjust the interval for the desired speed (in milliseconds)
      }

      showItem(currentIndex);
      updateCarousel();
      startCarousel();
    }
  }, []);

  const handleRegistration = async () => {
    const API = "https://whattocook2-4e261a72626f.herokuapp.com";

    try {
      const response = await Axios.post(
        `${API}/users/register`,
        {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="body">
      <div className="login_container">
        <div className="carousel">
          <div className="carousel-item">
            <img src="/images/login/login1.png" alt="" />
            <div className="carousel-text">Enter your ingredients</div>
          </div>
          <div className="carousel-item">
            <img src="/images/login/login2.png" alt="" />
            <div className="carousel-text">Find a recipe and start cooking</div>
          </div>
          <div className="carousel-item">
            <img src="/images/login/login3.png" alt="" />
            <div className="carousel-text">
              Then start eating your delicious meal
            </div>
          </div>
          <div className="carousel_nav">
            <span className="carousel_button"></span>
            <span className="carousel_button"></span>
            <span className="carousel_button"></span>
          </div>
        </div>
        <div className="registration">
          <h1>Registration</h1>
          <label htmlFor="username" className="username-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <label htmlFor="password" className="password-label">
            Password
          </label>
          <input
            id="password"
            type="text"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <label htmlFor="email" className="email-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <button className="register-button" onClick={handleRegistration}>
            Register
          </button>
          <div className="login">
            <Link to="/">
              <button> Login </button>
            </Link>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
