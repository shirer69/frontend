// src/api/api.js
import axios from "axios";


console.log("API BASE URL:", process.env.REACT_APP_API_BASE_URL);

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const initiateLogin = async (phone) => {
    try {
        const response = await API.post("/login", { phone });
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error.response?.data || error.message;
    }
};


export const verifyCodeApi = async (phone, code, phone_hash) => {
    try {
        const response = await API.post(`/verify-code`, {
            phone,
            code,
            phone_hash,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Verify code error:", error);
        throw error;
    }
};


export const verify2faApi = async (phone, password, code, phone_hash) => {
    return await await API.post(`/verify-2fa`, {
        phone,
        password,
        code,
        phone_hash,
    });
};



// // 2FA enable API
// export const enable2FA = async (phone, new_password, hint = "") => {
//     return await API.post("/enable_2fa", {
//         phone,
//         new_password,
//         hint,
//     });
// };

export const getProfile = async (phone) => {
    try {
        const encodedPhone = encodeURIComponent(phone);
        const response = await API.get(`/get_profile?phone=${encodedPhone}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};



export default API;
