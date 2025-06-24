const allowSecure = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // must match frontend
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
};
module.exports = {allowSecure};