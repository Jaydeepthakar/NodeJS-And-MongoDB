const express = require("express");
const user = require("./controller");
const { requireAuth } = require('../middlewara/auth');

const routes = express.Router();

// 🧾 Auth and User Management
routes.post("/create", user.createOne);
routes.post("/login", user.login);
routes.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid'); // very important
    res.json({ message: 'Logout successful' });
  });
});

// 🛡️ Session check
routes.get("/checkSession", (req, res) => {
  console.log("Session:", req.session);
  if (req.session?.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// 🔐 Auth-Protected routes
routes.get("/getAll", requireAuth, user.getAll);
routes.post("/resetPassword", requireAuth, user.resetPassword);

// 🧠 OTP and Recovery
routes.post("/sendOtp", user.sendOtp);
routes.post("/forgotPassword", user.forgotPassword);

// 👤 Individual user routes
routes.route("/:userID")
  .get(user.getOne)
  .put(user.updateOne)
  .delete(user.deleteOne);

module.exports = routes;
