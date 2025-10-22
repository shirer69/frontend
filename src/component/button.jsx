const Button = ({ text, onClick, disabled, loading }) => {
    return (
        <>
            <button
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
                className="btn text-white roboto-light"
                style={{ backgroundColor: "#8774E1", width: "100%", height: "54px", borderRadius: "8px", fontSize: "16px", fontFamily: "Roboto" }}
            >
                {loading ? (
                    <>
                        <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            style={{ width: "18px", height: "18px" }}
                        ></div>
                        {text}
                    </>
                ) : (
                    text
                )}
            </button>
        </>)
}

export default Button