import React, { useState } from "react";
import api from "./api";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">User Actions</h2>
      <input
        type="text"
        placeholder="User ID"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-bold">Update User</h3>
        <input
          type="text"
          name="username"
          placeholder="New Username"
          className="w-full p-2 border border-gray-300 rounded"
          value={updateData.username}
          onChange={(e) =>
            setUpdateData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="email"
          name="email"
          placeholder="New Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={updateData.email}
          onChange={(e) =>
            setUpdateData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handleUpdate}
        >
          Update User
        </button>
      </div>
      <button
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mb-6"
        onClick={handleDelete}
      >
        Delete User
      </button>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleGetOne}
      >
        Get User
      </button>
      {userData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">User Details:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UserActions;