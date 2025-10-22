import React, { useState } from "react";
import Button from "../component/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { verify2faApi } from "../api/login";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");
  const code = JSON.parse(localStorage.getItem("enteredCode"));

  const handleVerify2FA = async () => {
    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }

    setPasswordError(""); // clear previous error

    try {
      setLoading(true);
      const response = await verify2faApi(
        loginData.phone,
        password,
        code,
        loginData.phone_code_hash
      );

      console.log("✅ 2FA success:", response.data);
      navigate("/2fa-enable");
    } catch (error) {
      console.error("❌ 2FA failed:", error);
      setPasswordError(
        error.response?.data?.detail || "Incorrect password or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    height: "54px",
    borderRadius: "10px",
    borderWidth: "2px",
    borderStyle: "solid",
    width: "100%",
    paddingLeft: "10px",
    paddingRight: "35px", // space for eye icon
    backgroundColor: "#212121",
    color: "#fff",
    boxSizing: "border-box",
    outline: "none",
    alignItems: "center",
    opacity: 0.9,
    borderColor: isFocused || isHovered ? "#8774E1" : "#2D2D2D",
  };

  const eyeStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#AAAAAA",
    cursor: "pointer",
    width: "20px",
    height: "20px",
  };

  return (
    <div
      className="d-flex flex-column justify-content align-items-center"
      style={{ minHeight: "100vh", paddingTop: "50px", boxSizing: "border-box" }}
    >
      {/* Top Image */}
      <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
        {showPassword ? (
          <img src="/assets/non_hidden.png" alt="Show Password" width="160" height="160" />
        ) : (
          <img src="/assets/hidden.png" alt="Hide Password" width="160" height="160" />
        )}
      </div>

      {/* Title */}
      <div className="mt-4 text-center">
        <h4
          className="text-white robotoText"
          style={{
            fontSize: "32px",
            margin: "22px 0 14px",
            lineHeight: "110%",
            fontWeight: "500",
            fontFamily: "Roboto",
          }}
        >
          Enter Your Password
        </h4>
      </div>

      {/* Subtitle */}
      <div className="d-flex flex-column text-center text-secondary" style={{ lineHeight: "1.3" }}>
        <p className="mb-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px" }}>
          Your account is protected with
        </p>
        <p className="mt-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px" }}>
          an additional password.
        </p>
      </div>

      {/* Input Field */}
      <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "6px" }}>
        <div className="position-relative" style={{ width: "350px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder=" "
            style={{ ...inputStyle, fontSize: "16px", fontFamily: "Roboto" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={loading}
          />

          <label
            className="position-absolute px-1"
            style={{
              top: isFocused || password ? "-10px" : "50%",
              left: "12px",
              fontFamily: "Roboto",
              transform:
                isFocused || password
                  ? "translateY(0) scale(0.9)"
                  : "translateY(-50%) scale(1.1)",
              fontSize: "13px",
              color: isFocused || isHovered ? "#8774E1" : "#AAAAAA",
              background: "#212121",
              padding: "0 4px",
              transition: "all 0.2s ease-in-out",
              pointerEvents: "none",
            }}
          >
            Password
          </label>

          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            style={eyeStyle}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Inline Error Message */}
        {passwordError && (
          <div style={{ width: "350px" }}>
            <p
              style={{
                color: "#FF6B6B",
                fontSize: "13px",
                marginTop: "4px",
                marginBottom: 0,
                textAlign: "left",
                fontFamily: "Roboto",
              }}
            >
              {passwordError}
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-3 w-100" style={{ width: "350px" }}>
        <Button
          text={loading ? "Verifying..." : "Next"}
          onClick={handleVerify2FA}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default PasswordScreen;
