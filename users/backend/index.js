const express = require('express');
require('dotenv').config();
const port = process.env.PORT
const { connectDB } = require('./src/Config/dbconfig.js');
const cookiesParser = require("cookie-parser")
const routes = require('./src/user/routes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { allowSecure } = require("./src/middlewara/allowsecure.js")
const product = require('./src/products/routes');

const app = express();

app.use(cors());

app.use(cookiesParser());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
console.log('MongoDB URL:', process.env.MONGO_URL);

app.use(session({
  secret: process.env.session_secret_key,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60,
  }),
  // cookie: { 
  //   secure: true,
  //   httpOnly: true
  // }
}));



app.use(allowSecure);

app.get("/get",(req, res) => {
  console.log(req.cookies);
  
  res.json({
    msg:"get"
  })
})

app.get("/set",(req, res) => {
  if (req.query["key"]) {
    res.cookie(req.query["key"], req.query["value"])
  }
  
  res.json({
    msg:"set"
  })
})

app.use("/userdata",routes)
app.use("/products",product)
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`);
});










// frontend and backend form data server 



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/userdata')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // User schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   gender: String,
//   phone: String,
//   address: String,
//   dateofbirth: String,
// });

// const User = mongoose.model('User', userSchema);

// // Register route
// // app.post('/register', async (req, res) => {
// //   try {
// //     console.log('Received Data:', req.body); // ✅ Log incoming data
// //     const newUser = new User(req.body);
// //     const savedUser = await newUser.save();
// //     console.log('Saved User:', savedUser); // ✅ Log what's saved
// //     res.status(201).json({ message: 'User registered successfully!' });
// //   } catch (err) {
// //     console.error('Register error:', err);
// //     res.status(500).json({ message: 'Internal Server Error', error: err.message });
// //   }
// // });

// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




















