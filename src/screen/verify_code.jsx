import  { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const CodeVerifyScreen = () => {
    const [country] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hover, setHover] = useState(false);



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
                <h4 className="text-white robotoText" style={{ fontSize: "32px", lineHeight: "110%", fontWeight: "500", fontFamily: "Roboto", margin: 0 }}>
                    +92 308 4290520
                </h4>
                <span
                    style={{ marginLeft: "8px" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <FontAwesomeIcon
                        icon={faPencil}
                        style={{ color: hover ? "white" : "#AAAAAA", fontSize: "20px", cursor: "pointer" }}
                    />
                </span>
            </div>




            <div className="d-flex flex-column text-center text-secondary" style={{ lineHeight: "1.3" }}>
                <p className="mb-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}>We have send you message in Telegram</p>
                <p className="mt-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}>with the code.</p>
            </div>

            <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "10px" }}>
                <div
                    className="position-relative mb-3"
                    style={{ width: "350px" }}
                >
                    <input
                        placeholder=""
                        style={{
                            ...inputStyle,
                            fontSize: "16px",
                            fontFamily: "Roboto"
                        }}
                        value={country ? `${country.dialCode} ${phoneNumber}` : phoneNumber}
                        onChange={(e) => {
                            const dialCode = country ? country.dialCode + " " : "";
                            setPhoneNumber(e.target.value.replace(dialCode, ""));
                        }}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
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
                            fontSize: isFocused || phoneNumber || country ? "13px" : "13px",
                            color: isFocused || isHovered ? "#8774E1" : "#AAAAAA",
                            background: "linear-gradient(180deg, transparent 40%, #212121 40%)",
                            transition:
                                "all 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease",
                            pointerEvents: "none",
                        }}
                    >
                        Code
                    </label>

                </div>

            </div>


        </div>
    );
};

export default CodeVerifyScreen;
