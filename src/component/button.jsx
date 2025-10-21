const Button = ({ text }) => {
    return (
        <>
            <button
                className="btn text-white roboto-light"
                style={{ backgroundColor: "#8774E1", width: "360px", height: "54px", borderRadius: "8px", fontSize: "16px", fontFamily: "Roboto" ,marginLeft:"15px" }}
            >
                {text}
            </button>
        </>)
}

export default Button