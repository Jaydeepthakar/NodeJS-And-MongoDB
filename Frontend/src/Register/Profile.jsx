import React from "react";

function Profile({ user }) {
  if (!user) {
    return <div style={{ textAlign: "center" }}>No user data found.</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Gender:</strong> {user.gender || "Not provided"}</p>
      <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
      <p><strong>Address:</strong> {user.address || "Not provided"}</p>
      <p><strong>Date of Birth:</strong> {user.dateofbirth || "Not provided"}</p>
    </div>
  );
}

export default Profile;
