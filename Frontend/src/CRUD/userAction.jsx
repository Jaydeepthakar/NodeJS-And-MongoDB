import React, { useState } from "react";
import {api} from "../common/common";
import "./UserAction.css";

function UserActions() {
  const [userId, setUserId] = useState("");
  const [updateData, setUpdateData] = useState({
    username: "",
    email: "",
  });
  const [userData, setUserData] = useState(null);

  const handleUpdate = async () => {
    try {
      const response = await fetch(api.update.url, {
        method: api.update.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, ...updateData }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User updated successfully!");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the user.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(api.delete.url, {
        method: api.delete.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User deleted successfully!");
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const handleGetOne = async () => {
    try {
      const response = await fetch(`${api.getone.url}?id=${userId}`, {
        method: api.getone.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        alert("User fetched successfully!");
      } else {
        alert(data.message || "Failed to fetch user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the user.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">User Actions</h2>
      <input
        type="text"
        placeholder="User ID"
        className="input"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <div className="section">
        <h3 className="subtitle">Update User</h3>
        <input
          type="text"
          name="username"
          placeholder="New Username"
          className="input"
          value={updateData.username}
          onChange={(e) =>
            setUpdateData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="email"
          name="email"
          placeholder="New Email"
          className="input"
          value={updateData.email}
          onChange={(e) =>
            setUpdateData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <button className="button success" onClick={handleUpdate}>
          Update User
        </button>
      </div>
      <button className="button danger" onClick={handleDelete}>
        Delete User
      </button>
      <button className="button primary" onClick={handleGetOne}>
        Get User
      </button>
      {userData && (
        <div className="user-details">
          <h3 className="details-title">User Details:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UserActions;