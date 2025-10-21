import React, { useState } from "react";

const SetEnable2fa = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hintPassword, setHintPassword] = useState("");
    const [isFocused, setIsFocused] = useState({ email: false, password: false, hint: false });

    const inputStyle = (focused) => ({
        height: "54px",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        width: "100%",
        backgroundColor: "#212121",
        color: "#fff",
        paddingLeft: "12px",
        boxSizing: "border-box",
        outline: "none",
        borderColor: focused ? "#8774E1" : "#2D2D2D",
        fontFamily: "Roboto",
        fontSize: "16px",
        marginBottom: "20px",
        transition: "border-color 0.3s",
    });

    const handleFocus = (field) => setIsFocused({ ...isFocused, [field]: true });
    const handleBlur = (field) => setIsFocused({ ...isFocused, [field]: false });

    return (
        <div className="container-fluid d-flex flex-column flex-lg-row justify-content-center align-items-center py-5 gap-3"
            style={{ minHeight: "100vh", backgroundColor: "#121212" }}
        >
            {/* Left side: Card with inputs */}
            <div
                className="p-4 p-lg-5 mb-4 mb-lg-0"
                style={{
                    backgroundColor: "#1E1E1E",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: "1 1 400px",
                    maxWidth: "450px",
                }}
            >
                <h4
                    className="text-white text-center mb-4"
                    style={{ fontSize: "28px", fontWeight: 500, fontFamily: "Roboto" }}
                >
                    Set 2 Factor Enable
                </h4>

                <input
                    placeholder="Email"
                    style={inputStyle(isFocused.email)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                />

                <input
                    type="password"
                    placeholder="Password"
                    style={inputStyle(isFocused.password)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                />

                <input
                    placeholder="Hint Password"
                    style={inputStyle(isFocused.hint)}
                    value={hintPassword}
                    onChange={(e) => setHintPassword(e.target.value)}
                    onFocus={() => handleFocus("hint")}
                    onBlur={() => handleBlur("hint")}
                />

                <button
                    className="btn text-white mt-3"
                    style={{
                        backgroundColor: "#8774E1",
                        width: "100%",
                        height: "54px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                    }}
                >
                    Set 2FA
                </button>
            </div>

            {/* Right side: Profile Details */}
            <div
                className="p-4"
                style={{
                    backgroundColor: "#1E1E1E",
                    borderRadius: "15px",
                    color: "#fff",
                    fontFamily: "Roboto",
                    flex: "1 1 300px",
                    maxWidth: "400px",
                }}
            >
                <h3 className="mb-3">Profile Details</h3>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Username:</strong> johndoe123</p>
                <p><strong>Email:</strong> johndoe@example.com</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
            </div>
        </div>
    );
};

export default SetEnable2fa;
