import "./SettingPage.css";
import axios from "axios";
import ChangeProfile from "./ChangeProfile";
import { useState } from "react";

function SettingPage(prop) {
  const logoutAndRedirect = async () => {
    localStorage.setItem("isLoggedIn",false)
    window.location.href = "http://127.0.0.1:3000";
  };

  const deleteUserById = async () => {
    try {
      // Get the JWT token from local storage or cookie
      const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

      // Make a request to delete the user using the token
      const userId = localStorage.getItem("u_id");
      const response = await axios.delete(
        `http://127.0.0.1:5000/signup?id=${userId}`,
        {
          headers: {
            // Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data.message);
      throw error;
    }
  };

  var [isUpdate, setUpdate] = useState(false);

  function openUpdate() {
    setUpdate(true);
  }

  function closeUpdate() {
    setUpdate(false);
  }

  return (
    <div className="settings-container">
      <div id="01" className="settings-box-wrapper">
        <span className="close" title="Close Modal" onClick={prop.toggleSettings}>
          &times;
        </span>
        <div className="container">
          <h1 style={{ alignItems: "center" }}>Settings</h1>
          <div className="btn-settings">
            <button className="btn-settings" onClick={openUpdate}>
              Change Profile Info
            </button>
            {isUpdate && <ChangeProfile closeSet={closeUpdate} />}
            <br />
            <button
              className="btn-settings"
              style={{ marginLeft: "25%" }}
              onClick={logoutAndRedirect}
            >
              Logout
            </button>
            <br />
            <br />
            <button
              className="btn-settings"
              style={{ marginLeft: "8%" }}
              onClick={deleteUserById}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
