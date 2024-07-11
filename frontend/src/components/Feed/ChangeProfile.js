import './ChangeProfile.css';
import { useState } from 'react';
import axios from 'axios';

function ChangeProfile(prop) {
    const updateUsername = async (newUsername) => {
        try {
            console.log(newUsername)
            const response = await axios.put('http://127.0.0.1:5000/update', {
                username: newUsername
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            return response.data.message;
        } catch (error) {
            console.error('Error updating username:', error);
            throw error;
        }
    };

    const updateEmail = async (newEmail) => {
        try {
            const response = await axios.put('/update', {
                email: newEmail
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.message;
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    };

    const updateBio = async (newBio) => {
        try {
            const response = await axios.put('/update', {
                bio: newBio
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.message;
        } catch (error) {
            console.error('Error updating bio:', error);
            throw error;
        }
    };


    const updateProfilePicture = async (newProfilePic) => {
        try {
            // Create a new Blob object from the file
            const blob = new Blob([newProfilePic]);
    
            // Create a FileReader object
            const reader = new FileReader();
    
            // Define a promise to handle the asynchronous file reading
            const filePromise = new Promise((resolve, reject) => {
                // Define the onloadend event handler to be executed when the file reading is complete
                reader.onloadend = () => {
                    // Resolve the promise with the Base64 string result
                    resolve(reader.result);
                };
    
                // Define the onerror event handler to handle any errors during file reading
                reader.onerror = (error) => {
                    reject(error);
                };
            });
    
            // Read the file as a Data URL (Base64 string)
            reader.readAsDataURL(blob);
    
            // Wait for the promise to resolve
            const base64String = await filePromise;
    
            // Make the Axios request with the Base64-encoded image
            const response = await axios.put('http://127.0.0.1:5000/updatePic', {
                user_id: localStorage.getItem("u_id"),
                profile_pic: base64String // Pass the Base64 string as the profile picture
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            return response.data.message;
        } catch (error) {
            console.error('Error updating profile picture:', error);
            throw error;
        }
    };
    

    const updatePassword = async (newPassword, oldPassword) => {
        try {
            const response = await axios.put('/update', {
                password: newPassword,
                old_password: oldPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.message;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    };

    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleRepeatNewPasswordChange = (event) => {
        setRepeatNewPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setNewUsername(event.target.value);
    };

    const handleBioChange = (event) => {
        setNewBio(event.target.value);
    };

    const handleProfilePicChange = (event) => {
        setNewProfilePic(event.target.files[0]);
    };

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateEmail(newEmail);
            alert('Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error);
            alert('Failed to update email. Please try again.');
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== repeatNewPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await updatePassword(newPassword, oldPassword);
            alert('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password. Please try again.');
        }
    };

    const handleUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUsername(newUsername);
            alert('Username updated successfully');
        } catch (error) {
            console.error('Error updating username:', error);
            alert('Failed to update username. Please try again.');
        }
    };

    const handleBioSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateBio(newBio);
            alert('Bio updated successfully');
        } catch (error) {
            console.error('Error updating bio:', error);
            alert('Failed to update bio. Please try again.');
        }
    };

    const handleProfilePicSubmit = async (event) => {
        event.preventDefault();
        if (!newProfilePic) {
            alert('Please select a profile picture.');
            return;
        }

        // Encode the selected profile picture to Base64
        const reader = new FileReader();
        reader.readAsDataURL(newProfilePic);
        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1];

            // Make the Axios request with the Base64-encoded image
            try {
                await updateProfilePicture(base64String);
                alert('Profile picture updated successfully');
            } catch (error) {
                console.error('Error updating profile picture:', error);
                alert('Failed to update profile picture. Please try again.');
            }
        };
    };

    return (
        <div className='update-container'>
            <div className="update-box-wrapper">
                <span className="close" title="Close Modal" onClick={prop.closeSet} >&times;</span>
                <form className="cnt" >
                    <h1 style={{ "alignItems": "center" }}>Update Profile</h1>
                    <label htmlFor="email"><b>New Email</b></label>
                    <input className="update-input" type="text" placeholder="Enter Email" name="email" value={newEmail} onChange={handleEmailChange} required />
                    <button className='update-btn' onClick={handleEmailSubmit} >Change</button>
                    <br />
                    <label htmlFor="old-psw"><b>Old Password</b></label>
                    <input className="update-input" type="password" placeholder="Enter Old Password" value={oldPassword} onChange={handleOldPasswordChange} name="psw" required />
                    <label htmlFor="psw"><b>New Password</b></label>
                    <input className="update-input" type="password" placeholder="Enter Password" name="psw" value={newPassword} onChange={handleNewPasswordChange} required />
                    <label htmlFor="psw-repeat"><b>Repeat New Password</b></label>
                    <input className="update-input" type="password" placeholder="Repeat Password" name="psw-repeat" value={repeatNewPassword} onChange={handleRepeatNewPasswordChange} required />
                    <button className='update-btn' onClick={handlePasswordSubmit}>Change</button>
                    <br />
                    <label htmlFor="username"><b>New Username</b></label>
                    <input className="update-input" type="text" placeholder="Enter Username" name="username" value={newUsername} onChange={handleUsernameChange} required />
                    <button className='update-btn' onClick={handleUsernameSubmit}>Change</button>
                    <br />
                    <label htmlFor="bio"><b>New Bio</b></label>
                    <input className="update-input" type="text" placeholder="Anything about you" name="bio" value={newBio} onChange={handleBioChange} required />
                    <button className='update-btn' onClick={handleBioSubmit} >Change</button>
                    <br />
                    <label htmlFor="dp"><b>New Profile Picture</b></label>
                    <input className="img-upload" id="dp" type="file" accept="image/*" onChange={handleProfilePicChange} required />
                    <button className="update-btn" onClick={handleProfilePicSubmit}>Change</button>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default ChangeProfile;
