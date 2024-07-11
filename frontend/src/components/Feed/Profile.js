import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import ProfileCards from "./ProfileCards";
import SettingPage from "./SettingPage";
import "./Profile.css";

function Profile() {
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [profilepic, setProfilePicture] = useState(null);
    const [userData, setUserData] = useState(null);
    const [statsData, setUserStatsData] = useState(null);
    const settingsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    if(loginState === "false"){
      console.log("inside",loginState);
      navigate("/");
    }
        getProfileData();
        getStatsData(); // Fetch user stats data when component mounts
    }, []);

    async function getProfileData() {
        try {
            const userId = localStorage.getItem("u_id");
            const response = await axios.get(`http://127.0.0.1:5000/signup?id=${userId}`);

            if (response.status === 200) {
                const profilePicture = response.data.profilepic;
                setProfilePicture(profilePicture);
                setUserData(response.data);
            } else {
                console.error('Error fetching profile picture:', response.status);
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    }

    async function getStatsData() {
        try {
            const userId = localStorage.getItem("u_id");
            const response = await axios.get(`http://127.0.0.1:5000/stats?id=${userId}`);

            if (response.status === 200) {
                const statsData = response.data;
                setUserStatsData(statsData);
            } else {
                console.error('Error fetching stats:', response.status);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setSettingsOpen(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggleSettings = () => {
        setSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className="container">
            <div className="imgContainer">
                <img className="imageee" src={`data:image/jpeg;base64,${profilepic}`} alt="Profile" />
            </div>
            <div className="content">
                <button className="ccle" onClick={handleToggleSettings}>
                    <div className='setting-sign' style={{ "fontSize": "50px" }}>
                        <i className="fa fa-cog" aria-hidden="true"></i>&nbsp;
                    </div>
                </button>
                {isSettingsOpen && <SettingPage toggleSettings={handleToggleSettings} />}
                {userData && (
                    <>
                        <h1>{userData.username}</h1>
                        <h4>Email: {userData.email}</h4>
                        <h4>Account Type: {userData.account_type}</h4>
                        <h4>Bio: {userData.bio}</h4>
                        <br />
                        <h1>STATS</h1>
                        {statsData && (
    <>
        <h1 className="stats">Total Posts By You: {statsData[0]}</h1>
        <h2 className="stats">Total Likes Received By You: {statsData[1]}</h2>
        <h3 className="stats">Total Comments Received By You: {statsData[2]}</h3>
        <h4 className="stats">Total Posts You Have Liked: {statsData[3]}</h4>
    </>
)}

                    </>
                )}
                <br /><br />
                <h2>ArtWorks</h2>
            </div>
            <div className="post">
                <ProfileCards />
            </div>
        </div>
    );
}

export default Profile;
