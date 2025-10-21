import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import Button from "../component/button";

const LoginScreen = () => {
    const [country, setCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isCountryFocused, setIsCountryFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const countryDialCodes = {
        AF: "+93",
        AL: "+355",
        DZ: "+213",
        AS: "+1-684",
        AD: "+376",
        AO: "+244",
        AI: "+1-264",
        AG: "+1-268",
        AR: "+54",
        AM: "+374",
        AW: "+297",
        AU: "+61",
        AT: "+43",
        AZ: "+994",
        BS: "+1-242",
        BH: "+973",
        BD: "+880",
        BB: "+1-246",
        BY: "+375",
        BE: "+32",
        BZ: "+501",
        BJ: "+229",
        BM: "+1-441",
        BT: "+975",
        BO: "+591",
        BA: "+387",
        BW: "+267",
        BR: "+55",
        IO: "+246",
        VG: "+1-284",
        BN: "+673",
        BG: "+359",
        BF: "+226",
        BI: "+257",
        KH: "+855",
        CM: "+237",
        CA: "+1",
        CV: "+238",
        KY: "+1-345",
        CF: "+236",
        TD: "+235",
        CL: "+56",
        CN: "+86",
        CX: "+61",
        CC: "+61",
        CO: "+57",
        KM: "+269",
        CK: "+682",
        CR: "+506",
        HR: "+385",
        CU: "+53",
        CW: "+599",
        CY: "+357",
        CZ: "+420",
        CD: "+243",
        DK: "+45",
        DJ: "+253",
        DM: "+1-767",
        DO: "+1-809",
        EC: "+593",
        EG: "+20",
        SV: "+503",
        GQ: "+240",
        ER: "+291",
        EE: "+372",
        ET: "+251",
        FK: "+500",
        FO: "+298",
        FJ: "+679",
        FI: "+358",
        FR: "+33",
        GF: "+594",
        PF: "+689",
        GA: "+241",
        GM: "+220",
        GE: "+995",
        DE: "+49",
        GH: "+233",
        GI: "+350",
        GR: "+30",
        GL: "+299",
        GD: "+1-473",
        GP: "+590",
        GU: "+1-671",
        GT: "+502",
        GG: "+44",
        GN: "+224",
        GW: "+245",
        GY: "+592",
        HT: "+509",
        HN: "+504",
        HK: "+852",
        HU: "+36",
        IS: "+354",
        IN: "+91",
        ID: "+62",
        IR: "+98",
        IQ: "+964",
        IE: "+353",
        IM: "+44",
        IL: "+972",
        IT: "+39",
        CI: "+225",
        JM: "+1-876",
        JP: "+81",
        JE: "+44",
        JO: "+962",
        KZ: "+7",
        KE: "+254",
        KI: "+686",
        KP: "+850",
        KR: "+82",
        KW: "+965",
        KG: "+996",
        LA: "+856",
        LV: "+371",
        LB: "+961",
        LS: "+266",
        LR: "+231",
        LY: "+218",
        LI: "+423",
        LT: "+370",
        LU: "+352",
        MO: "+853",
        MG: "+261",
        MW: "+265",
        MY: "+60",
        MV: "+960",
        ML: "+223",
        MT: "+356",
        MH: "+692",
        MQ: "+596",
        MR: "+222",
        MU: "+230",
        YT: "+262",
        MX: "+52",
        FM: "+691",
        MD: "+373",
        MC: "+377",
        MN: "+976",
        ME: "+382",
        MS: "+1-664",
        MA: "+212",
        MZ: "+258",
        MM: "+95",
        NA: "+264",
        NR: "+674",
        NP: "+977",
        NL: "+31",
        NC: "+687",
        NZ: "+64",
        NI: "+505",
        NE: "+227",
        NG: "+234",
        NU: "+683",
        NF: "+672",
        MP: "+1-670",
        NO: "+47",
        OM: "+968",
        PK: "+92",
        PW: "+680",
        PS: "+970",
        PA: "+507",
        PG: "+675",
        PY: "+595",
        PE: "+51",
        PH: "+63",
        PL: "+48",
        PT: "+351",
        PR: "+1-787",
        QA: "+974",
        RE: "+262",
        RO: "+40",
        RU: "+7",
        RW: "+250",
        BL: "+590",
        SH: "+290",
        KN: "+1-869",
        LC: "+1-758",
        MF: "+590",
        PM: "+508",
        VC: "+1-784",
        WS: "+685",
        SM: "+378",
        ST: "+239",
        SA: "+966",
        SN: "+221",
        RS: "+381",
        SC: "+248",
        SL: "+232",
        SG: "+65",
        SX: "+1-721",
        SK: "+421",
        SI: "+386",
        SB: "+677",
        SO: "+252",
        ZA: "+27",
        SS: "+211",
        ES: "+34",
        LK: "+94",
        SD: "+249",
        SR: "+597",
        SZ: "+268",
        SE: "+46",
        CH: "+41",
        SY: "+963",
        TW: "+886",
        TJ: "+992",
        TZ: "+255",
        TH: "+66",
        TL: "+670",
        TG: "+228",
        TK: "+690",
        TO: "+676",
        TT: "+1-868",
        TN: "+216",
        TR: "+90",
        TM: "+993",
        TC: "+1-649",
        TV: "+688",
        UG: "+256",
        UA: "+380",
        AE: "+971",
        GB: "+44",
        US: "+1",
        UY: "+598",
        UZ: "+998",
        VU: "+678",
        VA: "+379",
        VE: "+58",
        VN: "+84",
        WF: "+681",
        EH: "+212",
        YE: "+967",
        ZM: "+260",
        ZW: "+263"
    };

    const options = countryList().getData().map(country => ({
        value: country.value,
        label: country.label,
        dialCode: countryDialCodes[country.value] || "",
    }));


    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            height: "54px",
            width: "360px",
            borderRadius: "10px",
            borderWidth: "2px",
            borderColor: state.isFocused ? "#8774E1" : "#2D2D2D",
            backgroundColor: "#212121",
            color: "#fff",
            boxShadow: "none",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            opacity: 0.9,
            "&:hover": {
                borderWidth: "2px",
                borderColor: "#8774E1",
            },
        }),

        valueContainer: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
            height: "100%",
            padding: "0 10px",
        }),

        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "Roboto",
            transform: "none",
            position: "relative",
            top: "0",
        }),

        input: (provided) => ({
            ...provided,
            margin: "0",
            padding: "0",
            fontFamily: "Roboto",
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#aaa",
            display: "flex",
            alignItems: "center",
            transform: "none",
            fontSize: "16px",
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: "#212121",
            color: "#fff",
        }),

        menuList: (provided) => ({
            ...provided,
            maxHeight: "250px",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            padding: 8,
            color: "#fff",
            transform: "scale(1.3)",
        }),

        indicatorSeparator: () => ({ display: "none" }),
    };



    const customOption = ({ innerProps, innerRef, data }) => (
        <div
            ref={innerRef}
            {...innerProps}
            style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Roboto",
                fontSize: "16px",
                alignItems: "center",
                gap: "8px",
                padding: "10px",
                backgroundColor: innerProps?.isFocused ? "#333" : "#212121",
                color: "#fff",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ReactCountryFlag countryCode={data.value} svg style={{ width: '20px', height: '20px' }} />
                <span>{data.label}</span>
            </div>
            <span>{data.dialCode}</span>
        </div>
    );

    useEffect(() => {
        if (!country) {
            const timer = setTimeout(() => {
                const defaultCountry = options.find(opt => opt.value === "FR");
                setCountry(defaultCountry);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [country, options]);


    const setDefaultCountry = () => {
        if (!country) {
            const defaultCountry = options.find(opt => opt.value === "FR"); // e.g., France
            setCountry(defaultCountry);
        }
    };




    const inputStyle = {
        height: "54px",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        width: "360px",
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
            style={{ minHeight: "100vh", paddingTop: "50px", boxSizing: "border-box"  }}
        >

            <div>
                <img src="/assets/TelegramIcon.svg" alt="Logo" width="160" height="160" />
            </div>

            <div className="mt-4 text-center">
                <h4
                    className="text-white robotoText"
                    style={{ fontSize: "32px", margin: "22px 0 14px", lineHeight: "110%", fontWeight: "500", fontStyle: "normal", fontFamily: "Roboto" }}
                >
                    Sign in to Telegram
                </h4>
            </div>

            <div className="d-flex flex-column text-center text-secondary" style={{ lineHeight: "1.3" }}>
                <p className="mb-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}>Please confirm your country code</p>
                <p className="mt-0" style={{ color: "#AAAAAA", fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" }}>and enter your phone number.</p>
            </div>

            <div className="d-flex flex-column align-items-center mt-4" style={{ gap: "10px" }}>
                <div className="position-relative mb-2" style={{ width: "350px" }}>
                    <Select
                        options={options}
                        value={country}
                        onChange={setCountry}
                        styles={customStyles}
                        components={{ Option: customOption }}
                        placeholder=""
                        onFocus={() => setIsCountryFocused(true)}
                        onBlur={() => setIsCountryFocused(false)}
                    />
                    <label
                        className="position-absolute px-1"
                        style={{
                            top: isCountryFocused || country ? "0" : "50%",
                            left: "12px",
                            fontFamily: "Roboto",
                            transform: isCountryFocused || country
                                ? "translateY(-50%) scale(0.9)"
                                : "translateY(-50%) scale(1.2)",
                            fontSize: isCountryFocused || country ? "13px" : "13px",
                            color: isCountryFocused ? "#8774E1" : "#aaa",
                            background: "linear-gradient(180deg, transparent 40%, #212121 40%)",
                            transition: "all 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease",
                            pointerEvents: "none",
                        }}
                    >
                        Country
                    </label>
                </div>

                <div
                    className="position-relative mb-3"
                    style={{ width: "350px" }}
                >
                    <input
                        placeholder="--- --- ---"
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
                            setDefaultCountry();
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
                        Phone Number
                    </label>

                </div>

            </div>

            <div className="mt-3">
                <Button text='Next' />
            </div>


        </div>
    );
};

export default LoginScreen;
