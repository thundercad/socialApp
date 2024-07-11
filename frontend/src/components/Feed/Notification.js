import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from 'axios';
import './Notification.css';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    if(loginState === "false"){
      console.log("inside",loginState);
      navigate("/");
    }

        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/notifications?id=${localStorage.getItem("u_id")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}` // Add JWT token
                }
            });
            if (response.status === 200) {
                setNotifications(response.data); // Ensure notifications array exists
                console.log(response.data)
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    return (
        <div className="cntr">
            <h1>Notifications</h1>
            <div className="notification-list">
                {notifications.map((notification, index) => (
                    <div key={index} className="notification">
                        {notification.n_text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
