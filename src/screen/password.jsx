import React, { useState } from "react";
import Button from "../component/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const PasswordScreen = () => {
    const [country] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputStyle = {
        height: "54px",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        width: "360px",
        paddingLeft: "10px",
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
        right: "10px",
        top: "50%",
        color: "#AAAAAA",
        transform: "translateY(-50%)",
        cursor: "pointer",
        width: "20px",
        height: "20px",
    };

    return (
        <div
            className="d-flex flex-column justify-content align-items-center"
            style={{ minHeight: "100vh", paddingTop: "50px", boxSizing: "border-box" }}
        >
            <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                {showPassword ? (
                    <img src="/assets/non_hidden.png" alt="Show Password" width="160" height="160" />
                ) : (
                    <img src="/assets/hidden.png" alt="Hide Password" width="160" height="160" />
                )}
            </div>

            <div className="mt-4 text-center">
                <h4
                    className="text-white robotoText"
                    style={{
                        fontSize: "32px",
                        margin: "22px 0 14px",
                        lineHeight: "110%",
                        fontWeight: "500",
                        fontStyle: "normal",
                        fontFamily: "Roboto",
                    }}
                >
                    Enter Your Password
                </h4>
            </div>

            <div className="d-flex flex-column text-center text-secondary" style={{ lineHeight: "1.3" }}>
                <p
                    className="mb-0"
                    style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}
                >
                    Your account is protected with
                </p>
                <p
                    className="mt-0"
                    style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}
                >
                    an additional password.
                </p>
            </div>

            <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "10px" }}>
                <div className="position-relative mb-3" style={{ width: "350px" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder=" "
                        style={{
                            ...inputStyle,
                            fontSize: "16px",
                            fontFamily: "Roboto",
                        }}
                        value={country ? `${country.dialCode} ${phoneNumber}` : phoneNumber}
                        onChange={(e) => {
                            const dialCode = country ? country.dialCode + " " : "";
                            setPhoneNumber(e.target.value.replace(dialCode, ""));
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />

                    <label
                        className="position-absolute px-1"
                        style={{
                            top: isFocused || phoneNumber || country ? "0" : "50%",
                            left: "12px",
                            fontFamily: "Roboto",
                            transform: isFocused || phoneNumber || country
                                ? "translateY(-50%) scale(0.9)"
                                : "translateY(-50%) scale(1.2)",
                            fontSize: "13px",
                            color: isFocused || isHovered ? "#8774E1" : "#AAAAAA",
                            background: "linear-gradient(180deg, transparent 40%, #212121 40%)",
                            transition: "all 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease",
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
            </div>

            <div className="mt-2">
                <Button text="Next" />
            </div>
        </div>
    );
};

export default PasswordScreen;
