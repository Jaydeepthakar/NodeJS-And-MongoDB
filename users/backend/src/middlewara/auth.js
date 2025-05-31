const requireAuth = (req, res, next) => {
    console.log(req.session)
  if (req.session?.user || req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized" });
    console.log(req.session?.user)
  }
};

module.exports = { requireAuth };


