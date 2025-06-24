const requireAuth = (req, res, next) => {
  // Debug: Log session once
  console.log("Session in requireAuth:", req.session);

  // Check if session user exists
  if (req.session && req.session.user) {
    return next();
  }

  // Unauthorized response
  return res.status(401).json({ success: false, msg: "Unauthorized" });
};

module.exports = {requireAuth};
