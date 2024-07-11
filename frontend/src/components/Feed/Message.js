import React, {useState, useEffect } from 'react';
import {useNavigate } from "react-router";
import axios from 'axios'; // Import axios
import './Message.css'; // Import CSS file

function Message() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Fetch messages from the server
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/forum');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user_id = localStorage.getItem("u_id");
        const topic = 'Sample Topic';
        const content = messageInput;

        // Call addMessage function with the necessary parameters
        await addMessage(user_id, topic, content);

        // Clear the input field after submitting
        setMessageInput('');
    };

    // Function to add a new message
    const addMessage = async (user_id, topic, content) => {
        try {
            const requestBody = { user_id, topic, content };
            await axios.post('http://127.0.0.1:5000/forum', requestBody);
            // Fetch updated messages after adding a new one
            await fetchMessages();
            console.log('Message added successfully');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    // Fetch messages when the component mounts
    useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    if(loginState === "false"){
      console.log("inside",loginState);
      navigate("/");
    }
        fetchMessages();
    }, []);

    // Render messages
    return (
        <div className='msg-container'>
            <h1>Messages</h1>
            <ul className='messages-list'>
                {messages.map((msg, index) => (
                    <li key={index} className='message'>
                        <div>{msg.Content}</div>
                        <div><strong>Post Date:</strong> {msg["Post Date"]}</div>
                    </li>
                ))}
            </ul>
            <form className='msg-input' onSubmit={handleSubmit}>
                <input
                    className='input-line'
                    type="text"
                    placeholder="Type here ..."
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                />
                <button type='submit' style={{ border: "none", background: "black", fontSize: "30px" }}>
                    <i className="fa fa-paper-plane" style={{ fontSize: "100%", color: "white" }} aria-hidden="true"></i>
                </button>
            </form>
        </div>
    );
}

export default Message;
