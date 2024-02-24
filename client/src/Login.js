import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleLogin = async () => {
    // const API_BASE_URL = 'https://www.whattocook.cc'
    const API = "https://whattocook2-4e261a72626f.herokuapp.com";

    if (!usernameLog || !passwordLog) {
      setLoginStatus("Please enter both username and password");
      return;
    }

    try {
      const response = await Axios.post(
        API + "/users/login",
        {
          username: usernameLog,
          password: passwordLog,
        },
        { withCredentials: true }
      );

      console.log(response);
      console.log(response.data.message);

      const { token } = response.data;

      Cookies.set("userToken", token, { expires: 1 });

      setLoginStatus(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoginStatus("Error during login");
    }
  };

  // useEffect(()=> {
  //     Axios.get("http://localhost:3001/users/check-login")
  //         .then((response) => {
  //             if (response.data.loggedIn === true) {
  //                 setLoginStatus(response.data.user.username)
  //             }
  //     })
  //     .catch((error) => {
  //         console.error("Error checking login status:", error)
  //         setLoginStatus("Error checking login status")
  //     })
  // }, [])

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

        <div className="login">
          <h1>WhatToCook</h1>
          <h2>Welcome to WhatToCook</h2>
          <label htmlFor="username" className="username-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username ..."
            onChange={(e) => {
              setUsernameLog(e.target.value);
            }}
          />
          <label htmlFor="password" className="password-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password ..."
            onChange={(e) => {
              setPasswordLog(e.target.value);
            }}
          />
          <button onClick={handleLogin}>Login</button>
          <div className="register">
            <Link to="/register">
              <button> Sign Up </button>
            </Link>
          </div>
          <p className="message">{loginStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
