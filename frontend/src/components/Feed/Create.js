import Navbar from "./Navbar";
import './Create.css';
import axios from "axios";
import { useState } from 'react';

function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageBase64, setImageBase64] = useState(''); // State to hold the base64 string of the image

    const cookieString = document.cookie;
    const usernameCookie = cookieString.split(';').find(cookie => cookie.trim().startsWith('username='));
    const username = usernameCookie ? usernameCookie.split('=')[1] : null;

    const apiUrl = 'http://127.0.0.1:5000/art';

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const requestBody = {
            u_id: localStorage.getItem('u_id'),
            title: title,
            description: description,
            category: category,
            image: imageBase64 // Send the base64 string of the image
        };

        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

            const response = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}` // Set the Authorization header with the bearer token
                }
            });
            
            // Handle success response here
        } catch (error) {
            console.error("Error adding artwork:", error);
            // Handle error, e.g., display error message to the user
        }
    }
    
    // Handle change in the image input
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        // Read the file as a data URL (base64 format)
        const reader = new FileReader();
        reader.onloadend = () => {
            // When reading is completed, set the imageBase64 state to the base64 string
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <div className="App">
                <Navbar uname={username}/>
            </div>
            <div>
                <h1>Create</h1>
            </div>
            <form className="upload-box" onSubmit={handleSubmit}>
                <label className="label" htmlFor="title">Title</label>
                <input id="title" type="text" placeholder="Enter title..." name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label className="label" htmlFor="description">Description</label>
                <input id="description" type="text" placeholder="Enter description..." name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label className="label" htmlFor="category">Category</label>
                <input id="category" type="text" placeholder="Enter category..." name="category" value={category} onChange={(e) => setCategory(e.target.value)} required />

                <label className="label" htmlFor="image">Image</label>
                <input id="image" type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                
                <button className="upload-input" type="submit">Upload</button> 
            </form>
        </div>
    );
}

export default Create;
