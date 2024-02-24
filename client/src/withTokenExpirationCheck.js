import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const withTokenExpirationCheck = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkTokenExpiration = () => {
        const authToken = Cookies.get("userToken");

        if (!authToken) {
          // redirect to login page
          navigate("/");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);

        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          navigate("/");
        }
      };

      checkTokenExpiration();

      // timer to check token expiration periodically
      const expirationCheckInterval = setInterval(() => {
        checkTokenExpiration();
      }, 60000); 

      
      return () => clearInterval(expirationCheckInterval);
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};


const decodeJwtToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

export default withTokenExpirationCheck;
