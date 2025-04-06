import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link as ScrollLink } from "react-scroll";

const SignUp = () => {
  const [householdName, setHouseholdName] = useState("");
  const [householdEmail, setHouseholdEmail] = useState("");
  const [householdPassword, setHouseholdPassword] = useState("");
  const [householdPhone, setHouseholdPhone] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");

  const [signUpMessage, setSignUpMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  const handleHouseholdSignUp = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      (householdPassword !== "") &
      (householdEmail !== "") &
      !passwordRegex.test(householdPassword)
    ) {
      setSignUpMessage(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }
    const userData = {
      name: householdName,
      email: householdEmail,
      password: householdPassword,
      phone: householdPhone,
      userType: "household",
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/signup",
        userData
      );

      setSignUpMessage("User Account Created Successfully");

      let timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        navigate("/login"); // Replace "/login" with the actual route to your login page
      }, 10000);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setSignUpMessage(error.response.data.error);
      } else {
        setSignUpMessage("Something went wrong");
      }
      console.log(error); // Handle the error
    }
  };

  const handleBusinessSignUp = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      (businessPassword !== "") &
      (businessEmail !== "") &
      !passwordRegex.test(businessPassword)
    ) {
      setSignUpMessage(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }
    const businessData = {
      name: businessName,
      email: businessEmail,
      password: businessPassword,
      phone: businessPhone,
      userType: "business",
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/signup",
        businessData
      );
      const data = response.data;
      setSignUpMessage("User Account Created Successfully");
      console.log(data); // Handle the response as needed
      let timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        navigate("/login"); // Replace "/login" with the actual route to your login page
      }, 10000);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setSignUpMessage(error.response.data.error);
      } else {
        setSignUpMessage("Something went wrong");
      }
      console.log(error); // Handle the error
    }
  };

  const handleSendOtp = async () => {
    if (!businessPhone) {
      setSignUpMessage("Please enter a valid phone number.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5050/send-otp", {
        phone: businessPhone,
      });
      setSignUpMessage("OTP sent successfully");
      console.log(response.data);
    } catch (error) {
      setSignUpMessage("Failed to send OTP");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !businessPhone) {
      setSignUpMessage("Please enter the OTP and phone number.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5050/verify-otp", {
        phone: businessPhone,
        code: otp,
      });
      if (response.data.message === "Phone no verified") {
        setIsOtpVerified(true);
        setSignUpMessage("Phone number verified successfully.");
      } else {
        setIsOtpVerified(false);
        setSignUpMessage("Invalid OTP");
      }
    } catch (error) {
      setSignUpMessage("OTP verification failed");
      console.error(error);
    }
  };

  {!isOtpVerified && (
    <p className="error">
      Please verify your phone number with OTP before signing up.
    </p>
  )}  

  return (
    <div className="signup-body">
      <div className="wrapper">
        <div className="description">
          <h1 id="msg">
            Make a difference with{" "}
            <span className="site-name">KindBasket</span>
          </h1>
          <p>
            Sign up below to join our community and unlock a world of
            possibilities. <br />
            Fill out the form and let's get started on this journey together
          </p>
        </div>
      </div>
      {signUpMessage && (
        <p
          className={`message ${
            signUpMessage
              ? signUpMessage === "User Account Created Successfully"
                ? "success"
                : "error"
              : ""
          }`}
        >
          {signUpMessage}
        </p>
      )}
      {signUpMessage === "User Account Created Successfully" &&
        countdown > 0 && (
          <p className="countdown-timer">
            Redirecting in <span className="timer">{countdown}</span> seconds to
            LOG IN...
          </p>
        )}
      <div className="form-wrapper">
        <div className="container2">
          <h1>Register</h1>
          <form method="POST">
            <div className="form-group2">
              <input
                type="text"
                id="name2"
                name="name2"
                placeholder="Name of the Business"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="form-group2">
              <input
                type="email"
                id="email2"
                name="email2"
                placeholder="Business Email ID"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group2">
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Create Password"
                value={businessPassword}
                onChange={(e) => setBusinessPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group2">
              <input
                type="tel"
                id="phone2"
                name="phone2"
                placeholder="Contact Number"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                required
              />
              <button type="button" onClick={handleSendOtp}>
                Send OTP
              </button>
            </div>
            <div className="form-group2">
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="button" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          </form>

          <div className="bullet-points2">
            
          </div>
          <ScrollLink to="msg" smooth={true} duration={500}>
            <button
              type="button"
              className="sign-upbtn"
              onClick={handleBusinessSignUp}
            >
              SIGN UP
            </button>
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
