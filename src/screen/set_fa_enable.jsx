import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { getProfile } from "../api/login";

const SetEnable2fa = () => {
    const navigate = useNavigate(); // ✅ initialize navigate

    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [profile, setProfile] = useState(null);

    const phone = localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData")).phone
        : null;

    const fetchProfile = async () => {
        try {
            const res = await getProfile(phone);
            console.log("getProfile response:", res);
            setProfile(res.profile || null);
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div
            className="container-fluid d-flex flex-column flex-lg-row justify-content-center align-items-center py-5 gap-3"
            style={{ minHeight: "100vh", backgroundColor: "#121212" }}
        >
            {/* Profile Card */}
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
                {profile ? (
                    <>
                        <p><strong>Name:</strong> {profile.first_name}{profile.last_name ? ` ${profile.last_name}` : ""}</p>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Bio:</strong> {profile.bio || "-"}</p>
                        <a
                            href={baseURL + profile.session_download_url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all text-sm font-medium"
                        >
                            Download Session
                        </a>
                        {/* ✅ Back button */}
                        <a
                            onClick={() => navigate("/")}
                            className="group inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all text-sm font-medium"
                        >
                            Back
                            <svg
                                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>

                    </>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default SetEnable2fa;
